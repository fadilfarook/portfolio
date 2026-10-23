import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import ProjectCard from './ProjectCard'
import ProjectDetails from './ProjectDetails'
import { projects } from '../config/projects'
import type { Project } from '../config/projects'

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const builtCount = projects.filter((p) => p.status !== 'planned').length

  return (
    <section id="projects" className="relative py-24 sm:py-28 lg:py-32" aria-labelledby="projects-title">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          kicker="projects"
          titleId="projects-title"
          title={
            <>
              Work that ships — <span className="text-muted">and what's next.</span>
            </>
          }
          description="Each project is labelled by its true status. Shipped work links to its repository; planned work shows the approach I intend to take."
        />

        <Reveal delay={0.08}>
          <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted/60">
            {builtCount} shipped · {projects.length - builtCount} planned · maintained in one data file
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={Math.min(i * 0.06, 0.24)}>
              <ProjectCard project={project} onOpen={setSelected} />
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectDetails project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
