/** Gera dist/ a partir dos componentes e dos dados centralizados. Uso: npm run build */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { clinic } from '../src/config/clinic.js';
import { seo } from '../src/config/content.js';
import { isValidWhatsapp, esc } from '../src/lib/html.js';
import { assertPublishable, headMeta, structuredData, robotsTxt, sitemapXml } from '../src/lib/seo.js';
import { header } from '../src/components/header.js';
import { heroSection } from '../src/components/hero.js';
import { aboutSection } from '../src/components/about.js';
import { servicesSection } from '../src/components/services.js';
import { teamSection } from '../src/components/team.js';
import { processSection } from '../src/components/process.js';
import { contactSection } from '../src/components/contact.js';
import { footerSection } from '../src/components/footer.js';
import { bookingDialog } from '../src/components/dialog.js';
import { privacyBody, notFoundBody } from '../src/components/legal.js';
import { robotsMeta } from '../src/lib/seo.js';
import crypto from 'node:crypto';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

assertPublishable(clinic);
const manifestPath = path.join(root, 'public/img/manifest.json');
if (!fs.existsSync(manifestPath)) throw new Error('Rode "npm run images" antes do build.');
const ctx = {
  clinic,
  manifest: JSON.parse(fs.readFileSync(manifestPath, 'utf8')),
  hasWhatsapp: isValidWhatsapp(clinic.contact.whatsapp),
};

const css = ['tokens', 'base', 'components']
  .map((f) => fs.readFileSync(path.join(root, `src/styles/${f}.css`), 'utf8'))
  .join('\n')
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s*\n\s*/g, '\n')
  .replace(/\s*([{};,>])\s*/g, '$1')
  .replace(/:\s+/g, ':');
const js = fs.readFileSync(path.join(root, 'src/scripts/main.js'), 'utf8');

const html = `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${esc(seo.title)}</title>
    ${headMeta(clinic)}
    <meta name="theme-color" content="#EDE5D8">
    <link rel="icon" href="favicon.svg" type="image/svg+xml">
    <link rel="icon" href="favicon-32.png" sizes="32x32" type="image/png">
    <link rel="apple-touch-icon" href="apple-touch-icon.png">
    <link rel="manifest" href="site.webmanifest">
    <link rel="preload" as="image" type="image/webp" imagesrcset="${ctx.manifest['hero-avaliacao'].widths.map((w) => `img/hero-avaliacao-${w}.webp ${w}w`).join(', ')}" imagesizes="100vw">
    <script>document.documentElement.classList.add('js')</script>
    <link rel="stylesheet" href="assets/main.css">
    ${structuredData(clinic)}
  </head>
  <body>
    <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
    ${header(ctx)}
    <main id="conteudo" tabindex="-1">
    ${heroSection(ctx)}
    ${aboutSection(ctx)}
    ${servicesSection(ctx)}
    ${teamSection(ctx)}
    ${processSection(ctx)}
    ${contactSection(ctx)}
    </main>
    ${footerSection(ctx)}
    ${bookingDialog(ctx)}
    <script src="assets/main.js" defer></script>
  </body>
</html>
`;

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(path.join(dist, 'assets'), { recursive: true });
fs.cpSync(path.join(root, 'public'), dist, { recursive: true });
fs.rmSync(path.join(dist, 'img/manifest.json'), { force: true });
fs.writeFileSync(path.join(dist, 'index.html'), html);
fs.writeFileSync(path.join(dist, 'assets/main.css'), css);
fs.writeFileSync(path.join(dist, 'assets/main.js'), js);
fs.writeFileSync(path.join(dist, 'robots.txt'), robotsTxt(clinic));
const sitemap = sitemapXml(clinic);
if (sitemap) fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
fs.writeFileSync(
  path.join(dist, 'site.webmanifest'),
  JSON.stringify({ name: clinic.name, short_name: clinic.shortName, lang: 'pt-BR', start_url: './', display: 'browser', background_color: '#EDE5D8', theme_color: '#493568', icons: [{ src: 'icon-192.png', sizes: '192x192', type: 'image/png' }, { src: 'icon-512.png', sizes: '512x512', type: 'image/png' }] }, null, 2),
);

// ---- Páginas auxiliares (fora das seis seções): privacidade e 404 ----
const inlineScript = "document.documentElement.classList.add('js')";
const shell = ({ title, body, robots }) => `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${esc(title)}</title>
    ${robots}
    <meta name="theme-color" content="#EDE5D8">
    <link rel="icon" href="favicon.svg" type="image/svg+xml">
    <link rel="icon" href="favicon-32.png" sizes="32x32" type="image/png">
    <script>${inlineScript}</script>
    <link rel="stylesheet" href="assets/main.css">
  </head>
  <body class="legal-page">
    <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header class="legal-bar">
      <div class="container legal-bar__inner">
        <a class="brand" href="./" aria-label="${esc(clinic.name)}, ir para o início"><img src="brand/movi-nome-roxo.svg" width="112" height="33" alt="${esc(clinic.name)}"></a>
        <a class="link" href="./">Voltar ao site</a>
      </div>
    </header>
    <main id="conteudo" tabindex="-1">
    ${body}
    </main>
    <footer class="legal-foot"><div class="container"><p>© <span data-year>${new Date().getFullYear()}</span> ${esc(clinic.name)}.</p></div></footer>
    <script src="assets/main.js" defer></script>
  </body>
</html>
`;
fs.writeFileSync(path.join(dist, 'privacidade.html'), shell({ title: `Política de privacidade | ${clinic.name}`, body: privacyBody(ctx), robots: robotsMeta(clinic) }));
fs.writeFileSync(path.join(dist, '404.html'), shell({ title: `Página não encontrada | ${clinic.name}`, body: notFoundBody(), robots: '<meta name="robots" content="noindex">' }));

// ---- Limpeza: só vai para o dist o que as páginas realmente usam ----
const pages = ['index.html', 'privacidade.html', '404.html'].map((f) => fs.readFileSync(path.join(dist, f), 'utf8')).join('\n');
const cssText = fs.readFileSync(path.join(dist, 'assets/main.css'), 'utf8');
const used = new Set([...(pages + cssText).matchAll(/[\w\-./]+\.(?:webp|jpg|png|svg|mp4)/g)].map((m) => m[0].replace(/^(\.\.\/|\.\/)+/, '')));
let pruned = 0;
for (const dir of ['img', 'brand', 'video']) {
  for (const file of fs.readdirSync(path.join(dist, dir))) {
    if (!used.has(`${dir}/${file}`)) {
      fs.rmSync(path.join(dist, dir, file));
      pruned += 1;
    }
  }
}

// ---- Cabeçalhos de segurança e cache (formato Netlify / Cloudflare Pages; veja o README para outros servidores) ----
const hash = crypto.createHash('sha256').update(inlineScript).digest('base64');
fs.writeFileSync(
  path.join(dist, '_headers'),
  `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'sha256-${hash}'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; media-src 'self'; frame-src https://www.google.com; frame-ancestors 'self'; base-uri 'self'; form-action 'none'; object-src 'none'

/img/*
  Cache-Control: public, max-age=2592000

/video/*
  Cache-Control: public, max-age=2592000

/brand/*
  Cache-Control: public, max-age=2592000

/assets/*
  Cache-Control: public, max-age=3600
`,
);
console.log(`${pruned} arquivo(s) sem uso removido(s) do dist.`);

// ---- Vercel: configuração de publicação (raiz do projeto) com os mesmos cabeçalhos do _headers ----
const csp = `default-src 'self'; script-src 'self' 'sha256-${hash}'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; media-src 'self'; frame-src https://www.google.com; frame-ancestors 'self'; base-uri 'self'; form-action 'none'; object-src 'none'`;
fs.writeFileSync(
  path.join(root, 'vercel.json'),
  JSON.stringify(
    {
      buildCommand: 'npm run all',
      installCommand: 'npm install',
      outputDirectory: 'dist',
      headers: [
        { source: '/(.*)', headers: [{ key: 'X-Content-Type-Options', value: 'nosniff' }, { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }, { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }, { key: 'Content-Security-Policy', value: csp }] },
        { source: '/(img|video|brand)/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000' }] },
        { source: '/assets/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=3600' }] },
      ],
    },
    null,
    2,
  ) + '\n',
);
console.log(`dist/ gerado — modo ${clinic.demoMode ? 'desenvolvimento (noindex)' : 'produção (indexável)'}; WhatsApp ${ctx.hasWhatsapp ? 'configurado' : 'não configurado'}.`);
