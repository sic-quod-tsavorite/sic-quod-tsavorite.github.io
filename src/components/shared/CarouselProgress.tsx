import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { CarouselApi } from '@/components/ui/carousel'

interface CarouselProgressProps {
  api: CarouselApi | undefined
  className?: string
  visibleSlides?: number
}

export function CarouselProgress({ api, className, visibleSlides = 3 }: CarouselProgressProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [totalSlides, setTotalSlides] = useState(0)

  // Check if a segment index is currently visible
  const isVisible = (index: number) => {
    if (totalSlides === 0) return false

    for (let i = 0; i < visibleSlides; i++) {
      const visibleIndex = (currentIndex + i) % totalSlides
      if (visibleIndex === index) return true
    }
    return false
  }

  const onSelect = useCallback(() => {
    if (!api) return
    setCurrentIndex(api.selectedScrollSnap())
    setTotalSlides(api.scrollSnapList().length)
  }, [api])

  const onReInit = useCallback(() => {
    if (!api) return
    setTotalSlides(api.scrollSnapList().length)
    setCurrentIndex(api.selectedScrollSnap())
  }, [api])

  useEffect(() => {
    if (!api) return

    queueMicrotask(onReInit)

    api.on('select', onSelect)
    api.on('reInit', onReInit)

    return () => {
      api.off('select', onSelect)
      api.off('reInit', onReInit)
    }
  }, [api, onSelect, onReInit])

  if (totalSlides === 0) return null

  return (
    <div className={className}>
      <div className="flex items-center justify-center gap-1.5">
        {Array.from({ length: totalSlides }).map((_, index) => {
          const active = isVisible(index)

          return (
            <button
              key={index}
              type="button"
              onClick={() => api?.scrollTo(index)}
              className="group relative h-1.5 w-6 cursor-pointer rounded-full"
              aria-label={`Go to slide ${index + 1}`}
            >
              {/* Inactive background */}
              <div className="absolute inset-0 rounded-full bg-black/10 transition-colors group-hover:bg-black/20 dark:bg-white/10 dark:group-hover:bg-white/20" />

              {/* Active solid fill with pulse - color interpolated along gradient */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundColor: `color-mix(in oklch, var(--primary) ${totalSlides > 1 ? 100 - (index / (totalSlides - 1)) * 100 : 100}%, var(--secondary))`,
                }}
                initial={false}
                animate={{
                  opacity: active ? [0.85, 1, 0.85] : 0,
                }}
                transition={{
                  opacity: active
                    ? {
                        duration: 2.5,
                        ease: 'easeInOut',
                        repeat: Infinity,
                      }
                    : { duration: 0.2 },
                }}
              />

              {/* Subtle glow with pulse */}
              <motion.div
                className="absolute inset-0 rounded-full blur-sm"
                style={{
                  backgroundColor: `color-mix(in oklch, var(--primary) ${totalSlides > 1 ? 100 - (index / (totalSlides - 1)) * 100 : 100}%, var(--secondary))`,
                }}
                initial={false}
                animate={{
                  opacity: active ? [0.5, 0.8, 0.5] : 0,
                }}
                transition={{
                  opacity: active
                    ? {
                        duration: 2.5,
                        ease: 'easeInOut',
                        repeat: Infinity,
                      }
                    : { duration: 0.2 },
                }}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
