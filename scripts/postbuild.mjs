/** Normalize Next 16 Windows static-export segment filenames.
 * Upstream: https://github.com/vercel/next.js/issues/85374
 * Linux exports already use flat filenames; this step is a harmless no-op there. */
import fs from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('out');
let copies = 0;
async function walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(file);
      continue;
    }
    const parts = path.relative(root, file).split(path.sep);
    const index = parts.findIndex((p) => p.startsWith('__next.'));
    if (index < 0 || index === parts.length - 1) continue;
    const target = path.join(root, ...parts.slice(0, index), parts.slice(index).join('.'));
    await fs.copyFile(file, target);
    copies++;
  }
}
await walk(root);
await fs.writeFile(path.join(root, '.nojekyll'), '');
console.log('Static export ready. Normalized ' + copies + ' Windows segment files.');
