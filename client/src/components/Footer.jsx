import React from 'react';
import { useLang } from '../LanguageContext';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className={styles.footer}>
      <span className={styles.brand}>PromptLit</span>
      <span className={styles.sep}>·</span>
      <span>{t.footerBuiltOn}</span>
      <span className={styles.sep}>·</span>
      <span>{t.footerPowered}</span>
    </footer>
  );
}
