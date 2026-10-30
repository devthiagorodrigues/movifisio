/**
 * Gera imagens responsivas (webp + jpg) e os ativos de marca derivados dos arquivos oficiais.
 * Uso: npm run images
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { photos } from '../src/config/photos.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(root, 'assets-src/photos');
const outDir = path.join(root, 'public/img');
const widths = [480, 800, 1200, 1800];
fs.mkdirSync(outDir, { recursive: true });

const manifest = {};
for (const name of Object.keys(photos)) {
  const file = path.join(srcDir, `${name}.jpg`);
  const meta = await sharp(file).metadata();
  // Fotos muito altas são recortadas para no máximo 4:5, reduzindo peso sem perder o foco.
  const ratio = meta.height / meta.width;
  let pipeline = sharp(file).rotate();
  for (const patch of photos[name].patches ?? []) {
    const [w0, h0] = patch.size;
    const piece = await sharp(file).extract({ left: patch.from[0], top: patch.from[1], width: w0, height: h0 }).toBuffer();
    const mask = await sharp(Buffer.from(`<svg width="${w0}" height="${h0}"><rect x="12" y="12" width="${w0 - 24}" height="${h0 - 24}" rx="20" fill="#fff"/></svg>`)).blur(8).png().toBuffer();
    const feathered = await sharp(piece).ensureAlpha().composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
    pipeline = sharp(await pipeline.composite([{ input: feathered, left: patch.to[0], top: patch.to[1] }]).toBuffer());
  }
  let w = meta.width;
  let h = meta.height;
  if (ratio > 1.25) {
    h = Math.round(meta.width * 1.25);
    const top = Math.round((meta.height - h) * (photos[name].cropTop ?? 0.3));
    pipeline = sharp(await pipeline.extract({ left: 0, top, width: w, height: h }).toBuffer());
  }
  const sizes = widths.filter((x) => x <= w);
  if (!sizes.length || sizes.at(-1) < Math.min(w, widths.at(-1))) sizes.push(Math.min(w, widths.at(-1)));
  for (const size of sizes) {
    const base = pipeline.clone().resize({ width: size });
    await base.clone().webp({ quality: 74, effort: 5 }).toFile(path.join(outDir, `${name}-${size}.webp`));
    // JPG só como reserva para navegadores sem WebP: um tamanho (o segundo da lista) basta
    if (size === sizes[Math.min(1, sizes.length - 1)]) await base.clone().jpeg({ quality: 76, mozjpeg: true }).toFile(path.join(outDir, `${name}-${size}.jpg`));
  }
  manifest[name] = { w: sizes.at(-1), h: Math.round(sizes.at(-1) * (h / w)), widths: sizes, fallback: sizes[Math.min(1, sizes.length - 1)] };
  console.log(name, manifest[name].widths.join('/'), `${manifest[name].w}x${manifest[name].h}`);
}
fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));

// ---- Ativos de marca derivados (favicon, ícones, imagem de compartilhamento) ----
const pub = path.join(root, 'public');
const favicon = fs.readFileSync(path.join(pub, 'favicon.svg'));
for (const [file, size] of [['favicon-32.png', 32], ['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]]) {
  await sharp(favicon, { density: 300 }).resize(size, size).png().toFile(path.join(pub, file));
}

const logo = fs.readFileSync(path.join(pub, 'brand/movi-principal-areia.svg'), 'utf8').replace(/<svg [^>]*?(viewBox="[^"]*")[^>]*>/, '<svg x="300" y="145" width="600" height="239" $1>');
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#493568"/>${logo}<text x="600" y="500" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="34" fill="#EDE5D8">Movimento para viver melhor.</text></svg>`;
await sharp(Buffer.from(og), { density: 144 }).resize(1200, 630).jpeg({ quality: 88 }).toFile(path.join(pub, 'og.jpg'));
console.log('ativos de marca gerados');
