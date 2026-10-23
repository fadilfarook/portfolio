import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import BrandMark from './BrandMark'
import AvailabilityBadge from './AvailabilityBadge'
import { site } from '../config/site'

/**
 * Fixed navigation bar with scroll-spy, a blurred backdrop once scrolled,
 * and a full-screen mobile menu with Escape-to-close and focus handling.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>(site.nav[0].href)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  /* scroll state + active section highlighting */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)
      const probe = window.scrollY + 160
      let current: string = site.nav[0].href
      for (const link of site.nav) {
        const el = document.querySelector<HTMLElement>(link.href)
        if (el && el.offsetTop <= probe) current = link.href
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* mobile menu: body scroll lock, Escape to close, move focus inside */
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstLinkRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (event.key !== 'Tab') return

      // Simple focus trap: keep Tab cycling between the toggle and the menu links.
      const focusables: HTMLElement[] = []
      if (toggleRef.current) focusables.push(toggleRef.current)
      panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])').forEach((el) => focusables.push(el))
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
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-line bg-void/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        {/* Brand */}
        <a href="#home" className="group flex items-center gap-3" onClick={closeMenu}>
          <BrandMark size={30} className="transition-transform duration-300 group-hover:rotate-[-4deg] group-hover:scale-105" />
          <span className="font-display text-lg font-semibold tracking-[0.02em] text-ink">
            FADIL<span className="text-lime">.AI</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {site.nav.map((link) => {
            const isActive = active === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'true' : undefined}
                className={`relative py-1 font-mono text-[0.76rem] uppercase tracking-[0.18em] transition-colors duration-200 ${
                  isActive ? 'text-lime' : 'text-muted hover:text-ink'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-underline"
                    className="absolute -bottom-1 left-0 h-px w-full bg-lime"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
              </a>
            )
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <AvailabilityBadge className="hidden xl:inline-flex" />
          <a href="#contact" className="btn btn-primary hidden !px-5 !py-2 text-sm sm:inline-flex">
            Let's talk
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-panel/70 text-ink transition-colors hover:border-line-strong hover:text-lime lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>

      {/* Mobile menu — sibling of the header: the header's backdrop-filter
          would otherwise become the containing block for this fixed panel. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-x-0 top-[61px] bottom-0 z-40 overflow-y-auto bg-void/97 backdrop-blur-xl lg:hidden"
          >
            <nav aria-label="Mobile" className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-5 py-8 sm:px-8">
              {site.nav.map((link, i) => (
                <a
                  key={link.href}
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={active === link.href ? 'true' : undefined}
                  className="group flex items-baseline gap-4 border-b border-line/60 py-4 font-display text-3xl font-medium text-ink transition-colors hover:text-lime"
                >
                  <span className="font-mono text-xs tracking-[0.2em] text-muted group-hover:text-lime/70">
                    0{i + 1}
                  </span>
                  {link.label}
                </a>
              ))}

              <div className="mt-8 flex flex-col gap-4">
                <AvailabilityBadge />
                <div className="flex flex-wrap gap-3">
                  {site.socials.github && (
                    <SocialLink href={site.socials.github} label="GitHub" />
                  )}
                  {site.socials.linkedin && (
                    <SocialLink href={site.socials.linkedin} label="LinkedIn" />
                  )}
                  {site.socials.email && (
                    <SocialLink href={`mailto:${site.socials.email}`} label="Email" />
                  )}
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function SocialLink({ href, label }: { href: string; label: string }) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer noopener' : undefined}
      className="chip"
    >
      {label}
    </a>
  )
}
