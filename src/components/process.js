import { esc, picture, bookingAction } from '../lib/html.js';
import { process as proc, cta } from '../config/content.js';

export function processSection(ctx) {
  const steps = proc.steps
    .map(
      (s, i) => `<li class="step">
              <span class="step__n" aria-hidden="true">${i + 1}</span>
              <div><h3 class="step__title">${esc(s.title)}</h3><p>${esc(s.text)}</p></div>
            </li>`,
    )
    .join('\n            ');
  const faq = proc.faq
    .map(
      (f, i) => `<div class="faq__item">
              <h4 class="faq__q"><button type="button" class="faq__btn" id="faq-btn-${i}" aria-expanded="false" aria-controls="faq-panel-${i}" data-faq-btn>${esc(f.q)}</button></h4>
              <section class="faq__panel" id="faq-panel-${i}" aria-labelledby="faq-btn-${i}" data-faq-panel>
                <div class="faq__panel-inner">
                  <p>${esc(f.a)}</p>
                  ${f.cta ? `<p class="faq__cta">${bookingAction(ctx, cta.faq, { cls: 'btn btn--primary btn--sm' })}</p>` : ''}
                </div>
              </section>
            </div>`,
    )
    .join('\n            ');
  return `<section id="como-funciona" class="section process" aria-labelledby="process-title">
      <div class="container">
        <h2 id="process-title" class="h2 reveal">${esc(proc.title)}</h2>
        <ol class="steps">
          ${steps}
        </ol>
        <div class="process__layout">
          <figure class="process__photo arch">${picture(ctx, proc.photo, { sizes: '(min-width: 960px) 36vw, 92vw' })}</figure>
          <div class="faq">
            <h3 class="h3 faq__title">${esc(proc.faqTitle)}</h3>
            ${faq}
          </div>
        </div>
      </div>
    </section>`;
}
