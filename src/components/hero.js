import { esc, picture, bookingAction } from '../lib/html.js';
import { hero, cta } from '../config/content.js';

/**
 * Hero em tela cheia: fotografias que se revezam (o novo quadro abre como um arco a partir da base),
 * película roxa da marca, título que entra palavra por palavra e uma faixa areia no rodapé com os
 * três diferenciais correndo devagar. Sem JavaScript, ou com movimento reduzido, tudo fica parado.
 */
export function heroSection(ctx) {
  const slides = hero.slides
    .map(
      (name, i) => `<figure class="hero__slide${i === 0 ? ' is-active' : ''}">${picture(ctx, name, {
        sizes: '100vw',
        alt: '',
        priority: i === 0,
      })}</figure>`,
    )
    .join('\n          ');
  const words = hero.title
    .split(' ')
    .map((w, i) => `<span class="w"><span style="--i:${i}">${esc(w)}</span></span>`)
    .join(' ');
  return `<section id="inicio" class="hero" aria-labelledby="hero-title">
      <div class="hero__slides" aria-hidden="true" data-hero-slides>
          ${slides}
      </div>
      <div class="hero__scrim" aria-hidden="true"></div>
      <div class="container hero__content">
        <h1 id="hero-title" class="hero__title">${words}</h1>
        <p class="hero__lead">${esc(hero.lead)}</p>
        <div class="hero__actions">
          ${bookingAction(ctx, cta.hero, { cls: 'btn btn--light btn--lg' })}
          <a class="btn btn--ghost btn--lg" href="#a-movi">${esc(cta.heroSecondary)}</a>
        </div>
      </div>
      <div class="hero__band">
        <div class="hero__ticker" data-ticker>
          <div class="hero__ticker-track" data-ticker-track>
            <ul class="hero__facts" data-ticker-list>
              ${hero.facts.map((f) => `<li>${esc(f)}</li>`).join('\n              ')}
            </ul>
          </div>
        </div>
      </div>
    </section>`;
}
