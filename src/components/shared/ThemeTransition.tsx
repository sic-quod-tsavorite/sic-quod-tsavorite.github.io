import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme, useThemeToggleRequest, getThemeClickPosition } from '@/hooks/useTheme'

export function ThemeTransition() {
  const { toggleTheme, theme: currentTheme } = useTheme()
  const toggleRequest = useThemeToggleRequest()
  const [isAnimating, setIsAnimating] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [targetTheme, setTargetTheme] = useState<'dark' | 'light'>('dark')
  const prevToggleRequest = useRef(toggleRequest)
  const isFirstRender = useRef(true)

  const clickPosRef = useRef<{ x: number; y: number } | null>(null)
  const targetThemeRef = useRef<'dark' | 'light'>('dark')
  const hasToggledRef = useRef(false)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      prevToggleRequest.current = toggleRequest
      return
    }

    if (toggleRequest !== prevToggleRequest.current) {
      prevToggleRequest.current = toggleRequest

      // Get click position from the store
      const clickPos = getThemeClickPosition()
      if (clickPos) {
        // Determine target theme (opposite of current)
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark'

        // Store values in refs
        clickPosRef.current = clickPos
        targetThemeRef.current = nextTheme

        // Set state in a callback to avoid synchronous setState in effect
        setTimeout(() => {
          setPosition(clickPos)
          setTargetTheme(nextTheme)
          setIsAnimating(true)
          hasToggledRef.current = false
        }, 0)
      }
    }
  }, [toggleRequest, currentTheme])

  // Calculate the scale needed to cover the entire viewport from the click position
  const getCoverScale = () => {
    const { innerWidth, innerHeight } = window
    const maxDistance = Math.max(
      Math.hypot(position.x, position.y),
      Math.hypot(innerWidth - position.x, position.y),
      Math.hypot(position.x, innerHeight - position.y),
      Math.hypot(innerWidth - position.x, innerHeight - position.y)
    )
    // Add 20% extra to ensure full coverage
    return (maxDistance / 50) * 1.2
  }

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[100]"
          style={{
            background:
              targetTheme === 'dark'
                ? 'oklch(0.13 0.02 155)' // dark theme background color
                : 'oklch(0.97 0.01 155)', // light theme background color
            opacity: 0.9,
          }}
          initial={{
            clipPath: `circle(0px at ${position.x}px ${position.y}px)`,
          }}
          animate={{
            clipPath: `circle(${getCoverScale() * 50}px at ${position.x}px ${position.y}px)`,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1], // ease-out-cubic
          }}
          onAnimationComplete={() => {
            if (!hasToggledRef.current) {
              hasToggledRef.current = true
              setIsAnimating(false)
              toggleTheme()
            }
          }}
        />
      )}
    </AnimatePresence>
  )
}
