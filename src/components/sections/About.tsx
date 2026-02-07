import { motion } from 'framer-motion'
import { Code2, Gamepad2, Shield, type LucideIcon } from 'lucide-react'
import { SectionWrapper } from '@/components/shared/SectionWrapper'
import { slideFromLeft, slideFromRight } from '@/lib/variants'
import { GlassCard } from '@/components/shared/GlassCard'
import { useTranslation } from '@/hooks/useLanguage'

const highlightIcons: { key: 'fullStack' | 'creativeTech' | 'securityMinded'; icon: LucideIcon }[] =
  [
    { key: 'fullStack', icon: Code2 },
    { key: 'creativeTech', icon: Gamepad2 },
    { key: 'securityMinded', icon: Shield },
  ]

export function About() {
  const t = useTranslation()

  return (
    <SectionWrapper id="about" title={t.about.title} subtitle={t.about.subtitle}>
      <div className="grid gap-8 md:grid-cols-2">
        <motion.div variants={slideFromLeft} className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">{t.about.paragraph1}</p>
          <p className="text-muted-foreground leading-relaxed">{t.about.paragraph2}</p>
        </motion.div>

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          className="grid gap-4"
        >
          {highlightIcons.map(({ key, icon: Icon }) => {
            const highlight = t.about.highlights[key]
            return (
              <motion.div key={key} variants={slideFromRight}>
                <GlassCard className="flex items-start gap-4 p-4">
                  <div className="bg-primary/10 text-primary rounded-lg p-2">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{highlight.title}</h3>
                    <p className="text-muted-foreground text-sm">{highlight.description}</p>
                  </div>
                </GlassCard>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
