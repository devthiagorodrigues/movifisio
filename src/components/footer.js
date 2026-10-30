import { esc } from '../lib/html.js';
import { nav, footer as copy } from '../config/content.js';

export function footerSection(ctx) {
  const { clinic } = ctx;
  // O ano é escrito no build e atualizado no navegador (main.js), então muda sozinho a cada ano.
  const year = new Date().getFullYear();
  return `<footer class="site-footer">
    <div class="container">
      <div class="site-footer__grid">
        <div class="site-footer__brand">
          <img src="brand/movi-principal-areia.svg" width="260" height="104" alt="${esc(clinic.name)}" loading="lazy">
          <p class="site-footer__tagline">${esc(clinic.tagline)}</p>
          <p class="site-footer__about">${esc(copy.about)}</p>
        </div>
        <nav class="site-footer__nav" aria-label="${esc(copy.nav)}">
          <h2 class="site-footer__heading">${esc(copy.nav)}</h2>
          <ul>
            ${nav.map((n) => `<li><a href="#${n.id}">${esc(n.label)}</a></li>`).join('\n            ')}
            <li><a href="privacidade.html">${esc(copy.privacy)}</a></li>
          </ul>
        </nav>
        <div class="site-footer__hours">
          <h2 class="site-footer__heading">${esc(copy.hours)}</h2>
          <ul>
            ${clinic.hours.map((h) => `<li>${esc(h.label)}<br>${esc(h.time)}</li>`).join('\n            ')}
          </ul>
        </div>
      </div>
      <div class="site-footer__bottom">
        <p>© <span data-year>${year}</span> ${esc(clinic.name)}.</p>
        <p class="site-footer__links"><a href="${esc(clinic.credit.url)}" target="_blank" rel="noopener noreferrer">${esc(clinic.credit.prefix)} ${esc(clinic.credit.label)}<span class="sr-only"> (abre em uma nova aba)</span></a></p>
      </div>
    </div>
  </footer>`;
}
