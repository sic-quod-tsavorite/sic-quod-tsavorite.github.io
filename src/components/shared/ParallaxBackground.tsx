import { motion, useScroll, useTransform } from 'framer-motion'

const orbs = [
  { x: '10%', y: '15%', size: 300, color: 'oklch(0.82 0.17 155 / 0.08)', speed: 0.3 },
  { x: '80%', y: '25%', size: 200, color: 'oklch(0.45 0.28 290 / 0.06)', speed: 0.5 },
  { x: '60%', y: '60%', size: 350, color: 'oklch(0.82 0.17 155 / 0.05)', speed: 0.2 },
  { x: '20%', y: '75%', size: 250, color: 'oklch(0.45 0.28 290 / 0.07)', speed: 0.4 },
  { x: '90%', y: '85%', size: 180, color: 'oklch(0.82 0.17 155 / 0.06)', speed: 0.35 },
]

export function ParallaxBackground() {
  const { scrollYProgress } = useScroll()

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {orbs.map((orb, i) => (
        <ParallaxOrb key={i} orb={orb} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  )
}

function ParallaxOrb({
  orb,
  scrollYProgress,
}: {
  orb: (typeof orbs)[number]
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const y = useTransform(scrollYProgress, [0, 1], [0, -200 * orb.speed])

  return (
    <motion.div
      className="absolute rounded-full will-change-transform"
      style={{
        left: orb.x,
        top: orb.y,
        width: orb.size,
        height: orb.size,
        background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
        filter: 'blur(40px)',
        y,
      }}
    />
  )
}
