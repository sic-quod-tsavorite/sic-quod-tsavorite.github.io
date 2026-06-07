import { useCallback } from 'react'

export function useScrollSection() {
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      // Get the navbar element to calculate its height
      const navbar = document.querySelector('nav')
      const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0
      const offsetTop = el.getBoundingClientRect().top + window.pageYOffset - navbarHeight
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      })
    }
  }, [])

  return { scrollTo }
}
