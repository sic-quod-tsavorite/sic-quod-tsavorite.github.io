import { useEffect, useState } from 'react'
import { SECTION_IDS } from '@/lib/constants'

const sectionIds = Object.values(SECTION_IDS)

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>('hero')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    const handleIntersect = (id: string) => (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(id)
        }
      })
    }

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(handleIntersect(id), {
        rootMargin: '-40% 0px -55% 0px',
      })
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  return activeSection
}
