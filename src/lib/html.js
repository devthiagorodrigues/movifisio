import { photos } from '../config/photos.js';

export const esc = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Número do WhatsApp válido: apenas dígitos, com DDI (12 a 15 dígitos). */
export const isValidWhatsapp = (n) => /^\d{12,15}$/.test(String(n || ''));

export const whatsappUrl = (clinic) =>
  `https://wa.me/${clinic.contact.whatsapp}?text=${encodeURIComponent(clinic.contact.whatsappMessage)}`;

/**
 * Imagem responsiva (webp + jpg), com largura/altura explícitas.
 * `name` deve existir em src/config/photos.js e ter sido gerada por `npm run images`.
 */
export function picture(ctx, name, { sizes, lazy = true, priority = false, cls = '', alt } = {}) {
  const meta = ctx.manifest[name];
  const info = photos[name];
  if (!meta || !info) throw new Error(`Imagem "${name}" não encontrada. Rode "npm run images".`);
  const set = (ext) => meta.widths.map((w) => `img/${name}-${w}.${ext} ${w}w`).join(', ');
  const fallback = `img/${name}-${meta.fallback}.jpg`;
  const loading = priority ? 'eager' : lazy ? 'lazy' : 'eager';
  return `<picture>
  <source type="image/webp" srcset="${set('webp')}" sizes="${sizes}">
  <img class="${cls}" src="${fallback}" width="${meta.w}" height="${meta.h}" alt="${esc(
    alt ?? info.alt,
  )}" loading="${loading}" decoding="async"${priority ? ' fetchpriority="high"' : ''} style="object-position:${info.pos}">
</picture>`;
}

/**
 * Botão de agendamento. Com WhatsApp configurado vira link para o wa.me com mensagem
 * pré-preenchida; sem número, abre o diálogo acessível (nunca um link fictício).
 */
export function bookingAction(ctx, label, { cls = 'btn btn--primary', more = '' } = {}) {
  const text = `<span>${esc(label)}${more ? `<span class="btn__more">${esc(more)}</span>` : ''}</span>`;
  if (ctx.hasWhatsapp) {
    return `<a class="${cls}" href="${esc(whatsappUrl(ctx.clinic))}" target="_blank" rel="noopener noreferrer">${text}<span class="sr-only"> (abre o WhatsApp em uma nova aba)</span></a>`;
  }
  return `<button type="button" class="${cls}" data-open-booking aria-haspopup="dialog">${text}</button>`;
}
