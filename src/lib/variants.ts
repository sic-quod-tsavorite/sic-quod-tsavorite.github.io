import type { Variants } from 'framer-motion'

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

export const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

export const revealVariants: Variants = {
  hidden: { y: 40 },
  visible: {
    y: 0,
    transition: { duration: 0.7, ease },
  },
}

export const slideFromLeft: Variants = {
  hidden: { x: -60 },
  visible: {
    x: 0,
    transition: { duration: 0.7, ease },
  },
}

export const slideFromRight: Variants = {
  hidden: { x: 60 },
  visible: {
    x: 0,
    transition: { duration: 0.7, ease },
  },
}

export const scaleIn: Variants = {
  hidden: { scale: 0.85 },
  visible: {
    scale: 1,
    transition: { duration: 0.6, ease },
  },
}
