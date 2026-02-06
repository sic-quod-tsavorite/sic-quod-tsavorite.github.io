export interface GithubLink {
  label: string
  href: string
}

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  github?: GithubLink[]
  live?: string
  previewImages?: string[]
}

export const projects: Project[] = [
  {
    id: 'ship3d',
    title: 'Ship 3D',
    description:
      'Full-stack web app for browsing and managing maritime vessels with interactive 3D visualization. Vue 3 frontend with Three.js rendering, Express REST API with JWT auth and 3D model upload validation.',
    tags: ['Vue', 'TypeScript', 'Three.js', 'Express', 'MongoDB'],
    github: [
      { label: 'API', href: 'https://github.com/sic-quod-tsavorite/api-ship-3d' },
      { label: 'Frontend', href: 'https://github.com/sic-quod-tsavorite/ship-3d-site' },
    ],
    previewImages: [
      '/assets/projects/ship3d/Screenshot_ship3d_sample1.png',
      '/assets/projects/ship3d/Screenshot_ship3d_sample2.png',
    ],
  },
  {
    id: 'bryghjaelperen',
    title: 'Bryg Hjælperen',
    description:
      'A cross-platform brewing helper app built with React Native and Expo. Features document handling, image picking, and PDF export with Zustand state management.',
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
    id: 'portfolio',
    title: 'Portfolio',
    description:
      'This single-page portfolio site featuring glassmorphism design, scroll-linked parallax effects, and Framer Motion animations.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    github: [
      { label: 'Code', href: 'https://github.com/sic-quod-tsavorite/sic-quod-tsavorite.github.io' },
    ],
  },
  {
    id: 'cinema',
    title: 'Project Cinema',
    description:
      'A cinema booking website built as a school project. Features movie listings and seat selection with a Bootstrap frontend. The live demo is a static Laravel rebuild without the original MySQL backend.',
    tags: ['Laravel', 'Bootstrap', 'PHP', 'MySQL'],
    github: [{ label: 'Code', href: 'https://github.com/sic-quod-tsavorite/project-cinema' }],
    live: 'https://sic-quod-tsavorite.github.io/project-cinema/',
    previewImages: ['/assets/projects/cinema/Screenshot_Cinema.png'],
  },
  {
    id: 'vrdungeon',
    title: 'VRDungeon',
    description:
      'A VR dungeon crawler built with Unity for a school project. Navigate procedural dungeons and battle monsters using immersive hand-tracking controls.',
    tags: ['Unity', 'C#', 'VR', 'Oculus'],
    github: [{ label: 'Code', href: 'https://github.com/sic-quod-tsavorite/VRDungeon' }],
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
    id: 'perfekt-gulvservice',
    title: 'PERfekt Gulvservice',
    description:
      'A professional business website for a flooring service company. Custom WordPress theme with service showcase and responsive design.',
    tags: ['WordPress', 'PHP', 'CSS', 'JavaScript'],
    live: 'https://perfektgulvservice.dk/',
    previewImages: ['/assets/projects/perfekt-gulvservice/Screenshot PERfektGulvservice.png'],
  },
  {
    id: 'heartflow',
    title: 'Heartflow Foreningen',
    description:
      'A WordPress theme for a non-profit heart health association. Features event listings, member resources, and donation integration.',
    tags: ['WordPress', 'PHP', 'CSS', 'JavaScript'],
    live: 'https://heartflow.dk/',
    previewImages: ['/assets/projects/heartflow/Screenshot Heartflow.png'],
  },
]
