/** Planned formats, not completed events. TODO: confirm dates, titles, places, photos and impact
 * before changing status to completed. null impact means no count is shown. */
export type OutreachEvent = {
  id: string;
  date: string;
  title: string;
  place: string;
  blurb: string;
  image: string;
  impact: number | null;
  status: string;
};
export const outreach: OutreachEvent[] = [
  {
    id: 'demo',
    date: 'Date to be confirmed',
    title: 'See a robot. Ask a hundred questions.',
    place: 'Location to be confirmed',
    blurb:
      'A proposed hands-on demo for younger Edison students. We want to show what each mechanism does, let questions lead the conversation, and make robotics feel within reach.',
    image: '/images/placeholders/outreach-demo.svg',
    impact: null,
    status: 'Planned format',
  },
  {
    id: 'workshop',
    date: 'Date to be confirmed',
    title: 'A first build can start small.',
    place: 'Location to be confirmed',
    blurb:
      'A proposed introduction to building and coding. The aim is simple: give students a small problem, room to experiment, and a reason to keep going.',
    image: '/images/placeholders/outreach-workshop.svg',
    impact: null,
    status: 'Planned format',
  },
  {
    id: 'mentoring',
    date: 'Date to be confirmed',
    title: 'Pass the tools forward.',
    place: 'Location to be confirmed',
    blurb:
      'A proposed mentoring format for students curious about STEM. We want to share the mistakes, methods and small breakthroughs that make a team possible.',
    image: '/images/placeholders/outreach-mentoring.svg',
    impact: null,
    status: 'Planned format',
  },
];
