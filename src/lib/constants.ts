export const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
] as const

export const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/sic-quod-tsavorite',
    icon: 'Github' as const,
  },
  {
    label: 'tsav.git@pm.me',
    href: 'mailto:tsav.git@pm.me',
    icon: 'Mail' as const,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/martin--sørensen/',
    icon: 'Linkedin' as const,
  },
] as const

export const SECTION_IDS = {
  hero: 'hero',
  about: 'about',
  projects: 'projects',
  skills: 'skills',
  contact: 'contact',
} as const
