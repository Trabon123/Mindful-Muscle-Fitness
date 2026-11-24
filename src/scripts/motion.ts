/**
 * The page's single motion island.
 * Loaded at idle so it never competes with first paint (the hero is CSS-only).
 *
 *  - Lenis smooth scroll, driven by the GSAP ticker so ScrollTrigger stays in sync
 *  - Mind ⇄ Muscle: button-driven MorphSVG steps (crossfade under reduced motion)
 *  - Manifesto keyword lighting
 *  - Scroll reveals, app tabs, phone tilt, counters/rings
 *  - Testimonial drift carousel
 *
 * Every animation uses a breath-shaped ease (sine in-out / long exhale).
 */
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/* ── Reveal ───────────────────────────────────────────────── */
function initReveal() {
  if (reduce) return;
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.remove('reveal-pending');
        io.unobserve(e.target);
      }),
    { rootMargin: '0px 0px -8% 0px' },
  );
  $$('[data-reveal]').forEach((el) => {
    if (el.getBoundingClientRect().top > window.innerHeight) {
      el.classList.add('reveal-pending', 'reveal-in');
      io.observe(el);
    }
  });
}

/* ── App showcase ─────────────────────────────────────────── */
function initApp() {
  const sec = $('[data-app]');
  if (!sec) return;
  const screen = $('#phone-screen', sec)!;
  const tabs = $$<HTMLButtonElement>('[role="tab"]', sec);

  const select = (tab: HTMLButtonElement, focus = false) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });
    screen.dataset.active = tab.dataset.screen;
    screen.setAttribute('aria-labelledby', tab.id);
    if (focus) tab.focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    if (finePointer) t.addEventListener('pointerenter', () => select(t));
    t.addEventListener('keydown', (e) => {
      const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
      if (e.key in keys) {
        e.preventDefault();
        select(tabs[(i + keys[e.key] + tabs.length) % tabs.length], true);
      } else if (e.key === 'Home') {
        e.preventDefault();
        select(tabs[0], true);
      } else if (e.key === 'End') {
        e.preventDefault();
        select(tabs[tabs.length - 1], true);
      }
    });
  });

  // Counters + rings run once, when the section first comes into view
  const counters = $$('[data-count]', sec);
  const below = sec.getBoundingClientRect().top > window.innerHeight * 0.6;
  if (!reduce && below) {
    sec.classList.add('is-pending');
    counters.forEach((c) => (c.textContent = '0'));
  }
  const io = new IntersectionObserver(
    ([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      sec.classList.remove('is-pending');
      sec.classList.add('is-live');
      if (reduce || !below) return;
      counters.forEach((c) => {
        const to = Number(c.dataset.count);
        const t0 = performance.now();
        const dur = 2400;
        const step = (now: number) => {
          const p = Math.min(1, (now - t0) / dur);
          c.textContent = String(Math.round(to * easeOut(p)));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    },
    { threshold: 0.35 },
  );
  io.observe(sec);

  // 3D tilt toward the cursor; a slow breath-length sway on touch devices
  const phone = $('[data-tilt]', sec);
  if (!phone || reduce) return;
  const base = { rx: 6, ry: -14 };
  const cur = { ...base };
  const tgt = { ...base };
  let inView = false;
  let raf = 0;
  if (finePointer) {
    sec.addEventListener('pointermove', (e) => {
      const r = phone.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2);
      const y = (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2);
      tgt.ry = base.ry + Math.max(-1, Math.min(1, x)) * 18;
      tgt.rx = base.rx - Math.max(-1, Math.min(1, y)) * 10;
    });
    sec.addEventListener('pointerleave', () => Object.assign(tgt, base));
  }
  const loop = (now: number) => {
    if (!finePointer) {
      const ph = (now / 16000) * Math.PI * 2; // one sway per 16s breath
      tgt.ry = base.ry + Math.sin(ph) * 6;
      tgt.rx = base.rx + Math.cos(ph) * 2;
    }
    cur.rx += (tgt.rx - cur.rx) * 0.05;
    cur.ry += (tgt.ry - cur.ry) * 0.05;
    phone.style.setProperty('--rx', `${cur.rx.toFixed(2)}deg`);
    phone.style.setProperty('--ry', `${cur.ry.toFixed(2)}deg`);
    if (inView) raf = requestAnimationFrame(loop);
  };
  new IntersectionObserver(([e]) => {
    inView = e.isIntersecting;
    cancelAnimationFrame(raf);
    if (inView) raf = requestAnimationFrame(loop);
  }).observe(sec);
}

/* ── Testimonials drift ───────────────────────────────────── */
function initCarousel() {
  const sec = $('[data-carousel]');
  if (!sec) return;
  const track = $('.track', sec)!;
  const cards = $$('.card', sec);
  const toggle = $<HTMLButtonElement>('.toggle', sec);
  const progress = $('.progress', sec);
  const total = String(cards.length).padStart(2, '0');

  let userPaused = false;
  let hovered = false;
  let focused = false;
  let inView = false;
  let holdUntil = 0;
  let dir = 1;
  let pos = track.scrollLeft;
  let last = 0;
  const SPEED = 16; // px per second: reading pace

  const step = () => (cards[1] ? cards[1].offsetLeft - cards[0].offsetLeft : track.clientWidth);
  const current = () => Math.round(track.scrollLeft / step());
  const updateProgress = () => {
    if (progress) progress.textContent = `${String(Math.min(cards.length, current() + 1)).padStart(2, '0')} / ${total}`;
  };
  const go = (d: number) => {
    holdUntil = performance.now() + 6000;
    sec.classList.remove('is-drifting');
    const i = Math.max(0, Math.min(cards.length - 1, current() + d));
    track.scrollTo({ left: cards[i].offsetLeft - cards[0].offsetLeft, behavior: reduce ? 'auto' : 'smooth' });
  };

  $$<HTMLButtonElement>('[data-dir]', sec).forEach((b) => b.addEventListener('click', () => go(Number(b.dataset.dir))));
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  });
  track.addEventListener('scroll', updateProgress, { passive: true });
  ['pointerdown', 'wheel', 'touchstart'].forEach((ev) =>
    track.addEventListener(ev, () => { holdUntil = performance.now() + 6000; sec.classList.remove('is-drifting'); }, { passive: true }),
  );
  sec.addEventListener('pointerenter', () => (hovered = true));
  sec.addEventListener('pointerleave', () => (hovered = false));
  sec.addEventListener('focusin', () => (focused = true));
  sec.addEventListener('focusout', (e) => { if (!sec.contains(e.relatedTarget as Node)) focused = false; });
  toggle?.addEventListener('click', () => {
    userPaused = !userPaused;
    sec.classList.toggle('is-paused', userPaused);
    toggle.setAttribute('aria-pressed', String(userPaused));
  });

  if (reduce) return;
  const tick = (now: number) => {
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
    last = now;
    const drifting = inView && !userPaused && !hovered && !focused && now > holdUntil;
    if (drifting) {
      if (!sec.classList.contains('is-drifting')) {
        sec.classList.add('is-drifting');
        pos = track.scrollLeft;
      }
      const max = track.scrollWidth - track.clientWidth;
      pos += dir * SPEED * dt;
      if (pos >= max) { pos = max; dir = -1; }
      if (pos <= 0) { pos = 0; dir = 1; }
      track.scrollLeft = Math.round(pos);
    } else if (sec.classList.contains('is-drifting')) {
      sec.classList.remove('is-drifting');
    }
    if (inView) requestAnimationFrame(tick);
  };
  new IntersectionObserver(([e]) => {
    const was = inView;
    inView = e.isIntersecting;
    if (inView && !was) { last = 0; requestAnimationFrame(tick); }
  }, { threshold: 0.3 }).observe(sec);
}

/* ── GSAP: Lenis, morph, manifesto ────────────────────────── */
async function initScroll() {
  const [{ gsap }, { ScrollTrigger }, { MorphSVGPlugin }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
    import('gsap/MorphSVGPlugin'),
  ]);
  gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

  if (!reduce) {
    const { default: Lenis } = await import('lenis');
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // long exhale
      anchors: true,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // Mind ⇄ Muscle: step through with buttons; the page scrolls freely past it
  const morph = $('[data-morph]');
  if (morph) {
    morph.classList.add('is-enhanced');
    if (reduce) morph.classList.add('is-crossfade');
    const path = $('#morph-path', morph)!;
    const beats = $$('[data-beat]', morph);
    const shapes = $$('.layer', morph).map((l) => `#${l.id}`);
    const steps = $$<HTMLButtonElement>('[data-go]', morph);
    const prev = $<HTMLButtonElement>('[data-step="-1"]', morph)!;
    const next = $<HTMLButtonElement>('[data-step="1"]', morph)!;
    const count = $('.count', morph);
    const total = String(beats.length).padStart(2, '0');
    let active = -1;

    const show = (i: number, animate = true) => {
      i = Math.max(0, Math.min(beats.length - 1, i));
      if (i === active) return;
      active = i;
      morph.dataset.active = String(i);
      beats.forEach((b, j) => {
        b.toggleAttribute('inert', j !== i);
        b.setAttribute('aria-hidden', String(j !== i));
      });
      steps.forEach((s, j) => {
        if (j === i) s.setAttribute('aria-current', 'step');
        else s.removeAttribute('aria-current');
      });
      prev.disabled = i === 0;
      next.disabled = i === beats.length - 1;
      if (count) count.textContent = `${String(i + 1).padStart(2, '0')} / ${total}`;
      if (animate && !reduce) {
        gsap.to(path, {
          morphSVG: { shape: shapes[i], shapeIndex: 'auto' },
          duration: 1.6,
          ease: 'sine.inOut',
          overwrite: true,
        });
      }
    };

    show(0, false);
    steps.forEach((s) => s.addEventListener('click', () => show(Number(s.dataset.go))));
    prev.addEventListener('click', () => show(active - 1));
    next.addEventListener('click', () => show(active + 1));
  }

  // Manifesto keywords
  const man = $('[data-manifesto]');
  if (man && !reduce) {
    const kws = $$('.kw', man).sort((a, b) => Number(a.dataset.kw) - Number(b.dataset.kw));
    man.classList.add('is-enhanced');
    ScrollTrigger.create({
      trigger: $('.mtext', man),
      start: 'top 78%',
      end: 'bottom 40%',
      onUpdate: (s) => {
        const n = Math.round(s.progress * kws.length);
        kws.forEach((k, i) => k.classList.toggle('is-lit', i < n));
      },
    });
  }

  ScrollTrigger.refresh();
}

/* ── Boot ─────────────────────────────────────────────────── */
function boot() {
  initReveal();
  initApp();
  initCarousel();
  initScroll().catch((err) => console.warn('[motion] scroll effects unavailable', err));
}

const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void }).requestIdleCallback;
if (idle) idle(boot, { timeout: 1200 });
else setTimeout(boot, 200);
