import { esc, picture } from '../lib/html.js';
import { services } from '../config/content.js';

/** Serviços: os três principais em cartões compactos (sem carrossel) e um convite final em tipografia grande. */
export function servicesSection(ctx) {
  const cards = services.items
    .filter((item) => item.show !== false)
    .map(
      (item) => `<li class="service-card">
            <div class="service-card__media arch">${picture(ctx, item.photo, { sizes: '(min-width: 900px) 380px, 120px' })}</div>
            <div class="service-card__body">
              <h3 class="service-card__title">${esc(item.title)}</h3>
              <p>${esc(item.text)}</p>
            </div>
          </li>`,
    )
    .join('\n          ');
  return `<section id="servicos" class="section services" aria-labelledby="services-title">
      <div class="container">
        <h2 id="services-title" class="h2 reveal">${esc(services.title)}</h2>
        <ul class="services__grid">
          ${cards}
        </ul>
      </div>
    </section>`;
}
