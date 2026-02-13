import { useCallback, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'theme'

function getSnapshot(): 'dark' | 'light' {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function getServerSnapshot(): 'dark' | 'light' {
  return 'dark'
}

function subscribe(callback: () => void): () => void {
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  return () => observer.disconnect()
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggleTheme = useCallback(() => {
    const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark', next === 'dark')
    localStorage.setItem(STORAGE_KEY, next)
  }, [])

  return { theme, toggleTheme } as const
}

// Store for tracking click position and toggle requests
let lastClickPosition: { x: number; y: number } | null = null
let toggleRequestCount = 0
const toggleRequestListeners = new Set<() => void>()

// Store and retrieve click position for theme transition
export function setThemeClickPosition(position: { x: number; y: number } | null) {
  lastClickPosition = position
}

export function getThemeClickPosition(): { x: number; y: number } | null {
  return lastClickPosition
}

// Theme toggle request tracking for animation
function getToggleRequestSnapshot(): number {
  return toggleRequestCount
}

function subscribeToggleRequest(callback: () => void): () => void {
  toggleRequestListeners.add(callback)
  return () => toggleRequestListeners.delete(callback)
}

/**
 * Hook to detect theme toggle requests (button clicks)
 * Returns a counter that increments when toggle is requested
 */
export function useThemeToggleRequest(): number {
  return useSyncExternalStore(subscribeToggleRequest, getToggleRequestSnapshot, () => 0)
}

/**
 * Call this to request a theme toggle (shows animation first)
 */
export function requestThemeToggle() {
  toggleRequestCount += 1
  toggleRequestListeners.forEach((cb) => cb())
}
