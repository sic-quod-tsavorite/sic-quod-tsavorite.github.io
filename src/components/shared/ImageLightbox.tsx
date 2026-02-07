import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ImageLightboxProps {
  images: string[]
  initialIndex?: number
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
}

function LightboxContent({
  images,
  initialIndex = 0,
  onClose,
  title,
}: {
  images: string[]
  initialIndex?: number
  onClose: () => void
  title?: string
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [direction, setDirection] = useState(0)

  const goToPrevious = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const goToNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const goToIndex = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1)
      setCurrentIndex(index)
    },
    [currentIndex]
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        e.stopPropagation()
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        e.stopPropagation()
        goToNext()
      }
    }

    // Use capture phase to intercept before carousel
    window.addEventListener('keydown', handleKeyDown, true)
    return () => window.removeEventListener('keydown', handleKeyDown, true)
  }, [goToPrevious, goToNext])

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  }

  return (
    <DialogContent
      showCloseButton={false}
      className="border-white/10 bg-black/80 p-0 backdrop-blur-xl sm:max-w-6xl"
    >
      <DialogTitle className="sr-only">{title ?? 'Image preview'}</DialogTitle>

      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 cursor-pointer text-white/70 hover:bg-white/10 hover:text-white"
      >
        <X className="size-5" />
        <span className="sr-only">Close</span>
      </Button>

      {/* Main image container */}
      <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-lg">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Preview ${currentIndex + 1} of ${images.length}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 500, damping: 35 },
              opacity: { duration: 0.1 },
            }}
            className="max-h-full max-w-full object-contain"
          />
        </AnimatePresence>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              className="absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer border border-white/10 bg-black/40 text-white/70 backdrop-blur-sm hover:bg-black/60 hover:text-white"
            >
              <ChevronLeft className="size-6" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer border border-white/10 bg-black/40 text-white/70 backdrop-blur-sm hover:bg-black/60 hover:text-white"
            >
              <ChevronRight className="size-6" />
              <span className="sr-only">Next image</span>
            </Button>
          </>
        )}
      </div>

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 pb-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              aria-label={`Go to image ${index + 1}`}
              className={cn(
                'size-2 cursor-pointer rounded-full transition-all',
                index === currentIndex
                  ? 'pointer-events-none w-4 bg-white'
                  : 'bg-white/40 hover:bg-white/60'
              )}
            />
          ))}
        </div>
      )}
    </DialogContent>
  )
}

export function ImageLightbox({
  images,
  initialIndex = 0,
  open,
  onOpenChange,
  title,
}: ImageLightboxProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {open && (
        <LightboxContent
          images={images}
          initialIndex={initialIndex}
          onClose={() => onOpenChange(false)}
          title={title}
        />
      )}
    </Dialog>
  )
}
