import React from 'react';
import { TECHNIQUES, MODEL_OPTIONS, FORMAT_OPTIONS, TONE_OPTIONS } from '../constants';
import { useLang } from '../LanguageContext';
import styles from './InputPanel.module.css';

export default function InputPanel({
  task, setTask, model, setModel, role, setRole,
  format, setFormat, tone, setTone, context, setContext,
  selectedTechs, toggleTech, onGenerate, loading, error,
}) {
  const { t, tt } = useLang();

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <span className={styles.panelTitle}>{t.panelInputTitle}</span>
        <span className={styles.panelNum}>01</span>
      </div>

      {/* TASK */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="task">
          {t.taskLabel} <span className={styles.req}>*</span>
        </label>
        <textarea
          id="task"
          className={`${styles.textarea} ${styles.tall}`}
          value={task}
          onChange={e => setTask(e.target.value)}
          placeholder={t.taskPlaceholder}
        />
        <span className={styles.hint}>{t.taskHint}</span>
      </div>

      {/* MODEL */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="model">{t.modelLabel}</label>
        <select id="model" className={styles.select} value={model} onChange={e => setModel(e.target.value)}>
          {MODEL_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* ROLE */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="role">
          {t.roleLabel} <span className={styles.opt}>{t.optional}</span>
        </label>
        <input id="role" type="text" className={styles.input} value={role}
          onChange={e => setRole(e.target.value)} placeholder={t.rolePlaceholder} />
      </div>

      {/* FORMAT + TONE */}
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="format">{t.formatLabel}</label>
          <select id="format" className={styles.select} value={format} onChange={e => setFormat(e.target.value)}>
            {FORMAT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="tone">{t.toneLabel}</label>
          <select id="tone" className={styles.select} value={tone} onChange={e => setTone(e.target.value)}>
            {TONE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {/* CONTEXT */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="context">
          {t.contextLabel} <span className={styles.opt}>{t.optionalButHelpful}</span>
        </label>
        <textarea id="context" className={styles.textarea} value={context}
          onChange={e => setContext(e.target.value)} placeholder={t.contextPlaceholder} />
      </div>

      {/* TECHNIQUES */}
      <div className={styles.divider}>
        <span className={styles.divLine} />
        <span className={styles.divText}>{t.techniquesTitle}</span>
        <span className={styles.divLine} />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>
          {t.techniquesLabel}
          <span className={styles.opt}> {t.techniquesHint}</span>
        </label>
        <div className={styles.techGrid}>
          {TECHNIQUES.map(tech => {
            const on = selectedTechs.has(tech.id);
            const translated = tt[tech.id] || { name: tech.name, desc: tech.desc };
            return (
              <button
                key={tech.id}
                type="button"
                className={`${styles.techItem} ${on ? styles.techOn : ''}`}
                onClick={() => toggleTech(tech.id)}
                title={tech.detail}
              >
                <span className={styles.techIcon}>{tech.icon}</span>
                <span className={styles.techInfo}>
                  <span className={styles.techName}>{translated.name}</span>
                  <span className={styles.techDesc}>{translated.desc}</span>
                </span>
                <span className={`${styles.check} ${on ? styles.checkOn : ''}`}>
                  {on ? '✓' : ''}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* GENERATE */}
      <button
        className={`${styles.generateBtn} ${loading ? styles.loading : ''}`}
        onClick={onGenerate} disabled={loading} type="button"
      >
        {loading
          ? <><span className={styles.spinner} />{t.generating}</>
          : <><span>⚡</span> {t.generateBtn}</>
        }
      </button>

      {error && <div className={styles.error}><span>⚠</span> {error}</div>}
    </div>
  );
}
