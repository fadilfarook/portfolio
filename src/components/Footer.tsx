import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import BrandMark from './BrandMark'
import { site } from '../config/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-line bg-panel-2/40">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* brand */}
          <div>
            <a href="#home" className="inline-flex items-center gap-3">
              <BrandMark size={28} />
              <span className="font-display text-lg font-semibold tracking-[0.02em] text-ink">
                FADIL<span className="text-lime">.AI</span>
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {site.fullName} — {site.headline}
            </p>
            <p className="mt-5 font-mono text-[0.72rem] tracking-[0.12em] text-lime/80">{site.footer.tagline}</p>
          </div>

          {/* nav */}
          <nav aria-label="Footer">
            <p className="kicker">navigate</p>
            <ul className="mt-4 space-y-2.5">
              {site.nav.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-lime"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* elsewhere */}
          <div>
            <p className="kicker">elsewhere</p>
            <ul className="mt-4 space-y-2.5">
              {site.socials.github && (
                <li>
                  <a
                    href={site.socials.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-lime"
                  >
                    <GithubIcon size={14} />
                    GitHub
                  </a>
                </li>
              )}
              {site.socials.linkedin && (
                <li>
                  <a
                    href={site.socials.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-lime"
                  >
                    <LinkedinIcon size={14} />
                    LinkedIn
                  </a>
                </li>
              )}
              {site.socials.email && (
                <li>
                  <a
                    href={`mailto:${site.socials.email}`}
                    className="inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-lime"
                  >
                    <Mail size={14} aria-hidden="true" />
                    Email
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted/70">
            © {year} {site.fullName}
          </p>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted/50">
            designed &amp; built with react · tailwind · framer motion
          </p>
        </div>
      </div>
    </footer>
  )
}
