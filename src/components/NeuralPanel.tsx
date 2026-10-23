import { useEffect, useMemo, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/* ------------------------------------------------------------------
   Layer geometry for the decorative network
------------------------------------------------------------------ */
const LAYERS = [4, 5, 5, 3] as const
const WIDTH = 420
const HEIGHT = 300
const LAYER_X = [58, 168, 278, 372]

interface Node {
  x: number
  y: number
  layer: number
}

interface Edge {
  x1: number
  y1: number
  x2: number
  y2: number
  fromIndex: number
  toIndex: number
}

function buildNetwork() {
  const nodes: Node[] = []
  const edges: Edge[] = []

  LAYERS.forEach((count, layer) => {
    const gap = HEIGHT / (count + 1)
    for (let i = 0; i < count; i += 1) {
      nodes.push({ x: LAYER_X[layer], y: Math.round(gap * (i + 1)), layer })
    }
  })

  const indexOf = (layer: number, i: number) => {
    let offset = 0
    for (let l = 0; l < layer; l += 1) offset += LAYERS[l]
    return offset + i
  }

  for (let layer = 0; layer < LAYERS.length - 1; layer += 1) {
    for (let a = 0; a < LAYERS[layer]; a += 1) {
      for (let b = 0; b < LAYERS[layer + 1]; b += 1) {
        const fromIndex = indexOf(layer, a)
        const toIndex = indexOf(layer + 1, b)
        const from = nodes[fromIndex]
        const to = nodes[toIndex]
        edges.push({ x1: from.x, y1: from.y, x2: to.x, y2: to.y, fromIndex, toIndex })
      }
    }
  }

  return { nodes, edges }
}

/**
 * Edges that carry the animated "signal" — a representative handful,
 * addressed as `fromIndex-toIndex` in the flat node list.
 * Node index map: layer0 = 0–3, layer1 = 4–8, layer2 = 9–13, layer3 = 14–16.
 */
const SIGNAL_KEYS = new Set(['0-4', '3-8', '5-9', '6-11', '7-13', '9-14', '11-16', '12-15'])

/**
 * Hero visual: an original, lightweight neural-network diagram drawn in SVG.
 * Edges pulse with a subtle dash-flow; a few nodes fire in sequence; a small
 * mono readout ticks alongside it. All motion is CSS and pauses under
 * prefers-reduced-motion.
 */
export default function NeuralPanel() {
  const { nodes, edges } = useMemo(buildNetwork, [])
  const reduceMotion = useReducedMotion()
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const id = window.setInterval(() => setTick((t) => t + 1), 2200)
    return () => window.clearInterval(id)
  }, [reduceMotion])

  const epoch = 8 + (tick % 43)
  const loss = (0.4126 / (1 + tick * 0.22)).toFixed(4)
  const progress = Math.min(96, 12 + tick * 4)

  return (
    <div className="relative">
      {/* ambient glow behind the panel */}
      <div
        aria-hidden="true"
        className="absolute -inset-8 -z-10 rounded-[3rem] bg-[radial-gradient(60%_50%_at_30%_20%,rgba(93,228,255,0.14),transparent_70%),radial-gradient(55%_45%_at_75%_80%,rgba(182,243,107,0.13),transparent_70%)] blur-2xl"
      />

      <div className="panel relative rounded-2xl p-4 sm:p-5">
        {/* panel header */}
        <div className="flex items-center justify-between gap-3 border-b border-line pb-3 font-mono text-[0.66rem] uppercase tracking-[0.2em] text-muted">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse-soft" aria-hidden="true" />
            fadil_net · forward pass
          </span>
          <span className="text-cyan/80">graph / v0.3</span>
        </div>

        {/* network diagram */}
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="mt-3 w-full"
          role="img"
          aria-label="Decorative diagram of a small neural network with signals travelling between layers"
        >
          <defs>
            <radialGradient id="halo-lime">
              <stop offset="0%" stopColor="#B6F36B" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#B6F36B" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="halo-cyan">
              <stop offset="0%" stopColor="#5DE4FF" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#5DE4FF" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* edges */}
          <g strokeLinecap="round">
            {edges.map((edge, i) => {
              const key = `${edge.fromIndex}-${edge.toIndex}`
              const signal = SIGNAL_KEYS.has(key)
              const cyan = i % 3 === 0
              return (
                <line
                  key={`e-${i}`}
                  x1={edge.x1}
                  y1={edge.y1}
                  x2={edge.x2}
                  y2={edge.y2}
                  stroke={signal ? (cyan ? '#5DE4FF' : '#B6F36B') : '#2A3650'}
                  strokeWidth={signal ? 1.4 : 0.8}
                  opacity={signal ? 0.85 : 0.32}
                  strokeDasharray={signal ? '26 194' : undefined}
                  className={signal ? (cyan ? 'animate-signal-2' : 'animate-signal') : undefined}
                  style={signal ? { strokeDashoffset: 0 } : undefined}
                />
              )
            })}
          </g>

          {/* nodes */}
          <g>
            {nodes.map((node, i) => {
              const firing = i % 4 === 1
              const cyan = node.layer === 1 || node.layer === 3
              return (
                <g key={`n-${i}`}>
                  <circle cx={node.x} cy={node.y} r={15} fill={cyan ? 'url(#halo-cyan)' : 'url(#halo-lime)'} />
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={7.5}
                    fill="#0C111C"
                    stroke={cyan ? '#5DE4FF' : '#B6F36B'}
                    strokeWidth="1.4"
                    opacity="0.9"
                  />
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={3.2}
                    fill={cyan ? '#5DE4FF' : '#B6F36B'}
                    className={firing && !reduceMotion ? 'animate-pulse-soft' : undefined}
                  />
                </g>
              )
            })}
          </g>

          {/* layer labels */}
          <g fontFamily="JetBrains Mono Variable, monospace" fontSize="9" fill="#9AA6B8" opacity="0.65" textAnchor="middle">
            <text x={LAYER_X[0]} y={HEIGHT - 6}>input</text>
            <text x={LAYER_X[1]} y={HEIGHT - 6}>dense</text>
            <text x={LAYER_X[2]} y={HEIGHT - 6}>dense</text>
            <text x={LAYER_X[3]} y={HEIGHT - 6}>out</text>
          </g>
        </svg>

        {/* readout */}
        <div className="mt-3 grid grid-cols-3 gap-2 border-t border-line pt-3 font-mono text-[0.66rem] text-muted">
          <div>
            <span className="block text-[0.58rem] uppercase tracking-[0.18em] text-muted/60">epoch</span>
            <span className="text-ink">{String(epoch).padStart(2, '0')}/50</span>
          </div>
          <div>
            <span className="block text-[0.58rem] uppercase tracking-[0.18em] text-muted/60">loss</span>
            <span className="text-lime">{loss}</span>
          </div>
          <div>
            <span className="block text-[0.58rem] uppercase tracking-[0.18em] text-muted/60">status</span>
            <span className="text-cyan">{reduceMotion ? 'idle' : 'training'}</span>
          </div>
        </div>

        {/* progress hairline */}
        <div className="mt-3 h-px w-full bg-line" aria-hidden="true">
          <div
            className="h-px bg-gradient-to-r from-lime to-cyan transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* floating chips */}
      <span className="chip absolute -left-3 top-14 hidden bg-panel/90 shadow-xl shadow-black/40 sm:inline-flex" aria-hidden="true">
        python
      </span>
      <span className="chip absolute -right-3 bottom-16 hidden bg-panel/90 shadow-xl shadow-black/40 sm:inline-flex" aria-hidden="true">
        scikit-learn
      </span>
    </div>
  )
}
