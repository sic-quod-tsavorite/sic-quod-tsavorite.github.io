import { useCallback, useRef, useState } from 'react'
import { type Variants, motion } from 'framer-motion'
import { ExternalLink, Github, Image } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ImageLightbox } from '@/components/shared/ImageLightbox'
import { useTranslation } from '@/hooks/useLanguage'
import { AnimatedText } from '@/components/shared/AnimatedText'
import type { Project } from '@/lib/projects-data'

interface ProjectCardProps {
  project: Project
  title: string
  description: string
  variants?: Variants
}

const labelKeyMap: Record<string, 'code' | 'api' | 'frontend'> = {
  Code: 'code',
  API: 'api',
  Frontend: 'frontend',
}

export function ProjectCard({ project, title, description, variants }: ProjectCardProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const preloadedRef = useRef(false)
  const t = useTranslation()

  const preloadImages = useCallback(() => {
    if (preloadedRef.current || !project.previewImages?.length) return
    preloadedRef.current = true

    project.previewImages.forEach((src) => {
      const img = new window.Image()
      img.src = src
    })
  }, [project.previewImages])

  return (
    <>
      <motion.div
        variants={variants}
        onMouseEnter={preloadImages}
        className="group relative h-full overflow-hidden rounded-2xl border border-black/10 bg-black/5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-black/20 hover:bg-black/10 hover:shadow-xl dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10"
      >
        {/* Gradient top accent */}
        <div className="from-primary via-secondary to-primary h-1 w-full bg-linear-to-r bg-size-[200%_auto] transition-[background-position] duration-300 group-hover:bg-position-[100%_center]" />

        <div className="flex h-[calc(100%-4px)] flex-col p-6">
          <h3 className="mb-2 text-lg font-semibold">
            <AnimatedText index={0}>{title}</AnimatedText>
          </h3>
          <p className="text-muted-foreground mb-4 grow text-sm leading-relaxed">
            <AnimatedText index={1}>{description}</AnimatedText>
          </p>

          <div className="mb-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-foreground border-black/10 bg-black/5 text-xs dark:border-white/10 dark:bg-white/5"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {project.github?.map((link) => {
              const translatedLabel =
                t.projectCard[labelKeyMap[link.label] as keyof typeof t.projectCard] ?? link.label
              return (
                <Button key={link.label} variant="ghost" size="xs" asChild>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${title} ${translatedLabel}`}
                  >
                    <Github size={16} />
                    <span className="text-xs">{translatedLabel}</span>
                  </a>
                </Button>
              )
            })}
            {project.live && (
              <Button variant="ghost" size="xs" asChild>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${title} ${t.projectCard.live}`}
                >
                  <ExternalLink size={16} />
                  <span className="text-xs">
                    <AnimatedText index={3}>{t.projectCard.live}</AnimatedText>
                  </span>
                </a>
              </Button>
            )}
            {project.previewImages && project.previewImages.length > 0 && (
              <Button
                variant="ghost"
                size="xs"
                onClick={() => setLightboxOpen(true)}
                className="text-muted-foreground hover:text-foreground ml-auto cursor-pointer gap-1.5 px-2"
              >
                <Image size={14} />
                <span className="text-xs">
                  <AnimatedText index={4}>
                    {t.projectCard.preview} ({project.previewImages.length})
                  </AnimatedText>
                </span>
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      {project.previewImages && project.previewImages.length > 0 && (
        <ImageLightbox
          images={project.previewImages}
          open={lightboxOpen}
          onOpenChange={setLightboxOpen}
          title={`${title} previews`}
        />
      )}
    </>
  )
}
