/**
 * Single source of truth for business facts and site-wide copy.
 * Edit here; components never hard-code content.
 * Anything not supplied by the owner is `null` and rendered as a visible TODO.
 */

export const business = {
  name: 'Mindful Muscle Fitness',
  legalName: 'Mindful Muscle Fitness LLC',
  owner: 'Caleb Saks',
  founded: 2022,
  positioning: 'The first personal training studio on The Hill.',
  team: 'A team of trainers for every level.',
  audience: 'Mostly CU Boulder students. Affordable personal training.',
  address: {
    street: '1044 10th St',
    city: 'Boulder',
    region: 'CO',
    postalCode: '80302',
    country: 'US',
    neighborhood: 'The Hill',
    landmark: 'next to CU Boulder',
  },
  /** TODO: verify. Approximate coordinates for 1044 10th St, used only in JSON-LD. */
  geo: { latitude: 40.0063, longitude: -105.2769 },
  phone: {
    display: '(847) 826-4119',
    href: 'tel:+18478264119',
    e164: '+1-847-826-4119',
  },
  hours: {
    display: '7 AM – 12 AM',
    short: '7AM – 12AM',
    days: 'Every day',
    schema: 'Mo-Su 07:00-24:00',
    open: '07:00',
    close: '24:00',
  },
  rating: { value: '5.0', source: 'Google' },
  /** TODO: Instagram handle not yet supplied. */
  instagram: null as string | null,
  /** TODO: booking link not yet supplied. Until it is, "Book" CTAs fall back to the phone number. */
  bookingUrl: null as string | null,
  /** TODO: production domain not yet confirmed. Keep in sync with astro.config.mjs. */
  url: 'https://mindful-muscle.vercel.app',
} as const;

export const mission =
  'To inspire men and women to achieve optimal physical and mental health through accessible and sustainable fitness coaching that emphasizes mindfulness and psychology. We empower our clients to overcome obstacles, build confidence, and achieve their goals, no matter their starting point.';

/** Where "Book" CTAs go. Falls back to calling the studio until a booking link exists. */
export const bookHref = business.bookingUrl ?? business.phone.href;
export const bookIsFallback = business.bookingUrl === null;

export const seo = {
  title: 'Mindful Muscle Fitness | Personal Training on The Hill, Boulder',
  description:
    'Affordable 1-on-1 personal training on The Hill, steps from CU Boulder. Strength training, nutrition plans and mindfulness built into every session. Open 7 AM – 12 AM daily.',
  ogImage: '/og.png',
  ogImageAlt: 'Mindful Muscle Fitness. Train the mind. Build the muscle.',
} as const;

export const hero = {
  eyebrowLeft: `Est. ${business.founded} · Boulder, CO`,
  eyebrowRight: `${business.address.street} · ${business.address.neighborhood}`,
  wordMind: 'Mind',
  wordMuscle: 'Muscle',
  srHeadline: 'Mindful Muscle Fitness. Train the mind. Build the muscle.',
  subhead: business.positioning,
  support: business.team,
  primaryCta: 'Book a Free Consult',
  secondaryCta: `Call ${business.phone.display}`,
  phases: ['inhale', 'hold', 'exhale', 'hold'] as const,
  breathHint: 'Box breathing · 4 · 4 · 4 · 4',
  pauseLabel: 'Pause breathing animation',
  scrollCue: 'Scroll, slowly',
} as const;

export const marquee = {
  label: 'Studio hours and location',
  items: ['7AM – 12AM Daily', '1044 10th St', 'On The Hill', 'Steps from campus'],
  pauseLabel: 'Pause scrolling text',
} as const;

export const stickyCta = {
  book: 'Book',
  call: 'Call',
  bookAria: 'Book a free consult',
  callAria: `Call Mindful Muscle Fitness at ${business.phone.display}`,
} as const;

export const nav = {
  openLabel: `Open daily ${business.hours.short}`,
} as const;
