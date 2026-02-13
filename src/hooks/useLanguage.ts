import { useCallback, useSyncExternalStore } from 'react'
import type { Language, Translations } from '@/i18n/types'
import { getTranslations } from '@/i18n/translations'

const STORAGE_KEY = 'language'

function getSnapshot(): Language {
  const lang = document.documentElement.lang
  return lang === 'da' ? 'da' : 'en'
}

function getServerSnapshot(): Language {
  return 'en'
}

function subscribe(callback: () => void): () => void {
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] })
  return () => observer.disconnect()
}

export function useLanguage() {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggleLanguage = useCallback(() => {
    const next: Language = document.documentElement.lang === 'da' ? 'en' : 'da'
    document.documentElement.lang = next
    localStorage.setItem(STORAGE_KEY, next)
  }, [])

  return { language, toggleLanguage } as const
}

export function useTranslation(): Translations {
  const { language } = useLanguage()
  return getTranslations(language)
}

// Store for tracking language change count
let changeCount = 0
let lastLanguage: Language = getSnapshot()
const listeners = new Set<() => void>()

function getChangeCountSnapshot(): number {
  const currentLang = getSnapshot()
  if (currentLang !== lastLanguage) {
    lastLanguage = currentLang
    changeCount += 1
  }
  return changeCount
}

function getChangeCountServerSnapshot(): number {
  return 0
}

function subscribeChangeCount(callback: () => void): () => void {
  listeners.add(callback)
  const observer = new MutationObserver(() => {
    const currentLang = getSnapshot()
    if (currentLang !== lastLanguage) {
      lastLanguage = currentLang
      changeCount += 1
      listeners.forEach((cb) => cb())
    }
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] })
  return () => {
    listeners.delete(callback)
    observer.disconnect()
  }
}

// Hook to detect language changes for animation purposes
// Returns a counter that increments every time language changes
export function useLanguageChange(): number {
  return useSyncExternalStore(
    subscribeChangeCount,
    getChangeCountSnapshot,
    getChangeCountServerSnapshot
  )
}
