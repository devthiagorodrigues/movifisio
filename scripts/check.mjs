/**
 * Verificações estáticas do dist/: seis seções, um H1, âncoras e arquivos locais existentes,
 * imagens com alt/dimensões, links externos seguros e coerência de indexação.
 * Uso: npm run check (depois de npm run build)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const problems = [];
const ok = (cond, msg) => { if (!cond) problems.push(msg); };

const sections = [...html.matchAll(/<section id="([^"]+)"/g)].map((m) => m[1]);
ok(sections.length === 6, `Esperadas 6 seções, encontradas ${sections.length}: ${sections.join(', ')}`);
ok((html.match(/<h1[ >]/g) || []).length === 1, 'Deve haver exatamente um <h1>');
ok(/<html lang="pt-BR">/.test(html), 'lang="pt-BR" ausente');

const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
for (const [, h] of html.matchAll(/href="#([^"]*)"/g)) ok(h === '' || ids.has(h), `Âncora quebrada: #${h}`);
for (const [, a] of html.matchAll(/aria-(?:controls|labelledby|describedby)="([^"]+)"/g)) for (const id of a.split(' ')) ok(ids.has(id), `Referência ARIA sem alvo: ${id}`);

const localRefs = new Set();
for (const m of html.matchAll(/(?:src|href|poster)="([^"#?][^"]*)"/g)) if (!/^(https?:|mailto:|tel:|data:)/.test(m[1])) localRefs.add(m[1]);
for (const m of html.matchAll(/([^\s"',]+\.(?:webp|jpg|png))\s+\d+w/g)) localRefs.add(m[1].replace(/,$/, ''));
for (const ref of localRefs) ok(fs.existsSync(path.join(dist, ref.split('#')[0])), `Arquivo local ausente: ${ref}`);
const css = fs.readFileSync(path.join(dist, 'assets/main.css'), 'utf8');
for (const [, u] of css.matchAll(/url\('?(\.\.\/[^')]+)'?\)/g)) ok(fs.existsSync(path.join(dist, 'assets', u)), `Arquivo de CSS ausente: ${u}`);

for (const [tag] of html.matchAll(/<img [^>]*>/g)) {
  ok(/\salt="/.test(tag), `<img> sem alt: ${tag.slice(0, 80)}`);
  ok(/\swidth="\d+"/.test(tag) && /\sheight="\d+"/.test(tag), `<img> sem width/height: ${tag.slice(0, 80)}`);
}
for (const [tag] of html.matchAll(/<a [^>]*target="_blank"[^>]*>/g)) ok(/rel="noopener noreferrer"/.test(tag), `target=_blank sem rel: ${tag}`);
ok(!/href="#"/.test(html) && !/href=""/.test(html), 'Links vazios encontrados');
ok(!/lorem ipsum/i.test(html), 'Lorem ipsum encontrado');
ok(!/projeto demonstrativo|cl[ií]nica fict[ií]cia|equipe ilustrativa/i.test(html), 'Texto de demonstração encontrado no conteúdo público');

// Coerência de indexação
const noindex = /<meta name="robots" content="noindex/.test(html);
var noindexSite = noindex;
const robots = fs.readFileSync(path.join(dist, 'robots.txt'), 'utf8');
if (noindex) {
  ok(/Disallow: \//.test(robots), 'noindex ativo, mas robots.txt não bloqueia');
  ok(!fs.existsSync(path.join(dist, 'sitemap.xml')), 'noindex ativo, mas existe sitemap.xml');
  ok(!/application\/ld\+json/.test(html), 'noindex ativo, mas há dados estruturados');
  ok(!/rel="canonical"/.test(html), 'noindex ativo, mas há canonical');
} else {
  ok(/rel="canonical"/.test(html), 'Versão indexável sem canonical');
  ok(fs.existsSync(path.join(dist, 'sitemap.xml')), 'Versão indexável sem sitemap.xml');
}
// wa.me só com número real
for (const [, n] of html.matchAll(/wa\.me\/([^?"]*)/g)) ok(/^\d{12,15}$/.test(n), `Link wa.me inválido: ${n}`);

for (const f of ['privacidade.html', '404.html', '_headers']) ok(fs.existsSync(path.join(dist, f)), `Arquivo ausente no dist: ${f}`);
ok(/href="privacidade.html"/.test(html), 'Link para a página de privacidade ausente no rodapé');
for (const f of ['privacidade.html', '404.html']) {
  const page = fs.readFileSync(path.join(dist, f), 'utf8');
  ok((page.match(/<h1[ >]/g) || []).length === 1, `${f}: deve haver um único <h1>`);
  ok(noindexSite === /name="robots" content="noindex/.test(page) || f === '404.html', `${f}: robots incoerente com o site`);
}
console.log(`Seções: ${sections.join(' · ')}`);
console.log(`Referências locais verificadas: ${localRefs.size}`);
console.log(`Modo: ${noindex ? 'desenvolvimento (noindex)' : 'indexável'}`);
if (problems.length) {
  console.error(`\n${problems.length} problema(s):\n- ${problems.join('\n- ')}`);
  process.exit(1);
}
console.log('Tudo certo.');
