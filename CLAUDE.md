# Project: Reaching Higher — The Covenant Path (GitHub Pages)

## Tech stack
- **Framework:** Next.js 16 + React 19 + TypeScript
- **Styling:** Custom CSS (`/src/app/globals.css`) with CSS variables (design tokens). Tailwind v4 is installed but utility classes are not currently used.
- **Fonts:** DM Sans (headings) + Inter (body) via `next/font/google` with `font-display: swap`
- **Build:** `npm run build` → static export to `/out/`
- **Deployment:** GitHub Actions (`.github/workflows/deploy.yml`) → GitHub Pages on push to `main`
- **Base path:** `/Reaching_Higher_along_the_Covenant_Path` (configured in `next.config.ts`)

## Source of truth
- **Content data:** `src/data/content.ts` — all booth and class content lives here as TypeScript objects (`booths`, `classes`, `categories`, `catColors`, `catLabels`).
- **Main page:** `src/app/page.tsx` — the home page; manages modal state and renders all sections.
- **Styles:** `src/app/globals.css` — all CSS in one file (~1079 lines), organized by design tokens, resets, components, and responsive breakpoints.
- Preserve existing wording/content, layout intent, and component behavior unless explicitly requested to change.

## Repo structure

```
src/
  app/
    layout.tsx          # Root layout, fonts, metadata
    page.tsx            # Main page, modal state management
    globals.css         # All styles (design tokens + components)
  components/
    Hero.tsx            # Hero section with background image
    InviteStrip.tsx     # Event info banner
    SectionNav.tsx      # Category navigation pills (colored by category)
    BoothCard.tsx       # Booth card (clickable, opens detail modal)
    ClassCard.tsx       # Class card (clickable, opens detail modal)
    DetailModal.tsx     # Shared detail modal for booths and classes
    FlyerModal.tsx      # Flyer sharing modal (copy link, QR, downloads)
    CTASection.tsx      # "Download Flyers & Links" button
    ScrollReveal.tsx    # IntersectionObserver-based reveal animation
    Footer.tsx          # Disclaimer footer
  data/
    content.ts          # All booth/class/category data
  lib/
    basePath.ts         # BASE_PATH constant for asset URLs
public/
  images/               # All images (hero.jpg, QR code, flyers, etc.)
  pdfs/                 # Printable flyer PDFs
assets/images/          # Archive/backup (not used in build)
.github/workflows/
  deploy.yml            # GitHub Actions deployment
```

## Current content state (updated March 2026)

This section captures the current state of the site content so future sessions don't need to re-discover it from git history.

### Booths (4 categories, rendered from `src/data/content.ts`)
- **Temple & Family History (6 booths):** FamilySearch: Ordinances Ready, Preparing Children for the Temple, Family History Q&A + RootsTech Highlights, Photo Scanning Station, Preserving Family Memories, Family Recipes
- **Missionary Work (6 booths):** Returned Missionary Q&A, Senior Missionary Booth, Sharing the Gospel on Social Media, Sharing the Gospel in the Community, Family Missionary Plan, JustServe Booth (includes "Bags of Love" service project with detailed HTML content and image)
- **Rising Generation (3 booths):** Primary Activities Corner, Strengthening Gospel Study in the Home, Institute Booth
- **Self-Reliance (5 booths):** Addiction Recovery & Mental Health, Life Skills: Personal Finances & Emotional Resilience, plus 3 emergency preparedness booths (96 Hours, Family Plan, Volunteering in a Crisis)

### Mini Classes (8 classes, rendered from `classes` array in `content.ts`)
1. President Edwin Wells — Chapel, every 20 min
2. President Kristin Galbraith (Teaching within the Home) — High Council Room, every 20 min
3. Take Charge of Technology — Relief Society Room, hourly
4. Use AI to Bring Your Ancestors to Life — Young Women's Room, every 20 minutes (includes YouTube embed and images)
5. Did I Remember Everything? (Organizing Vital Documents) — Room 9, every 20 min
6. Family History Q&A — Rooms 6 & 7, all morning
7. The Teton Dam Disaster — Priesthood Room, all morning
8. Job Search, Résumé Tips & Networking Strategies — Room 2, all morning (uses `jobSearchData` shared object; `useSharedModal: true` for Self-Reliance color)

### Flyers & PDFs (in `public/pdfs/`)
- `ReachingHigher_Flyer1.pdf` — Main event flyer
- `ReachingHigher_Flyer1_4up.pdf` — 4-up print version
- `Covenant_Path_Foyer_QR.pdf` — QR code foyer flyer
- Weekly Spotlight flyers (Color and B&W versions)

### Images (in `public/images/`)
- `hero.jpg` — Hero background
- `couple.JPG` — Used in AI Ancestors class modal
- `bagsoflove.gif` — Used in JustServe/Bags of Love booth modal
- `CovenantPath_QRCode.png` — QR code
- `ReachingHigher_Flyer1.png`, `Covenant_Path_Foyer_QR_thumb.png`, `WeeklySpotlight_Color_4wks.png` — Flyer thumbnails
- `IMG_5786.PNG`, `Gemini_Generated_Image_gaiqsogaiqsogaiq.png` — Additional assets

### Google Analytics
- Tracking ID: `G-6SH6W03ZGT` (added in `layout.tsx`)

## Common change patterns

Most changes to this project follow a few patterns. This helps future sessions know where to look:

### 1. Content updates (most common)
- **What:** Changing titles, names, descriptions, room numbers, schedules
- **Where:** `src/data/content.ts` — edit the `booths` or `classes` objects
- **Example:** Changing a room from "Room 8" to "Room 9" means editing the `location` field in the matching class object

### 2. Card title styling (subtitles, italics, two-line titles)
- **Pattern:** Titles can include HTML via `dangerouslySetInnerHTML`. Two-line titles use `<br><span class="title-sub"><em>...</em></span>` for a smaller italic subtitle line
- **Where:** Title strings in `content.ts` + `.title-sub` styles in `globals.css`
- **Note:** Some classes also have a `subtitle` field (plain text, rendered separately by `ClassCard.tsx` as `.class-subtitle`)

### 3. Card styling changes (colors, spacing, equal heights)
- **Where:** `src/app/globals.css` — look for `.booth-card`, `.class-card`, `.booth-pill`, `.title-sub`, `.class-subtitle`
- **Convention:** Card subtitle italic text color matches the card's category title color (set via `data-cat` attribute and CSS)
- **Convention:** Class cards display room number and are equal height within their grid

### 4. Category color system
- **CSS variables:** Defined in `:root` in `globals.css`
  - `--cat-temple: #6366F1` (indigo)
  - `--cat-missionary: #059669` (green)
  - `--cat-rising: #F59E0B` (amber)
  - `--cat-selfreliance: #E11D48` (rose)
  - `--cat-classes: #0284C7` (sky blue) — used for Mini Classes nav pill
- **Soft variants:** Each has a `-soft` variant for light backgrounds
- **Usage:** `catColors` in `content.ts` maps category keys to these CSS variables

### 5. Navigation pills
- **Component:** `SectionNav.tsx` — renders colored pill/chip navigation links
- **Colors:** Each pill uses its category color; Mini Classes pill uses `--cat-classes`

## Non-negotiables (preserve outward behavior)
You may refactor internals only if requested or clearly justified, but the outward UX and features must not regress. If anything structural changes, provide a no-regression checklist and keep functionality intact.

### Must-not-break features

#### 1) Flyer / Handouts modal (`FlyerModal.tsx`)
- CTA in `CTASection.tsx` sets `flyerOpen` state to `true`.
- Close button and backdrop click set it to `false`.
- Flyer download links and "Copy Link" must continue to work.
- Must remain usable on mobile (scrollable modal content, safe-area padding).

#### 2) Booth/Class details modal (`DetailModal.tsx`)
- Shared modal controlled by `modal` state in `page.tsx`.
- Clicking booth cards and class cards must open the correct details and close reliably.
- Escape key and backdrop click close the modal.
- Content rendered via `dangerouslySetInnerHTML` (supports HTML, YouTube embeds, images).

#### 3) Data-driven content generation
- Booths and classes are generated from TypeScript data in `src/data/content.ts`.
- Prefer editing content in the data objects rather than duplicating JSX.
- Categories: `temple`, `missionary`, `rising`, `selfreliance` — each with color and label.
- **Shared data pattern:** `jobSearchData` is a shared object used by both the Self-Reliance booth section and the Mini Classes list. When editing Job Search content, update the shared object so both places stay in sync. The class entry uses `useSharedModal: true` which triggers Self-Reliance color in the modal.

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

## Keeping this file current
When making significant changes (adding/removing booths or classes, changing room assignments, adding new components, changing the color system, or adding new PDFs/images), update the relevant section of this `CLAUDE.md` file so future sessions start with accurate context.
