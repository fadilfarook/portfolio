# FADIL.AI — Muhammed Fadil Farook, Portfolio

A premium dark-mode personal portfolio for an aspiring AI Engineer: a Computer Science
student specialising in Artificial Intelligence and Machine Learning.

**Stack:** React 19 · Vite · TypeScript · Tailwind CSS 4 · Framer Motion · Lucide icons
Fonts are self-hosted (Inter, Space Grotesk, JetBrains Mono) — no external requests at runtime.

---

## Quick start

```bash
cd portfolio
npm install
npm run dev        # http://localhost:5173
```

| Command             | What it does                                        |
| ------------------- | --------------------------------------------------- |
| `npm run dev`       | Dev server with hot reload                          |
| `npm run build`     | Type-check (`tsc`) + production build into `dist/`  |
| `npm run preview`   | Serve the production build locally                  |
| `npm run og`        | Regenerate `public/og-image.png` from the SVG spec  |

---

## Where to edit things

All personal content lives in **`src/config/`** — no component hardcodes it.

| File                    | Controls                                                                                     |
| ----------------------- | -------------------------------------------------------------------------------------------- |
| `src/config/site.ts`    | Name, headline, hero copy, About text, availability badge, **social links**, **resume**, nav, contact form endpoint, section visibility |
| `src/config/skills.ts`  | Skill groups and items                                                                        |
| `src/config/projects.ts`| The whole project gallery (cards + detail dialogs)                                            |
| `src/config/journey.ts` | Education, learning timeline, **certifications**                                              |

The visual system (colours, fonts, radii, motion) is in `src/index.css` under `@theme` —
change `--color-lime`, `--color-cyan`, etc. to retheme everything at once.

---

## Configuration you still need to do

### 1. Email address (required for the contact form's mailto fallback)

In `src/config/site.ts`:

```ts
socials: {
  email: 'you@example.com',
  ...
}
```

Without it, the form shows an honest error and the email buttons stay hidden.

### 2. LinkedIn URL

```ts
socials: {
  linkedin: 'https://www.linkedin.com/in/your-handle',
}
```

The GitHub URL is already set to `https://github.com/fadilfarook` (from this repo's
account) — change it if your handle differs.

### 3. Resume PDF

1. Drop your PDF at `portfolio/public/resume.pdf`
2. In `src/config/site.ts`:

```ts
resume: {
  url: '/resume.pdf',
  fileName: 'Muhammed-Fadil-Farook-Resume.pdf',
}
```

Until then, the "Download Resume" button shows a truthful "not available yet" notice.

### 4. Graduation year

`src/config/journey.ts` → `education.period` currently reads
`'Graduation year — to be confirmed'`. Replace it with the real year and set
`periodIsPlaceholder: false`.

### 5. Canonical URL + Open Graph

After the first deploy, add your real URL to `index.html`:

```html
<meta property="og:url" content="https://your-domain.example/" />
```

and, recommended, make the two `og:image` / `twitter:image` tags absolute
(`https://your-domain.example/og-image.png`) so every social platform resolves them.

---

## Contact form options

There is **no fake backend**. Two real modes, chosen automatically:

1. **Mailto fallback (default)** — validates the input, then opens the visitor's email
   client with a pre-filled message to `socials.email`. Works with zero setup.
2. **Form endpoint (optional)** — set `contact.formEndpoint` in `src/config/site.ts`, e.g.
   a Formspree URL (`https://formspree.io/f/yourFormId`). The form then POSTs JSON and
   shows a real success/error state from the service's response.

---

## Content integrity

Projects carry an explicit `status` in `src/config/projects.ts`:

- `built` — exists and works (the Weather Application)
- `in-progress` — actively being developed
- `planned` — an idea; the UI renders it with a dashed border, a "Planned" badge and a
  "Status: idea stage" note in the dialog

Only the Weather Application is marked `built`. **Do not mark a project `built` before it
actually runs.** Certifications are an empty array by default; the section shows a
tasteful "check back soon" note until real certificates are added (or set
`sections.certifications = false` in `site.ts` to hide it).

---

## Adding a project

Append one object to `projects` in `src/config/projects.ts` — card, tags, and detail
dialog all render automatically:

```ts
{
  id: 'my-new-project',
  title: 'My New Project',
  status: 'built',
  tagline: 'One line for the card.',
  description: 'Longer write-up for the dialog.',
  technologies: ['Python', 'Flask'],
  features: ['What it does'],
  roadmap: ['What comes next'],
  links: { repo: 'https://github.com/you/repo' }, // omit until it exists
  icon: 'chart', // 'weather' | 'chart' | 'vision' | 'book'
}
```

---

## Deployment

The build is a static bundle — deploy `dist/` anywhere.

**Vercel / Netlify / Cloudflare Pages**

- Framework preset: **Vite**
- Build command: `npm run build` (run inside `portfolio/`)
- Output directory: `portfolio/dist`

**GitHub Pages** (project site): set `base: '/AI-Engineer-journey/'` in `vite.config.ts`,
build, then publish `dist/`.

Any static host works: upload the contents of `dist/` after `npm run build`.

---

## Accessibility & motion

- Semantic sections with a skip link, labelled headings and a visible focus ring
- Mobile menu and project dialog: Escape closes, focus is trapped and restored,
  body scroll locks while open
- All animation honours `prefers-reduced-motion` (typing effect freezes, marquee stops,
  reveals render instantly)
- Colour contrast checked against the palette; no content depends on colour alone

---

## Project structure

```
portfolio/
├── public/            favicon.svg, og-image.png, (resume.pdf — add yours)
├── scripts/
│   ├── generate-og.mjs   regenerates the social-share image
│   └── qa-check.mjs      headless layout/interaction checks (needs: npm i -D playwright)
└── src/
    ├── components/    Navbar, Hero, NeuralPanel, About, Skills, Projects,
    │                  ProjectCard, ProjectDetails, Journey, Certifications,
    │                  Contact, Footer, BackToTop, ...
    ├── config/        site.ts · skills.ts · projects.ts · journey.ts
    └── index.css      design tokens (@theme) + component classes
```

## QA script

`scripts/qa-check.mjs` drives headless Chromium against a running build and checks for
horizontal overflow at 320/390/768/1440 px, console errors, and the mobile menu, dialog
and resume-notice interactions:

```bash
npm i -D playwright && npx playwright install chromium
npm run build && npm run preview -- --port 4173 &
node scripts/qa-check.mjs http://localhost:4173
```

Screenshots land in `portfolio/artifacts/`.
