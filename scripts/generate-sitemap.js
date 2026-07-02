import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SITE_URL = 'https://esperancee.vercel.app';
const pages = [
  '/',
  '/about',
  '/gallery',
  '/news',
  '/contact',
  '/football-academy',
  '/football-academy/football',
  '/football-academy/womens-football',
  '/football-academy/basketball',
  '/football-academy/volleyball',
  '/football-academy/table-tennis',
  '/football-academy/german-classes',
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>\n    <loc>${SITE_URL}${page}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.80</priority>\n  </url>`
  )
  .join('\n')}
</urlset>`;

const outputPath = resolve(__dirname, '../public/sitemap.xml');
writeFileSync(outputPath, sitemap, { encoding: 'utf8' });
console.log(`Sitemap written to ${outputPath}`);
