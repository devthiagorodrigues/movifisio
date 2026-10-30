import { esc, bookingAction } from '../lib/html.js';
import { nav } from '../config/content.js';

/** Cabeçalho "flutuante": cápsula arredondada, afastada do topo, com a navegação ao centro. */
export function header(ctx) {
  const { clinic } = ctx;
  const links = nav
    .map((item) => `<li><a href="#${item.id}" data-nav-link="${item.id}">${esc(item.label)}</a></li>`)
    .join('\n          ');
  return `<header class="site-header" data-header>
    <div class="site-header__bar">
      <a class="brand" href="#inicio" aria-label="${esc(clinic.name)}, ir para o início">
        <img src="brand/movi-nome-roxo.svg" width="112" height="33" alt="${esc(clinic.name)}">
      </a>
      <nav class="site-nav" id="site-nav" aria-label="Principal" data-nav>
        <ul class="site-nav__list">
          ${links}
        </ul>
      </nav>
      <div class="site-header__actions">
        <span class="site-header__cta">${bookingAction(ctx, 'Agendar', { cls: 'btn btn--primary btn--sm', more: ' avaliação' })}</span>
        <button type="button" class="menu-toggle" aria-expanded="false" aria-controls="site-nav" data-menu-toggle>
          <span class="sr-only">Menu</span>
          <span class="menu-toggle__bars" aria-hidden="true"><span></span><span></span></span>
        </button>
      </div>
    </div>
  </header>`;
}
