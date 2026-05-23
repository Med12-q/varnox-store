'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { type Language, getTranslation } from './translations'

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: ReturnType<typeof getTranslation>
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr')
  const [t, setT] = useState(getTranslation('fr'))

  useEffect(() => {
    const saved = localStorage.getItem('varnox-language') as Language
    if (saved && (saved === 'fr' || saved === 'en')) {
      setLanguageState(saved)
      setT(getTranslation(saved))
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    setT(getTranslation(lang))
    localStorage.setItem('varnox-language', lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
