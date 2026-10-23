import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { X, ExternalLink, CheckCircle2, Route } from 'lucide-react'
import { GithubIcon } from './BrandIcons'
import type { Project } from '../config/projects'
import { statusLabels } from '../config/projects'
import { STATUS_STYLES } from './ProjectCard'

interface ProjectDetailsProps {
  project: Project | null
  onClose: () => void
}

/**
 * Accessible modal dialog for a single project.
 * Handles Escape, backdrop click, focus placement, a simple focus trap,
 * and body scroll locking.
 */
export default function ProjectDetails({ project, onClose }: ProjectDetailsProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!project) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    closeRef.current?.focus()

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus?.()
    }
  }, [project, onClose])

  if (!project) return null

  const isPlanned = project.status === 'planned'

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center" role="presentation">
      {/* backdrop */}
      <motion.button
        type="button"
        aria-label="Close project details"
        className="absolute inset-0 h-full w-full cursor-default bg-void/80 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* panel */}
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-details-title"
        className="panel relative z-10 max-h-[88svh] w-full max-w-2xl overflow-y-auto rounded-t-2xl sm:rounded-2xl"
        initial={{ opacity: 0, y: 26, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.99 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-panel/95 px-6 py-5 backdrop-blur sm:px-8">
          <div>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[0.64rem] uppercase tracking-[0.16em] ${STATUS_STYLES[project.status]}`}
            >
              <span className="h-1 w-1 rounded-full bg-current" aria-hidden="true" />
              {statusLabels[project.status]}
            </span>
            <h2 id="project-details-title" className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
              {project.title}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line text-muted transition-colors hover:border-line-strong hover:text-ink"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="px-6 py-6 sm:px-8">
          <p className="text-[0.98rem] leading-relaxed text-muted">{project.description}</p>

          {/* features or roadmap */}
          {isPlanned ? (
            <div className="mt-7">
              <p className="kicker flex items-center gap-2">
                <Route size={13} className="text-cyan" aria-hidden="true" />
                build plan
              </p>
              <ul className="mt-4 space-y-2.5">
                {project.roadmap.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.92rem] leading-relaxed text-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan/70" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-xl border border-dashed border-line-strong px-4 py-3 font-mono text-[0.72rem] leading-relaxed text-muted/80">
                Status: idea stage — not yet implemented. This card will be updated when the first working
                version exists.
              </p>
            </div>
          ) : (
            <div className="mt-7">
              <p className="kicker flex items-center gap-2">
                <CheckCircle2 size={13} className="text-lime" aria-hidden="true" />
                features
              </p>
              <ul className="mt-4 space-y-2.5">
                {project.features.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.92rem] leading-relaxed text-muted">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-lime/80" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              {project.roadmap.length > 0 && (
                <>
                  <p className="kicker mt-7">ideas for next</p>
                  <ul className="mt-4 space-y-2.5">
                    {project.roadmap.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[0.92rem] leading-relaxed text-muted">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan/70" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}

          {/* technologies */}
          <div className="mt-7">
            <p className="kicker">stack</p>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Technologies used">
              {project.technologies.map((tech) => (
                <li key={tech}>
                  <span className="chip">{tech}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* links */}
          <div className="mt-8 flex flex-wrap gap-3 border-t border-line pt-6">
            {project.links.repo && (
              <a href={project.links.repo} target="_blank" rel="noreferrer noopener" className="btn btn-primary !py-2.5 text-sm">
                <GithubIcon size={15} />
                View repository
              </a>
            )}
            {project.links.demo && (
              <a href={project.links.demo} target="_blank" rel="noreferrer noopener" className="btn btn-ghost !py-2.5 text-sm">
                <ExternalLink size={15} aria-hidden="true" />
                Open demo
              </a>
            )}
            {!project.links.repo && !project.links.demo && (
              <p className="font-mono text-[0.72rem] text-muted/70">
                No public repository yet — reach out if you'd like to see the code.
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
