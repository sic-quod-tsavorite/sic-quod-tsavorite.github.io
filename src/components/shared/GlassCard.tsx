import { type ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  hover?: boolean
}

export function GlassCard({ children, className, hover = true, ...props }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02 } : undefined}
      transition={hover ? { type: 'spring', stiffness: 300, damping: 20 } : undefined}
      className={cn(
        'relative rounded-2xl border border-black/10 bg-black/5 p-6 shadow-xl backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-white/5',
        hover &&
          'hover:border-black/20 hover:bg-black/10 hover:shadow-2xl dark:hover:border-white/20 dark:hover:bg-white/10',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
