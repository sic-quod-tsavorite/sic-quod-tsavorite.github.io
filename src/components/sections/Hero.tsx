import { useEffect } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useScrollSection } from '@/hooks/useScrollSection'
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

  useEffect(() => {
    controls.set('hidden')
    controls.start('visible')
  }, [controls])

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* Background mesh gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            'radial-gradient(at 40% 20%, oklch(0.82 0.17 155 / 0.15) 0px, transparent 50%)',
            'radial-gradient(at 80% 80%, oklch(0.45 0.28 290 / 0.1) 0px, transparent 50%)',
          ].join(', '),
        }}
      />

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
          Welcome to my portfolio
        </motion.p>

        <motion.h1
          custom={2}
          variants={slideUp}
          initial="hidden"
          animate={controls}
          className="mb-6 text-5xl leading-tight font-bold md:text-7xl"
        >
          Hi, I'm{' '}
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
          Full-Stack Developer. I like building things, breaking things, and figuring out how
          everything in between works.
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
            View Projects
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="cursor-pointer border-black/20 bg-black/5 backdrop-blur-sm hover:bg-black/10 dark:border-white/20 dark:bg-white/5 dark:hover:bg-white/10"
          >
            <a href="mailto:tsav.git@pm.me">Get in Touch</a>
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
