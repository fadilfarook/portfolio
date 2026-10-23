/**
 * TECHNICAL SKILLS
 * ----------------
 * Add or remove skills by editing the arrays below — the UI adapts automatically.
 * No proficiency percentages or experience claims are stored or displayed.
 */

export type SkillGroupId = 'programming' | 'ml' | 'data' | 'deep-learning' | 'databases' | 'development' | 'tools'

export interface SkillGroup {
  id: SkillGroupId
  label: string
  /** Lucide icon name handled in the Skills component */
  icon: 'code' | 'brain' | 'chart' | 'network' | 'database' | 'blocks' | 'wrench'
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'programming',
    label: 'Programming',
    icon: 'code',
    items: ['Python', 'Java', 'SQL'],
  },
  {
    id: 'ml',
    label: 'AI & Machine Learning',
    icon: 'brain',
    items: [
      'Machine Learning',
      'Data Preprocessing',
      'Exploratory Data Analysis',
      'Feature Engineering',
      'Model Evaluation',
      'Convolutional Neural Networks',
    ],
  },
  {
    id: 'data',
    label: 'Data & Libraries',
    icon: 'chart',
    items: ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Scikit-learn'],
  },
  {
    id: 'deep-learning',
    label: 'Deep Learning & Generative AI',
    icon: 'network',
    items: [
      'TensorFlow',
      'Keras',
      'Large Language Models',
      'Prompt Engineering',
      'Retrieval-Augmented Generation',
      'Hugging Face',
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    icon: 'database',
    items: ['MySQL', 'MongoDB'],
  },
  {
    id: 'development',
    label: 'Development',
    icon: 'blocks',
    items: ['Flask', 'REST APIs', 'Streamlit', 'Tkinter'],
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: 'wrench',
    items: ['Git', 'GitHub', 'VS Code'],
  },
]
