import React, { useState, useRef, useEffect } from 'react';
import { LANGUAGES } from '../translations';
import { useLang } from '../LanguageContext';
import styles from './Header.module.css';

export default function Header() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const dropRef = useRef(null);

  const current = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  useEffect(() => {
    function handleClick(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        Prompt<span className={styles.accent}>Smith</span>
      </div>

      <div className={styles.center}>
        <span className={styles.dot} />
        <span className={styles.tagline}>{t.tagline}</span>
      </div>

      <div className={styles.right}>
        {/* LANGUAGE SELECTOR */}
        <div className={styles.langWrap} ref={dropRef}>
          <button
            className={styles.langBtn}
            onClick={() => setOpen(o => !o)}
            aria-label="Select language"
            type="button"
          >
            <span>{current.flag}</span>
            <span className={styles.langName}>{current.nativeName}</span>
            <span className={`${styles.caret} ${open ? styles.caretOpen : ''}`}>▾</span>
          </button>

          {open && (
            <div className={styles.dropdown}>
              <div className={styles.dropHeader}>{t.languageLabel}</div>
              {LANGUAGES.map(l => (
                <button
                  key={l.code}
                  className={`${styles.dropItem} ${l.code === lang ? styles.dropActive : ''}`}
                  onClick={() => { setLang(l.code); setOpen(false); }}
                  type="button"
                >
                  <span className={styles.dropFlag}>{l.flag}</span>
                  <span className={styles.dropLabels}>
                    <span className={styles.dropNative}>{l.nativeName}</span>
                    {l.nativeName !== l.label && (
                      <span className={styles.dropSub}>{l.label}</span>
                    )}
                  </span>
                  {l.code === lang && <span className={styles.dropCheck}>✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.badge}>{t.poweredBy}</div>
      </div>
    </header>
  );
}
