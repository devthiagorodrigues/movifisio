/* Movi Fisioterapia — comportamento da página. Sem dependências; o conteúdo funciona sem JavaScript. */
(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  // Só a partir daqui o CSS pode esconder os blocos de entrada: se este arquivo falhar, nada fica invisível.
  document.documentElement.classList.add('js-ready');

  /* Rodapé: o ano acompanha a data do visitante, então muda sozinho todo ano */
  $$('[data-year]').forEach((el) => (el.textContent = String(new Date().getFullYear())));

  /* Menu móvel (padrão de divulgação: botão com aria-expanded) */
  const toggle = $('[data-menu-toggle]');
  const nav = $('[data-nav]');
  const desktop = window.matchMedia('(min-width: 1100px)');
  const setMenu = (open, { restoreFocus = false } = {}) => {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    if (open) $('a', nav)?.focus();
    if (!open && restoreFocus) toggle.focus();
  };
  if (toggle && nav) {
    toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', (e) => {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        e.preventDefault();
        setMenu(false, { restoreFocus: true });
      }
    });
    document.addEventListener('click', (e) => {
      if (toggle.getAttribute('aria-expanded') === 'true' && !e.target.closest('[data-header]')) setMenu(false);
    });
    desktop.addEventListener('change', () => setMenu(false));
  }

  /* Diálogo de agendamento (enquanto o WhatsApp não está configurado) */
  const dialog = $('[data-booking-dialog]');
  if (dialog) {
    let opener = null;
    const open = (trigger) => {
      opener = trigger;
      setMenu(false);
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
      document.body.classList.add('is-locked');
    };
    const close = () => {
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
    };
    $$('[data-open-booking]').forEach((btn) => btn.addEventListener('click', () => open(btn)));
    $$('[data-dialog-close]', dialog).forEach((btn) => btn.addEventListener('click', close));
    // Clique fora do painel fecha; Escape é tratado nativamente por <dialog>.
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) close();
    });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('is-locked');
      if (opener && document.contains(opener)) opener.focus();
      opener = null;
    });
  }

  /* Perguntas frequentes: uma aberta por vez */
  const faqItems = $$('.faq__item');
  const setFaq = (item, open) => {
    $('[data-faq-btn]', item).setAttribute('aria-expanded', String(open));
    item.classList.toggle('is-open', open);
  };
  faqItems.forEach((item) => {
    $('[data-faq-btn]', item).addEventListener('click', () => {
      const willOpen = !item.classList.contains('is-open');
      faqItems.forEach((other) => setFaq(other, other === item && willOpen));
    });
  });

  /* Vídeo em loop: toca enquanto está na tela; com movimento reduzido ou economia de dados fica só o pôster */
  $$('[data-loop-video]').forEach((video) => {
    const saveData = navigator.connection && navigator.connection.saveData;
    if (!('IntersectionObserver' in window) || reduceMotion.matches || saveData) return;
    new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.4 },
    ).observe(video);
  });

  /* Entrada suave das seções (uma vez) */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }

  /* Menu: o indicador desliza até o link da seção atual (e acompanha o mouse/foco, voltando depois) */
  const links = $$('[data-nav-link]');
  const navList = $('.site-nav__list');
  let current = links[0] || null;
  // Ao clicar num link, o indicador fica nele durante a rolagem suave: a seção "passando" não o puxa de volta.
  let lockTarget = null;
  let lockTimer = null;
  const unlockAfter = (ms) => {
    clearTimeout(lockTimer);
    lockTimer = setTimeout(() => (lockTarget = null), ms);
  };
  const place = (link) => {
    if (!navList) return;
    if (!link || !desktop.matches) {
      navList.classList.remove('has-indicator');
      return;
    }
    navList.style.setProperty('--ind-x', `${link.offsetLeft}px`);
    navList.style.setProperty('--ind-w', `${link.offsetWidth}px`);
    navList.classList.add('has-indicator');
  };
  const setCurrent = (id) => {
    links.forEach((a) => {
      if (a.dataset.navLink === id) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
    current = links.find((a) => a.dataset.navLink === id) || current;
    place(current);
  };
  if (navList && links.length) {
    links.forEach((a) => {
      a.addEventListener('mouseenter', () => place(a));
      a.addEventListener('focus', () => place(a));
      a.addEventListener('click', () => {
        lockTarget = a.dataset.navLink;
        setCurrent(lockTarget);
        unlockAfter(450);
      });
    });
    window.addEventListener('scroll', () => {
      if (lockTarget) unlockAfter(200);
    }, { passive: true });
    navList.addEventListener('mouseleave', () => place(current));
    navList.addEventListener('focusout', (e) => {
      if (!navList.contains(e.relatedTarget)) place(current);
    });
    // A transição só liga depois do primeiro posicionamento, para o indicador não "voar" do zero.
    setCurrent(links[0].dataset.navLink);
    requestAnimationFrame(() => navList.classList.add('is-ready'));
    window.addEventListener('resize', () => place(current));
    desktop.addEventListener('change', () => place(current));
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => place(current));
  }
  const sections = links.map((a) => document.getElementById(a.dataset.navLink)).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !lockTarget) setCurrent(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    sections.forEach((sec) => spy.observe(sec));
  }

  /* Faixa do Hero: repete os itens o bastante para cobrir a largura e corre devagar (sem cópia para leitores de tela) */
  const tickerViewport = $('[data-ticker]');
  const tickerTrack = $('[data-ticker-track]');
  const tickerList = $('[data-ticker-list]');
  const buildTicker = () => {
    if (!tickerTrack || !tickerList) return;
    $$('[data-ticker-clone]', tickerTrack).forEach((n) => n.remove());
    tickerTrack.classList.remove('is-ticking');
    if (reduceMotion.matches) return;
    tickerTrack.classList.add('is-ticking');
    const w = tickerList.getBoundingClientRect().width;
    if (!w) return;
    const perHalf = Math.ceil(tickerViewport.clientWidth / w) + 1;
    for (let i = 0; i < perHalf * 2 - 1; i += 1) {
      const clone = tickerList.cloneNode(true);
      clone.removeAttribute('aria-label');
      clone.setAttribute('aria-hidden', 'true');
      clone.dataset.tickerClone = '';
      tickerTrack.append(clone);
    }
    tickerTrack.style.setProperty('--tick-shift', `-${w * perHalf}px`);
    tickerTrack.style.setProperty('--tick-dur', `${(w * perHalf) / 45}s`);
  };
  buildTicker();
  let tickerResize = null;
  window.addEventListener('resize', () => {
    clearTimeout(tickerResize);
    tickerResize = setTimeout(buildTicker, 200);
  });
  reduceMotion.addEventListener('change', buildTicker);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(buildTicker);

  /* Hero: troca de fotografias em tela cheia (o próximo quadro abre como um arco a partir da base) */
  const slides = $$('.hero__slide');
  if (slides.length > 1 && !reduceMotion.matches) {
    let index = 0;
    let heroTimer = null;
    let heroVisible = true;
    const next = () => {
      if (!heroVisible || document.hidden) return;
      slides.forEach((sl) => sl.classList.remove('is-prev'));
      const previous = slides[index];
      index = (index + 1) % slides.length;
      previous.classList.remove('is-active');
      previous.classList.add('is-prev');
      slides[index].classList.add('is-active');
    };
    heroTimer = setInterval(next, 6500);
    const hero = $('.hero');
    if (hero && 'IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => (heroVisible = entry.isIntersecting), { threshold: 0.2 }).observe(hero);
    }
    reduceMotion.addEventListener('change', () => {
      if (reduceMotion.matches) clearInterval(heroTimer);
    });
  }
})();
