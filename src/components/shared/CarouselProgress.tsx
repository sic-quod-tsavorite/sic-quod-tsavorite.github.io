import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { CarouselApi } from '@/components/ui/carousel'

interface CarouselProgressProps {
  api: CarouselApi | undefined
  className?: string
  visibleSlides?: number
}

interface ExitingSegment {
  id: number
  position: number
  width: number
  direction: 'left' | 'right'
}

export function CarouselProgress({ api, className, visibleSlides = 3 }: CarouselProgressProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [totalSlides, setTotalSlides] = useState(0)
  const [exitingSegments, setExitingSegments] = useState<ExitingSegment[]>([])
  const [segmentKey, setSegmentKey] = useState(0)
  const prevIndexRef = useRef(0)

  // Thumb takes up visibleSlides/totalSlides of the track
  const thumbWidth = useMemo(() => {
    if (totalSlides === 0) return 0
    return (visibleSlides / totalSlides) * 100
  }, [totalSlides, visibleSlides])

  // Position is simply index/total * 100 (allows wrapping)
  const position = useMemo(() => {
    if (totalSlides === 0) return 0
    return (currentIndex / totalSlides) * 100
  }, [currentIndex, totalSlides])

  // Check if bar wraps around
  const wraps = position + thumbWidth > 100
  const rightSegmentWidth = wraps ? 100 - position : thumbWidth
  const leftSegmentWidth = wraps ? position + thumbWidth - 100 : 0

  const onSelect = useCallback(() => {
    if (!api) return

    const newIndex = api.selectedScrollSnap()
    const total = api.scrollSnapList().length
    const prevIndex = prevIndexRef.current

    // Detect loop transitions
    const isLoopingForward = prevIndex === total - 1 && newIndex === 0
    const isLoopingBackward = prevIndex === 0 && newIndex === total - 1

    if (isLoopingForward) {
      // Going from last to first - right segment exits right
      const prevPosition = (prevIndex / total) * 100
      const prevRightWidth = 100 - prevPosition

      setExitingSegments((prev) => [
        ...prev,
        { id: Date.now(), position: prevPosition, width: prevRightWidth, direction: 'right' },
      ])
      // Increment key to remount segments at new positions
      setSegmentKey((k) => k + 1)
    } else if (isLoopingBackward) {
      // Going from first to last - the full bar exits left
      const thumbWidthPercent = (visibleSlides / total) * 100

      setExitingSegments((prev) => [
        ...prev,
        { id: Date.now(), position: 0, width: thumbWidthPercent, direction: 'left' },
      ])
      // Increment key to remount segments at new positions
      setSegmentKey((k) => k + 1)
    }

    prevIndexRef.current = newIndex
    setTotalSlides(total)
    setCurrentIndex(newIndex)
  }, [api, visibleSlides])

  const onReInit = useCallback(() => {
    if (!api) return
    const index = api.selectedScrollSnap()
    prevIndexRef.current = index
    setTotalSlides(api.scrollSnapList().length)
    setCurrentIndex(index)
  }, [api])

  // Clean up exiting segments
  useEffect(() => {
    if (exitingSegments.length === 0) return

    const timer = setTimeout(() => {
      setExitingSegments([])
    }, 400)
    return () => clearTimeout(timer)
  }, [exitingSegments.length])

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

  // Shared gradient animation props
  const gradientAnimation = {
    animate: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    },
    transition: {
      backgroundPosition: {
        duration: 3,
        ease: 'linear' as const,
        repeat: Infinity,
      },
    },
  }

  return (
    <div className={className}>
      {/* Track */}
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
        {/* Exiting segments */}
        <AnimatePresence>
          {exitingSegments.map((segment) => (
            <motion.div
              key={segment.id}
              className="absolute inset-y-0 rounded-full"
              initial={{ left: `${segment.position}%`, width: `${segment.width}%`, opacity: 1 }}
              animate={{
                left: segment.direction === 'right' ? '105%' : `-${segment.width + 5}%`,
                opacity: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <motion.div
                className="from-primary via-secondary to-primary absolute inset-0 rounded-full bg-gradient-to-r"
                style={{ backgroundSize: '200% 100%' }}
                {...gradientAnimation}
              />
              <motion.div
                className="from-primary/50 via-secondary/50 to-primary/50 absolute inset-0 rounded-full bg-gradient-to-r blur-sm"
                style={{ backgroundSize: '200% 100%' }}
                {...gradientAnimation}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Right/Main segment */}
        <motion.div
          key={`right-${segmentKey}`}
          className="absolute inset-y-0 rounded-full"
          initial={segmentKey > 0 ? { left: '100%', width: 0 } : false}
          animate={{
            left: `${position}%`,
            width: `${rightSegmentWidth}%`,
          }}
          transition={{
            left: { type: 'spring', stiffness: 120, damping: 20 },
            width: { type: 'spring', stiffness: 120, damping: 20 },
          }}
        >
          {/* Liquid gradient fill */}
          <motion.div
            className="from-primary via-secondary to-primary absolute inset-0 rounded-full bg-gradient-to-r"
            style={{ backgroundSize: '200% 100%' }}
            {...gradientAnimation}
          />
          {/* Glow effect */}
          <motion.div
            className="from-primary/50 via-secondary/50 to-primary/50 absolute inset-0 rounded-full bg-gradient-to-r blur-sm"
            style={{ backgroundSize: '200% 100%' }}
            {...gradientAnimation}
          />
        </motion.div>

        {/* Left segment (wrapped portion) */}
        <motion.div
          key={`left-${segmentKey}`}
          className="absolute inset-y-0 left-0 rounded-full"
          initial={segmentKey > 0 ? { width: 0, opacity: 0 } : false}
          animate={{
            width: `${leftSegmentWidth}%`,
            opacity: wraps ? 1 : 0,
          }}
          transition={{
            width: { type: 'spring', stiffness: 120, damping: 20 },
            opacity: { duration: 0.15 },
          }}
        >
          {/* Liquid gradient fill */}
          <motion.div
            className="from-primary via-secondary to-primary absolute inset-0 rounded-full bg-gradient-to-r"
            style={{ backgroundSize: '200% 100%' }}
            {...gradientAnimation}
          />
          {/* Glow effect */}
          <motion.div
            className="from-primary/50 via-secondary/50 to-primary/50 absolute inset-0 rounded-full bg-gradient-to-r blur-sm"
            style={{ backgroundSize: '200% 100%' }}
            {...gradientAnimation}
          />
        </motion.div>

        {/* Subtle shimmer overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            x: {
              duration: 2,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatDelay: 3,
            },
          }}
        />
      </div>
    </div>
  )
}
