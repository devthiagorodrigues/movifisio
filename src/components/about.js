import { picture } from '../lib/html.js';
import { about } from '../config/content.js';
import { esc } from '../lib/html.js';

/** A Movi: título, parágrafo e uma galeria de três momentos (sem legendas de instalações: são fotos de banco). */
export function aboutSection(ctx) {
  const [a, b, c] = about.spaces;
  const fig = (space, cls, sizes) => `<figure class="space ${cls}">
            <div class="space__frame">${space.video ? clip(space.video) : picture(ctx, space.photo, { sizes })}</div>
          </figure>`;
  // Loop mudo com pôster (decorativo); toca enquanto estiver na tela (ver main.js).
  const clip = (name) => `<video class="space__video" muted loop playsinline preload="none" width="960" height="540" poster="img/sala-poster.jpg" aria-hidden="true" data-loop-video>
              <source src="video/${name}.mp4" type="video/mp4">
            </video>`;
  return `<section id="a-movi" class="section about" aria-labelledby="about-title">
      <div class="container">
        <h2 id="about-title" class="h2 reveal">${esc(about.title)}</h2>
        <p class="lead about__lead">${esc(about.text)}</p>
        <div class="spaces">
          <div class="spaces__grid">
          ${fig(a, 'space--a', '(min-width: 960px) 28vw, 46vw')}
          ${fig(b, 'space--b', '(min-width: 960px) 40vw, 100vw')}
          ${fig(c, 'space--c', '(min-width: 960px) 28vw, 46vw')}
          </div>
        </div>
      </div>
    </section>`;
}
