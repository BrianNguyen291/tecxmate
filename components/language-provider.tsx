'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import en from '@/app/lang/en.json'
import vi from '@/app/lang/vi.json'
import zh from '@/app/lang/zh.json'

const dictionaries = {
  en,
  vi,
  zh,
}

type Language = keyof typeof dictionaries

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: keyof typeof en) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const LANGUAGE_STORAGE_KEY = 'tecxmate:lang'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)

    if (storedLanguage && storedLanguage in dictionaries) {
      setLanguageState(storedLanguage as Language)
    }
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
    }
  }, [])

  const t = useCallback(
    (key: keyof typeof en) => {
      const translation = dictionaries[language][key]

      return translation ?? dictionaries.en[key] ?? key
    },
    [language],
  )

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
    }),
    [language, setLanguage, t],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }

  return context
}

export type { Language }
