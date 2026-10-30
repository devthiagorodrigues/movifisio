import { esc } from './html.js';
import { seo } from '../config/content.js';

/** Regras de publicação: uma versão indexável exige dados confirmados. */
export function assertPublishable(clinic) {
  if (clinic.demoMode) return;
  const missing = [];
  if (!clinic.domain) missing.push('domain');
  for (const key of ['region', 'hours', 'domain']) if (!clinic.confirmed[key]) missing.push(`confirmed.${key}`);
  if (missing.length) {
    throw new Error(`demoMode=false exige dados confirmados em clinic.js. Faltando: ${missing.join(', ')}`);
  }
}

export function robotsMeta(clinic) {
  return clinic.demoMode ? '<meta name="robots" content="noindex, nofollow">' : '<meta name="robots" content="index, follow">';
}

export function headMeta(clinic) {
  const url = clinic.domain ? `${clinic.domain}/` : '';
  const image = clinic.domain ? `${clinic.domain}/og.jpg` : 'og.jpg';
  const tags = [
    `<meta name="description" content="${esc(seo.description)}">`,
    robotsMeta(clinic),
    clinic.domain && !clinic.demoMode ? `<link rel="canonical" href="${esc(url)}">` : '',
    '<meta property="og:type" content="website">',
    '<meta property="og:locale" content="pt_BR">',
    `<meta property="og:site_name" content="${esc(clinic.name)}">`,
    `<meta property="og:title" content="${esc(seo.title)}">`,
    `<meta property="og:description" content="${esc(seo.description)}">`,
    clinic.domain && !clinic.demoMode ? `<meta property="og:url" content="${esc(url)}">` : '',
    `<meta property="og:image" content="${esc(image)}">`,
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    `<meta property="og:image:alt" content="${esc(clinic.name)} — ${esc(clinic.tagline)}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${esc(seo.title)}">`,
    `<meta name="twitter:description" content="${esc(seo.description)}">`,
    `<meta name="twitter:image" content="${esc(image)}">`,
  ];
  return tags.filter(Boolean).join('\n    ');
}

/**
 * Dados estruturados da clínica. Só são emitidos na versão indexável E com endereço
 * confirmado: nunca publicamos dados de uma clínica sem informações reais.
 */
export function structuredData(clinic) {
  if (clinic.demoMode || !clinic.domain || !clinic.confirmed.address || !clinic.location.address) return '';
  const data = {
    '@context': 'https://schema.org',
    '@type': 'PhysicalTherapy',
    name: clinic.name,
    url: `${clinic.domain}/`,
    image: `${clinic.domain}/og.jpg`,
    description: seo.description,
    address: { '@type': 'PostalAddress', streetAddress: clinic.location.address, addressLocality: clinic.location.city, addressRegion: clinic.location.state, addressCountry: 'BR' },
    ...(clinic.contact.phone ? { telephone: clinic.contact.phone } : {}),
    ...(clinic.confirmed.hours
      ? {
          openingHoursSpecification: clinic.hours.map((h) => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: h.schedule.days.map((d) => ({ Mo: 'Monday', Tu: 'Tuesday', We: 'Wednesday', Th: 'Thursday', Fr: 'Friday', Sa: 'Saturday', Su: 'Sunday' })[d]),
            opens: h.schedule.opens,
            closes: h.schedule.closes,
          })),
        }
      : {}),
    ...(clinic.contact.instagram ? { sameAs: [`https://www.instagram.com/${clinic.contact.instagram}/`] } : {}),
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

export const robotsTxt = (clinic) =>
  clinic.demoMode
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${clinic.domain}/sitemap.xml\n`;

export const sitemapXml = (clinic) =>
  clinic.demoMode
    ? null
    : `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${clinic.domain}/</loc></url>\n</urlset>\n`;
