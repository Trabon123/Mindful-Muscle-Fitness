# Image shot list

Every image on the site goes through `<SmartImage id="…" />`. Until a real photo exists, a designed sage/ink placeholder tile is shown, labelled with the filename, ratio and subject.

## How to add a photo

1. Shoot or export at the listed ratio, long edge **≥ 2400 px** (JPG for photos, PNG for app screenshots).
2. Save it to **`src/assets/images/<filename>`** using the exact filename below. Photos go there, not in this `public/` folder, so Astro can optimise them.
3. Rebuild. SmartImage automatically serves AVIF/WebP at several widths, lazy-loads it, adds a blur-up and keeps the aspect ratio fixed (no layout shift).
4. Photos in the shot list marked duotone get the ink + sage treatment automatically.

## Art direction

- Calm, editorial, lots of negative space. Morning or soft side light. Real clients and coaches only, **with signed consent**.
- Avoid gym clichés: sweaty close-ups, neon, flames, flexing mirror shots.
- No stock photos, and no AI-generated people presented as real.

## Slots (18)

**On the page now:** `caleb-portrait`, `trainer-1…3`, `buff-brain-group`. **Reserved** slots are the next shots to capture.

| # | Filename | Ratio | Subject | Where it's used |
|---|---|---|---|---|
| 1 | `hero-studio.jpg` | 16:9 | Studio interior, morning light, empty and calm | Reserved (hero alt / OG) |
| 2 | `studio-wide.jpg` | 21:9 | Wide studio shot showing racks and open floor | Reserved · Mind ⇄ Muscle |
| 3 | `detail-barbell.jpg` | 4:5 | Close detail: knurling on a barbell, chalk, soft side light | Reserved · Mind ⇄ Muscle · Movement |
| 4 | `detail-plates.jpg` | 1:1 | Stacked plates or dumbbell rack, graphic composition | Reserved · Spare detail |
| 5 | `caleb-portrait.jpg` | 4:5 | Caleb Saks, editorial portrait, plain wall, looking at camera | Meet your coach |
| 6 | `trainer-1.jpg` | 3:4 | Trainer portrait #1 (same setup as Caleb’s) | Team grid |
| 7 | `trainer-2.jpg` | 3:4 | Trainer portrait #2 | Team grid |
| 8 | `trainer-3.jpg` | 3:4 | Trainer portrait #3 | Team grid |
| 9 | `action-coaching.jpg` | 3:2 | 1-on-1 coaching: trainer cueing a client mid-lift (client consent required) | Reserved · Mind ⇄ Muscle · Movement |
| 10 | `action-deadlift.jpg` | 4:5 | Strength training action: deadlift lockout, calm face, no sweat close-ups | Reserved · Spare action |
| 11 | `meditation-session.jpg` | 3:2 | Seated meditation / breathwork at the start of a session | Reserved · Mind ⇄ Muscle · Mindset |
| 12 | `nutrition-plan.jpg` | 4:5 | Nutrition: simple meal prep or the plan on a phone, overhead | Reserved · Mind ⇄ Muscle · Momentum |
| 13 | `buff-brain-group.jpg` | 3:2 | Buff Brain Gym group yoga or meditation session led by Caleb | Partner card |
| 14 | `hill-exterior.jpg` | 16:9 | 1044 10th St storefront / The Hill street scene at dusk | Reserved · Footer |
| 15 | `app-pr.png` | 9:19.5 | App screenshot: PR tracker | Reserved · App showcase (would replace the designed mock screen) |
| 16 | `app-watch.png` | 9:19.5 | App screenshot: Apple Watch heart rate & steps | Reserved · App showcase (would replace the designed mock screen) |
| 17 | `app-streak.png` | 9:19.5 | App screenshot: habit streak | Reserved · App showcase (would replace the designed mock screen) |
| 18 | `app-coach.png` | 9:19.5 | App screenshot: weekly coach check-in | Reserved · App showcase (would replace the designed mock screen) |

Source of truth: `src/data/images.ts`. Update both if you add a slot.
