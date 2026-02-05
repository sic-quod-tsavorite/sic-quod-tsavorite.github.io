import { Github, Linkedin, Mail } from 'lucide-react'
import { Navigation } from '@/components/Navigation'
import { ParallaxBackground } from '@/components/shared/ParallaxBackground'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { Contact } from '@/components/sections/Contact'
import { SOCIAL_LINKS } from '@/lib/constants'

const iconMap = { Github, Mail, Linkedin } as const

function App() {
  return (
    <>
      <ParallaxBackground />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="border-t border-black/10 py-8 dark:border-white/10">
        <div className="flex items-center justify-center gap-6">
          {SOCIAL_LINKS.map((link) => {
            const Icon = iconMap[link.icon]
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={link.label}
              >
                <Icon size={20} />
              </a>
            )
          })}
        </div>
      </footer>
    </>
  )
}

export default App
