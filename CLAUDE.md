# Project: Reaching Higher — The Covenant Path (GitHub Pages)

## Source of truth
- Primary file: `index.html`
- This project is deployed via GitHub Pages.
- Preserve existing wording/content, layout intent, and JavaScript-driven behavior unless I explicitly request changes.

## Non-negotiables (preserve outward behavior)
You may refactor internals only if requested or clearly justified, but the outward UX and features must not regress. If anything structural changes, provide a no-regression checklist and keep functionality intact.

### Must-not-break features
#### 1) Flyer / Handouts modal
- CTA triggers `openFlyers()` and shows `#flyer-backdrop`.
- Close triggers `closeFlyers()` and hides the overlay.
- Flyer download links must continue to work (currently `<a ... download>`).
- Must remain usable on mobile (scrollable modal content, safe-area padding).

#### 2) Booth/Class details modal
- Modal uses `#modal-backdrop` and a close control calling `closeModal()`.
- Clicking booth cards and class cards must open the correct details and close reliably.

#### 3) Data-driven content generation
- Booths and classes are generated from JavaScript data (`booths`, `classes`, shared objects).
- Prefer editing content in the data objects rather than duplicating HTML.
- Migration to another system (Markdown/CMS/framework) is allowed only with an explicit plan that preserves all content and features.

#### 4) Scroll reveal / animations (if present)
- Keep `.reveal` → `.visible` behavior working.
- Avoid motion that harms accessibility; respect reduced motion preferences when possible.

#### 5) External links + downloads
- External/YouTube links: `target="_blank"` + `rel="noopener noreferrer"`.
- PDFs should be normal links (prefer storing in `/assets/pdfs/`) and remain downloadable.
- Do not replace working downloads with fragile script-only solutions.

## Professional quality requirements
- Modern, professional UI: consistent spacing, clean typography, polished cards and pills/tags.
- Mobile-first responsive layout; no fixed-width assumptions.
- Accessibility:
  - Semantic HTML (`header`, `nav`, `main`, `section`, `footer`)
  - Keyboard navigation works
  - Visible focus rings with `:focus-visible`
  - Adequate contrast and readable font sizes
  - No hover-only interactions
- Performance:
  - Minimal JS, avoid heavy libraries unless requested
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
- JavaScript must avoid experimental-only APIs:
  - If using `navigator.clipboard.writeText`, include a fallback for failures/permissions/older browsers
  - Be careful with iOS modal scrolling/body scroll locking (do not break scrolling inside modals)
- Fonts:
  - Prefer system font stack or web fonts with `font-display: swap`
- Images:
  - Use responsive sizing
  - Avoid layout shift (set width/height or use aspect-ratio)

## Repo structure preference (reduce file size + context use)
Preferred structure:
- `index.html` (structure + content)
- `/css/styles.css`
- `/js/main.js`
- `/assets/` (images)
- `/assets/pdfs/` (pdfs)

Refactor policy:
- If extracting CSS/JS, do it as a “no behavior change” step first:
  1) Move CSS into `/css/styles.css` without changing selectors.
  2) Move JS into `/js/main.js` without changing function names or DOM IDs/classes.
  3) Verify: flyer modal works, details modal works, cards still render, downloads still work.
- After extraction, optional cleanup/renaming can happen in a separate step with diffs and verification.

## Collaboration workflow (CRITICAL: avoid context overflow)
- Do NOT ask me to paste the entire `index.html` (it’s too large).
- Request only the smallest relevant snippet (30–150 lines) for a specific component/section/function.
- Work on one feature/change at a time.
- Output format:
  - Prefer unified diffs or “changed sections only” with clear file paths.
  - Only output full files if I explicitly ask.
- Keep IDs and public function names stable unless a migration plan is provided.

## Verification checklist (run after any change)
1) iPhone Safari: open flyer modal, close it, scroll inside it, download a flyer, tap “copy link”
2) Android Chrome: open booth/class modal, close it, open a YouTube/external link
3) Desktop Chrome/Edge: resize narrow→wide; cards reflow; keyboard tab focus is visible; modals open/close
4) Desktop Safari/Firefox (if available): confirm modals, rendering, and downloads still work

## Definition of done
- Looks professional on mobile + desktop.
- All current modals, cards, downloads, and links work as before.
- Responsive, accessible, and fast for a GitHub Pages static site.
