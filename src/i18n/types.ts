export type Language = 'en' | 'da'

export interface ProjectTranslation {
  title: string
  description: string
}

export interface Translations {
  projectCard: {
    code: string
    api: string
    frontend: string
    live: string
    preview: string
  }
  nav: {
    about: string
    projects: string
    skills: string
    contact: string
  }
  hero: {
    welcome: string
    heading: string
    tagline: string
    viewProjects: string
    getInTouch: string
  }
  about: {
    title: string
    subtitle: string
    paragraph1: string
    paragraph2: string
    highlights: {
      fullStack: { title: string; description: string }
      creativeTech: { title: string; description: string }
      securityMinded: { title: string; description: string }
    }
  }
  projects: {
    title: string
    subtitle: string
    items: Record<string, ProjectTranslation>
  }
  skills: {
    title: string
    subtitle: string
    categories: {
      frontend: string
      backendData: string
      devopsInfra: string
      toolsOther: string
    }
  }
  contact: {
    title: string
    subtitle: string
  }
}
