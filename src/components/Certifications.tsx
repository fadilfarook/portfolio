import { ShieldCheck, ExternalLink } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { certifications } from '../config/journey'

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="relative py-24 sm:py-28 lg:py-32"
      aria-labelledby="certifications-title"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="05"
          kicker="certifications"
          titleId="certifications-title"
          title={
            <>
              Certificates &amp; <span className="text-muted">verifiable learning.</span>
            </>
          }
        />

        {certifications.length === 0 ? (
          <Reveal delay={0.08}>
            <div className="panel mt-10 flex flex-col gap-5 rounded-2xl p-8 sm:flex-row sm:items-center sm:gap-7">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-panel-2/80 text-cyan">
                <ShieldCheck size={20} aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-muted/70">certifications.log</p>
                <p className="mt-2 max-w-2xl text-[0.96rem] leading-relaxed text-muted">
                  No certificates are logged yet — only verified ones belong here. This section will fill up as the
                  learning journey progresses, so check back soon.
                </p>
              </div>
            </div>
          </Reveal>
        ) : (
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, i) => (
              <Reveal key={cert.title} delay={Math.min(i * 0.06, 0.24)}>
                <li className="panel h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-panel-2/80 text-cyan">
                    <ShieldCheck size={17} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-ink">{cert.title}</h3>
                  <p className="mt-1.5 text-sm text-muted">{cert.issuer}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted/70">{cert.date}</span>
                    {cert.verifyUrl && (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-cyan transition-colors hover:text-lime"
                      >
                        verify
                        <ExternalLink size={12} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
