/**
 * Google reviews, supplied by the owner. Quotes are verbatim (original
 * spelling kept). Names are shown as they appear on Google.
 *
 * Add new ones to the top. Set `placeholder: true` on any entry that is not a
 * real, approved review and the card will be visibly labelled.
 */
export interface Testimonial {
  quote: string;
  name: string;
  source: 'Google';
  placeholder?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    name: 'WalrusFilms FTW',
    quote:
      'You can tell the owner really cares about your experience. All the staff are very well educated when it comes to fitness as well. While it is a smaller gym this feels more of an advantage then the other way around. I really felt like they made my health and goals their priority. Definitely reccomend!',
    source: 'Google',
  },
  {
    name: 'Andrew Willis',
    quote:
      'We’ll trained staff. Great private gym definitely recommend if you are starting out. Caleb is the absolute man he knows everything when it comes to physical fitness. Give them a try and you won’t regret.',
    source: 'Google',
  },
  {
    name: 'Troy Mackey',
    quote:
      'Caleb is an outstanding trainer. Not only will he work you to the bone but, his dietary plans can help you get and stay in shape. The gym is conveniently located on this hill making a mid-day workout a breeze to get to in between classes.',
    source: 'Google',
  },
  {
    name: 'jake hoodack',
    quote:
      'Trainers, such as Caleb Saks, really pushed me to meet my fitness goals. Their whole staff really made working out enjoyable and meaningful. Overall amazing experience.',
    source: 'Google',
  },
  {
    name: 'Zach Columbus',
    quote: 'Trainers are very knowledgeable and they have a nice variety of equipment in great shape!',
    source: 'Google',
  },
  {
    name: 'Evan Kelly',
    quote: 'The owner, Caleb, is incredibly knowledgeable and passionate about what he does. Could not recommend more.',
    source: 'Google',
  },
  {
    name: 'Henry Babbie',
    quote: 'Great trainers who care about your goals as much as you do.',
    source: 'Google',
  },
  {
    name: 'Frank Diaz',
    quote: 'Great experience, high level of professionalism and really nice equipment.',
    source: 'Google',
  },
  {
    name: 'Bradley Gottlieb',
    quote: 'Great people. They make working out a good time',
    source: 'Google',
  },
  {
    name: 'Paul Villarreal',
    quote: 'Super nice vibe here and the staff knows what they are talking about.',
    source: 'Google',
  },
  {
    name: 'Mitch Morgan',
    quote: 'Great equipment, even better trainers.',
    source: 'Google',
  },
  {
    name: 'Cameron LaPierre',
    quote: 'Timely, organized, and dedicated work. Shoutout mindful muscle fitness!',
    source: 'Google',
  },
  {
    name: 'Aidan Clark',
    quote: 'Quality facility and great equipment!',
    source: 'Google',
  },
];
