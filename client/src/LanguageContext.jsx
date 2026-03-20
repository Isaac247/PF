// ============================================
// PROMPTFORGE — Language Context
// Provides current language + translations
// to all components without prop drilling
// ============================================

import React, { createContext, useContext, useState } from 'react';
import { TRANSLATIONS, TECHNIQUE_TRANSLATIONS, TIPS_TRANSLATIONS } from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  const t  = TRANSLATIONS[lang]          || TRANSLATIONS.en;
  const tt = TECHNIQUE_TRANSLATIONS[lang] || TECHNIQUE_TRANSLATIONS.en;
  const tips = TIPS_TRANSLATIONS[lang]   || TIPS_TRANSLATIONS.en;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tt, tips }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
