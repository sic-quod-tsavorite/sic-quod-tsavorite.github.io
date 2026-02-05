import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { SectionWrapper } from '@/components/shared/SectionWrapper'
import { scaleIn } from '@/lib/variants'
import { GlassCard } from '@/components/shared/GlassCard'
import { SOCIAL_LINKS } from '@/lib/constants'

const iconMap = { Github, Mail, Linkedin } as const

export function Contact() {
  return (
    <SectionWrapper
      id="contact"
      title="Get in Touch"
      subtitle="Have a question or want to work together? Reach out through any of these channels."
    >
      <motion.div
        className="flex flex-wrap items-center justify-center gap-4"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {SOCIAL_LINKS.map((link) => {
          const Icon = iconMap[link.icon]
          return (
            <motion.div key={link.label} variants={scaleIn}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                <GlassCard className="flex cursor-pointer items-center gap-3 px-6 py-4">
                  <Icon size={20} className="text-primary" />
                  <span className="text-sm font-medium">{link.label}</span>
                </GlassCard>
              </a>
            </motion.div>
          )
        })}
      </motion.div>
    </SectionWrapper>
  )
}
