import { useState } from 'react'
import { type Variants, motion } from 'framer-motion'
import { SectionWrapper } from '@/components/shared/SectionWrapper'
import { ProjectCard } from '@/components/shared/ProjectCard'
import { CarouselProgress } from '@/components/shared/CarouselProgress'
import { projects } from '@/lib/projects-data'
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

  return (
    <SectionWrapper id="projects" title="Projects" subtitle="A selection of things I've built.">
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
            {projects.map((project) => (
              <CarouselItem key={project.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="h-full px-1">
                  <ProjectCard project={project} variants={cardVariants} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Custom glassmorphism navigation buttons */}
          <CarouselPrevious className="text-foreground -left-4 hidden border-black/10 bg-black/5 backdrop-blur-xl hover:border-black/20 hover:bg-black/10 md:flex lg:-left-12 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10" />
          <CarouselNext className="text-foreground -right-4 hidden border-black/10 bg-black/5 backdrop-blur-xl hover:border-black/20 hover:bg-black/10 md:flex lg:-right-12 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10" />

          {/* Mobile navigation - bottom buttons */}
          <div className="mt-6 flex justify-center gap-4 md:hidden">
            <CarouselPrevious className="text-foreground static translate-y-0 border-black/10 bg-black/5 backdrop-blur-xl hover:border-black/20 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10" />
            <CarouselNext className="text-foreground static translate-y-0 border-black/10 bg-black/5 backdrop-blur-xl hover:border-black/20 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10" />
          </div>
        </Carousel>

        {/* Progress indicator */}
        <CarouselProgress api={api} className="mx-auto mt-2 max-w-xs" />
      </motion.div>
    </SectionWrapper>
  )
}
