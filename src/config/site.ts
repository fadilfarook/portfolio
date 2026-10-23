/**
 * SITE IDENTITY & GLOBAL CONFIGURATION
 * ------------------------------------
 * Everything personal lives in config files under src/config.
 * Edit this file to change the name, headline, availability badge,
 * social links and resume file. No component hardcodes these values.
 */

export interface SocialLinks {
  /** e.g. 'https://github.com/your-handle' — leave '' to hide the button */
  github: string
  /** e.g. 'https://www.linkedin.com/in/your-handle' — leave '' to hide the button */
  linkedin: string
  /** e.g. 'you@example.com' — leave '' to hide the button (also used by the contact form fallback) */
  email: string
}

export const site = {
  brand: 'FADIL.AI',
  fullName: 'MUHAMMED FADIL FAROOK',
  firstName: 'Fadil',

  /** Professional headline */
  headline: 'Aspiring AI Engineer | Python Developer | AI/ML Enthusiast',

  hero: {
    titleLead: 'Building Intelligent Solutions',
    titleAccent: 'for the Real World.',
    intro:
      "Hi, I'm Fadil Farook — a Computer Science student exploring Artificial Intelligence, Machine Learning, and software development.",
    secondary:
      'I take ideas that live on paper and turn them into working applications — from exploratory data analysis and machine learning models to desktop tools people can actually use.',
    /** Roles cycled by the typing effect */
    roles: ['Aspiring AI Engineer', 'Python Developer', 'AI/ML Enthusiast'],
  },

  /** First-person summary used in the About section */
  about: {
    paragraphs: [
      "I'm a Computer Science undergraduate specialising in Artificial Intelligence and Machine Learning at AJ Engineering College, Mangalore. My days revolve around Python, data, and the quiet satisfaction of a model that finally behaves.",
      "I care most about the practical side of the field: cleaning messy data, understanding it with exploratory analysis, engineering features, training models, and evaluating them honestly. Alongside machine learning I build applications — desktop tools, APIs, and data-driven interfaces — because a model only matters once it reaches someone.",
      "I'm early in the journey and I know it. Every project is a deliberate practice session for the role I'm working toward: an AI Engineer who ships reliable, useful machine learning systems.",
    ],
    currentlyExploring: [
      { label: 'Machine Learning', hint: 'Supervised workflows, evaluation, iteration' },
      { label: 'Deep Learning', hint: 'CNNs with TensorFlow and Keras' },
      { label: 'Generative AI', hint: 'LLMs, prompt engineering, RAG' },
      { label: 'Application Development', hint: 'Flask, Streamlit, REST APIs, desktop UIs' },
    ],
    facts: [
      { term: 'Focus', value: 'AI & Machine Learning' },
      { term: 'Core language', value: 'Python' },
      { term: 'Also fluent in', value: 'Java · SQL' },
      { term: 'Working toward', value: 'AI Engineer' },
    ],
  },

  /**
   * Availability badge in the navbar / hero.
   * Set `enabled: false` to hide it, or change `text` to match your real situation.
   */
  availability: {
    enabled: true,
    text: 'Open to internships & collaborations',
  },

  /**
   * Resume download.
   * Drop your PDF at portfolio/public/resume.pdf and set url to '/resume.pdf'.
   * While empty, the button shows an honest "not available yet" notice.
   */
  resume: {
    url: '',
    fileName: 'Muhammed-Fadil-Farook-Resume.pdf',
  },

  socials: {
    /** Taken from the GitHub account this repo is connected to — edit if different. */
    github: 'https://github.com/fadilfarook',
    linkedin: '',
    email: '',
  } satisfies SocialLinks,

  nav: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Journey', href: '#journey' },
    { label: 'Contact', href: '#contact' },
  ],

  /** Section visibility — flip to false to remove a section entirely. */
  sections: {
    certifications: true,
  },

  contact: {
    /** Headline + copy */
    title: 'Have an idea worth building?',
    supporting:
      "I'm interested in connecting with developers, learning from experienced engineers, and exploring opportunities to build meaningful technology.",
    /**
     * Optional form backend.
     * Leave '' to use the built-in mailto fallback (requires `socials.email`).
     * To use a form service, paste its endpoint here — e.g. Formspree:
     *   'https://formspree.io/f/yourFormId'
     */
    formEndpoint: '',
    emailSubject: 'Portfolio contact — message from a visitor',
  },

  footer: {
    tagline: 'Built with curiosity and code.',
  },

  meta: {
    title: 'Muhammed Fadil Farook | AI/ML Developer Portfolio',
    description:
      'Explore the projects, technical skills, and learning journey of Muhammed Fadil Farook, a Computer Science student focused on AI, machine learning, and Python development.',
  },
} as const

export type Site = typeof site
