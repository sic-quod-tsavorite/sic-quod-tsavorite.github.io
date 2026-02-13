import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/shared/SectionWrapper'
import { scaleIn } from '@/lib/variants'
import { GlassCard } from '@/components/shared/GlassCard'
import { useTranslation } from '@/hooks/useLanguage'
import { AnimatedText } from '@/components/shared/AnimatedText'

interface SkillCategory {
  key: 'frontend' | 'backendData' | 'devopsInfra' | 'toolsOther'
  skills: string[]
}

const skillCategories: SkillCategory[] = [
  {
    key: 'frontend',
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
    key: 'backendData',
    skills: ['Node.js', 'Express', 'PHP', 'C#', 'Python', 'Laravel', 'MongoDB', 'MySQL'],
  },
  {
    key: 'devopsInfra',
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
    key: 'toolsOther',
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
  const t = useTranslation()

  return (
    <SectionWrapper id="skills" title={t.skills.title} subtitle={t.skills.subtitle}>
      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
      >
        {skillCategories.map((category) => (
          <motion.div key={category.key} variants={scaleIn}>
            <GlassCard className="h-full">
              <h3 className="text-primary mb-4 text-sm font-semibold tracking-widest uppercase">
                <AnimatedText index={2}>{t.skills.categories[category.key]}</AnimatedText>
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
