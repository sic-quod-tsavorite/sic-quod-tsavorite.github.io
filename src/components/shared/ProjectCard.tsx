import { useCallback, useRef, useState } from 'react'
import { type Variants, motion } from 'framer-motion'
import { ExternalLink, Github, Image } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ImageLightbox } from '@/components/shared/ImageLightbox'
import type { Project } from '@/lib/projects-data'

interface ProjectCardProps {
  project: Project
  variants?: Variants
}

export function ProjectCard({ project, variants }: ProjectCardProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const preloadedRef = useRef(false)

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
        className="group relative h-full overflow-hidden rounded-2xl border border-black/10 bg-black/5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-black/20 hover:bg-black/10 hover:shadow-2xl dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10"
      >
        {/* Gradient top accent */}
        <div className="from-primary via-secondary to-primary h-1 w-full bg-linear-to-r bg-size-[200%_auto] transition-[background-position] duration-300 group-hover:bg-position-[100%_center]" />

        <div className="flex h-[calc(100%-4px)] flex-col p-6">
          <h3 className="mb-2 text-lg font-semibold">{project.title}</h3>
          <p className="text-muted-foreground mb-4 flex-grow text-sm leading-relaxed">
            {project.description}
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
            {project.github?.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-1.5 transition-colors"
                aria-label={`${project.title} ${link.label}`}
              >
                <Github size={16} />
                <span className="text-xs">{link.label}</span>
              </a>
            ))}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-1.5 transition-colors"
                aria-label={`${project.title} live demo`}
              >
                <ExternalLink size={16} />
                <span className="text-xs">Live</span>
              </a>
            )}
            {project.previewImages && project.previewImages.length > 0 && (
              <Button
                variant="ghost"
                size="xs"
                onClick={() => setLightboxOpen(true)}
                className="text-muted-foreground hover:text-foreground ml-auto gap-1.5 px-2"
              >
                <Image size={14} />
                <span className="text-xs">Preview ({project.previewImages.length})</span>
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
          title={`${project.title} previews`}
        />
      )}
    </>
  )
}
