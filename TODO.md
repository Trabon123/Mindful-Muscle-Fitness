# TODO: facts and assets needed from Mindful Muscle Fitness

Nothing on the site was invented. Everything below is either missing or a
placeholder, and is **visibly marked `TODO:` on the page** so it can't ship by
accident. Find them all with:

```bash
grep -rn "TODO" src
```

Edit content in `src/data/*`. Components never need to change.

---

## Must have before launch

| # | Item | Where to change it | What's shown now |
|---|---|---|---|
| 1 | **Booking link** (Calendly, Mindbody, Acuity, etc.) | `src/data/site.ts` → `business.bookingUrl` | Every "Book" / "Claim your spot" button calls the studio instead (`tel:`). One line fixes all of them. |
| 2 | **Real Google reviews**, approved by the owner and the reviewers | `src/data/testimonials.ts` (set `placeholder: false`) | 5 cards labelled "Placeholder" / "TODO: Paste an approved Google review here." |
| 3 | **Caleb's bio** (2–3 sentences) | `src/data/sections.ts` → `coach.bio` | Orange-outlined TODO box |
| 4 | **Caleb's portrait** | `src/assets/images/caleb-portrait.jpg` (4:5) | Designed sage placeholder tile |
| 5 | **Instagram handle** | `src/data/site.ts` → `business.instagram` | TODO chip in footer. Also adds `sameAs` to the JSON-LD automatically. |
| 6 | **Semester start date**: confirm the first day of Spring 2027 classes on the official CU Boulder academic calendar | `src/data/sections.ts` → `semester.startsAt` | Placeholder `2027-01-11 08:00 MT`. After the date passes the band switches to "The semester's underway" automatically; update it each semester. |
| 7 | **Production domain** | `astro.config.mjs` → `SITE_URL` **and** `src/data/site.ts` → `business.url` | `https://mindful-muscle.vercel.app` (canonical, OG and JSON-LD URLs use this) |
| 8 | **Verify map coordinates** for 1044 10th St | `src/data/site.ts` → `business.geo` | Approximate lat/long (40.0063, −105.2769), used only in JSON-LD |

## Should have

| # | Item | Where | Notes |
|---|---|---|---|
| 9 | **Trainer names, specialties and portraits** | `src/data/sections.ts` → `coach` · `src/assets/images/trainer-{1,2,3}.jpg` | 3 slots shown as "Team · coming soon". Add or remove slots via `coach.teamSlots`. |
| 10 | **Pricing** | n/a (no pricing section yet) | Site only says "affordable" (from the brief). JSON-LD `priceRange` is `"$"` as a stand-in: `src/layouts/Base.astro`. |
| 11 | **App name and App Store / Google Play links** | `src/data/sections.ts` → `app.storeLinks` | TODO chip under the feature list. Section is titled "The Mindful Muscle app"; confirm the real name. |
| 12 | **Real app screenshots** (optional) | `src/assets/images/app-*.png` | The phone currently shows designed mock screens with **sample data, labelled "Sample"**. Not real client data or studio stats. Wiring real screenshots in would need a small change to `AppShowcase.astro`. |
| 13 | **Google Business Profile reviews link** | `src/data/sections.ts` → `testimonialsSection.reviewsUrl` | "TODO: link" next to the 5.0★ badge |
| 14 | **Buff Brain Gym**: link, logo and permission to name them | `src/data/sections.ts` → `partner.url` | TODO chip on the partner card |
| 15 | **Buff Brain Gym group photo** | `src/assets/images/buff-brain-group.jpg` (3:2) | Placeholder tile |
| 16 | **Remaining photography** | See `public/images/README.md` | 18 slots in the shot list. 5 placed, 13 reserved for future sections. |

## Confirm wording (owner sign-off)

- Coach title: currently **"Owner, Mindful Muscle Fitness"**. Is "Founder" or "Head Coach" also accurate?
- "Opened 2022" chip on the coach section (from "Founded: 2022").
- Morph beat copy in `src/data/sections.ts` → `morph.beats`: written from the offerings list. Check the tone.
- "First consult is on us" / "Book a **Free** Consult": confirm the consult is actually free.
- Meta description in `src/data/site.ts` → `seo.description`.

## Nice to have later

- Real OG image photo (current `public/og.png` is a type-only card; regenerate with `npm run og` after editing `scripts/og.html`).
- Privacy policy page if a booking form or analytics is added.
- Analytics (Vercel Analytics or Plausible are lightweight; avoid anything that hurts the Lighthouse score).
