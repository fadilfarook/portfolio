import { Mail, ArrowRight, Download, FileWarning } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { useState } from 'react'
import NeuralPanel from './NeuralPanel'
import TypingText from './TypingText'
import AvailabilityBadge from './AvailabilityBadge'
import Marquee from './Marquee'
import Reveal from './Reveal'
import { site } from '../config/site'

const MARQUEE_ITEMS = [
  'python',
  'machine learning',
  'pandas',
  'tensorflow',
  'deep learning',
  'rest apis',
  'generative ai',
  'scikit-learn',
  'rag',
  'sql',
]

export default function Hero() {
  const [showResumeNotice, setShowResumeNotice] = useState(false)
  const resumeConfigured = site.resume.url.trim().length > 0

  return (
    <>
      <section id="home" className="relative flex min-h-[100svh] flex-col justify-center pt-28 pb-14 sm:pt-32 lg:pt-36">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
            {/* ------------------------------------------------ left column */}
            <div>
              <Reveal>
                <AvailabilityBadge />
              </Reveal>

              <Reveal delay={0.06}>
                <p className="kicker mt-6">
                  computer science <span className="text-lime">·</span> ai &amp; machine learning
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="mt-4 font-display text-[clamp(2.35rem,6.4vw,4.4rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-ink">
                  {site.hero.titleLead}{' '}
                  <span className="bg-gradient-to-r from-lime via-lime to-cyan bg-clip-text text-transparent">
                    {site.hero.titleAccent}
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="mt-5 font-mono text-[0.95rem] tracking-tight text-muted">
                  <span className="text-lime">&gt;</span> const role = "
                  <TypingText words={[...site.hero.roles]} className="text-cyan" />"
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-muted">{site.hero.intro}</p>
                <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-muted/80">{site.hero.secondary}</p>
              </Reveal>

              <Reveal delay={0.26}>
                <div className="mt-9 flex flex-wrap items-center gap-3.5">
                  <a href="#projects" className="btn btn-primary">
                    Explore My Projects
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>

                  {resumeConfigured ? (
                    <a href={site.resume.url} className="btn btn-ghost" download={site.resume.fileName}>
                      <Download size={16} aria-hidden="true" />
                      Download Resume
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => setShowResumeNotice((v) => !v)}
                      aria-describedby="resume-notice"
                    >
                      <Download size={16} aria-hidden="true" />
                      Download Resume
                    </button>
                  )}
                </div>

                {!resumeConfigured && showResumeNotice && (
                  <p
                    id="resume-notice"
                    role="status"
                    className="mt-4 flex max-w-md items-start gap-2.5 rounded-xl border border-line bg-panel/60 px-4 py-3 text-sm leading-relaxed text-muted"
                  >
                    <FileWarning size={16} className="mt-0.5 shrink-0 text-cyan" aria-hidden="true" />
                    <span>
                      The resume PDF isn't published yet — it will be attached shortly. Meanwhile, feel free to
                      reach out directly.
                    </span>
                  </p>
                )}
              </Reveal>

              <Reveal delay={0.32}>
                <div className="mt-10 flex items-center gap-3">
                  {site.socials.github && (
                    <SocialIcon href={site.socials.github} label="GitHub profile">
                      <GithubIcon size={17} />
                    </SocialIcon>
                  )}
                  {site.socials.linkedin && (
                    <SocialIcon href={site.socials.linkedin} label="LinkedIn profile">
                      <LinkedinIcon size={17} />
                    </SocialIcon>
                  )}
                  {site.socials.email && (
                    <SocialIcon href={`mailto:${site.socials.email}`} label="Send an email">
                      <Mail size={17} aria-hidden="true" />
                    </SocialIcon>
                  )}
                  <span className="ml-1 hidden font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted/60 sm:inline">
                    {site.headline.split('|').length} roles · one direction
                  </span>
                </div>
              </Reveal>
            </div>

            {/* ------------------------------------------------ right column */}
            <Reveal delay={0.18} distance={30} className="relative">
              <NeuralPanel />
            </Reveal>
          </div>
        </div>
      </section>

      <Marquee items={MARQUEE_ITEMS} />
    </>
  )
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer noopener' : undefined}
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-panel/60 text-muted backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-lime/60 hover:text-lime"
    >
      {children}
    </a>
  )
}
