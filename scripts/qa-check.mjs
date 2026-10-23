/**
 * Headless QA pass for the portfolio.
 * Run against a running preview server:  node scripts/qa-check.mjs http://localhost:4173
 *
 * Checks:
 *  - no console errors / page errors
 *  - no horizontal overflow at desktop, tablet and mobile widths
 *  - desktop + mobile screenshots
 *  - mobile menu opens/closes (Escape)
 *  - project detail dialog opens, traps Escape, and closes
 *  - resume notice appears while no PDF is configured
 */
import { chromium } from 'playwright'
import fs from 'node:fs'
const base = process.argv[2] ?? 'http://localhost:4173'
const artifacts = new URL('../artifacts/', import.meta.url).pathname
fs.mkdirSync(artifacts, { recursive: true })

const results = []
const browser = await chromium.launch()

async function checkViewport(name, width, height) {
  const context = await browser.newContext({ viewport: { width, height } })
  const page = await context.newPage()
  const errors = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`console: ${msg.text()}`)
  })
  page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`))

  await page.goto(base, { waitUntil: 'networkidle' })
  await page.waitForTimeout(600)

  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }))
  results.push(
    `[${name}] overflow: scrollWidth=${overflow.scrollWidth} innerWidth=${overflow.innerWidth} → ${
      overflow.scrollWidth > overflow.innerWidth + 1 ? 'OVERFLOW ✗' : 'ok ✓'
    }`,
  )

  await page.screenshot({ path: `${artifacts}${name}-top.png` })

  // Scroll through the page so whileInView reveals actually fire,
  // then capture per-section + full-page shots.
  const sections = ['about', 'skills', 'projects', 'journey', 'contact']
  for (const id of sections) {
    await page.evaluate((sectionId) => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'instant', block: 'start' })
    }, id)
    await page.waitForTimeout(650)
    if (name.startsWith('desktop') || name.startsWith('mobile')) {
      await page.screenshot({ path: `${artifacts}${name}-section-${id}.png` })
    }
  }
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }))
  await page.waitForTimeout(700)
  await page.screenshot({ path: `${artifacts}${name}-full.png`, fullPage: true })

  results.push(`[${name}] console/page errors: ${errors.length ? errors.join(' | ') : 'none ✓'}`)
  await context.close()
  return errors
}

/* ---- desktop & mobile screenshots + overflow ---- */
const desktopErrors = await checkViewport('desktop-1440', 1440, 900)
const mobileErrors = await checkViewport('mobile-390', 390, 844)
await checkViewport('tablet-768', 768, 1024)
await checkViewport('small-320', 320, 640)

/* ---- interactions ---- */
async function step(name, fn) {
  try {
    await fn()
  } catch (err) {
    results.push(`[interaction] ${name}: FAILED (${String(err).split('\n')[0]})`)
  }
}

const context = await browser.newContext({ viewport: { width: 390, height: 844 } })
const page = await context.newPage()

await page.goto(base, { waitUntil: 'networkidle' })

// mobile menu
await step('mobile menu', async () => {
  await page.click('button[aria-controls="mobile-menu"]', { timeout: 8000 })
  await page.waitForTimeout(400)
  const menuVisible = await page.isVisible('#mobile-menu')
  results.push(`[interaction] mobile menu opens: ${menuVisible ? '✓' : '✗'}`)
  await page.screenshot({ path: `${artifacts}mobile-menu.png` })
  await page.keyboard.press('Escape')
  await page.waitForTimeout(350)
  const menuClosed = !(await page.isVisible('#mobile-menu'))
  results.push(`[interaction] Escape closes menu: ${menuClosed ? '✓' : '✗'}`)
})

// resume notice (no PDF configured)
await step('resume notice', async () => {
  await page.locator('button:has-text("Download Resume")').scrollIntoViewIfNeeded()
  await page.click('button:has-text("Download Resume")', { timeout: 8000 })
  await page.waitForTimeout(250)
  const notice = await page.isVisible('#resume-notice')
  results.push(`[interaction] resume notice (unconfigured PDF): ${notice ? '✓' : '✗'}`)
})

// project dialog
await step('project dialog (mobile)', async () => {
  const btn = page.locator('button[aria-label="View details for Weather Application"]')
  await btn.scrollIntoViewIfNeeded()
  await btn.click({ timeout: 8000 })
  await page.waitForTimeout(500)
  const dialogOpen = await page.isVisible('[role="dialog"]')
  results.push(`[interaction] project dialog opens: ${dialogOpen ? '✓' : '✗'}`)
  await page.screenshot({ path: `${artifacts}mobile-dialog.png` })
  await page.keyboard.press('Escape')
  await page.waitForTimeout(400)
  const dialogClosed = !(await page.isVisible('[role="dialog"]'))
  results.push(`[interaction] Escape closes dialog: ${dialogClosed ? '✓' : '✗'}`)
})

// desktop dialog screenshot
const dctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const dpage = await dctx.newPage()
await dpage.goto(base, { waitUntil: 'networkidle' })
await step('project dialog (desktop)', async () => {
  const btn = dpage.locator('button[aria-label="View details for Student Performance Prediction"]')
  await btn.scrollIntoViewIfNeeded()
  await btn.click({ timeout: 8000 })
  await dpage.waitForTimeout(500)
  await dpage.screenshot({ path: `${artifacts}desktop-dialog.png` })
  await dpage.keyboard.press('Escape')
  await dpage.waitForTimeout(300)
})

// scroll to contact + footer for a desktop shot
await dpage.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
await dpage.waitForTimeout(700)
await dpage.screenshot({ path: `${artifacts}desktop-contact.png` })

await browser.close()

console.log('\n===== QA RESULTS =====')
for (const line of results) console.log(line)
const failed = [...desktopErrors, ...mobileErrors].length > 0
process.exit(failed ? 1 : 0)
