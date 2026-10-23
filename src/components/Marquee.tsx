interface MarqueeProps {
  items: string[]
}

/**
 * Thin mono marquee strip used as a section divider.
 * Duplicated content + translateX(-50%) gives a seamless loop,
 * and the global reduced-motion rule freezes it into a static row.
 */
export default function Marquee({ items }: MarqueeProps) {
  const doubled = [...items, ...items]

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-line/70 bg-panel-2/40 py-3.5"
    >
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-10 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-muted/60">
            <span>{item}</span>
            <span className="text-lime/50">◆</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-void to-transparent" />
    </div>
  )
}
