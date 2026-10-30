import { esc, bookingAction } from '../lib/html.js';
import { contact, cta } from '../config/content.js';

/** Mapa do Google da região (ponto de referência), carregado junto com a página (preguiçoso, só perto da vista). Sem `location.map`, o cartão ocupa a largura toda. */
function mapBlock(loc) {
  if (!loc.map || !loc.map.query) return '';
  const q = encodeURIComponent(loc.map.query);
  return `<div class="map">
          <iframe class="map__frame" title="Mapa do Google: ${esc(loc.map.label)}, na região da ${esc(loc.region)}, ${esc(loc.city)}" src="https://www.google.com/maps?q=${q}&amp;hl=pt-BR&amp;z=16&amp;output=embed" width="600" height="480" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
        </div>`;
}

/**
 * Contato: título, depois um palco com o mapa e um cartão por cima reunindo convite, botão e informações.
 * No celular o cartão vem primeiro (ação antes do mapa).
 */
export function contactSection(ctx) {
  const { clinic } = ctx;
  const { location: loc } = clinic;
  const where = `${loc.region}, ${loc.city} — ${loc.state}`;
  const instagram = clinic.contact.instagram
    ? `<div><dt>Instagram</dt><dd><a class="link" href="https://www.instagram.com/${esc(clinic.contact.instagram)}/" target="_blank" rel="noopener noreferrer">@${esc(
        clinic.contact.instagram,
      )}<span class="sr-only"> (abre em uma nova aba)</span></a></dd></div>`
    : '';
  const address = loc.address ? `<div><dt>Endereço</dt><dd>${esc(loc.address)}</dd></div>` : '';
  const hasMap = Boolean(loc.map && loc.map.query);
  return `<section id="contato" class="section contact" aria-labelledby="contact-title">
      <div class="container">
        <h2 id="contact-title" class="h2 reveal">${esc(contact.title)}</h2>
        <div class="contact__stage${hasMap ? ' has-map' : ''}">
          <div class="contact__card">
            <p class="contact__lead">${esc(contact.lead)}</p>
            ${bookingAction(ctx, cta.contact, { cls: 'btn btn--primary btn--lg' })}
            <dl class="info">
              <div><dt>Localização</dt><dd>${esc(where)}</dd></div>
              ${address}
              <div><dt>Horários</dt><dd>${clinic.hours.map((h) => `${esc(h.label)}, ${esc(h.time)}`).join('<br>')}</dd></div>
              <div><dt>Atendimento</dt><dd>${esc(contact.attendance)}</dd></div>
              ${instagram}
            </dl>
          </div>
          ${mapBlock(loc)}
        </div>
      </div>
    </section>`;
}
