/**
 * ⚠️ PLACEHOLDERS ONLY. These are NOT real reviews.
 *
 * Replace each entry with a real Google review once the owner has approved it
 * for use on the site. Keep the reviewer's name exactly as it appears on Google
 * (or first name + last initial, with their permission), and set
 * `placeholder: false`.
 *
 * The component visibly labels any entry where `placeholder` is true.
 */
export interface Testimonial {
  quote: string;
  name: string;
  context?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  source: 'Google';
  placeholder: boolean;
}

const PLACEHOLDER_QUOTE = 'TODO: Paste an approved Google review here.';

export const testimonials: Testimonial[] = Array.from({ length: 5 }, (_, i) => ({
  quote: PLACEHOLDER_QUOTE,
  name: `TODO: Reviewer ${i + 1}`,
  context: 'Google review',
  rating: 5,
  source: 'Google',
  placeholder: true,
}));
