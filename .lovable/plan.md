## Wistaar — Global UI Refinement Pass

A presentation-only polish across the existing codebase. No new pages, routes, features, or backend changes. Goal: quieter, more literary, more intentional — a digital independent bookstore, not a SaaS dashboard.

---

### 1. Design Tokens (`src/index.css` + `tailwind.config.ts`)

Update semantic tokens (light + dark) to the four-color editorial palette:

```
--ink-black:        #0D0D0D   → --foreground / --primary
--warm-paper:       #F5F2EB   → --background
--burnt-terracotta: #C84B2F   → --accent / --destructive base
--muted-linen:      #968F85   → --muted-foreground / --border
```

Tuned dark-mode counterparts (ink as bg, paper as fg, terracotta accent unchanged).

### 2. Typography

- Swap Google Fonts import: replace Instrument Serif with **Cormorant Garamond** (400/500/600, italic).
- Body remains **Inter**.
- Update `h1–h6` font-family in `index.css` to Cormorant Garamond.
- No component-level font overrides needed (cascades from base).

### 3. Global Cleanup

Remove or hide (UI only — keep hooks/data intact):
- `NotificationBell` — hide from `Navigation.tsx` (desktop + mobile). Do not delete the component or `useNotifications`.
- Cart count red circle → replace with inline text `Cart (3)` in muted style.
- `WishlistButton` floating heart on cards → hide on card surfaces (keep on BookDetail page).
- Price badge floating on covers → remove from `ExploreBookCard`, `ApprovedBookCard`, `PurchasedBookCard`, `ContinueReadingCard`.
- Hover scale/translate transforms on cards → strip; keep only opacity + subtle shadow + text-color shift.
- Loud gradients, heavy shadows → soften across hero/sections.

### 4. Navbar (`Navigation.tsx`)

Keep structure and links. Restyle only:
- Sticky, subtle 1px bottom border always visible.
- Logo in Cormorant (already serif — refresh weight).
- Nav links: Inter, lighter weight, wider tracking.
- Cart trigger renders `Cart (n)` as text — no badge circle.
- Mobile menu retains Framer Motion overlay; refresh typography only.

### 5. Book Card System (standardized)

Single visual structure for every card across Explore, Library, shelves, search, related, author dashboards:

```
[ cover : aspect-[2/3] object-cover ]
Title       (Cormorant, 1 line truncate)
Author      (Inter, muted-foreground, sm)
Price       (Inter, foreground, sm)
```

Files touched: `ExploreBookCard.tsx`, `ApprovedBookCard.tsx`, `library/PurchasedBookCard.tsx`, `library/ContinueReadingCard.tsx`. Remove overlays, badges, hearts, scale animations.

### 6. Layout & Rhythm

- Audit `section-padding` usage; standardize vertical rhythm on long pages (Index, Explore, Library, Profile, BookDetail).
- Fix navbar overlap (`pt-14 sm:pt-16` baseline where missing).
- Mobile clipping audit on grids (ensure `min-w-0` and proper gap).
- Grid gaps consistent: `gap-6 md:gap-8` for shelves.

### 7. Landing Page (`HeroSection.tsx`, `Index.tsx`)

Layout preserved. Copy + presentation only:
- Subtitle → "An independent digital sanctuary for deep reading."
- Primary CTA → `Start Reading` (links to /explore).
- Secondary CTA → `For Authors →` (links to /publish).
- Remove "Publish Your Book" button from hero.
- Softer hero spacing, larger display type.

### 8. Discovery Shelves

`FreeReadingSection`, `PremiumSection`, `ReadingExperienceSection`, `AuthorSection`:
- Tighten section heading hierarchy (Cormorant display + Inter eyebrow).
- Consistent carousel gaps, aligned baselines, standardized card sizes.

### 9. Footer (`Footer.tsx`)

Refine to two-column editorial:
- **Discover** (Explore, Library, Free Chapters)
- **Publish** (For Authors, Submit, Guidelines)
- Small Cormorant column headings, Inter links in `muted-foreground`, generous whitespace, subtle top border, wordmark + copyright on a quiet baseline row.

### 10. Usability

- Replace any `alert()` / `confirm()` calls with shadcn `toast` / `AlertDialog` (audit pass).
- All form validation messages restyled via existing shadcn `Form` patterns — no logic changes.

---

### Files to be edited

- `src/index.css` (tokens, font import, base typography)
- `tailwind.config.ts` (token wiring if needed)
- `src/components/Navigation.tsx` (cart text, hide bell, restyle)
- `src/components/Footer.tsx` (editorial two-column)
- `src/components/HeroSection.tsx` (copy + CTAs)
- `src/components/ExploreBookCard.tsx`
- `src/components/ApprovedBookCard.tsx`
- `src/components/library/PurchasedBookCard.tsx`
- `src/components/library/ContinueReadingCard.tsx`
- `src/components/FreeReadingSection.tsx`
- `src/components/PremiumSection.tsx`
- `src/components/ReadingExperienceSection.tsx`
- `src/components/AuthorSection.tsx`
- `src/components/WishlistButton.tsx` (add `variant="card"` no-op or hide on cards)
- Spot fixes in `src/pages/Index.tsx`, `Explore.tsx`, `Library.tsx`, `Profile.tsx`, `BookDetail.tsx` for spacing only

### Out of scope

- No routes added/removed
- No Supabase, auth, payments, RLS, edge function, or migration changes
- No `src/integrations/supabase/*` edits
- No hook signature changes
- No deletion of `NotificationBell` component or `useNotifications`
- No new dependencies (Cormorant via Google Fonts CDN)

### Acceptance

- Zero red badge circles or notification bells visible
- Every book cover identical aspect ratio and structure
- Cormorant on all headings, Inter on body
- Terracotta used sparingly as the single accent
- All existing routes, queries, and flows behave identically
