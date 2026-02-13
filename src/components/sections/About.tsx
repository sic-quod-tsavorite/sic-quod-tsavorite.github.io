import { motion } from 'framer-motion'
import { Code2, Gamepad2, Shield, type LucideIcon } from 'lucide-react'
import { SectionWrapper } from '@/components/shared/SectionWrapper'
import { slideFromLeft, slideFromRight } from '@/lib/variants'
import { GlassCard } from '@/components/shared/GlassCard'
import { useTranslation } from '@/hooks/useLanguage'
import { AnimatedText } from '@/components/shared/AnimatedText'

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
          <p className="text-muted-foreground leading-relaxed">
            <AnimatedText index={2}>{t.about.paragraph1}</AnimatedText>
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <AnimatedText index={3}>{t.about.paragraph2}</AnimatedText>
          </p>
        </motion.div>

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          className="grid gap-4"
        >
          {highlightIcons.map(({ key, icon: Icon }, index) => {
            const highlight = t.about.highlights[key]
            return (
              <motion.div key={key} variants={slideFromRight}>
                <GlassCard className="flex items-start gap-4 p-4">
                  <div className="bg-primary/10 text-primary rounded-lg p-2">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      <AnimatedText index={4 + index}>{highlight.title}</AnimatedText>
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      <AnimatedText index={4 + index + 0.5}>{highlight.description}</AnimatedText>
                    </p>
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
