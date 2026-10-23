import { useState } from 'react'
import type { FormEvent } from 'react'
import { Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import Reveal from './Reveal'
import { site } from '../config/site'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [statusDetail, setStatusDetail] = useState('')

  const useBackend = site.contact.formEndpoint.trim().length > 0
  const hasEmail = site.socials.email.trim().length > 0

  function validate(): FormErrors {
    const next: FormErrors = {}
    if (values.name.trim().length < 2) next.name = 'Please enter your name.'
    if (!EMAIL_RE.test(values.email.trim())) next.email = 'Please enter a valid email address.'
    if (values.message.trim().length < 10) next.message = 'A few more words help — 10 characters minimum.'
    return next
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) {
      setStatus('idle')
      return
    }

    setStatus('submitting')

    if (useBackend) {
      try {
        const response = await fetch(site.contact.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...values, _subject: site.contact.emailSubject }),
        })
        if (!response.ok) throw new Error(`Form endpoint responded ${response.status}`)
        setStatus('success')
        setStatusDetail("Message sent — I'll get back to you soon.")
        setValues({ name: '', email: '', message: '' })
      } catch {
        setStatus('error')
        setStatusDetail('The form service could not accept the message. Please try email or GitHub instead.')
      }
      return
    }

    // Mailto fallback — no backend configured
    if (!hasEmail) {
      setStatus('error')
      setStatusDetail(
        `The contact email isn't configured yet. Please reach out on${
          site.socials.github ? ' GitHub' : ''
        }${site.socials.github && site.socials.linkedin ? ' or' : ''}${site.socials.linkedin ? ' LinkedIn' : ''}.`,
      )
      return
    }

    const subject = encodeURIComponent(site.contact.emailSubject)
    const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`)
    window.location.href = `mailto:${site.socials.email}?subject=${subject}&body=${body}`
    setStatus('success')
    setStatusDetail('Your email app should have opened with the message ready to send.')
    setValues({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="relative py-24 sm:py-28 lg:py-32" aria-labelledby="contact-title">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* copy + channels */}
          <div>
            <Reveal>
              <p className="kicker flex items-center gap-3">
                <span className="text-lime">06</span>
                <span className="h-px w-8 bg-line-strong" />
                <span>contact</span>
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h2
                id="contact-title"
                className="mt-4 font-display text-[clamp(2.1rem,5.2vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-ink"
              >
                {site.contact.title.split('?')[0]}?
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 max-w-lg text-[1.02rem] leading-relaxed text-muted">{site.contact.supporting}</p>
              <div className="mt-7 h-px w-full max-w-md hairline" aria-hidden="true" />
            </Reveal>

            <Reveal delay={0.16}>
              <ul className="mt-8 space-y-3">
                {hasEmail && (
                  <ChannelRow
                    href={`mailto:${site.socials.email}`}
                    icon={<Mail size={17} aria-hidden="true" />}
                    label="Email"
                    value={site.socials.email}
                  />
                )}
                {site.socials.github && (
                  <ChannelRow
                    href={site.socials.github}
                    icon={<GithubIcon size={17} />}
                    label="GitHub"
                    value={site.socials.github.replace(/^https?:\/\//, '')}
                    external
                  />
                )}
                {site.socials.linkedin && (
                  <ChannelRow
                    href={site.socials.linkedin}
                    icon={<LinkedinIcon size={17} />}
                    label="LinkedIn"
                    value={site.socials.linkedin.replace(/^https?:\/\//, '')}
                    external
                  />
                )}
                {!hasEmail && !site.socials.linkedin && (
                  <li className="rounded-xl border border-dashed border-line-strong px-4 py-3 font-mono text-[0.74rem] leading-relaxed text-muted/80">
                    Contact channels are being configured — the fastest way to reach me right now is GitHub.
                  </li>
                )}
              </ul>
            </Reveal>
          </div>

          {/* form */}
          <Reveal delay={0.12}>
            <form onSubmit={handleSubmit} noValidate className="panel rounded-2xl p-6 sm:p-8">
              <p className="kicker">{useBackend ? 'send a message' : 'compose · opens your email app'}</p>

              <div className="mt-6 space-y-5">
                <Field
                  id="contact-name"
                  label="Name"
                  value={values.name}
                  error={errors.name}
                  autoComplete="name"
                  onChange={(v) => setValues((s) => ({ ...s, name: v }))}
                />
                <Field
                  id="contact-email"
                  label="Email"
                  type="email"
                  value={values.email}
                  error={errors.email}
                  autoComplete="email"
                  onChange={(v) => setValues((s) => ({ ...s, email: v }))}
                />
                <div>
                  <label htmlFor="contact-message" className="kicker block">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={values.message}
                    aria-invalid={errors.message ? 'true' : undefined}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    onChange={(e) => {
                      setValues((s) => ({ ...s, message: e.target.value }))
                      if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }))
                    }}
                    className={`mt-2 w-full resize-y rounded-xl border bg-panel-2/70 px-4 py-3 text-[0.95rem] text-ink placeholder:text-muted/50 transition-colors focus:outline-none focus-visible:ring-0 ${
                      errors.message ? 'border-danger/70' : 'border-line focus:border-cyan/60'
                    }`}
                    placeholder="What are you building?"
                  />
                  {errors.message && (
                    <p id="contact-message-error" className="mt-1.5 text-sm text-danger">
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send size={15} aria-hidden="true" />
                  {status === 'submitting' ? 'Sending…' : 'Send message'}
                </button>

                <div aria-live="polite" role="status" className="min-h-[1.25rem] flex-1">
                  {status === 'success' && (
                    <p className="flex items-start gap-2 text-sm leading-relaxed text-lime">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                      {statusDetail}
                    </p>
                  )}
                  {status === 'error' && (
                    <p className="flex items-start gap-2 text-sm leading-relaxed text-danger">
                      <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                      {statusDetail}
                    </p>
                  )}
                </div>
              </div>

              <p className="mt-6 border-t border-line pt-5 font-mono text-[0.68rem] leading-relaxed text-muted/60">
                {useBackend
                  ? 'Messages are delivered straight to the configured form endpoint.'
                  : 'No server is running behind this form — submitting opens your own email client with the message pre-filled.'}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ChannelRow({
  href,
  icon,
  label,
  value,
  external = false,
}: {
  href: string
  icon: React.ReactNode
  label: string
  value: string
  external?: boolean
}) {
  return (
    <li>
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer noopener' : undefined}
        className="panel-soft group flex items-center gap-4 rounded-xl px-4 py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-lime/50"
      >
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-panel-2/80 text-muted transition-colors group-hover:text-lime">
          {icon}
        </span>
        <span className="min-w-0">
          <span className="block font-mono text-[0.66rem] uppercase tracking-[0.18em] text-muted/70">{label}</span>
          <span className="block truncate text-[0.92rem] text-ink">{value}</span>
        </span>
      </a>
    </li>
  )
}

function Field({
  id,
  label,
  value,
  error,
  type = 'text',
  autoComplete,
  onChange,
}: {
  id: string
  label: string
  value: string
  error?: string
  type?: string
  autoComplete?: string
  onChange: (value: string) => void
}) {
  return (
    <div>
      <label htmlFor={id} className="kicker block">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-2 w-full rounded-xl border bg-panel-2/70 px-4 py-3 text-[0.95rem] text-ink placeholder:text-muted/50 transition-colors focus:outline-none focus-visible:ring-0 ${
          error ? 'border-danger/70' : 'border-line focus:border-cyan/60'
        }`}
        placeholder={label}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
