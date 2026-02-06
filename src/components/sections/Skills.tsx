import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/shared/SectionWrapper'
import { scaleIn } from '@/lib/variants'
import { GlassCard } from '@/components/shared/GlassCard'

interface SkillCategory {
  title: string
  skills: string[]
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: [
      'Vue',
      'React',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'Three.js',
      'React Native',
    ],
  },
  {
    title: 'Backend & Data',
    skills: ['Node.js', 'Express', 'PHP', 'C#', 'Python', 'Laravel', 'MongoDB', 'MySQL'],
  },
  {
    title: 'DevOps & Infra',
    skills: [
      'CI/CD',
      'Docker',
      'Linux Servers',
      'Networking',
      'GitHub Actions',
      'Docker Compose',
      'SSH',
    ],
  },
  {
    title: 'Tools & Other',
    skills: ['Git', 'Docker', 'Linux', 'Vite', 'Unity', 'WordPress', 'Expo'],
  },
]

const skillItemVariants = {
  hidden: { x: -10 },
  visible: {
    x: 0,
    transition: { duration: 0.3 },
  },
}

export function Skills() {
  return (
    <SectionWrapper id="skills" title="Skills" subtitle="Technologies and tools I work with.">
      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
      >
        {skillCategories.map((category) => (
          <motion.div key={category.title} variants={scaleIn}>
            <GlassCard className="h-full">
              <h3 className="text-primary mb-4 text-sm font-semibold tracking-widest uppercase">
                {category.title}
              </h3>
              <motion.ul
                className="space-y-2"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
                }}
              >
                {category.skills.map((skill) => (
                  <motion.li
                    key={skill}
                    variants={skillItemVariants}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {skill}
                  </motion.li>
                ))}
              </motion.ul>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
