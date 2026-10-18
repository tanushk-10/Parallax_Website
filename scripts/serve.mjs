import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
const root = path.resolve('out');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json',
};
http
  .createServer(async (req, res) => {
    try {
      let file = path.resolve(
        root,
        '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname),
      );
      if (!file.startsWith(root + path.sep) && file !== root) {
        res.writeHead(403);
        res.end();
        return;
      }
      if (!path.extname(file)) file = path.join(file, 'index.html');
      let status = 200;
      let data;
      try {
        data = await fs.readFile(file);
      } catch {
        status = 404;
        file = path.join(root, '404.html');
        data = await fs.readFile(file);
      }
      const headers = {
        'Content-Type': types[path.extname(file)] || 'application/octet-stream',
        'X-Content-Type-Options': 'nosniff',
      };
      if (
        req.headers['accept-encoding']?.includes('gzip') &&
        data.length > 1000 &&
        !['.png', '.pdf', '.woff2'].includes(path.extname(file))
      ) {
        data = gzipSync(data);
        headers['Content-Encoding'] = 'gzip';
        headers.Vary = 'Accept-Encoding';
      }
      res.writeHead(status, headers);
      res.end(data);
    } catch {
      res.writeHead(500);
      res.end('Unable to serve this file. Run npm run build first.');
    }
  })
  .listen(Number(process.env.PORT || 3000), '0.0.0.0', () =>
    console.log('Local: http://localhost:' + (process.env.PORT || 3000)),
  );
