/** Add one entry per student; publish only with their consent. photo is a local path or empty
 * for an initials avatar. order controls roster order; founders are always shown first.
 * bio is editable copy, with unconfirmed biographies explicitly labeled. */
export type Group = 'build' | 'code' | 'outreach' | 'media' | 'notebook' | 'tbd';
export type Member = {
  id: string;
  name: string;
  role: string;
  group: Group;
  founder: boolean;
  published: boolean;
  bio: string;
  photo: string;
  order: number;
};
export const team: Member[] = [
  {
    id: 'pranav',
    name: 'Pranav Srinivasan',
    role: 'Founder & Build',
    group: 'build',
    founder: true,
    published: true,
    bio: 'Student biography to be added.',
    photo: '',
    order: 1,
  },
  {
    id: 'tanush-k',
    name: 'Tanush Kandpal',
    role: 'Founder & Code',
    group: 'code',
    founder: true,
    published: true,
    bio: 'Student biography to be added.',
    photo: '',
    order: 2,
  },
  {
    id: 'tanush-l',
    name: 'Tanush Lingala',
    role: 'Code',
    group: 'code',
    founder: false,
    published: true,
    bio: 'Student biography to be added.',
    photo: '',
    order: 3,
  },
  {
    id: 'vihaan',
    name: 'Vihaan Rajagopal',
    role: 'Code',
    group: 'code',
    founder: false,
    published: true,
    bio: 'Student biography to be added.',
    photo: '',
    order: 4,
  },
  {
    id: 'shankar',
    name: 'Shankar Datta Reddy',
    role: 'Build',
    group: 'build',
    founder: false,
    published: true,
    bio: 'Student biography to be added.',
    photo: '',
    order: 5,
  },
  {
    id: 'sanjay',
    name: 'Sanjay Parisa',
    role: 'Build',
    group: 'build',
    founder: false,
    published: true,
    bio: 'Student biography to be added.',
    photo: '',
    order: 6,
  },
  ...Array.from({ length: 6 }, (_, i): Member => ({
    id: `new-${i + 1}`,
    name: 'New member',
    role: 'TBD',
    group: 'tbd',
    founder: false,
    published: false,
    bio: '',
    photo: '',
    order: i + 7,
  })), // TODO: fill in and publish as students join.
];
export const publishedMembers = team
  .filter((m) => m.published)
  .sort((a, b) => Number(b.founder) - Number(a.founder) || a.order - b.order);
export const groupLabels: Record<Group, string> = {
  build: 'Build',
  code: 'Code',
  outreach: 'Outreach',
  media: 'Media',
  notebook: 'Notebook',
  tbd: 'TBD',
};
