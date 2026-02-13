import { useRef, useEffect, useState, type ElementType } from 'react'
import { useLanguageChange } from '@/hooks/useLanguage'

interface AnimatedTextProps {
  children: React.ReactNode
  index?: number
  className?: string
  as?: ElementType
}

export function AnimatedText({
  children,
  index = 0,
  className = '',
  as: Component = 'span',
}: AnimatedTextProps) {
  const changeCount = useLanguageChange()
  const elementRef = useRef<HTMLElement>(null)
  const prevChangeCount = useRef(changeCount)
  const isFirstRender = useRef(true)
  const [displayText, setDisplayText] = useState<React.ReactNode>(children)
  const pendingText = useRef<React.ReactNode>(children)

  // Update pending text when children change
  useEffect(() => {
    pendingText.current = children
  }, [children])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      prevChangeCount.current = changeCount
      return
    }

    if (changeCount !== prevChangeCount.current && changeCount > 0) {
      prevChangeCount.current = changeCount

      const element = elementRef.current
      if (element) {
        // Fade out with old text
        element.style.transition = `opacity 0.15s ease ${index * 40}ms`
        element.style.opacity = '0'

        // After fade out, swap text and fade in
        const fadeOutDuration = 150 + index * 40
        setTimeout(() => {
          setDisplayText(pendingText.current)
          element.style.transition = `opacity 0.2s ease`
          element.style.opacity = '1'

          // Clean up after fade in
          setTimeout(() => {
            element.style.transition = ''
            element.style.opacity = ''
          }, 200)
        }, fadeOutDuration)
      }
    }
  }, [changeCount, index])

  const handleRef = (el: HTMLElement | null) => {
    elementRef.current = el
  }

  // On first load (changeCount === 0), render without animation
  if (changeCount === 0) {
    return <Component className={className}>{children}</Component>
  }

  return (
    <Component ref={handleRef} className={className}>
      {displayText}
    </Component>
  )
}
