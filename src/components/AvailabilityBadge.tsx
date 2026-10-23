import { site } from '../config/site'

interface AvailabilityBadgeProps {
  className?: string
}

/**
 * Small "availability" indicator. Configured in src/config/site.ts —
 * set `availability.enabled` to false to hide it everywhere.
 */
export default function AvailabilityBadge({ className = '' }: AvailabilityBadgeProps) {
  if (!site.availability.enabled) return null

  // The visibility classes from `className` (e.g. "hidden xl:inline-flex")
  // live on a wrapper so they always win over the badge's own display style.
  return (
    <span className={className}>
      <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-panel/70 px-3.5 py-1.5 font-mono text-[0.7rem] tracking-[0.12em] text-muted backdrop-blur">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-lime/70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
        </span>
        {site.availability.text}
      </span>
    </span>
  )
}
