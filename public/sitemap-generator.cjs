// This script should be renamed to sitemap-generator.cjs for CommonJS compatibility.
const fs = require('fs');

const baseUrl = 'https://eegnite.com';
const routes = [
  '/',
  '/about',
  '/services',
  '/case-studies',
  '/resources',
  '/contact',
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>\n    <loc>${baseUrl}${route}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`
  )
  .join('\n')}
</urlset>
`;

fs.writeFileSync('public/sitemap.xml', sitemap);
console.log('sitemap.xml generated!'); 