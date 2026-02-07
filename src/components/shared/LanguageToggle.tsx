import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/hooks/useLanguage'
import { DanishFlag, UKFlag } from './FlagIcons'

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/5"
      aria-label={
        language === 'en'
          ? 'English - click to switch to Danish'
          : 'Dansk - klik for at skifte til engelsk'
      }
    >
      <AnimatePresence mode="wait" initial={false}>
        {language === 'en' ? (
          <motion.div
            key="uk"
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 90, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <UKFlag size={20} />
          </motion.div>
        ) : (
          <motion.div
            key="danish"
            initial={{ rotate: 90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: -90, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <DanishFlag size={20} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}
