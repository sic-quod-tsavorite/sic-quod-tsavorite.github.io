export interface GithubLink {
  label: string
  href: string
}

export interface Project {
  id: string
  tags: string[]
  github?: GithubLink[]
  live?: string
  liveLabel?: string
  previewImages?: string[]
  previewLabel?: string
  production?: boolean
}

export const projects: Project[] = [
  {
    id: 'ship3d',
    tags: ['Vue', 'TypeScript', 'Three.js', 'Express', 'MongoDB'],
    github: [
      { label: 'API', href: 'https://github.com/sic-quod-tsavorite/api-ship-3d' },
      { label: 'Front', href: 'https://github.com/sic-quod-tsavorite/ship-3d-site' },
    ],
    live: 'https://sic-quod-tsavorite.github.io/ship-3d-site/',
    liveLabel: 'Demo',
    previewImages: [
      '/assets/projects/ship3d/Screenshot_ship3d_sample1.png',
      '/assets/projects/ship3d/Screenshot_ship3d_sample2.png',
    ],
    previewLabel: '',
    production: true,
  },
  {
    id: 'bryghjaelperen',
    tags: ['React Native', 'Expo', 'TypeScript', 'Zustand'],
    github: [{ label: 'Code', href: 'https://github.com/sic-quod-tsavorite/bryg-hjaelperen' }],
    live: 'https://sic-quod-tsavorite.github.io/bryg-hjaelperen/',
    previewImages: [
      '/assets/projects/bryghjaelperen/1-light-1.jpg',
      '/assets/projects/bryghjaelperen/1-light-2.jpg',
      '/assets/projects/bryghjaelperen/2-dark-1.jpg',
      '/assets/projects/bryghjaelperen/2-dark-2.jpg',
    ],
  },
  {
    id: 'gammelhavn',
    tags: ['WordPress', 'CSS', 'JavaScript'],
    live: 'https://gammelhavn.dk/',
    previewImages: ['/assets/projects/gammelhavn/gammelhavn.png'],
    production: true,
  },
  {
    id: 'opendungeonre',
    tags: ['Unity', 'C#'],
    github: [{ label: 'Code', href: 'https://github.com/sic-quod-tsavorite/OpenDungeonRe' }],
    live: 'https://tsavolite.itch.io/opendungeonre/',
    previewImages: [
      '/assets/projects/vrdungeon/VRD1.png',
      '/assets/projects/vrdungeon/VRD2.png',
      '/assets/projects/vrdungeon/VRD3.png',
      '/assets/projects/vrdungeon/VRD4.png',
      '/assets/projects/vrdungeon/VRD5.png',
      '/assets/projects/vrdungeon/VRD6.png',
    ],
  },
  {
    id: 'babytummel',
    tags: ['WordPress', 'CSS', 'JavaScript'],
    live: 'https://babytummel.dk/',
    previewImages: ['/assets/projects/babytummel/babytummel.png'],
    production: true,
  },
  {
    id: 'cinema',
    tags: ['Laravel', 'Bootstrap', 'PHP', 'MySQL'],
    github: [{ label: 'Code', href: 'https://github.com/sic-quod-tsavorite/project-cinema' }],
    live: 'https://sic-quod-tsavorite.github.io/project-cinema/',
    previewImages: ['/assets/projects/cinema/Screenshot_Cinema.png'],
  },
  {
    id: 'perfekt-gulvservice',
    tags: ['WordPress', 'PHP', 'CSS', 'JavaScript'],
    github: [{ label: 'Code', href: 'https://github.com/sic-quod-tsavorite/PERfekt-Gulvservice' }],
    live: 'https://perfektgulvservice.dk/',
    previewImages: ['/assets/projects/perfekt-gulvservice/Screenshot PERfektGulvservice.png'],
    production: true,
  },
  {
    id: 'heartflow',
    tags: ['WordPress', 'PHP', 'CSS', 'JavaScript'],
    github: [{ label: 'Code', href: 'https://github.com/sic-quod-tsavorite/heartflow-theme' }],
    previewImages: ['/assets/projects/heartflow/Screenshot Heartflow.png'],
    production: true,
  },
  {
    id: 'portfolio',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    github: [
      { label: 'Code', href: 'https://github.com/sic-quod-tsavorite/sic-quod-tsavorite.github.io' },
    ],
  },
]
