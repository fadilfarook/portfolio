import { Brain, Layers, Sparkles, Blocks } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { site } from '../config/site'

const EXPLORING_ICONS = [Brain, Layers, Sparkles, Blocks]

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-28 lg:py-32" aria-labelledby="about-title">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16">
          {/* narrative */}
          <div>
            <SectionHeading
              index="01"
              kicker="about"
              titleId="about-title"
              title={
                <>
                  A little about the mind{' '}
                  <span className="text-muted">behind the machine.</span>
                </>
              }
            />

            <div className="mt-8 space-y-5">
              {site.about.paragraphs.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p className="max-w-2xl text-[1.02rem] leading-relaxed text-muted">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.15}>
              <p className="mt-8 font-mono text-[0.72rem] uppercase tracking-[0.22em] text-muted/60">
                “{site.headline}”
              </p>
            </Reveal>
          </div>

          {/* currently exploring + facts */}
          <div className="space-y-6">
            <Reveal delay={0.1}>
              <div className="panel rounded-2xl p-6 sm:p-7">
                <p className="kicker flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" />
                  currently exploring
                </p>

                <ul className="mt-6 space-y-4">
                  {site.about.currentlyExploring.map((item, i) => {
                    const Icon = EXPLORING_ICONS[i % EXPLORING_ICONS.length]
                    return (
                      <li key={item.label} className="group flex items-start gap-4">
                        <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-panel-2/80 text-lime transition-colors group-hover:border-lime/50">
                          <Icon size={16} aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block font-display text-[0.98rem] font-medium text-ink">{item.label}</span>
                          <span className="block text-sm leading-relaxed text-muted">{item.hint}</span>
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <dl className="panel-soft rounded-2xl p-6 sm:p-7">
                <p className="kicker">profile.txt</p>
                <div className="mt-4 space-y-3">
                  {site.about.facts.map((fact) => (
                    <div key={fact.term} className="flex items-baseline justify-between gap-4 border-b border-line/60 pb-3 last:border-0 last:pb-0">
                      <dt className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-muted/70">{fact.term}</dt>
                      <dd className="text-right font-display text-[0.95rem] text-ink">{fact.value}</dd>
                    </div>
                  ))}
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
