import React from 'react';
import { useLang } from '../LanguageContext';
import styles from './Hero.module.css';

export default function Hero() {
  const { t } = useLang();
  return (
    <section className={styles.hero}>
      <div className={`${styles.eyebrow} animate-fade-up`}>
        <span className={styles.line} />
        <span>{t.eyebrow}</span>
        <span className={styles.line} />
      </div>
      <h1 className={`${styles.heading} animate-fade-up delay-1`}>
        {t.heroTitle1}<br />
        <em className={styles.accent}>{t.heroTitle2}</em>
      </h1>
      <p className={`${styles.sub} animate-fade-up delay-2`}>{t.heroSub}</p>
      <div className={`${styles.steps} animate-fade-up delay-3`}>
        <div className={styles.step}>
          <span className={styles.stepNum}>1</span>
          <span className={styles.stepText}>{t.step1}</span>
        </div>
        <span className={styles.arrow}>→</span>
        <div className={styles.step}>
          <span className={styles.stepNum}>2</span>
          <span className={styles.stepText}>{t.step2}</span>
        </div>
        <span className={styles.arrow}>→</span>
        <div className={styles.step}>
          <span className={styles.stepNum}>3</span>
          <span className={styles.stepText}>{t.step3}</span>
        </div>
      </div>
    </section>
  );
}
