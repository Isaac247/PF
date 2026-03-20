import React, { useState, useEffect, useRef } from 'react';
import { TECHNIQUES } from '../constants';
import { useLang } from '../LanguageContext';
import styles from './OutputPanel.module.css';

export default function OutputPanel({ prompt, explanation, score, selectedTechs, loading, onRefine, refining }) {
  const { t, tt } = useLang();
  const [displayed, setDisplayed] = useState('');
  const [streaming, setStreaming]  = useState(false);
  const [copied, setCopied]        = useState(false);
  const outputRef = useRef(null);
  const timerRef  = useRef(null);

  useEffect(() => {
    if (!prompt) { setDisplayed(''); return; }
    clearInterval(timerRef.current);
    setStreaming(true); setDisplayed('');
    let i = 0;
    const step  = Math.max(3, Math.ceil(prompt.length / 220));
    const speed = Math.max(6, Math.min(18, Math.floor(2600 / prompt.length)));
    timerRef.current = setInterval(() => {
      i += step;
      if (i >= prompt.length) {
        setDisplayed(prompt); setStreaming(false); clearInterval(timerRef.current);
      } else { setDisplayed(prompt.slice(0, i)); }
      if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }, speed);
    return () => clearInterval(timerRef.current);
  }, [prompt]);

  const handleCopy = () => {
    if (!prompt) return;
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleExport = () => {
    if (!prompt) return;
    const blob = new Blob([prompt], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'my-prompt.txt';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  // Build technique name map from translated names
  const techNameMap = Object.fromEntries(
    TECHNIQUES.map(tech => [tech.id, (tt[tech.id] || tech).name])
  );

  const hasContent = !!prompt;

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <span className={styles.panelTitle}>{t.panelOutputTitle}</span>
        <span className={styles.panelNum}>02</span>
      </div>

      {hasContent && selectedTechs.size > 0 && (
        <div className={styles.tags}>
          {[...selectedTechs].map(id => (
            <span key={id} className={styles.tag}>{techNameMap[id] || id}</span>
          ))}
        </div>
      )}

      <div ref={outputRef} className={`${styles.outputBox} ${hasContent ? styles.hasContent : ''}`}>
        {!hasContent && !loading && (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>✦</div>
            <p className={styles.emptyTitle}>{t.emptyTitle}</p>
            <p className={styles.emptySub}>{t.emptySub}</p>
          </div>
        )}
        {loading && !hasContent && (
          <div className={styles.empty}>
            <div className={styles.dots}><span /><span /><span /></div>
            <p className={styles.emptyTitle}>{t.loadingTitle}</p>
            <p className={styles.emptySub}>{t.loadingSub}</p>
          </div>
        )}
        {hasContent && <span className={streaming ? styles.streaming : ''}>{displayed}</span>}
      </div>

      {hasContent && score > 0 && (
        <div className={styles.scoreRow}>
          <span className={styles.scoreLabel}>{t.promptStrength}</span>
          <div className={styles.scoreBar}>
            <div className={styles.scoreFill} style={{ width: `${score}%` }} />
          </div>
          <span className={styles.scoreVal}>{score}%</span>
        </div>
      )}

      {hasContent && (
        <div className={styles.actions}>
          <button className={`${styles.btn} ${styles.btnCopy} ${copied ? styles.btnCopied : ''}`} onClick={handleCopy}>
            {copied ? t.copied : t.copyBtn}
          </button>
          <button className={`${styles.btn} ${styles.btnRefine}`} onClick={onRefine} disabled={refining}>
            {refining ? t.refining : t.refineBtn}
          </button>
          <button className={`${styles.btn} ${styles.btnExport}`} onClick={handleExport}>
            {t.saveBtn}
          </button>
        </div>
      )}

      {explanation && !streaming && (
        <>
          <div className={styles.explainDivider}>
            <span className={styles.divLine} />
            <span className={styles.divText}>{t.whyTitle}</span>
            <span className={styles.divLine} />
          </div>
          <div className={styles.explanation}>{explanation}</div>
        </>
      )}
    </div>
  );
}
