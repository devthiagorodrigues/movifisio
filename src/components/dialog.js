import { esc } from '../lib/html.js';

export function bookingDialog(ctx) {
  if (ctx.hasWhatsapp) return '';
  const { title, message } = ctx.clinic.bookingUnavailable;
  return `<dialog class="dialog" id="booking-dialog" aria-labelledby="booking-title" aria-describedby="booking-desc" data-booking-dialog>
    <div class="dialog__panel">
      <h2 id="booking-title" class="dialog__title">${esc(title)}</h2>
      <p id="booking-desc" class="dialog__text">${esc(message)}</p>
      <button type="button" class="btn btn--primary" data-dialog-close>Fechar</button>
    </div>
  </dialog>`;
}
