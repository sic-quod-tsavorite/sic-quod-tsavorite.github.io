import { useRef, useEffect, useState } from 'react'
import { useLanguageChange } from '@/hooks/useLanguage'

interface AnimatedTextProps {
  children: React.ReactNode
  index?: number
  className?: string
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'button'
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

  // On first load (changeCount === 0), render without animation
  if (changeCount === 0) {
    const Comp = Component as keyof JSX.IntrinsicElements
    return <Comp className={className}>{children}</Comp>
  }

  const Comp = Component as keyof JSX.IntrinsicElements
  return (
    <Comp ref={elementRef as React.RefObject<HTMLElement>} className={className}>
      {displayText}
    </Comp>
  )
}
