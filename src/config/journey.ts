/**
 * EDUCATION, LEARNING JOURNEY & CERTIFICATIONS
 * --------------------------------------------
 * Everything here is editable. Only add milestones, dates and certificates
 * that are genuinely true — nothing is auto-generated or embellished.
 */

export interface Education {
  degree: string
  institution: string
  /** Placeholder until the real year is confirmed — e.g. '2027' */
  period: string
  periodIsPlaceholder: boolean
  summary: string
  coursework: string[]
}

export const education: Education = {
  degree: 'Bachelor of Engineering — Computer Science (Artificial Intelligence & Machine Learning)',
  institution: 'AJ Engineering College, Mangalore',
  period: 'Graduation year — to be confirmed',
  periodIsPlaceholder: true,
  summary:
    'An engineering programme centred on artificial intelligence, machine learning, and the computer science foundations underneath them.',
  coursework: [
    'Data Structures and Algorithms',
    'Database Management Systems',
    'Operating Systems',
    'Artificial Intelligence',
    'Machine Learning',
    'Research Methodology',
    'Computer Science Fundamentals',
  ],
}

export type JourneyStatus = 'shipped' | 'in-progress' | 'next'

export interface JourneyEntry {
  phase: string
  title: string
  description: string
  status: JourneyStatus
  /** Free-text period label — keep it honest ('Ongoing', 'Next up', or a real date) */
  period: string
}

/**
 * Learning trajectory. Ordered oldest → newest.
 * Replace the descriptions with your own words as the journey progresses.
 */
export const journey: JourneyEntry[] = [
  {
    phase: '01',
    title: 'Computer science foundations',
    description:
      'Core coursework — data structures and algorithms, DBMS, operating systems, and research methodology — the layer everything else sits on.',
    status: 'in-progress',
    period: 'Ongoing',
  },
  {
    phase: '02',
    title: 'Python & data fluency',
    description:
      'Daily Python practice with the data stack: NumPy, Pandas, Matplotlib, Seaborn and Scikit-learn, plus Java and SQL alongside it.',
    status: 'in-progress',
    period: 'Ongoing',
  },
  {
    phase: '03',
    title: 'First shipped project',
    description:
      'Built a Tkinter desktop weather application on the OpenWeather API — real HTTP integration, environment-based API key handling, and graceful error states.',
    status: 'shipped',
    period: 'Shipped',
  },
  {
    phase: '04',
    title: 'Machine learning workflow',
    description:
      'Practising the full loop deliberately: preprocessing, exploratory analysis, feature engineering, model training and honest evaluation.',
    status: 'in-progress',
    period: 'Current focus',
  },
  {
    phase: '05',
    title: 'Deep learning & generative AI',
    description:
      'Convolutional networks with TensorFlow/Keras, and the generative-AI toolkit: LLMs, prompt engineering, retrieval-augmented generation and Hugging Face.',
    status: 'in-progress',
    period: 'Current focus',
  },
  {
    phase: '06',
    title: 'Next builds',
    description:
      'Student performance prediction, an image classification system, and an AI study assistant using retrieval-augmented generation.',
    status: 'next',
    period: 'Planned',
  },
]

export interface Certification {
  title: string
  issuer: string
  /** e.g. 'March 2025' */
  date: string
  /** Verification URL — omit until you have one */
  verifyUrl?: string
}

/**
 * Verified certificates only.
 * While this array is empty the site shows a tasteful "check back soon" note
 * instead of inventing credentials. Add a certificate by appending:
 *   { title: '...', issuer: '...', date: '...', verifyUrl: '...' }
 */
export const certifications: Certification[] = []
