/** External references and local downloads. Unknown URLs stay # and render as non-links with a
 * coming-soon label. Replace both placeholder PDFs with approved final documents before fundraising. */
import { site } from './site';
export const resources: {
  id: string;
  title: string;
  description: string;
  href: string;
  type: 'link' | 'pdf';
}[] = [
  {
    id: 'manual',
    title: 'Override game manual',
    description: 'The official source for the 2026–27 game and its rules.',
    href: site.manual,
    type: 'link',
  },
  {
    id: 'game',
    title: 'Meet the game',
    description: 'Explore the current VEX V5RC game on the official competition site.',
    href: 'https://www.vexrobotics.com/v5/competition/vrc-current-game',
    type: 'link',
  },
  {
    id: 'events',
    title: 'RobotEvents',
    description: 'Find official VEX events, registration and competition information.',
    href: 'https://www.robotevents.com',
    type: 'link',
  },
  {
    id: 'notebook',
    title: 'Engineering notebook',
    description: 'Our design questions, tests and decisions. Public access is being prepared.',
    href: '#',
    type: 'link',
  }, // TODO: add approved notebook URL.
  {
    id: 'code',
    title: 'Code repository',
    description: 'Student-written controls and autonomous code. Public access is being prepared.',
    href: '#',
    type: 'link',
  }, // TODO: add repository URL.
  {
    id: 'packet',
    title: 'Sponsorship packet',
    description:
      'Download the labeled draft outlining the team and proposed sponsorship opportunities.',
    href: '/docs/parallax-sponsorship-packet.pdf',
    type: 'pdf',
  },
  {
    id: 'flyer',
    title: 'One-page team flyer',
    description:
      'Download the labeled placeholder flyer, ready for team details and approved photos.',
    href: '/docs/parallax-team-one-pager.pdf',
    type: 'pdf',
  },
];
export const faqs = [
  {
    question: 'What is VEX V5RC?',
    answer:
      'VEX V5 Robotics Competition is a robotics program where student teams design, build and code robots for an annual game. We compete in the high school division.',
  },
  {
    question: 'How are Override matches scored?',
    answer:
      'At a high level, teams stack Pins and Cups on Goals, set Toggles to their alliance color, and finish with robots in the contested Midfield. Alliance-color Pins are worth 5 points, yellow Pins 10, a robot in the Midfield 8, and the autonomous bonus 12. Consult the official manual for all rules and scoring conditions.',
  },
  {
    question: 'How can students join?',
    answer:
      'Send us a message through Contact. Tell us what you would like to try: building, coding, documenting, media or outreach. More students are joining, and curiosity is a useful place to start.',
  },
  {
    question: 'How can sponsors help?',
    answer:
      'Donate through our GoFundMe or contact us about sponsorship. Support goes directly toward parts, competition registration and travel.',
  },
];
