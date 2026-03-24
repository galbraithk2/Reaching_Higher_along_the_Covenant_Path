# Project: Reaching Higher — The Covenant Path (GitHub Pages)

## Tech stack
- **Framework:** Next.js 16 + React 19 + TypeScript
- **Styling:** Custom CSS (`/src/app/globals.css`) with CSS variables (design tokens). Tailwind v4 is installed but utility classes are not currently used.
- **Fonts:** DM Sans (headings) + Inter (body) via `next/font/google` with `font-display: swap`
- **Build:** `npm run build` → static export to `/out/`
- **Deployment:** GitHub Actions (`.github/workflows/deploy.yml`) → GitHub Pages on push to `main`
- **Base path:** `/Reaching_Higher_along_the_Covenant_Path` (configured in `next.config.ts`)

## Source of truth
- **Content data:** `src/data/content.ts` — all booth and class content lives here as TypeScript objects (`booths`, `classes`, `categories`, `catColors`, `catLabels`). Each category entry also includes `emoji` and `quote` fields.
- **Main page:** `src/app/page.tsx` — the home page; manages modal state and renders all sections (hero, invite strip, SectionNav, map, classes, booth categories, CTA, modals).
- **Styles:** `src/app/globals.css` — all CSS in one file (~1707 lines), organized by design tokens, resets, components, hall-page styles, and responsive breakpoints.
- Preserve existing wording/content, layout intent, and component behavior unless explicitly requested to change.

## Repo structure

```
src/
  app/
    layout.tsx          # Root layout, fonts, metadata, Google Analytics (G-6SH6W03ZGT)
    page.tsx            # Main page; renders hero/strip/SectionNav inline + all sections
    globals.css         # All styles (~1707 lines: design tokens + components + hall-page)
    event/
      page.tsx          # Alternate full-page view; reached via secret trigger in CTASection
    hall/
      page.tsx          # Interactive cultural-hall floor plan tool (table assignment)
  components/
    Hero.tsx            # Hero section with background image (used by event/page.tsx)
    InviteStrip.tsx     # Event info banner (used by event/page.tsx)
    SectionNav.tsx      # Sticky section jump-nav (map, classes, temple, missionary, rising, selfreliance)
    BoothCard.tsx       # Booth card (clickable, opens detail modal)
    ClassCard.tsx       # Class card (clickable, opens detail modal)
    DetailModal.tsx     # Shared detail modal for booths and classes
    FlyerModal.tsx      # Flyer sharing modal (copy link, QR, downloads)
    CTASection.tsx      # "Download Flyers & Links" button; accepts onSecretTrigger / disableStakeNav props
    ScrollReveal.tsx    # IntersectionObserver-based reveal animation
    HiddenRevision.tsx  # Legacy alternative layout component (currently unused by any route)
    Footer.tsx          # Disclaimer footer
  data/
    content.ts          # All booth/class/category data (242 lines)
  lib/
    basePath.ts         # BASE_PATH constant for asset URLs
public/
  images/               # All images (hero.jpg, QR code, flyers, maps, etc.)
  pdfs/                 # Printable flyer PDFs and DOCX originals
assets/images/          # Archive/backup (not used in build)
docs/                   # Setup guides and document templates (not used in build)
.github/workflows/
  deploy.yml            # GitHub Actions deployment
```

### Additional routes
- **`/event`** — A standalone copy of the main page accessible via a secret trigger in `CTASection`. Includes a fixed close button (×) to navigate back to `/`. Uses `Hero.tsx` and `InviteStrip.tsx` as imported components (unlike the main page which renders them inline). Passes `disableStakeNav={true}` to CTASection.
- **`/hall`** — Interactive cultural-hall floor plan tool. Shows 19 numbered tables (16 horizontal, 3 vertical) and 5 round tables on a to-scale room diagram. Lets organizers drag-assign booths to tables by clicking a table then clicking a booth card. Assignments persist via `localStorage`. Includes power outlet indicators and a password-protected reset (double-click "Stake" in subtitle → password prompt).

## Non-negotiables (preserve outward behavior)
You may refactor internals only if requested or clearly justified, but the outward UX and features must not regress. If anything structural changes, provide a no-regression checklist and keep functionality intact.

### Must-not-break features

#### 1) Flyer / Handouts modal (`FlyerModal.tsx`)
- CTA in `CTASection.tsx` sets `flyerOpen` state to `true`.
- Close button and backdrop click set it to `false`.
- Flyer download links and "Copy Link" must continue to work.
- Must remain usable on mobile (scrollable modal content, safe-area padding).

#### 2) Booth/Class details modal (`DetailModal.tsx`)
- Shared modal controlled by `modal` state in `page.tsx` (and `event/page.tsx`).
- Clicking booth cards and class cards must open the correct details and close reliably.
- Escape key and backdrop click close the modal.
- Content rendered via `dangerouslySetInnerHTML` (supports HTML, YouTube embeds, images).

#### 3) Data-driven content generation
- Booths and classes are generated from TypeScript data in `src/data/content.ts`.
- Prefer editing content in the data objects rather than duplicating JSX.
- Categories: `temple`, `missionary`, `rising`, `selfreliance` — each with `color`, `label`, `emoji`, and `quote` fields.

#### 4) Scroll reveal / animations (`ScrollReveal.tsx`)
- IntersectionObserver adds `.visible` class for reveal animations.
- Avoid motion that harms accessibility; respect reduced motion preferences when possible.

#### 5) External links + downloads
- External/YouTube links: `target="_blank"` + `rel="noopener noreferrer"`.
- PDFs stored in `/public/pdfs/` and must remain downloadable.
- Do not replace working downloads with fragile script-only solutions.

#### 6) Image paths
- All images in code must use `BASE_PATH` prefix from `src/lib/basePath.ts`.
- Pattern: `` `${BASE_PATH}/images/filename.jpg` ``
- Static assets served from `/public/`.

#### 7) Sticky section navigation (`SectionNav.tsx`)
- Renders a horizontal sticky nav bar with jump links: Conference Map, Mini-Classes, Temple, Missionary, Rising Gen, Self-Reliance.
- Highlights the active section as you scroll using IntersectionObserver logic.
- Supports `idPrefix` prop (main page uses `"hr-"` prefix on section IDs), `scrollContainerId`, and `navId` props to avoid duplicate IDs when multiple navs are in the DOM.
- Do not remove section `id` attributes or change the `idPrefix` convention without updating `SectionNav`.

#### 8) Hall floor plan (`/hall`)
- Table-to-booth assignments persist in `localStorage` under key `"hall-assignments"`.
- Color coding matches category colors (`temple`, `missionary`, `rising`, `selfreliance`).
- Do not change `CategoryKey` values without updating the hall page's `catColorMap`.
- Secret reset: double-click "Stake" in the subtitle → password modal (password: `"fun"`).

## Professional quality requirements
- Modern, professional UI: consistent spacing, clean typography, polished cards and pills/tags.
- Mobile-first responsive layout; no fixed-width assumptions.
- Accessibility:
  - Semantic HTML (`header`, `nav`, `main`, `section`, `footer`)
  - Keyboard navigation works (Escape closes modals)
  - Visible focus rings with `:focus-visible`
  - Adequate contrast and readable font sizes
  - No hover-only interactions
- Performance:
  - Minimal dependencies; avoid heavy libraries unless requested
  - Optimize assets (images/PDF organization)
  - Avoid layout shifts

## Cross-device compatibility (must meet)
Target devices/browsers:
- Desktop: Windows/macOS on Chrome, Edge, Firefox, Safari
- Mobile/Tablet: iOS/iPadOS Safari + Chrome, Android Chrome + Firefox

Compatibility rules:
- Mobile-first CSS (works from ~320px phones up to large desktops)
- Touch-friendly: tap targets >= 44px for interactive elements
- Avoid hover-only UI; everything must work on touch
- Use flexible units (%, rem, clamp(), max-width), not rigid pixel layouts
- Use CSS Grid/Flexbox; avoid fragile layout hacks
- Avoid features with limited support unless a fallback exists (e.g., `backdrop-filter` must degrade gracefully)
- Be careful with iOS modal scrolling/body scroll locking (do not break scrolling inside modals)
- If using `navigator.clipboard.writeText`, include a fallback for failures/permissions/older browsers
- Images: use responsive sizing, avoid layout shift (set width/height or use aspect-ratio)

## Collaboration workflow (CRITICAL: avoid context overflow)
- Work on one feature/change at a time.
- Request only the smallest relevant snippet for a specific component/section/function.
- Output format:
  - Prefer unified diffs or "changed sections only" with clear file paths.
  - Only output full files if explicitly asked.
- Keep component names, props, and state variable names stable unless a migration plan is provided.

## Verification checklist (run after any change)
1. iPhone Safari: open flyer modal, close it, scroll inside it, download a flyer, tap "copy link"
2. Android Chrome: open booth/class modal, close it, open a YouTube/external link
3. Desktop Chrome/Edge: resize narrow-wide; cards reflow; keyboard tab focus is visible; modals open/close
4. Desktop Safari/Firefox (if available): confirm modals, rendering, and downloads still work
5. Build check: `npm run build` completes without errors

## Definition of done
- Looks professional on mobile + desktop.
- All current modals, cards, downloads, and links work as before.
- Responsive, accessible, and fast for a GitHub Pages static site.
- `npm run build` succeeds with no errors.
