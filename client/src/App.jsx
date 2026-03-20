import React, { useState, useCallback } from 'react';
import { LanguageProvider, useLang } from './LanguageContext';
import Header      from './components/Header';
import Hero        from './components/Hero';
import InputPanel  from './components/InputPanel';
import OutputPanel from './components/OutputPanel';
import TipsStrip   from './components/TipsStrip';
import Footer      from './components/Footer';
import { buildMetaPrompt, buildRefinePrompt, calculateScore } from './promptBuilder';
import { callClaude, parseResponse } from './api';
import styles from './App.module.css';

function AppInner() {
  const { lang, t } = useLang();

  const [task,    setTask]    = useState('');
  const [model,   setModel]   = useState('claude');
  const [role,    setRole]    = useState('');
  const [format,  setFormat]  = useState('');
  const [tone,    setTone]    = useState('');
  const [context, setContext] = useState('');
  const [selectedTechs, setSelectedTechs] = useState(new Set(['cot', 'role']));

  const [prompt,      setPrompt]      = useState('');
  const [explanation, setExplanation] = useState('');
  const [score,       setScore]       = useState(0);

  const [loading,  setLoading]  = useState(false);
  const [refining, setRefining] = useState(false);
  const [error,    setError]    = useState('');

  const toggleTech = useCallback((id) => {
    setSelectedTechs(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!task.trim()) { setError(t.errorNoTask); return; }
    setError(''); setLoading(true); setPrompt(''); setExplanation(''); setScore(0);
    try {
      const techniques  = [...selectedTechs];
      const metaPrompt  = buildMetaPrompt({ task, model, role, format, tone, context, techniques, language: lang });
      const rawResponse = await callClaude(metaPrompt, 1800);
      const { prompt: p, explanation: e } = parseResponse(rawResponse);
      setPrompt(p);
      setExplanation(e);
      setScore(calculateScore({ techniques: selectedTechs, task, context, role }));
    } catch (err) {
      setError(`${t.errorGeneral} (${err.message})`);
    } finally {
      setLoading(false);
    }
  }, [task, model, role, format, tone, context, selectedTechs, lang, t]);

  const handleRefine = useCallback(async () => {
    if (!prompt) return;
    setRefining(true); setError('');
    try {
      const refined = await callClaude(buildRefinePrompt(prompt), 1200);
      setPrompt(refined.trim());
    } catch (err) {
      setError(`${t.errorRefine} (${err.message})`);
    } finally {
      setRefining(false);
    }
  }, [prompt, t]);

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Hero />
        <div className={styles.workspaceWrap}>
          <div className={styles.workspace}>
            <InputPanel
              task={task}       setTask={setTask}
              model={model}     setModel={setModel}
              role={role}       setRole={setRole}
              format={format}   setFormat={setFormat}
              tone={tone}       setTone={setTone}
              context={context} setContext={setContext}
              selectedTechs={selectedTechs}
              toggleTech={toggleTech}
              onGenerate={handleGenerate}
              loading={loading}
              error={error}
            />
            <OutputPanel
              prompt={prompt}
              explanation={explanation}
              score={score}
              selectedTechs={selectedTechs}
              loading={loading}
              onRefine={handleRefine}
              refining={refining}
            />
          </div>
        </div>
        <TipsStrip />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  );
}
