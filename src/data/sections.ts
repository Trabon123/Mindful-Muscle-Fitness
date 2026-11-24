/**
 * Copy for every section below the hero. Edit here; components only render.
 * Rule: no invented facts. Anything unknown is a visible `TODO:` string,
 * and is also listed in TODO.md.
 */
import { business, mission } from './site';

/* ── 3 · Mind ⇄ Muscle morph ─────────────────────────────── */
export const morph = {
  eyebrow: '1-on-1 personal training',
  title: { mind: 'Train the mind.', muscle: 'Build the muscle.' },
  srIntro:
    'Mindful Muscle Fitness combines mindfulness coaching, strength training and nutrition plans in 1-on-1 personal training.',
  beats: [
    {
      word: 'Mindset',
      offering: 'Mindfulness & meditation',
      body: 'Mindfulness and meditation are built into every session, not bolted on. Coaching that pays attention to how you think, not just what you lift.',
      shape: 'brain',
    },
    {
      word: 'Movement',
      offering: 'Strength training',
      body: '1-on-1 strength training with a coach who meets you at your level, whether it’s your first gym session or your next PR.',
      shape: 'fiber',
    },
    {
      word: 'Momentum',
      offering: 'Nutrition & diet plans',
      body: 'Nutrition and diet plans that support your training, so the progress you make in the studio keeps going outside it.',
      shape: 'barbell',
    },
  ],
} as const;

/* ── 4 · Manifesto ───────────────────────────────────────── */
export const manifesto = {
  eyebrow: 'Our mission',
  text: mission,
  /** Lit one at a time, in reading order, as you scroll. */
  keywords: [
    'physical',
    'mental',
    'accessible',
    'sustainable',
    'mindfulness',
    'psychology',
    'empower',
    'overcome',
    'build',
    'achieve',
  ],
  /** Words lit in the "mind" voice (italic serif). The rest take the "muscle" voice. */
  mindWords: ['mental', 'mindfulness', 'psychology', 'sustainable', 'accessible'],
  signature: business.name,
} as const;

/* ── 5 · App showcase ────────────────────────────────────── */
export const app = {
  eyebrow: 'The Mindful Muscle app',
  title: { mind: 'Your progress,', muscle: 'in your pocket.' },
  intro:
    'Training doesn’t stop when you leave the studio. The app keeps your coach in the loop all week, so your plan keeps adjusting to you.',
  /** TODO: app name and App Store / Google Play links not supplied. */
  storeLinks: null as null | { ios?: string; android?: string },
  storeTodo: 'TODO: App Store link',
  sampleNote: 'Screens are design previews with illustrative sample data.',
  features: [
    {
      id: 'pr',
      title: 'Track your PRs',
      body: 'Log every lift and watch personal records stack up over the semester.',
      meter: { kind: 'counter', value: 12, suffix: '', label: 'sample PRs' },
    },
    {
      id: 'watch',
      title: 'Apple Watch sync',
      body: 'Steps and heart rate flow in from your Apple Watch automatically.',
      meter: { kind: 'ring', value: 0.78, label: 'sample step goal' },
    },
    {
      id: 'streak',
      title: 'Build habit streaks',
      body: 'Build daily habits and keep the streak alive. Small wins that compound.',
      meter: { kind: 'counter', value: 21, suffix: '', label: 'sample day streak' },
    },
    {
      id: 'coach',
      title: 'Weekly coach check-in',
      body: 'Your coach reviews your data every week and adjusts your plan to match.',
      meter: { kind: 'ring', value: 1, label: 'sample week reviewed' },
    },
  ],
  /** Illustrative sample data for the mock screens. Not client data or studio stats. */
  sampleChip: 'Sample',
  screens: {
    pr: { title: 'Personal records', lift: 'Back squat', value: '185', unit: 'lb', delta: 'New PR', history: [0.42, 0.5, 0.48, 0.6, 0.66, 0.72, 0.86] },
    watch: { title: 'Today', bpm: '62', bpmLabel: 'Heart rate', steps: '7,840', stepsLabel: 'Steps', source: 'From Apple Watch' },
    streak: { title: 'Habit streak', days: 21, habits: ['Train', 'Steps', 'Protein', 'Breathe'] },
    coach: { title: 'Weekly check-in', from: 'Coach', note: 'Great week. Bumping your squat volume and keeping Thursday as recovery.', items: ['Sessions reviewed', 'Steps reviewed', 'Plan adjusted'] },
  },
} as const;

/* ── 6 · Coach spotlight ─────────────────────────────────── */
export const coach = {
  eyebrow: 'Meet your coach',
  name: business.owner,
  role: 'Owner, Mindful Muscle Fitness',
  bio: 'TODO: Caleb to supply a short bio (background, coaching style, why he opened the first studio on The Hill).',
  facts: [
    `Opened ${business.founded}`,
    'Leads free Buff Brain Gym sessions',
  ],
} as const;

/* ── 7 · Partner ─────────────────────────────────────────── */
export const partner = {
  eyebrow: 'Campus partner',
  name: 'Buff Brain Gym',
  descriptor: 'A CU Boulder student group',
  title: { mind: 'Free sessions', muscle: 'for members.' },
  body: `Mindful Muscle Fitness is a proud partner of Buff Brain Gym. ${business.owner} leads free group sessions for its members, including yoga and meditation.`,
  sessions: ['Group sessions', 'Yoga', 'Meditation'],
  cta: 'Ask about sessions',
  /** TODO: Buff Brain Gym logo / link not supplied. */
  url: null as string | null,
} as const;

/* ── 8 · Testimonials ────────────────────────────────────── */
export const testimonialsSection = {
  eyebrow: 'Reviews',
  title: { mind: 'Rated', muscle: '5.0 on Google' },
  ratingLabel: `${business.rating.value} rating on ${business.rating.source}`,
  /** TODO: link to the Google Business Profile reviews page. */
  reviewsUrl: null as string | null,
  prev: 'Previous review',
  next: 'Next review',
  pause: 'Pause auto-scrolling reviews',
} as const;

/* ── 9 · Semester countdown ──────────────────────────────── */
export const semester = {
  title: { mind: 'New semester.', muscle: 'New you.' },
  /**
   * TODO: confirm against the official CU Boulder academic calendar.
   * Placeholder: first day of classes, Spring 2027 (Mountain Time).
   */
  startsAt: '2027-01-11T08:00:00-07:00',
  label: 'Spring semester starts in',
  units: { days: 'days', hours: 'hours', minutes: 'min' },
  started: 'The semester’s underway. It’s not too late to start.',
  body: 'Lock in a coach before the semester gets busy. First consult is on us.',
  cta: 'Claim your spot',
} as const;

/* ── 10 · Footer ─────────────────────────────────────────── */
export const footer = {
  title: { mind: 'Come find us', muscle: 'on The Hill.' },
  mapCta: 'Load map',
  mapNote: 'Loads Google Maps',
  directions: 'Get directions',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=1044+10th+St,+Boulder,+CO+80302',
  mapEmbed: 'https://www.google.com/maps?q=1044+10th+St,+Boulder,+CO+80302&output=embed',
  labels: { visit: 'Visit', hours: 'Hours', call: 'Call', follow: 'Follow' },
  instagramTodo: 'TODO: Instagram handle',
  signoff: 'Breathe.',
} as const;
