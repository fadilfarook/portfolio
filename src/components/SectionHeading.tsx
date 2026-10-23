import Reveal from './Reveal'

interface SectionHeadingProps {
  index: string
  kicker: string
  title: React.ReactNode
  description?: string
  align?: 'left' | 'center'
  /** id for the h2, for aria-labelledby on the section */
  titleId?: string
}

/**
 * Shared section header: mono index + kicker, display title,
 * optional supporting copy, and a fading hairline rule.
 */
export default function SectionHeading({ index, kicker, title, description, align = 'left', titleId }: SectionHeadingProps) {
  const centered = align === 'center'

  return (
    <Reveal className={centered ? 'text-center' : ''}>
      <p className="kicker flex items-center gap-3" aria-hidden="true">
        {!centered && <span className="text-lime">{index}</span>}
        {!centered && <span className="h-px w-8 bg-line-strong" />}
        <span>{kicker}</span>
        {centered && <span className="h-px w-8 bg-line-strong" />}
      </p>

      <h2 id={titleId} className="mt-4 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>

      {description && (
        <p className={`mt-4 max-w-2xl text-base leading-relaxed text-muted ${centered ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}

      <div className={`mt-7 h-px w-full max-w-3xl hairline ${centered ? 'mx-auto' : ''}`} aria-hidden="true" />
    </Reveal>
  )
}
