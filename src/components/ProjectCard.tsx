import { CloudSun, LineChart, ImageIcon, BookOpen } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight } from 'lucide-react'
import { GithubIcon } from './BrandIcons'
import type { Project, ProjectStatus } from '../config/projects'
import { statusLabels } from '../config/projects'

const ICONS: Record<Project['icon'], LucideIcon> = {
  weather: CloudSun,
  chart: LineChart,
  vision: ImageIcon,
  book: BookOpen,
}

export const STATUS_STYLES: Record<ProjectStatus, string> = {
  built: 'border-lime/40 bg-lime/10 text-lime',
  'in-progress': 'border-cyan/40 bg-cyan/10 text-cyan',
  planned: 'border-line-strong bg-panel-2/80 text-muted',
}

interface ProjectCardProps {
  project: Project
  onOpen: (project: Project) => void
}

/**
 * Gallery card. Shipped projects get a solid treatment; planned ones carry a
 * dashed border and diagonal texture so the distinction reads at a glance.
 */
export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const Icon = ICONS[project.icon]
  const isPlanned = project.status === 'planned'
  const visibleTech = project.technologies.slice(0, 3)
  const extraTech = project.technologies.length - visibleTech.length

  return (
    <article
      className={`panel group relative flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 ${
        isPlanned ? 'texture-planned border-dashed' : 'hover:border-lime/45'
      }`}
    >
      {/* top row */}
      <div className="flex items-start justify-between gap-4">
        <span
          className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-panel-2/80 transition-colors ${
            isPlanned ? 'text-muted' : 'text-lime group-hover:border-lime/50'
          }`}
        >
          <Icon size={19} aria-hidden="true" />
        </span>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.16em] ${STATUS_STYLES[project.status]}`}
        >
          <span className="h-1 w-1 rounded-full bg-current" aria-hidden="true" />
          {statusLabels[project.status]}
        </span>
      </div>

      {/* body */}
      <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-ink">{project.title}</h3>
      <p className="mt-2.5 flex-1 text-[0.94rem] leading-relaxed text-muted">{project.tagline}</p>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
        {visibleTech.map((tech) => (
          <li key={tech}>
            <span className="chip !py-1 !text-[0.68rem]">{tech}</span>
          </li>
        ))}
        {extraTech > 0 && (
          <li>
            <span className="chip !py-1 !text-[0.68rem]">+{extraTech}</span>
          </li>
        )}
      </ul>

      {/* footer */}
      <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-4">
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="inline-flex items-center gap-1.5 font-mono text-[0.74rem] uppercase tracking-[0.16em] text-ink transition-colors hover:text-lime"
          aria-label={`View details for ${project.title}`}
        >
          {isPlanned ? 'Read the plan' : 'View details'}
          <ArrowUpRight size={14} aria-hidden="true" />
        </button>

        {project.links.repo && (
          <a
            href={project.links.repo}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${project.title} on GitHub`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted transition-all hover:-translate-y-0.5 hover:border-lime/50 hover:text-lime"
          >
            <GithubIcon size={15} />
          </a>
        )}
      </div>
    </article>
  )
}
