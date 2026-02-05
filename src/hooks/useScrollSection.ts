import { useCallback } from 'react'

export function useScrollSection() {
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return { scrollTo }
}
