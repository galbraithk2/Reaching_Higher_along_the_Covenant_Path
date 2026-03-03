# CLAUDE.md Template

**Instructions:** Copy everything below the line into a file called `CLAUDE.md` in the root of your project. Then go through and replace all the `[PLACEHOLDER]` items with your own project details. Delete any sections that don't apply to your project.

---

<!-- COPY EVERYTHING BELOW THIS LINE INTO YOUR CLAUDE.md FILE -->

# Project: [YOUR PROJECT NAME] (GitHub Pages)

## Tech stack
- **Framework:** Next.js 16 + React 19 + TypeScript
- **Styling:** Custom CSS (`/src/app/globals.css`) with CSS variables (design tokens). [NOTE: If you use Tailwind, change this to say "Tailwind CSS" instead]
- **Fonts:** [LIST YOUR FONTS HERE, e.g., "DM Sans (headings) + Inter (body) via next/font/google with font-display: swap"]
- **Build:** `npm run build` → static export to `/out/`
- **Deployment:** GitHub Actions (`.github/workflows/deploy.yml`) → GitHub Pages on push to `main`
- **Base path:** `/[YOUR_REPO_NAME]` (configured in `next.config.ts`)

## Source of truth
- **Content data:** [WHERE DOES YOUR CONTENT LIVE? e.g., "src/data/content.ts — all content lives here as TypeScript objects"]
- **Main page:** `src/app/page.tsx` — the home page.
- **Styles:** `src/app/globals.css` — all CSS in one file.
- Preserve existing wording/content, layout intent, and component behavior unless explicitly requested to change.

## Repo structure

[UPDATE THIS TO MATCH YOUR PROJECT'S ACTUAL FILE STRUCTURE]

```
src/
  app/
    layout.tsx          # Root layout, fonts, metadata
    page.tsx            # Main page
    globals.css         # All styles (design tokens + components)
  components/
    [Component1].tsx    # [What this component does]
    [Component2].tsx    # [What this component does]
    [Component3].tsx    # [What this component does]
  data/
    content.ts          # [Your data file - describe what's in it]
  lib/
    basePath.ts         # BASE_PATH constant for asset URLs
public/
  images/               # All images
  pdfs/                 # [If you have PDFs, otherwise remove this line]
.github/workflows/
  deploy.yml            # GitHub Actions deployment
```

## Non-negotiables (preserve outward behavior)
You may refactor internals only if requested or clearly justified, but the outward UX and features must not regress. If anything structural changes, provide a no-regression checklist and keep functionality intact.

### Must-not-break features

[LIST YOUR KEY FEATURES BELOW. Here are examples — replace with YOUR features:]

#### 1) [Feature Name, e.g., "Navigation menu"]
- [How it works — describe the behavior]
- [What must keep working]
- [Any special notes about mobile/accessibility]

#### 2) [Feature Name, e.g., "Modal/popup"]
- [How it works]
- [What must keep working]

#### 3) [Feature Name, e.g., "Data-driven content"]
- [How content is generated — from data files? hardcoded?]
- [Where to edit content]

#### 4) [Feature Name, e.g., "External links + downloads"]
- External links: `target="_blank"` + `rel="noopener noreferrer"`.
- [Where PDFs or downloads are stored]
- Do not replace working downloads with fragile script-only solutions.

#### 5) Image paths
- All images in code must use `BASE_PATH` prefix from `src/lib/basePath.ts`.
- Pattern: `` `${BASE_PATH}/images/filename.jpg` ``
- Static assets served from `/public/`.

## Professional quality requirements
- Modern, professional UI: consistent spacing, clean typography, polished design.
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
- Images: use responsive sizing, avoid layout shift (set width/height or use aspect-ratio)

## Collaboration workflow (CRITICAL: avoid context overflow)
- Work on one feature/change at a time.
- Request only the smallest relevant snippet for a specific component/section/function.
- Output format:
  - Prefer unified diffs or "changed sections only" with clear file paths.
  - Only output full files if explicitly asked.
- Keep component names, props, and state variable names stable unless a migration plan is provided.

## Verification checklist (run after any change)
1. Mobile device: test all interactive elements (buttons, links, modals)
2. Desktop browser: resize narrow-wide; layout reflows; keyboard navigation works
3. Build check: `npm run build` completes without errors

## Definition of done
- Looks professional on mobile + desktop.
- All features work as before — nothing broken.
- Responsive, accessible, and fast for a GitHub Pages static site.
- `npm run build` succeeds with no errors.
