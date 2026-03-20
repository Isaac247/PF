import React from 'react';
import { useLang } from '../LanguageContext';
import styles from './TipsStrip.module.css';

export default function TipsStrip() {
  const { t, tips } = useLang();
  return (
    <div className={styles.strip}>
      <p className={styles.heading}>{t.tipsHeading}</p>
      <div className={styles.grid}>
        {tips.map(tip => (
          <div key={tip.num} className={styles.card}>
            <span className={styles.num}>{tip.num}</span>
            <div>
              <strong className={styles.title}>{tip.title}</strong>
              <p className={styles.body}>{tip.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
