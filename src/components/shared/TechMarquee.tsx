interface TechLogo {
  name: string
  icon: string // Simple Icons slug or 'cachyos' for custom
  color?: string // Brand color (optional)
  customUrl?: string // Custom icon URL
}

// Tech stack based on Skills section + CachyOS
const techLogos: TechLogo[] = [
  // Frontend
  { name: 'Vue.js', icon: 'vuedotjs', color: '#4FC08D' },
  { name: 'React', icon: 'react', color: '#61DAFB' },
  { name: 'TypeScript', icon: 'typescript', color: '#3178C6' },
  { name: 'JavaScript', icon: 'javascript', color: '#F7DF1E' },
  { name: 'Tailwind CSS', icon: 'tailwindcss', color: '#06B6D4' },
  { name: 'Three.js', icon: 'threedotjs' },
  { name: 'React Native', icon: 'react', color: '#61DAFB' },
  // Backend & Data
  { name: 'Node.js', icon: 'nodedotjs', color: '#339933' },
  { name: 'Express', icon: 'express' },
  { name: 'PHP', icon: 'php', color: '#777BB4' },
  {
    name: 'C#',
    icon: 'csharp',
    customUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
  },
  { name: 'Python', icon: 'python', color: '#3776AB' },
  { name: 'Laravel', icon: 'laravel', color: '#FF2D20' },
  { name: 'MongoDB', icon: 'mongodb', color: '#47A248' },
  { name: 'MySQL', icon: 'mysql', color: '#4479A1' },
  // DevOps & Infra
  { name: 'Docker', icon: 'docker', color: '#2496ED' },
  { name: 'Linux', icon: 'linux' },
  { name: 'GitHub Actions', icon: 'githubactions', color: '#2088FF' },
  // Tools
  { name: 'Git', icon: 'git', color: '#F05032' },
  { name: 'Vite', icon: 'vite', color: '#646CFF' },
  { name: 'Unity', icon: 'unity', color: '#222222' },
  { name: 'WordPress', icon: 'wordpress', color: '#21759B' },
  { name: 'Expo', icon: 'expo', color: '#222222' },
  { name: 'Bun', icon: 'bun', color: '#222222' },
  // OS
  {
    name: 'CachyOS',
    icon: 'cachyos',
    customUrl: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/cachyos-linux.svg',
  },
]

// Simple Icons CDN base URL
const SIMPLE_ICONS_CDN = 'https://cdn.simpleicons.org'

function TechIcon({ logo }: { logo: TechLogo }) {
  const iconUrl = logo.customUrl
    ? logo.customUrl
    : `${SIMPLE_ICONS_CDN}/${logo.icon}${logo.color ? `/${logo.color.replace('#', '')}` : ''}`

  return (
    <img
      src={iconUrl}
      alt={logo.name}
      className="h-6 w-6 dark:brightness-0 dark:invert"
      loading="lazy"
    />
  )
}

function LogoItem({ logo }: { logo: TechLogo }) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-2">
      <TechIcon logo={logo} />
      <span className="text-muted-foreground text-xs font-medium">{logo.name}</span>
    </div>
  )
}

function LogoTrack() {
  return (
    <div className="flex shrink-0 gap-12 pr-12">
      {techLogos.map((logo) => (
        <LogoItem key={logo.name} logo={logo} />
      ))}
    </div>
  )
}

export function TechMarquee() {
  return (
    <div className="relative w-full overflow-hidden py-24">
      {/* Gradient masks for fade effect */}
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r to-transparent" />
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l to-transparent" />

      {/* Scrolling container with CSS animation */}
      <div className="animate-marquee pointer-events-none flex w-max">
        <LogoTrack />
        <LogoTrack />
      </div>
    </div>
  )
}
