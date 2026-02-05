import { type Variants, motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { SectionWrapper } from '@/components/shared/SectionWrapper'

interface GithubLink {
  label: string
  href: string
}

interface Project {
  title: string
  description: string
  tags: string[]
  github?: GithubLink[]
  live?: string
}

const projects: Project[] = [
  {
    title: 'Ship 3D',
    description:
      'Full-stack web app for browsing and managing maritime vessels with interactive 3D visualization. Vue 3 frontend with Three.js rendering, Express REST API with JWT auth and 3D model upload validation.',
    tags: ['Vue', 'TypeScript', 'Three.js', 'Node.js', 'MongoDB'],
    github: [
      { label: 'API', href: 'https://github.com/sic-quod-tsavorite/api-ship-3d' },
      { label: 'Frontend', href: 'https://github.com/sic-quod-tsavorite/ship-3d-site' },
    ],
  },
  {
    title: 'Bryg Hj\u00e6lperen',
    description:
      'A cross-platform brewing helper app built with React Native and Expo. Features document handling, image picking, and PDF export with Zustand state management.',
    tags: ['React Native', 'Expo', 'TypeScript', 'Zustand'],
    github: [{ label: 'Code', href: 'https://github.com/sic-quod-tsavorite/bryg-hjaelperen' }],
    live: 'https://sic-quod-tsavorite.github.io/bryg-hjaelperen/',
  },
  {
    title: 'Portfolio',
    description:
      'This single-page portfolio site featuring glassmorphism design, scroll-linked parallax effects, and Framer Motion animations.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    github: [
      { label: 'Code', href: 'https://github.com/sic-quod-tsavorite/sic-quod-tsavorite.github.io' },
    ],
    live: 'https://sic-quod-tsavorite.github.io/',
  },
]

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
}

export function Projects() {
  return (
    <SectionWrapper id="projects" title="Projects" subtitle="A selection of things I've built.">
      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
      >
        {projects.map((project) => (
          <motion.div
            key={project.title}
            variants={cardVariants}
            className="group relative overflow-hidden rounded-2xl border border-black/10 bg-black/5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:border-black/20 hover:bg-black/10 hover:shadow-2xl dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10"
          >
            {/* Gradient top accent */}
            <div className="from-primary via-secondary to-primary h-1 w-full bg-linear-to-r bg-size-[200%_auto] transition-[background-position] duration-300 group-hover:bg-position-[100%_center]" />

            <div className="p-6">
              <h3 className="mb-2 text-lg font-semibold">{project.title}</h3>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
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
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
