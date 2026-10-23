import { GraduationCap, CalendarClock, BookOpen } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { education, journey } from '../config/journey'
import type { JourneyStatus } from '../config/journey'

const DOT_STYLES: Record<JourneyStatus, string> = {
  shipped: 'bg-lime shadow-[0_0_14px_rgba(182,243,107,0.55)]',
  'in-progress': 'bg-cyan shadow-[0_0_14px_rgba(93,228,255,0.5)]',
  next: 'bg-line-strong',
}

const LABELS: Record<JourneyStatus, string> = {
  shipped: 'shipped',
  'in-progress': 'in progress',
  next: 'planned',
}

export default function Journey() {
  return (
    <section id="journey" className="relative py-24 sm:py-28 lg:py-32" aria-labelledby="journey-title">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          kicker="journey"
          titleId="journey-title"
          title={
            <>
              Education &amp; <span className="text-muted">learning trajectory.</span>
            </>
          }
          description="The academic foundation and the self-directed path on top of it — kept honest and updated as things actually happen."
        />

        {/* education card */}
        <Reveal delay={0.08}>
          <article className="panel mt-10 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-panel-2/80 text-lime">
                  <GraduationCap size={20} aria-hidden="true" />
                </span>
                <div>
                  <p className="kicker">education</p>
                  <h3 className="mt-2 font-display text-xl font-semibold leading-snug tracking-tight text-ink">
                    {education.degree}
                  </h3>
                  <p className="mt-1.5 text-[0.95rem] text-muted">{education.institution}</p>
                </div>
              </div>

              <p
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[0.68rem] tracking-[0.1em] ${
                  education.periodIsPlaceholder
                    ? 'border-dashed border-line-strong text-muted/80'
                    : 'border-line bg-panel-2/80 text-muted'
                }`}
              >
                <CalendarClock size={13} aria-hidden="true" />
                {education.period}
              </p>
            </div>

            <p className="mt-6 max-w-3xl text-[0.96rem] leading-relaxed text-muted">{education.summary}</p>

            <div className="mt-7 border-t border-line pt-6">
              <p className="kicker flex items-center gap-2">
                <BookOpen size={13} className="text-cyan" aria-hidden="true" />
                relevant coursework
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {education.coursework.map((course) => (
                  <li key={course}>
                    <span className="chip">{course}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </Reveal>

        {/* timeline */}
        <div className="mt-14">
          <Reveal>
            <p className="kicker">learning path</p>
          </Reveal>

          <ol className="relative mt-8 space-y-8 border-l border-line pl-8 sm:pl-10">
            {journey.map((entry, i) => (
              <Reveal key={entry.phase} delay={Math.min(i * 0.05, 0.2)}>
                <li className="relative">
                  <span
                    className={`absolute -left-8 top-1.5 h-3 w-3 rounded-full ring-4 ring-void sm:-left-10 ${DOT_STYLES[entry.status]}`}
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted/70">
                      phase {entry.phase}
                    </span>
                    <span className="rounded-full border border-line bg-panel-2/70 px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
                      {entry.period}
                    </span>
                    <span
                      className={`font-mono text-[0.62rem] uppercase tracking-[0.14em] ${
                        entry.status === 'shipped' ? 'text-lime' : entry.status === 'in-progress' ? 'text-cyan' : 'text-muted/60'
                      }`}
                    >
                      · {LABELS[entry.status]}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-ink">{entry.title}</h3>
                  <p className="mt-1.5 max-w-2xl text-[0.94rem] leading-relaxed text-muted">{entry.description}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
