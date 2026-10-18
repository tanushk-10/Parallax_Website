import fs from 'node:fs/promises';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
const root = new URL('../', import.meta.url);
const path = (p) => new URL(p, root);
const write = async (p, data) => {
  await fs.mkdir(new URL('./', path(p)), { recursive: true });
  await fs.writeFile(path(p), data);
};
const shots = [
  [
    'team-workbench',
    'Team at the workbench',
    'Students collaborating around the robot; eye-level, natural light.',
    1200,
    1400,
  ],
  [
    'robot-front',
    'Robot front three-quarter',
    'Full robot on a clean workbench; drivetrain and mechanisms visible.',
    1600,
    1067,
  ],
  [
    'robot-wide',
    'Robot wide view',
    'Wide three-quarter robot view; room for three annotation hotspots.',
    1800,
    850,
  ],
  [
    'build-process',
    'Build process',
    'Hands assembling a mechanism, with tools in the frame.',
    1200,
    800,
  ],
  ...['v1', 'v2', 'v3'].map((v) => [
    'robot-' + v,
    'Robot ' + v.toUpperCase() + ' development view',
    'Consistent camera angle showing the documented ' + v + ' build.',
    1200,
    800,
  ]),
  [
    'outreach-demo',
    'Robot demonstration',
    'With permission, students asking questions around a robot demo.',
    1200,
    900,
  ],
  [
    'outreach-workshop',
    'Hands-on workshop',
    'With permission, younger students trying a small robotics build.',
    1200,
    900,
  ],
  [
    'outreach-mentoring',
    'STEM mentoring',
    'With permission, a Parallax student explaining a mechanism.',
    1200,
    900,
  ],
];
const escape = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
for (const [id, label, , w, h] of shots) {
  const cx = w / 2,
    cy = h / 2;
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="' +
    w +
    '" height="' +
    h +
    '" viewBox="0 0 ' +
    w +
    ' ' +
    h +
    '"><defs><radialGradient id="g"><stop stop-color="#35402d"/><stop offset="1" stop-color="#17201a"/></radialGradient><pattern id="grid" width="70" height="70" patternUnits="userSpaceOnUse"><path d="M70 0H0V70" fill="none" stroke="#d7c8a4" stroke-opacity=".045"/></pattern></defs><path fill="url(#g)" d="M0 0h' +
    w +
    'v' +
    h +
    'H0z"/><path fill="url(#grid)" d="M0 0h' +
    w +
    'v' +
    h +
    'H0z"/><path d="M28 68V28h40M' +
    (w - 68) +
    ' 28h40v40M28 ' +
    (h - 68) +
    'v40h40M' +
    (w - 68) +
    ' ' +
    (h - 28) +
    'h40v-40" fill="none" stroke="#d7c8a4" stroke-opacity=".4"/><circle cx="' +
    cx +
    '" cy="' +
    cy +
    '" r="' +
    w * 0.21 +
    '" fill="none" stroke="#d7c8a4" stroke-opacity=".08"/><circle cx="' +
    cx +
    '" cy="' +
    cy +
    '" r="' +
    w * 0.27 +
    '" fill="none" stroke="#d7c8a4" stroke-opacity=".05" stroke-dasharray="3 12"/><path d="M' +
    (cx - 70) +
    ' ' +
    cy +
    'h140M' +
    cx +
    ' ' +
    (cy - 70) +
    'v140" stroke="#ff793d" stroke-opacity=".35"/><rect x="' +
    (cx - 32) +
    '" y="' +
    (cy - 22) +
    '" width="64" height="44" rx="3" fill="#1e281d" stroke="#d7c8a4" stroke-opacity=".6"/><circle cx="' +
    cx +
    '" cy="' +
    cy +
    '" r="12" fill="none" stroke="#ff793d"/><path d="m' +
    (cx - 18) +
    ' ' +
    (cy - 22) +
    ' 7-9h22l7 9" fill="none" stroke="#d7c8a4" stroke-opacity=".6"/><text x="50" y="65" font-family="monospace" font-size="12" letter-spacing="2" fill="#9ba68e">PARALLAX / OVERRIDE 2026-27</text><text x="' +
    cx +
    '" y="' +
    (cy + 100) +
    '" font-family="monospace" font-size="40" text-anchor="middle" letter-spacing="2" fill="#ff9b68">PHOTO NEEDED</text><text x="' +
    cx +
    '" y="' +
    (cy + 133) +
    '" font-family="monospace" font-size="32" text-anchor="middle" fill="#c2c9b3">' +
    escape(label) +
    '</text><text x="50" y="' +
    (h - 50) +
    '" font-family="monospace" font-size="11" fill="#818c79">REPLACE WITH STUDENT PHOTOGRAPHY</text><text x="' +
    (w - 50) +
    '" y="' +
    (h - 50) +
    '" text-anchor="end" font-family="monospace" font-size="11" fill="#818c79">' +
    w +
    ' x ' +
    h +
    '</text></svg>';
  await write('public/images/placeholders/' + id + '.svg', svg);
}
for (let i = 1; i <= 8; i++) {
  const name = i < 3 ? 'PLATINUM SPONSOR' : 'YOUR LOGO HERE';
  await write(
    'public/images/placeholders/sponsor-' + i + '.svg',
    '<svg xmlns="http://www.w3.org/2000/svg" width="260" height="120" viewBox="0 0 260 120"><g fill="none" stroke="#c3c9b2" stroke-width="1.5"><path d="m26 46 15-9 15 9v18l-15 9-15-9zM26 46l30 18M56 46 26 64"/><circle cx="41" cy="55" r="6"/></g><text x="75" y="53" font-family="monospace" font-size="12" fill="#c3c9b2">' +
      name +
      '</text><text x="75" y="72" font-family="monospace" font-size="8" letter-spacing="1" fill="#818b7e">OPEN PLACEMENT / 0' +
      i +
      '</text></svg>',
  );
}
await write(
  'docs/PHOTO-SHOT-LIST.md',
  '# Photography shot list\n\nReplace each SVG with an approved photo and update its data path. Keep meaningful alt text. Obtain student/guardian permission before publication.\n\n| Placeholder | Path | Recommended pixels | What to shoot |\n| --- | --- | --- | --- |\n' +
    shots
      .map(
        ([id, label, note, w, h]) =>
          '| ' +
          label +
          ' | public/images/placeholders/' +
          id +
          '.svg | ' +
          w +
          ' × ' +
          h +
          ' | ' +
          note +
          ' |',
      )
      .join('\n') +
    '\n\nMember portraits: add a photo path to each published entry in src/data/team.ts. Aim for 900 × 1020 pixels; frame every member consistently. Until then, initials avatars are intentional.\n\nSponsor tiles: public/images/placeholders/sponsor-1.svg through sponsor-8.svg, 260 × 120. Use only approved sponsor logos. Replace the label, URL and placeholder flag together in src/data/sponsors.ts.\n',
);
const mark =
  '<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 40 40"><rect width="40" height="40" rx="8" fill="#101514"/><g fill="none" stroke="#ff793d" stroke-width="2.6"><path d="M7 28V12L20 5l13 7v9l-13 7v7M7 12l13 7 13-7M20 19v9M12 31V15"/></g></svg>';
await write('public/favicon.svg', mark);
await sharp(Buffer.from(mark))
  .resize(32)
  .png()
  .toFile(fileURLToPath(path('public/favicon.png')));
await sharp(Buffer.from(mark))
  .resize(180)
  .png()
  .toFile(fileURLToPath(path('public/apple-touch-icon.png')));
const og =
  '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#101514"/><g stroke="#d7c8a4" opacity=".12" fill="none"><circle cx="1040" cy="320" r="240"/><circle cx="1040" cy="320" r="300"/><path d="M740 320h460M1040 20v600"/></g><path d="M60 68h32v32H60z" fill="none" stroke="#ff793d" stroke-width="3"/><text x="110" y="94" font-family="Arial" font-size="24" letter-spacing="4" fill="#eeeede">PARALLAX ROBOTICS</text><text x="60" y="245" font-family="Arial" font-size="94" font-weight="bold" letter-spacing="-5" fill="#eeeede">Small team.</text><text x="60" y="350" font-family="Arial" font-size="94" font-weight="bold" letter-spacing="-5" fill="#eeeede">Bigger</text><text x="60" y="455" font-family="Arial" font-size="94" font-weight="bold" letter-spacing="-5" fill="#ff793d">possibilities.</text><path d="M60 520h1080" stroke="#d7c8a4" opacity=".2"/><text x="60" y="565" font-family="monospace" font-size="15" fill="#d7c8a4">EDISON HIGH SCHOOL / VEX V5RC / OVERRIDE 2026-27</text></svg>';
await sharp(Buffer.from(og))
  .png()
  .toFile(fileURLToPath(path('public/og.png')));
// Real, single-page PDFs with embedded standard fonts and byte-accurate cross-reference tables.
function pdf(title, lines) {
  const esc = (s) => s.replaceAll('\\', '\\\\').replaceAll('(', '\\(').replaceAll(')', '\\)');
  const text = (s, x, y, size = 13, color = '0.82 0.85 0.78') =>
    'BT /F1 ' + size + ' Tf ' + color + ' rg ' + x + ' ' + y + ' Td (' + esc(s) + ') Tj ET\n';
  let content = '0.063 0.082 0.078 rg 0 0 612 792 re f\n0.99 0.47 0.24 rg 42 731 30 3 re f\n';
  content += text('PARALLAX ROBOTICS', 42, 698, 23, '0.93 0.93 0.87');
  content += text('OVERRIDE 2026-27 / EDISON, NJ', 42, 669, 10);
  content += text('PLACEHOLDER DOCUMENT', 42, 615, 12, '0.99 0.55 0.31');
  content += text(title, 42, 576, 27, '0.93 0.93 0.87');
  let y = 529;
  for (const line of lines) {
    content += text(line, 42, y, 12);
    y -= 23;
  }
  content += text('Contact: parallaxrobotics7@gmail.com', 42, 147, 12, '0.99 0.55 0.31');
  content += text('parallaxrobotics.net', 42, 122, 12);
  content += text('Where Genius Meets Innovation.', 42, 67, 10);
  const objs = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    '<< /Length ' + Buffer.byteLength(content) + ' >>\nstream\n' + content + 'endstream',
  ];
  let out = '%PDF-1.4\n';
  const offsets = [0];
  for (let i = 0; i < objs.length; i++) {
    offsets.push(Buffer.byteLength(out));
    out += i + 1 + ' 0 obj\n' + objs[i] + '\nendobj\n';
  }
  const start = Buffer.byteLength(out);
  out +=
    'xref\n0 6\n0000000000 65535 f \n' +
    offsets
      .slice(1)
      .map((n) => String(n).padStart(10, '0') + ' 00000 n \n')
      .join('') +
    'trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n' +
    start +
    '\n%%EOF\n';
  return out;
}
await write(
  'public/docs/parallax-sponsorship-packet.pdf',
  pdf('Build with us.', [
    'This is a labeled placeholder for our final sponsorship packet.',
    'It is not an approved sponsorship offer or agreement.',
    '',
    'Parallax Robotics is a student-led VEX V5RC team at Edison',
    'High School, a Title I public school in Edison, New Jersey.',
    'Founded in 2025. Current season: Override 2026-27.',
    '',
    'The final packet will include:',
    '- Our team, mission and approved student photography',
    '- Confirmed sponsorship amounts and benefits',
    '- A verified budget for parts, registration and travel',
    '- Sponsor placements, fulfillment details and contact information',
    '',
    'Please contact us for a confirmed proposal.',
  ]),
);
await write(
  'public/docs/parallax-team-one-pager.pdf',
  pdf('Meet Parallax.', [
    'This is a labeled placeholder for our final one-page team flyer.',
    '',
    'We are Parallax Robotics: six students from Edison High School,',
    'a Title I public school in Edison, NJ. We design, build and code',
    'our own robot for the high school VEX V5 Robotics Competition.',
    '',
    'Founded: 2025',
    'Current season: Override 2026-27',
    'Team number: not yet supplied',
    '',
    'The final flyer will add approved team and robot photography,',
    'the official team number, and confirmed outreach information.',
    '',
    'Support goes toward parts, competition registration and travel.',
    'Find our primary GoFundMe link at parallaxrobotics.net/sponsors.',
  ]),
);
console.log(
  'Generated ' + shots.length + ' photo placeholders, 8 sponsor tiles, icons, OG image and 2 PDFs.',
);
