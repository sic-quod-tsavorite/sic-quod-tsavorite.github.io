import { motion } from 'framer-motion'
import { Code2, Gamepad2, Shield } from 'lucide-react'
import { SectionWrapper } from '@/components/shared/SectionWrapper'
import { slideFromLeft, slideFromRight } from '@/lib/variants'
import { GlassCard } from '@/components/shared/GlassCard'

const highlights = [
  {
    icon: Code2,
    title: 'Full-Stack',
    description: 'Building complete applications from frontend to backend and databases.',
  },
  {
    icon: Gamepad2,
    title: 'Creative Tech',
    description: 'From 3D web visualization with Three.js to game development in Unity.',
  },
  {
    icon: Shield,
    title: 'Security Minded',
    description: 'Understanding vulnerabilities like XSS and SQL injection to write safer code.',
  },
]

export function About() {
  return (
    <SectionWrapper id="about" title="About Me" subtitle="A bit about who I am and what I do.">
      <div className="grid gap-8 md:grid-cols-2">
        <motion.div variants={slideFromLeft} className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            I'm Martin, a Full-Stack Developer who loves turning ideas into polished, performant web
            apps. Whether it's crafting a responsive frontend or wiring up an API, I care about the
            details at every layer of the stack.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Outside of web development I dabble in game dev with Unity, experiment with 3D on the
            web, and dig into security topics like OSINT and penetration testing. I'm always picking
            up something new.
          </p>
        </motion.div>

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          className="grid gap-4"
        >
          {highlights.map((item) => (
            <motion.div key={item.title} variants={slideFromRight}>
              <GlassCard className="flex items-start gap-4 p-4">
                <div className="bg-primary/10 text-primary rounded-lg p-2">
                  <item.icon size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
