import { Code, Brain, Table, Network, Database, Blocks, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { skillGroups } from '../config/skills'
import type { SkillGroup } from '../config/skills'

const ICONS: Record<SkillGroup['icon'], LucideIcon> = {
  code: Code,
  brain: Brain,
  chart: Table,
  network: Network,
  database: Database,
  blocks: Blocks,
  wrench: Wrench,
}

export default function Skills() {
  const total = skillGroups.reduce((sum, group) => sum + group.items.length, 0)

  return (
    <section id="skills" className="relative py-24 sm:py-28 lg:py-32" aria-labelledby="skills-title">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          kicker="skills"
          titleId="skills-title"
          title={
            <>
              The toolkit I'm <span className="text-muted">building with.</span>
            </>
          }
          description="Technologies I use and am actively growing into — organised by where they fit in a real workflow. No invented proficiency bars; just an honest, editable inventory."
        />

        <Reveal delay={0.08}>
          <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted/60">
            {skillGroups.length} groups · {total} entries · updated as I level up
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => {
            const Icon = ICONS[group.icon]
            return (
              <Reveal key={group.id} delay={Math.min(i * 0.05, 0.25)}>
                <article className="panel group h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-lime/40">
                  <header className="flex items-center gap-3.5">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-panel-2/80 text-lime transition-colors group-hover:border-lime/50">
                      <Icon size={17} aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-[1.02rem] font-medium text-ink">{group.label}</h3>
                  </header>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item}>
                        <span className="chip">{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            )
          })}

          {/* closing note tile */}
          <Reveal delay={0.28}>
            <div className="flex h-full flex-col justify-between rounded-2xl border border-dashed border-line-strong p-6">
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-muted/70">always learning</p>
              <p className="mt-4 font-display text-lg leading-snug text-ink">
                The list grows with every project — <span className="text-lime">this is version 1.0 of the toolkit.</span>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
