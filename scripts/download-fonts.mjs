import fs from 'node:fs/promises';
const css = await fetch(
  'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Manrope:wght@200..800&display=swap',
  {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36',
    },
  },
).then((r) => r.text());
for (const [name, file, folder] of [
  ['Space Grotesk', 'space-grotesk-latin.woff2', 'spacegrotesk'],
  ['Manrope', 'manrope-latin.woff2', 'manrope'],
]) {
  const block = [...css.matchAll(/\/\* latin \*\/\s*(@font-face\s*{[^}]+})/g)]
    .map((m) => m[1])
    .find((b) => b.includes("font-family: '" + name + "'"));
  const url = block?.match(/url\((https[^)]+)\)/)?.[1];
  if (!url) throw new Error('No latin font found for ' + name);
  const response = await fetch(url);
  if (!response.ok) throw new Error('Font download failed');
  await fs.writeFile('public/fonts/' + file, Buffer.from(await response.arrayBuffer()));
  const license = await fetch(
    'https://raw.githubusercontent.com/google/fonts/main/ofl/' + folder + '/OFL.txt',
  ).then((r) => r.text());
  await fs.writeFile('public/fonts/' + folder + '-LICENSE.txt', license);
  console.log('Self-hosted ' + name);
}
