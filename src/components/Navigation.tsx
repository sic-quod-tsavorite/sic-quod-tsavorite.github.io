import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { NAV_ITEMS } from '@/lib/constants'
import { useScrollSection } from '@/hooks/useScrollSection'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'
import profilePhoto from '@/assets/profile.jpg'

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollTo } = useScrollSection()
  const activeSection = useActiveSection()
  const { theme, toggleTheme } = useTheme()

  const handleClick = (href: string) => {
    const id = href.replace('#', '')
    scrollTo(id)
    setMobileOpen(false)
  }

  return (
    <nav className="bg-background/80 fixed top-0 z-50 w-full border-b border-black/10 backdrop-blur-lg dark:border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button
          onClick={() => scrollTo('hero')}
          className="group/logo flex cursor-pointer items-center text-lg font-bold tracking-tight"
        >
          <AnimatePresence>
            {activeSection !== 'hero' && (
              <motion.div
                className="overflow-hidden"
                initial={{ width: 0, marginRight: 0, opacity: 0 }}
                animate={{ width: 32, marginRight: 12, opacity: 1 }}
                exit={{ width: 0, marginRight: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              >
                <motion.img
                  src={profilePhoto}
                  alt="Martin"
                  className="ring-primary/30 h-8 w-8 rounded-full object-cover ring-2"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <span className="from-primary via-secondary to-primary bg-linear-to-r bg-size-[200%_auto] bg-clip-text text-transparent transition-[background-position] duration-300 group-hover/logo:bg-position-[100%_center]">
            Martin
          </span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden gap-8 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.replace('#', '')
            return (
              <li key={item.href} className="relative">
                <button
                  onClick={() => handleClick(item.href)}
                  className={cn(
                    'cursor-pointer text-sm font-medium transition-colors',
                    isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {item.label}
                </button>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="from-primary to-secondary absolute right-0 -bottom-4.5 left-0 h-0.5 bg-linear-to-r"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/5"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === 'dark' ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: 90, scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: -90, scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Mobile toggle */}
          <button
            className="cursor-pointer md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-background/95 overflow-hidden border-t border-black/10 backdrop-blur-lg md:hidden dark:border-white/10"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace('#', '')
              return (
                <li key={item.href}>
                  <button
                    onClick={() => handleClick(item.href)}
                    className={cn(
                      'block w-full cursor-pointer px-6 py-3 text-left text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5',
                      isActive
                        ? 'border-primary text-foreground border-l-2'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  )
}
