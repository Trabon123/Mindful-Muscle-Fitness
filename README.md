# Mindful Muscle Fitness: homepage

**Train the Mind. Build the Muscle.** A one-page site for the first personal
training studio on The Hill, Boulder. The whole page breathes on a real
box-breathing cycle (inhale 4s · hold 4s · exhale 4s · hold 4s).

Astro 7 · Tailwind CSS 4 · TypeScript · GSAP (ScrollTrigger + MorphSVG) · Lenis

> **Before launch, read [`TODO.md`](./TODO.md).** Every missing fact (booking
> link, reviews, bio, photos…) is listed there and marked `TODO:` on the page.

---

## Run it

Requires Node 20+.

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:4321.

```bash
npm run build
```

```bash
npm run preview
```

`npm run build` type-checks (`astro check`) and outputs a fully static site to `dist/`.

## Deploy on Vercel

1. Push this folder to a GitHub repo.
2. In Vercel: **Add New → Project → Import** the repo. Framework preset: **Astro**
   (detected automatically; `vercel.json` also pins build command and output).
3. Deploy. No environment variables are needed.
4. Add the custom domain in Vercel → Settings → Domains, then update
   `SITE_URL` in `astro.config.mjs` **and** `business.url` in `src/data/site.ts`
   and redeploy (canonical URL, OG tags, sitemap and JSON-LD use it).

Or from the CLI:

```bash
npx vercel --prod
```

## Editing content

All copy lives in `src/data/*`. Components only render.

| File | What's in it |
|---|---|
| `src/data/site.ts` | Business facts (address, phone, hours, rating), SEO, hero, marquee, sticky bar, **booking link** |
| `src/data/sections.ts` | Every section below the hero, including the **semester countdown date** |
| `src/data/testimonials.ts` | Google reviews (verbatim) |
| `src/data/images.ts` | Image shot list (see also `public/images/README.md`) |

**Booking:** set `business.bookingUrl` in `src/data/site.ts`. Every "Book"
button updates. Until then they call the studio.

**Semester countdown:** set `semester.startsAt` in `src/data/sections.ts`
(ISO date with Mountain Time offset). It counts down in days/hours/minutes and
switches to an "already underway" message once the date passes.

**Photos:** drop files into `src/assets/images/` using the filenames in
`public/images/README.md`. `<SmartImage>` swaps the placeholder for an
optimised AVIF/WebP image with a blur-up. No code changes.

## Structure

```
src/
  components/
    BreathingHero.astro     Split MIND/MUSCLE headline, 16s breathing orb (CSS only)
    Marquee.astro           "Between classes" strip (pausable)
    MindMuscleMorph.astro   Back/next steps: brain → muscle fibre → barbell (MorphSVG)
    morph-shapes.ts         Hand-drawn SVG paths for the morph
    Manifesto.astro         Mission, keywords light up on scroll
    AppShowcase.astro       CSS-3D phone, cursor tilt, 4 designed screens, tabs
    CoachSpotlight.astro    Caleb (photo + bio)
    PartnerCard.astro       Buff Brain Gym (text-only card)
    Testimonials.astro      Slow-drift carousel + 5.0★ badge
    SemesterCountdown.astro "New semester. New you."
    Footer.astro            Click-to-load map, details, breathing hairline sign-off
    StickyCTA.astro         Mobile Book / Call bar
    SmartImage.astro        Single image pipeline + designed placeholders
    Icon.astro              Custom hairline icon set (no icon fonts / emoji)
  data/                     All content (see above)
  layouts/Base.astro        <head>: SEO, OG, JSON-LD (HealthClub + ExerciseGym), fonts
  scripts/motion.ts         The one JS island: Lenis, ScrollTrigger, morph steps, tilt, carousel
  styles/global.css         Design tokens, breath clock keyframes, utilities
public/
  fonts/                    Self-hosted, subset fonts
  images/README.md          Photo shot list
  og.png                    Social share card (regenerate: npm run og)
scripts/                    OG image generator
```

## Design system

| Token | Value | Use |
|---|---|---|
| `bone` | `#F4F1EA` | Page |
| `ink` | `#121614` | Text, dark sections |
| `sage` | `#9DB4A0` | "Mind": orbs, accents on ink. **Decorative only on bone** (1.97:1) |
| `sage-deep` | `#4E6A55` | Sage-coloured *text* on bone (5.3:1, AA) |
| `orange` | `#E2572B` | "Muscle": CTAs, PR numbers, streak flame, nothing else. Buttons use **ink text on orange** (4.9:1) |

**Type:** Fraunces Light Italic (mind) · Anton (muscle) · Inter Tight (body).
Fraunces is shipped as two static, Latin-subset instances (19 KB italic,
16 KB upright) instead of the 81 KB / 67 KB variable files. Anton (the LCP
face) is inlined in the HTML.

**Motion:** one 16s breath clock (`--breath` in `global.css`) drives the hero
orb, section glows and the footer's breathing hairline. Every
ease is breath-shaped (`--ease-breath` sine in-out, `--ease-exhale` long
settle). Seconds never tick; the countdown updates once a minute.

## Quality

Measured on the production build (`npm run build && npm run preview`):

| Lighthouse (mobile, simulated slow 4G) | Result |
|---|---|
| Performance | 99–100 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |
| LCP | 1.8–2.1 s (≈0.9 s in a real throttled Chrome trace) |
| CLS | 0 |
| TBT | 0–20 ms |

- **Hero is zero-JS.** GSAP and Lenis load at idle, after first paint.
- **No layout shift:** fixed aspect ratios on every image; display words have
  font-independent widths; the map iframe only loads on click.
- **Accessibility (WCAG 2.2 AA):** skip link, visible focus rings, contrast
  checked on every pairing (sage text uses `sage-deep`), keyboard-operable
  carousel (buttons + arrow keys) and app tabs (arrow/Home/End), pause buttons
  for the breathing animation, marquee and carousel (2.2.2).
- **`prefers-reduced-motion`:** the orb stops, morph becomes a
  crossfade, manifesto shows fully lit, Lenis, tilt and carousel drift are off.
- Tested at 375, 768, 1280 and 1920 px with no horizontal overflow.

## Notes on decisions

Where the brief was open, the calmer, more premium option was chosen:

- **Countdown** shows days / hours / minutes, not ticking seconds.
- **Marquee** loops once every ~48s, slower than typical.
- **Map** is a designed locator until the visitor clicks "Load map". That keeps
  Google's iframe off the critical path, which protects performance and privacy.
- **Morph** is driven by back/next buttons and the step pills, not by
  scroll, so the page scrolls straight past it. It degrades to a plain list
  without JS.
- **Caleb's photo** uses a gentle desaturation rather than duotone, so the
  owner reads clearly.
- **Orange** never appears as body text (it only reaches 3.3:1 on bone).
- **Google badge** uses a neutral "G" mark rather than Google's logo.
