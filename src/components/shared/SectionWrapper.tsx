import { type ReactNode, useEffect, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { cn } from '@/lib/utils'
import { containerVariants, revealVariants } from '@/lib/variants'

interface SectionWrapperProps {
  id: string
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
  fullHeight?: boolean
}

export function SectionWrapper({
  id,
  title,
  subtitle,
  children,
  className,
  fullHeight = false,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null)
  const controls = useAnimationControls()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible')
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [controls])

  return (
    <section
      ref={ref}
      id={id}
      className={cn('relative px-6 py-24', fullHeight && 'min-h-screen', className)}
    >
      <motion.div
        className="mx-auto max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {title && (
          <motion.div variants={revealVariants} className="mb-16">
            <h2 className="mb-4 text-4xl font-bold">
              <span className="from-primary to-secondary bg-linear-to-r bg-clip-text text-transparent">
                {title}
              </span>
            </h2>
            {subtitle && <p className="text-muted-foreground max-w-2xl text-lg">{subtitle}</p>}
          </motion.div>
        )}
        {children}
      </motion.div>
    </section>
  )
}
