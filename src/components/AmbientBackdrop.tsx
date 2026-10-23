/**
 * Static decorative backdrop: soft radial glows + a masked fine grid.
 * Pure CSS — no JS animation, zero network cost.
 */
export default function AmbientBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 ambient-glow" />
      <div className="absolute inset-0 ambient-grid" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />
    </div>
  )
}
