/**
 * PROJECTS
 * --------
 * Single source of truth for the project gallery.
 * To add a project: append an object below — the card, detail dialog and
 * gallery layout pick it up automatically.
 *
 * INTEGRITY RULE
 * --------------
 * `status` must reflect reality:
 *   'built'        → exists and works (link the repo when you can)
 *   'in-progress'  → actively being developed
 *   'planned'      → an idea, not yet implemented
 * Never mark a project 'built' before it actually runs.
 */

export type ProjectStatus = 'built' | 'in-progress' | 'planned'
export type ProjectIcon = 'weather' | 'chart' | 'vision' | 'book'

export interface Project {
  id: string
  title: string
  status: ProjectStatus
  /** One line shown on the gallery card */
  tagline: string
  /** Longer write-up for the detail dialog */
  description: string
  technologies: string[]
  /** Bullets for shipped work */
  features: string[]
  /** Bullets for planned work — the intended approach */
  roadmap: string[]
  links: {
    /** GitHub repository URL — leave undefined until one exists */
    repo?: string
    /** Live demo URL — leave undefined if there is none */
    demo?: string
  }
  icon: ProjectIcon
}

export const projects: Project[] = [
  {
    id: 'weather-application',
    title: 'Weather Application',
    status: 'built',
    tagline: 'Desktop app that fetches live weather for any city via the OpenWeather API.',
    description:
      'A Python desktop application built with Tkinter that retrieves current weather for a user-selected city. The app calls the OpenWeather current-weather endpoint, parses the JSON response, and presents temperature, humidity, wind speed, weather description, pressure, visibility, and local sunrise/sunset times. The API key is never hard-coded — it is loaded from environment variables with python-dotenv, and network failures or unknown cities are surfaced as clear in-app messages.',
    technologies: ['Python', 'Tkinter', 'OpenWeather API', 'Requests', 'python-dotenv'],
    features: [
      'City-based weather search with the current-conditions endpoint',
      'Reads temperature, humidity, wind speed, description, pressure and visibility',
      'Local sunrise and sunset times computed from the city timezone offset',
      'API key managed through environment variables — never committed to source',
      'Network-error and city-not-found handling with readable feedback',
      'Keyboard support: pressing Enter triggers the search',
    ],
    roadmap: [
      'Forecast view (5-day / 3-hour intervals)',
      'Recent-searches history and unit switching (°C / °F)',
      'Packaging into a standalone executable',
    ],
    links: {
      // This repository contains the app under /weather-app — update if you split it out.
      repo: 'https://github.com/fadilfarook/AI-Engineer-journey',
    },
    icon: 'weather',
  },
  {
    id: 'student-performance-prediction',
    title: 'Student Performance Prediction',
    status: 'planned',
    tagline: 'Predict student outcomes from academic data using an evaluated ML pipeline.',
    description:
      'Planned machine-learning project: analyse a student dataset, clean and preprocess it, run exploratory data analysis to find the features that matter, engineer meaningful inputs, train suitable predictive models, and compare them with appropriate evaluation metrics. The goal is an honest, reproducible pipeline — not a single lucky score.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Scikit-learn'],
    features: [],
    roadmap: [
      'Data cleaning and preprocessing (missing values, encoding, scaling)',
      'Exploratory data analysis to surface grade-driving factors',
      'Feature engineering and train/validation/test splits',
      'Train and compare candidate models (linear models, trees, ensembles)',
      'Evaluate with accuracy, precision/recall, RMSE where applicable, and error analysis',
    ],
    links: {},
    icon: 'chart',
  },
  {
    id: 'image-classification-system',
    title: 'Image Classification System',
    status: 'planned',
    tagline: 'CNN-based image classifier trained with TensorFlow / Keras.',
    description:
      'Planned deep-learning project: build an image classification system around a convolutional neural network. The workflow covers dataset preparation and augmentation, a CNN implemented in TensorFlow/Keras, training with validation monitoring, and evaluation using per-class metrics and a confusion matrix — plus experiments with transfer learning once the baseline works.',
    technologies: ['Python', 'TensorFlow', 'Keras', 'CNN', 'NumPy'],
    features: [],
    roadmap: [
      'Prepare and augment the image dataset',
      'Design a CNN (convolution, pooling, dense head) in Keras',
      'Train with callbacks: early stopping, learning-rate reduction',
      'Evaluate with accuracy, per-class precision/recall and a confusion matrix',
      'Experiment with transfer learning and export the model',
    ],
    links: {},
    icon: 'vision',
  },
  {
    id: 'ai-study-assistant',
    title: 'AI Study Assistant / PDF Chatbot',
    status: 'planned',
    tagline: 'Ask questions about uploaded study documents using retrieval-augmented generation.',
    description:
      'Planned generative-AI project: a study assistant that answers questions about uploaded documents (lecture notes, PDFs) using retrieval-augmented generation. Documents are chunked and embedded into a vector store; relevant chunks are retrieved for each question and passed to a large language model with grounding context, so answers reference the actual study material instead of guessing.',
    technologies: ['Python', 'LLMs', 'RAG', 'Hugging Face', 'Vector Store', 'Flask / Streamlit'],
    features: [],
    roadmap: [
      'PDF ingestion, text extraction and chunking',
      'Embeddings + vector store for semantic retrieval',
      'RAG prompt assembly with source citations',
      'Conversational interface (Streamlit or Flask)',
      'Evaluate answer groundedness on a small question set',
    ],
    links: {},
    icon: 'book',
  },
]

export const statusLabels: Record<ProjectStatus, string> = {
  built: 'Built',
  'in-progress': 'In progress',
  planned: 'Planned',
}
