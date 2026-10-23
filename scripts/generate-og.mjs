/**
 * Generates public/og-image.png (1200×630) for social sharing.
 * Run with: npm run og
 *
 * The artwork is drawn as SVG and rasterised with sharp (dev-only deps) —
 * no design tools required. Copy lives here; edit it to match the site.
 *
 * The sandbox/CI may have no system fonts, so this script converts the
 * bundled Inter variable font (woff2 → ttf) into a local fontconfig root
 * and points librsvg at it. The cache directory (.og-cache) is gitignored.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { decompress } from 'wawoff2'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const out = path.join(root, 'public', 'og-image.png')

/* ------------------------------------------------------------------
   Local font setup (works on machines without system fonts)
------------------------------------------------------------------ */
const fontDir = path.join(root, '.og-cache')
const fontFile = path.join(fontDir, 'Inter.ttf')
const fontConfig = path.join(fontDir, 'fonts.conf')

if (!fs.existsSync(fontFile)) {
  const woff2 = fs.readFileSync(
    path.join(root, 'node_modules', '@fontsource-variable', 'inter', 'files', 'inter-latin-wght-normal.woff2'),
  )
  fs.mkdirSync(path.join(fontDir, 'cache'), { recursive: true })
  fs.writeFileSync(fontFile, Buffer.from(await decompress(woff2)))
}

fs.writeFileSync(
  fontConfig,
  `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir>${fontDir}</dir>
  <cachedir>${path.join(fontDir, 'cache')}</cachedir>
</fontconfig>
`,
)
process.env.FONTCONFIG_FILE = fontConfig

const { default: sharp } = await import('sharp')

const SANS = 'Inter, sans-serif'
const MONO = 'Inter, sans-serif'

/* ------------------------------------------------------------------
   Artwork
------------------------------------------------------------------ */
const LAYERS = [
  { x: 905, ys: [150, 240, 330, 420] },
  { x: 1010, ys: [120, 205, 290, 375, 460] },
  { x: 1115, ys: [195, 300, 405] },
]

const edges = []
for (let l = 0; l < LAYERS.length - 1; l += 1) {
  for (const y1 of LAYERS[l].ys) {
    for (const y2 of LAYERS[l + 1].ys) {
      edges.push(
        `<line x1="${LAYERS[l].x}" y1="${y1}" x2="${LAYERS[l + 1].x}" y2="${y2}" stroke="#2A3650" stroke-width="1.4" opacity="0.55"/>`,
      )
    }
  }
}

const signals = [
  `<line x1="905" y1="150" x2="1010" y2="205" stroke="#B6F36B" stroke-width="2.4" opacity="0.9"/>`,
  `<line x1="905" y1="420" x2="1010" y2="375" stroke="#5DE4FF" stroke-width="2.4" opacity="0.8"/>`,
  `<line x1="1010" y1="290" x2="1115" y2="300" stroke="#B6F36B" stroke-width="2.4" opacity="0.9"/>`,
  `<line x1="1010" y1="205" x2="1115" y2="195" stroke="#5DE4FF" stroke-width="2.4" opacity="0.75"/>`,
]

const nodes = LAYERS.flatMap((layer, li) =>
  layer.ys.map((y, i) => {
    const accent = (li + i) % 2 === 0 ? '#B6F36B' : '#5DE4FF'
    return `<g>
      <circle cx="${layer.x}" cy="${y}" r="26" fill="${accent}" opacity="0.14"/>
      <circle cx="${layer.x}" cy="${y}" r="13" fill="#0C111C" stroke="${accent}" stroke-width="2.4"/>
      <circle cx="${layer.x}" cy="${y}" r="5.5" fill="${accent}"/>
    </g>`
  }),
)

const gridLines = []
for (let x = 0; x <= 1200; x += 60) {
  gridLines.push(`<line x1="${x}" y1="0" x2="${x}" y2="630" stroke="#9AA6B8" stroke-width="1" opacity="0.05"/>`)
}
for (let y = 0; y <= 630; y += 60) {
  gridLines.push(`<line x1="0" y1="${y}" x2="1200" y2="${y}" stroke="#9AA6B8" stroke-width="1" opacity="0.05"/>`)
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glowLime" cx="85%" cy="85%" r="55%">
      <stop offset="0%" stop-color="#B6F36B" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="#B6F36B" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowCyan" cx="10%" cy="5%" r="55%">
      <stop offset="0%" stop-color="#5DE4FF" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#5DE4FF" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="#080B12"/>
  <rect width="1200" height="630" fill="url(#glowLime)"/>
  <rect width="1200" height="630" fill="url(#glowCyan)"/>
  ${gridLines.join('\n  ')}

  <!-- brand mark -->
  <g transform="translate(90, 78)">
    <rect x="0" y="0" width="52" height="52" rx="13" fill="#0C111C" stroke="#1B2434" stroke-width="2"/>
    <g stroke="#5DE4FF" stroke-width="2" opacity="0.7" fill="none">
      <path d="M15 17 L26 26 L37 17"/><path d="M26 26 L26 37"/><path d="M15 37 L26 26"/>
    </g>
    <circle cx="15" cy="17" r="3.4" fill="#B6F36B"/>
    <circle cx="37" cy="17" r="3.4" fill="#5DE4FF"/>
    <circle cx="26" cy="26" r="4.4" fill="#B6F36B"/>
    <circle cx="15" cy="37" r="3.4" fill="#5DE4FF" opacity="0.8"/>
    <text x="68" y="35" font-family="${MONO}" font-size="27" letter-spacing="3" fill="#F4F7FB">FADIL<tspan fill="#B6F36B">.AI</tspan></text>
  </g>

  <!-- copy -->
  <text x="90" y="255" font-family="${SANS}" font-size="52" letter-spacing="1" fill="#F4F7FB">MUHAMMED FADIL FAROOK</text>
  <text x="90" y="330" font-family="${SANS}" font-size="34" fill="#9AA6B8">Building Intelligent Solutions</text>
  <text x="90" y="378" font-family="${SANS}" font-size="34" fill="#B6F36B">for the Real World.</text>

  <line x1="90" y1="435" x2="760" y2="435" stroke="#1B2434" stroke-width="2"/>
  <text x="90" y="482" font-family="${MONO}" font-size="18" letter-spacing="2.5" fill="#5DE4FF">ASPIRING AI ENGINEER · PYTHON DEVELOPER · AI/ML ENTHUSIAST</text>
  <text x="90" y="540" font-family="${MONO}" font-size="17" letter-spacing="2" fill="#9AA6B8" opacity="0.8">PROJECTS · SKILLS · LEARNING JOURNEY</text>

  <!-- neural motif -->
  ${edges.join('\n  ')}
  ${signals.join('\n  ')}
  ${nodes.join('\n  ')}
</svg>`

await sharp(Buffer.from(svg)).png({ quality: 92 }).toFile(out)
console.log(`OG image written to ${out}`)
