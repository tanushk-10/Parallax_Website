/** Shared identity, links, navigation and contact endpoint. Empty teamNumber is never rendered.
 * Set formEndpoint to a Formspree URL; an empty string uses an explicit email handoff. */
export const site = {
  name: 'Parallax Robotics',
  tagline: 'Where Genius Meets Innovation.',
  teamNumber: '', // TODO: add the official team number when confirmed.
  school: 'Edison High School',
  city: 'Edison, NJ',
  season: '2026–27',
  game: 'Override',
  foundingYear: 2025,
  email: 'parallaxrobotics7@gmail.com',
  instagram: { handle: '@prxrobotics2025', url: 'https://www.instagram.com/prxrobotics2025' },
  gofundme: 'https://www.gofundme.com/f/support-parallax-robotics-title-i-school-stem-team',
  manual: 'https://link.vex.com/docs/26-27/v5rc/game-manual',
  formEndpoint: '', // TODO: https://formspree.io/f/YOUR_FORM_ID
  url: 'https://parallaxrobotics.net',
  nav: [
    { href: '/', label: 'Home' },
    { href: '/robot', label: 'The robot' },
    { href: '/team', label: 'The team' },
    { href: '/story', label: 'Our story' },
    { href: '/outreach', label: 'Outreach' },
    { href: '/sponsors', label: 'Sponsors' },
    { href: '/resources', label: 'Resources' },
    { href: '/contact', label: 'Contact' },
  ],
  socialLinks: [
    { label: 'Instagram', href: 'https://www.instagram.com/prxrobotics2025' },
    { label: 'Email', href: 'mailto:parallaxrobotics7@gmail.com' },
    {
      label: 'GoFundMe',
      href: 'https://www.gofundme.com/f/support-parallax-robotics-title-i-school-stem-team',
    },
  ],
};
