import type { Language, Translations } from './types'

const en: Translations = {
  projectCard: {
    code: 'Code',
    api: 'API',
    frontend: 'Frontend',
    live: 'Live',
    preview: 'Preview',
  },
  nav: {
    about: 'About',
    projects: 'Projects',
    skills: 'Skills',
    contact: 'Contact',
  },
  hero: {
    welcome: 'Welcome to my portfolio',
    heading: "Hi, I'm",
    tagline:
      'Full-Stack Developer. I like building things, breaking things, and figuring out how everything in between works.',
    viewProjects: 'View Projects',
    getInTouch: 'Get in Touch',
  },
  about: {
    title: 'About Me',
    subtitle: 'A bit about who I am and what I do.',
    paragraph1:
      "I'm Martin, a Full-Stack Developer who loves turning ideas into polished, performant web apps. Whether it's crafting a responsive frontend or wiring up an API, I care about the details at every layer of the stack.",
    paragraph2:
      "Outside of web development I dabble in game dev with Unity, experiment with 3D on the web, and dig into security topics like OSINT and penetration testing. I'm always picking up something new.",
    highlights: {
      fullStack: {
        title: 'Full-Stack',
        description: 'Building complete applications from frontend to backend and databases.',
      },
      creativeTech: {
        title: 'Creative Tech',
        description: 'From 3D web visualization with Three.js to game development in Unity.',
      },
      securityMinded: {
        title: 'Security Minded',
        description:
          'Understanding vulnerabilities like XSS and SQL injection to write safer code.',
      },
    },
  },
  projects: {
    title: 'Projects',
    subtitle: 'A selection of things I have built.',
    items: {
      ship3d: {
        title: '3D Maritime Web Application',
        description:
          'Full-stack web app for browsing and managing maritime vessels with interactive 3D visualization. Vue 3 frontend with Three.js rendering, Express REST API with JWT auth and 3D model upload validation.',
      },
      bryghjaelperen: {
        title: 'Bryg Hjælperen',
        description:
          'A cross-platform brewing helper app built with React Native and Expo. Features document handling, image picking, and PDF export with Zustand state management.',
      },
      portfolio: {
        title: 'Portfolio',
        description:
          'This single-page portfolio site featuring glassmorphism design, scroll-linked parallax effects, and Framer Motion animations.',
      },
      cinema: {
        title: 'Project Cinema',
        description:
          'A cinema booking website built as a school project. Features movie listings and seat selection with a Bootstrap frontend. The live demo is a static Laravel rebuild without the original MySQL backend.',
      },
      vrdungeon: {
        title: 'VRDungeon',
        description:
          'A VR dungeon crawler built with Unity for a school project. Navigate procedural dungeons and battle monsters using immersive hand-tracking controls.',
      },
      'perfekt-gulvservice': {
        title: 'PERfekt Gulvservice',
        description:
          'A professional business website for a flooring service company. Custom WordPress theme with service showcase and responsive design.',
      },
      heartflow: {
        title: 'Heartflow Foreningen',
        description:
          'A WordPress theme for a non-profit heart health association. Features event listings, member resources, and donation integration.',
      },
    },
  },
  skills: {
    title: 'Skills',
    subtitle: 'Technologies and tools I work with.',
    categories: {
      frontend: 'Frontend',
      backendData: 'Backend & Data',
      devopsInfra: 'DevOps & Infra',
      toolsOther: 'Tools & Other',
    },
  },
  contact: {
    title: 'Get in Touch',
    subtitle: 'Have a question or want to work together? Reach out through any of these channels.',
  },
}

const da: Translations = {
  projectCard: {
    code: 'Kode',
    api: 'API',
    frontend: 'Frontend',
    live: 'Live',
    preview: 'Billedvisning',
  },
  nav: {
    about: 'Om Mig',
    projects: 'Projekter',
    skills: 'Kompetencer',
    contact: 'Kontakt',
  },
  hero: {
    welcome: 'Velkommen til min portfolio',
    heading: 'Hej, jeg er',
    tagline:
      'Full-Stack Udvikler. Jeg kan godt lide at bygge ting, skille ting ad og finde ud af, hvordan tingene fungerer.',
    viewProjects: 'Se Projekter',
    getInTouch: 'Kontakt Mig',
  },
  about: {
    title: 'Om Mig',
    subtitle: 'Lidt om hvem jeg er og hvad jeg laver.',
    paragraph1:
      'Jeg hedder Martin og jeg er en Full-Stack Udviklerder elsker at omdanne idéer til veludviklede, effektive webapps. Uanset om det drejer sig om at skabe et responsivt frontend eller forbinde en API, lægger jeg vægt på detaljerne i alle lag af stakken.',
    paragraph2:
      'Udover webudvikling roder jeg med spiludvikling i Unity, eksperimenterer med 3D på nettet, og dykker ned i sikkerhedsemner som OSINT og penetrationstest. Jeg lærer altid noget nyt.',
    highlights: {
      fullStack: {
        title: 'Full-Stack',
        description: 'Bygger komplette applikationer fra frontend til backend og databaser.',
      },
      creativeTech: {
        title: 'Kreativ Tech',
        description: 'Fra 3D webvisualisering med Three.js til spiludvikling i Unity.',
      },
      securityMinded: {
        title: 'Sikkerhedsfokuseret',
        description: 'Forstår sårbarheder som XSS og SQL injection for at skrive sikrere kode.',
      },
    },
  },
  projects: {
    title: 'Projekter',
    subtitle: 'Et udvalg af ting jeg har bygget.',
    items: {
      ship3d: {
        title: '3D Maritim Webapplikation',
        description:
          'Full-stack webapplikation til at browse og administrere maritime fartøjer med interaktiv 3D visualisering. Vue 3 frontend med Three.js rendering, Express REST API med JWT auth og 3D model upload validering.',
      },
      bryghjaelperen: {
        title: 'Bryg Hjælperen',
        description:
          'En cross-platform brygge-hjælper app bygget med React Native og Expo. Indeholder dokumenthåndtering, billedvalg og PDF eksport med Zustand state management.',
      },
      portfolio: {
        title: 'Portfolio',
        description:
          'Denne single-page portfolio side med glassmorphism design, scroll-linked parallax effekter og Framer Motion animationer.',
      },
      cinema: {
        title: 'Project Cinema',
        description:
          'En biograf booking hjemmeside bygget som et skoleprojekt. Indeholder filmoversigt og sædevalg med en Bootstrap frontend. Live demoen er en statisk Laravel rebuild uden den originale MySQL backend.',
      },
      vrdungeon: {
        title: 'VRDungeon',
        description:
          'Et VR-dungeon crawler spil udviklet med Unity til et skoleprojekt. Naviger gennem dungeons og bekæmp monstre ved hjælp af intuitive håndsporingskontroller.',
      },
      'perfekt-gulvservice': {
        title: 'PERfekt Gulvservice',
        description:
          'En professionel virksomhedshjemmeside for et gulvservice firma. Tilpasset WordPress-tema med servicepræsentation og responsivt design.',
      },
      heartflow: {
        title: 'Heartflow Foreningen',
        description:
          'Et WordPress tema til en nonprofit hjertehelbredsforening. Indeholder eventlister, medlemsressourcer og donationsintegration.',
      },
    },
  },
  skills: {
    title: 'Kompetencer',
    subtitle: 'Teknologier og værktøjer jeg arbejder med.',
    categories: {
      frontend: 'Frontend',
      backendData: 'Backend & Data',
      devopsInfra: 'DevOps & Infra',
      toolsOther: 'Værktøjer & Andet',
    },
  },
  contact: {
    title: 'Kontakt',
    subtitle:
      'Har du et spørgsmål eller ønsker du at samarbejde? Kontakt mig via en af disse platforme.',
  },
}

export const translations: Record<Language, Translations> = { en, da }

export function getTranslations(lang: Language): Translations {
  return translations[lang]
}
