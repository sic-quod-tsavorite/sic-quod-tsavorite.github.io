import { useEffect } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useScrollSection } from '@/hooks/useScrollSection'
import { useTranslation } from '@/hooks/useLanguage'
import profilePhoto from '@/assets/profile.jpg'

const slideUp = {
  hidden: { y: 40 },
  visible: (i: number) => ({
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: 'easeOut' as const },
  }),
}

export function Hero() {
  const { scrollTo } = useScrollSection()
  const controls = useAnimationControls()
  const t = useTranslation()

  useEffect(() => {
    controls.set('hidden')
    controls.start('visible')
  }, [controls])

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* Animated background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large green orb - top left */}
        <motion.div
          className="absolute h-175 w-175 rounded-full blur-[120px]"
          style={{
            background: 'oklch(0.82 0.17 155 / 0.12)',
            left: '-5%',
            top: '-10%',
          }}
          animate={{
            x: [0, 60, -40, 20, 0],
            y: [0, -40, 30, -20, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Purple orb - bottom right */}
        <motion.div
          className="absolute h-150 w-150 rounded-full blur-[100px]"
          style={{
            background: 'oklch(0.45 0.28 290 / 0.08)',
            right: '-10%',
            bottom: '-5%',
          }}
          animate={{
            x: [0, -50, 35, -25, 0],
            y: [0, 45, -35, 20, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Small accent orb - center right */}
        <motion.div
          className="absolute h-100 w-100 rounded-full blur-[80px]"
          style={{
            background: 'oklch(0.7 0.15 200 / 0.08)',
            right: '15%',
            top: '20%',
          }}
          animate={{
            x: [0, -35, 45, -20, 0],
            y: [0, 50, -30, 40, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Subtle warm orb - bottom left */}
        <motion.div
          className="absolute h-125 w-125 rounded-full blur-[100px]"
          style={{
            background: 'oklch(0.75 0.12 80 / 0.06)',
            left: '10%',
            bottom: '5%',
          }}
          animate={{
            x: [0, 40, -30, 50, 0],
            y: [0, -35, 25, -45, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          custom={0}
          variants={slideUp}
          initial="hidden"
          animate={controls}
          className="mb-6 flex justify-center"
        >
          <img
            src={profilePhoto}
            alt="Martin"
            className="ring-primary/30 h-28 w-28 rounded-full object-cover ring-4 md:h-36 md:w-36"
          />
        </motion.div>

        <motion.p
          custom={1}
          variants={slideUp}
          initial="hidden"
          animate={controls}
          className="text-primary mb-4 text-sm font-medium tracking-widest uppercase"
        >
          {t.hero.welcome}
        </motion.p>

        <motion.h1
          custom={2}
          variants={slideUp}
          initial="hidden"
          animate={controls}
          className="mb-6 text-5xl leading-tight font-bold md:text-7xl"
        >
          {t.hero.heading}{' '}
          <span className="from-primary to-secondary bg-linear-to-r bg-clip-text text-transparent">
            Martin
          </span>
        </motion.h1>

        <motion.p
          custom={3}
          variants={slideUp}
          initial="hidden"
          animate={controls}
          className="text-muted-foreground mx-auto mb-10 max-w-2xl text-lg md:text-xl"
        >
          {t.hero.tagline}
        </motion.p>

        <motion.div
          custom={4}
          variants={slideUp}
          initial="hidden"
          animate={controls}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            size="lg"
            onClick={() => scrollTo('projects')}
            className="from-primary via-secondary to-primary text-primary-foreground hover:shadow-primary/25 cursor-pointer bg-linear-to-r bg-size-[200%_auto] transition-[background-position,box-shadow] duration-300 hover:bg-position-[100%_center] hover:shadow-lg"
          >
            {t.hero.viewProjects}
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="cursor-pointer border-black/20 bg-black/5 backdrop-blur-sm hover:bg-black/10 dark:border-white/20 dark:bg-white/5 dark:hover:bg-white/10"
          >
            <a href="mailto:tsav.git@pm.me">{t.hero.getInTouch}</a>
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo('about')}
        className="text-muted-foreground absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Scroll down"
      >
        <ArrowDown size={24} />
      </motion.button>
    </section>
  )
}
