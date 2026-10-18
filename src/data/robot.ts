/** Robot specifications are unconfirmed. Replace labeled values after testing.
 * Hotspots use percentages; photos use local public paths. Timeline dates stay empty until known.
 * Feature descriptions explain design questions, not claims about the current robot. */
const image = '/images/placeholders/robot-front.svg';
export const robot = {
  name: 'Override robot · build in progress', // TODO: confirm robot name.
  season: '2026–27',
  image,
  specs: {
    Dimensions: 'To be confirmed',
    Drivetrain: 'To be confirmed',
    Motors: 'To be confirmed',
    Sensors: 'To be confirmed',
    Language: 'To be confirmed',
  }, // TODO: confirm every specification.
  codeStack:
    'VEXcode / PROS are platform options. Our language, development environment, odometry and autonomous tooling will be documented here after the code team confirms the stack.',
  features: [
    {
      id: 'drivetrain',
      title: 'Move with purpose.',
      label: 'Drivetrain',
      spec: 'Drive configuration · TBD',
      blurb:
        'Our drivetrain decisions begin with the field and the space we need to move through. We will publish the configuration after the build team confirms it.',
      hotspot: { x: 29, y: 75 },
      image,
    },
    {
      id: 'intake',
      title: 'Every piece matters.',
      label: 'Intake',
      spec: 'Intake configuration · TBD',
      blurb:
        'An intake has to work with the game objects, not just look good on a sketch. This space will show the mechanism once our prototype is ready to document.',
      hotspot: { x: 74, y: 63 },
      image,
    },
    {
      id: 'scoring',
      title: 'Build the stack.',
      label: 'Scoring / stacking',
      spec: 'Scoring mechanism · TBD',
      blurb:
        'Override asks teams to stack Pins and Cups on Goals. Our confirmed scoring design and testing notes will be added here.',
      hotspot: { x: 60, y: 28 },
      image,
    },
    {
      id: 'toggle',
      title: 'Change the field.',
      label: 'Toggle mechanism',
      spec: 'Toggle mechanism · TBD',
      blurb:
        'Toggles are part of the design problem this season. We will share the student-built solution when its details are confirmed.',
      hotspot: { x: 80, y: 45 },
      image,
    },
    {
      id: 'sensors',
      title: 'Make feedback count.',
      label: 'Sensors',
      spec: 'Sensor selection · TBD',
      blurb:
        'Useful feedback starts with choosing what to measure. Sensor selections and their roles will be documented after validation.',
      hotspot: { x: 44, y: 43 },
      image,
    },
    {
      id: 'code',
      title: 'Give intent to motion.',
      label: 'Code stack',
      spec: 'Language and tooling · TBD',
      blurb:
        'Students write the code that connects the controls to the machine. We will publish the confirmed environment and autonomous tooling here.',
      hotspot: { x: 45, y: 60 },
      image,
    },
  ],
  buildTimeline: [
    [
      'Game analysis',
      'Read. Question. Repeat.',
      'Start with the official manual and turn the game into a set of design questions.',
    ],
    [
      'Prototyping',
      'Make the question physical.',
      'Test ideas with small mechanisms before committing to a complete machine.',
    ],
    [
      'Build v1',
      'Bring the pieces together.',
      'Combine the student-designed mechanisms into the first complete build.',
    ],
    [
      'Code and autonomous routines',
      'Connect thought to motion.',
      'Develop controls and autonomous routines alongside the hardware.',
    ],
    [
      'Testing and driver practice',
      'Find the weak points.',
      'Use testing and practice to understand what needs to change.',
    ],
    [
      'Competition',
      'Put the work on the field.',
      'Confirmed event dates and competition notes will appear here.',
    ],
    ['Iteration', 'Then build it better.', 'Carry lessons from the field into the next version.'],
  ].map(([phase, title, blurb]) => ({
    phase,
    date: '',
    title,
    blurb,
    image: '/images/placeholders/build-process.svg',
  })), // TODO: add actual dates and progress; these are planned phases.
  evolution: ['v1', 'v2', 'v3'].map((version) => ({
    version,
    date: '',
    image: `/images/placeholders/robot-${version}.svg`,
    caption: `${version.toUpperCase()} · Image and development notes to be added.`,
  })), // TODO: replace planned image slots with documented builds.
};
