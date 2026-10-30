import { esc, picture } from '../lib/html.js';
import { team } from '../config/content.js';

function profile(ctx, p) {
  const hasName = Boolean(p.name);
  const media = p.photo
    ? `<div class="profile__media arch">${picture(ctx, p.photo, { sizes: '(min-width: 960px) 28vw, 80vw', alt: hasName ? p.name : p.role })}</div>`
    : `<div class="profile__media profile__media--empty arch" aria-hidden="true"></div>`;
  const meta = [
    p.education && ['Formação', p.education],
    p.registry && ['Registro', p.registry],
  ].filter(Boolean);
  return `<li class="profile">
            ${media}
            ${hasName ? `<h3 class="profile__name">${esc(p.name)}</h3><p class="profile__role">${esc(p.role)}</p>` : `<h3 class="profile__name">${esc(p.role)}</h3>`}
            <p class="profile__focus">${esc(p.focus)}</p>
            ${
              meta.length
                ? `<dl class="profile__meta">${meta.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>`
                : ''
            }
          </li>`;
}

export function teamSection(ctx) {
  return `<section id="equipe" class="section team" aria-labelledby="team-title">
      <div class="container">
        <h2 id="team-title" class="h2 reveal">${esc(team.title)}</h2>
        <ul class="team__grid">
          ${ctx.clinic.professionals.map((p) => profile(ctx, p)).join('\n          ')}
        </ul>
      </div>
    </section>`;
}
