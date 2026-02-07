import { useEffect, useState } from 'react'
import { type Variants, motion } from 'framer-motion'
import { SectionWrapper } from '@/components/shared/SectionWrapper'
import { ProjectCard } from '@/components/shared/ProjectCard'
import { CarouselProgress } from '@/components/shared/CarouselProgress'
import { projects } from '@/lib/projects-data'
import { useTranslation } from '@/hooks/useLanguage'
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const cardVariants: Variants = {
  hidden: { y: 60 },
  visible: {
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
}

export function Projects() {
  const [api, setApi] = useState<CarouselApi>()
  const [visibleSlides, setVisibleSlides] = useState(3)
  const t = useTranslation()

  // Update visibleSlides based on screen size to match carousel basis classes
  useEffect(() => {
    const updateVisibleSlides = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        setVisibleSlides(3) // lg: basis-1/3
      } else if (window.matchMedia('(min-width: 768px)').matches) {
        setVisibleSlides(2) // md: basis-1/2
      } else {
        setVisibleSlides(1) // mobile: full width
      }
    }

    updateVisibleSlides()
    window.addEventListener('resize', updateVisibleSlides)
    return () => window.removeEventListener('resize', updateVisibleSlides)
  }, [])

  return (
    <SectionWrapper id="projects" title={t.projects.title} subtitle={t.projects.subtitle}>
      <motion.div
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        className="relative"
      >
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent className="-ml-4 py-4">
            {projects.map((project) => {
              const projectTranslation = t.projects.items[project.id]
              return (
                <CarouselItem key={project.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="h-full px-1">
                    <ProjectCard
                      project={project}
                      title={projectTranslation?.title ?? project.id}
                      description={projectTranslation?.description ?? ''}
                      variants={cardVariants}
                    />
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>

          {/* Desktop navigation buttons */}
          <CarouselPrevious className="text-foreground -left-4 hidden border-black/10 bg-black/5 backdrop-blur-xl hover:border-black/20 hover:bg-black/10 md:flex lg:-left-12 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10" />
          <CarouselNext className="text-foreground -right-4 hidden border-black/10 bg-black/5 backdrop-blur-xl hover:border-black/20 hover:bg-black/10 md:flex lg:-right-12 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10" />

          {/* Progress indicator */}
          <CarouselProgress
            api={api}
            visibleSlides={visibleSlides}
            className="mx-auto mt-6 max-w-xs md:mt-2"
          />

          {/* Mobile navigation - below progress bar */}
          <div className="mt-4 flex justify-center gap-4 md:hidden">
            <CarouselPrevious className="text-foreground static translate-y-0 border-black/10 bg-black/5 backdrop-blur-xl hover:border-black/20 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10" />
            <CarouselNext className="text-foreground static translate-y-0 border-black/10 bg-black/5 backdrop-blur-xl hover:border-black/20 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10" />
          </div>
        </Carousel>
      </motion.div>
    </SectionWrapper>
  )
}
