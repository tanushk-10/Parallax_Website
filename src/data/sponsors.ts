/** Tier amounts and cost examples are illustrative and visibly labeled until confirmed.
 * Sponsor entries are advertising slots, not actual sponsors. Set placeholder false only with approval.
 * Benefits are proposed offers; confirm fulfillment with the team before an agreement. */
export const tiers = [
  {
    id: 'bronze',
    name: 'Bronze',
    amount: 100,
    benefits: [
      'Logo on our website',
      'Social media shout-out',
      'Named recognition in our engineering notebook',
    ],
  }, // TODO: confirm amount and benefits.
  {
    id: 'silver',
    name: 'Silver',
    amount: 300,
    benefits: ['All Bronze benefits', 'Logo on team shirts', 'Invitation to a demo day'],
  }, // TODO: confirm amount and benefits.
  {
    id: 'gold',
    name: 'Gold',
    amount: 750,
    benefits: ['All Silver benefits', 'Logo on the robot', 'Recognition on our event banner'],
  }, // TODO: confirm amount and benefits.
  {
    id: 'platinum',
    name: 'Platinum',
    amount: 1500,
    benefits: [
      'All Gold benefits',
      'Featured website placement',
      'A dedicated team demo and thank-you',
    ],
  }, // TODO: confirm amount and benefits.
];
export const sponsors = Array.from({ length: 8 }, (_, i) => ({
  id: `slot-${i}`,
  name: i < 2 ? 'Platinum sponsor' : 'Your logo here',
  tier: ['platinum', 'platinum', 'gold', 'gold', 'silver', 'silver', 'bronze', 'bronze'][i],
  logo: `/images/placeholders/sponsor-${i + 1}.svg`,
  url: '#',
  placeholder: true,
})); // TODO: replace with confirmed sponsors and approved logos.
export const costs = [
  { item: 'Motors', price: 40, purpose: 'Put movement into student-designed mechanisms.' }, // TODO: confirm actual unit cost.
  { item: 'Sensors', price: 30, purpose: 'Help us measure, test and understand the robot.' }, // TODO: confirm actual unit cost.
  { item: 'Structural metal', price: 60, purpose: 'Turn sketches into a frame we can build on.' }, // TODO: confirm actual unit cost.
  {
    item: 'Competition registration',
    price: 150,
    purpose: 'Get our student-built robot onto the field.',
  }, // TODO: confirm actual event fee.
  { item: 'Travel', price: 200, purpose: 'Help the team and the robot reach competitions.' }, // TODO: confirm actual trip cost.
];
