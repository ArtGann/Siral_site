import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { render } from '../dist/ssr/entry-server.js';
import { routeList, services, company } from '../src/content.js';

const template = await readFile('dist/client/index.html', 'utf8');

const SITE_URL = 'https://siralstrategy.com';
const SOCIAL_IMAGE = `${SITE_URL}/assets/og-siral.jpg`;
const LASTMOD = '2026-09-11';

const escape = (s) =>
  s
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

const titles = {
  '/': 'Clarity to grow. Systems to scale.',
  '/services/': 'Our Services',
  '/about/': 'About SIRAL',
  '/approach/': 'Our Approach',
  '/plans/': 'Ways to Work Together',
  '/contact-us/': 'Contact SIRAL',
  '/privacy-policy/': 'Privacy Policy',
  '/terms-conditions/': 'Terms & Conditions',
  '/disclaimer/': 'Disclaimer',
};

const organizationJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: company.name,
  url: SITE_URL,
  logo: `${SITE_URL}/assets/siral-logo.png`,
  email: company.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '111 Buck Rd, Suite 200 Unit 2',
    addressLocality: 'Huntingdon Valley',
    addressRegion: 'PA',
    postalCode: '19006',
    addressCountry: 'US',
  },
  sameAs: company.socials.map(([, url]) => url),
});

for (const path of [...routeList, '/404/']) {
  const service = services.find(
    (s) => path === '/services/' + s.slug + '/'
  );

  const title =
    (service?.name || titles[path] || 'Page Not Found') +
    ' — SIRAL Corporation';

  const description =
    service?.short ||
    'Business consulting and marketing, connected around your goals. SIRAL Corporation works with businesses across the United States.';

  const canonical = SITE_URL + path;
  const is404 = path === '/404/';

  let html = template
    .replace(
      '<div id="root"></div>',
      '<div id="root">' + render(path) + '</div>'
    )
    .replace(
      /<title>.*?<\/title>/s,
      '<title>' + escape(title) + '</title>'
    )
    .replace(
      /<meta name="description"[^>]*>/,
      '<meta name="description" content="' +
        escape(description) +
        '" />'
    )
    .replace(
      /<meta name="robots"[^>]*>/,
      `<meta name="robots" content="${
        is404 ? 'noindex, nofollow' : 'index, follow'
      }" />`
    );

  const socialMeta = `
<meta property="og:title" content="${escape(title)}" />
<meta property="og:description" content="${escape(description)}" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="SIRAL Corporation" />
<meta property="og:locale" content="en_US" />
<meta property="og:url" content="${canonical}" />
<meta property="og:image" content="${SOCIAL_IMAGE}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="SIRAL Corporation — Clarity to grow. Systems to scale." />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escape(title)}" />
<meta name="twitter:description" content="${escape(description)}" />
<meta name="twitter:image" content="${SOCIAL_IMAGE}" />
`;

  const structuredData = `<script type="application/ld+json">${organizationJsonLd}</script>\n`;

  if (!is404) {
    html = html.replace(
      '</head>',
      `<link rel="canonical" href="${canonical}" />\n${socialMeta}${structuredData}</head>`
    );
  } else {
    html = html.replace('</head>', socialMeta + structuredData + '</head>');
  }

  const destination = resolve(
    'dist/client',
    '.' + path,
    'index.html'
  );

  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, html);
}

await writeFile(
  'dist/client/sitemap.xml',
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    routeList
      .map(
        (path) =>
          `  <url><loc>${SITE_URL}${path}</loc><lastmod>${LASTMOD}</lastmod></url>`
      )
      .join('\n') +
    '\n</urlset>\n'
);

await rm('dist/ssr', { recursive: true, force: true });

console.log(
  'Prerendered ' +
    (routeList.length + 1) +
    ' routes, with production SEO metadata.'
);
