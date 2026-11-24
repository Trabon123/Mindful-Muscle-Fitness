/**
 * Image shot list. Every image on the site is referenced by `id` through
 * <SmartImage id="..." />.
 *
 * To add a real photo: export it at the listed ratio (long edge ≥ 2400px),
 * save it to `src/assets/images/<file>` with the exact filename below, and
 * rebuild. SmartImage picks it up automatically, optimises it to AVIF/WebP
 * and generates a blur-up. Until then a designed placeholder tile is shown.
 *
 * "Reserved" slots are not placed on the page yet. They're the shots to
 * capture so sections can graduate from type-only to photographic.
 *
 * Human-readable version: public/images/README.md
 */
export type Ratio = '16:9' | '4:5' | '3:4' | '1:1' | '3:2' | '9:19.5' | '21:9';

export interface ImageSlot {
  id: string;
  file: string;
  ratio: Ratio;
  subject: string;
  section: string;
  alt: string;
  duotone?: boolean;
}

export const images = [
  { id: 'hero-studio', file: 'hero-studio.jpg', ratio: '16:9', subject: 'Studio interior, morning light, empty and calm', section: 'Reserved (hero alt / OG)', alt: 'The Mindful Muscle Fitness studio interior in morning light', duotone: true },
  { id: 'studio-wide', file: 'studio-wide.jpg', ratio: '21:9', subject: 'Wide studio shot showing racks and open floor', section: 'Reserved · Mind ⇄ Muscle', alt: 'Wide view of the training floor', duotone: true },
  { id: 'detail-barbell', file: 'detail-barbell.jpg', ratio: '4:5', subject: 'Close detail: knurling on a barbell, chalk, soft side light', section: 'Reserved · Mind ⇄ Muscle · Movement', alt: 'Close-up of a barbell’s knurled grip', duotone: true },
  { id: 'detail-plates', file: 'detail-plates.jpg', ratio: '1:1', subject: 'Stacked plates or dumbbell rack, graphic composition', section: 'Reserved · Spare detail', alt: 'Stacked weight plates', duotone: true },
  { id: 'caleb-portrait', file: 'caleb-portrait.jpg', ratio: '4:5', subject: 'Caleb Saks, editorial portrait, plain wall, looking at camera', section: 'Meet your coach', alt: 'Portrait of Caleb Saks, owner of Mindful Muscle Fitness', duotone: true },
  { id: 'trainer-1', file: 'trainer-1.jpg', ratio: '3:4', subject: 'Trainer portrait #1 (same setup as Caleb’s)', section: 'Team grid', alt: 'Portrait of a Mindful Muscle Fitness trainer', duotone: true },
  { id: 'trainer-2', file: 'trainer-2.jpg', ratio: '3:4', subject: 'Trainer portrait #2', section: 'Team grid', alt: 'Portrait of a Mindful Muscle Fitness trainer', duotone: true },
  { id: 'trainer-3', file: 'trainer-3.jpg', ratio: '3:4', subject: 'Trainer portrait #3', section: 'Team grid', alt: 'Portrait of a Mindful Muscle Fitness trainer', duotone: true },
  { id: 'action-coaching', file: 'action-coaching.jpg', ratio: '3:2', subject: '1-on-1 coaching: trainer cueing a client mid-lift (client consent required)', section: 'Reserved · Mind ⇄ Muscle · Movement', alt: 'A coach cueing a client during a lift', duotone: true },
  { id: 'action-deadlift', file: 'action-deadlift.jpg', ratio: '4:5', subject: 'Strength training action: deadlift lockout, calm face, no sweat close-ups', section: 'Reserved · Spare action', alt: 'A client locking out a deadlift', duotone: true },
  { id: 'meditation-session', file: 'meditation-session.jpg', ratio: '3:2', subject: 'Seated meditation / breathwork at the start of a session', section: 'Reserved · Mind ⇄ Muscle · Mindset', alt: 'Breathwork at the start of a training session', duotone: true },
  { id: 'nutrition-plan', file: 'nutrition-plan.jpg', ratio: '4:5', subject: 'Nutrition: simple meal prep or the plan on a phone, overhead', section: 'Reserved · Mind ⇄ Muscle · Momentum', alt: 'A simple prepared meal and nutrition plan', duotone: true },
  { id: 'buff-brain-group', file: 'buff-brain-group.jpg', ratio: '3:2', subject: 'Buff Brain Gym group yoga or meditation session led by Caleb', section: 'Partner card', alt: 'Caleb leading a Buff Brain Gym group session', duotone: true },
  { id: 'hill-exterior', file: 'hill-exterior.jpg', ratio: '16:9', subject: '1044 10th St storefront / The Hill street scene at dusk', section: 'Reserved · Footer', alt: 'The studio entrance at 1044 10th St on The Hill', duotone: true },
  { id: 'app-pr', file: 'app-pr.png', ratio: '9:19.5', subject: 'App screenshot: PR tracker', section: 'Reserved · App showcase (would replace the designed mock screen)', alt: 'App screen showing the PR tracker', duotone: false },
  { id: 'app-watch', file: 'app-watch.png', ratio: '9:19.5', subject: 'App screenshot: Apple Watch heart rate & steps', section: 'Reserved · App showcase (would replace the designed mock screen)', alt: 'App screen showing heart rate and steps from Apple Watch', duotone: false },
  { id: 'app-streak', file: 'app-streak.png', ratio: '9:19.5', subject: 'App screenshot: habit streak', section: 'Reserved · App showcase (would replace the designed mock screen)', alt: 'App screen showing a habit streak', duotone: false },
  { id: 'app-coach', file: 'app-coach.png', ratio: '9:19.5', subject: 'App screenshot: weekly coach check-in', section: 'Reserved · App showcase (would replace the designed mock screen)', alt: 'App screen showing a weekly coach check-in', duotone: false },
] as const satisfies readonly ImageSlot[];

export type ImageId = (typeof images)[number]['id'];

export const getImage = (id: ImageId): ImageSlot => {
  const slot = images.find((i) => i.id === id);
  if (!slot) throw new Error(`Unknown image id: ${id}`);
  return slot;
};
