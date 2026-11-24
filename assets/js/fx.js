/* Fun motion upgrades for the portfolio (all six, approved).
   1. Scroll fade-in  2. Laser beam  3. Hover tilt  4. Typing title
   5. Steel sheen and sparks  6. Smooth page transitions
   Motion is off when the visitor has asked to reduce it. */
(function () {
  var html = document.documentElement;
  html.classList.add('fx-reveal', 'fx-laser', 'fx-tilt', 'fx-type', 'fx-bg', 'fx-transitions');

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }
  function reduceOn() {
    return matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* 1. Scroll fade-in */
  ready(function () {
    var SEL = 'h2,.stats-row,.stat-tile,.skill-cards td,.timeline-item,.photo-tile,.machine-card,.resume-block,.markdown-body table,.page-nav,.step-card,.steps-intro,.steps-outro';
    var nodes = document.querySelectorAll(SEL);
    var reduce = reduceOn() || !('IntersectionObserver' in window);
    nodes.forEach(function (el, i) {
      el.classList.add('fx-in');
      el.style.transitionDelay = (i % 8) * 0.06 + 's';
      if (reduce) el.classList.add('is-in');
    });
    if (reduce) return;
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .12 });
    nodes.forEach(function (el) { io.observe(el); });
  });

  /* 3. Pointer-only hover tilt. Skip stock photos so their labels stay put. */
  ready(function () {
    if (reduceOn()) return;
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    document.querySelectorAll('.markdown-body td:has(a img)').forEach(function (td) {
      if (td.querySelector('.stock-photo, .stock-tag')) return;
      td.classList.add('fx-card');
    });
    document.querySelectorAll('.photo-tile, .machine-card, .fx-card').forEach(function (card) {
      if (card.classList.contains('stock-photo') || card.classList.contains('machine-card-stock')) return;
      if (card.querySelector('.stock-photo, .stock-tag')) return;
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'perspective(800px) rotateX(' + (-y * 12).toFixed(2) + 'deg) rotateY(' + (x * 14).toFixed(2) + 'deg) translateY(-4px)';
      });
      card.addEventListener('mouseleave', function () { card.style.transform = ''; });
    });
  });

  /* 4. Types the existing title. Final text stays "CNC Laser Programmer & Operator". */
  ready(function () {
    var el = document.querySelector('.fx-title-text');
    if (!el) return;
    var text = (el.textContent || '').replace(/\s+/g, ' ').trim();
    if (text !== 'CNC Laser Programmer & Operator') return;
    if (reduceOn()) return;
    el.textContent = '';
    el.classList.add('is-typing');
    var i = 0;
    var timer = setInterval(function () {
      i += 1;
      el.textContent = text.slice(0, i);
      if (i >= text.length) {
        clearInterval(timer);
        el.classList.remove('is-typing');
        el.classList.add('is-done');
      }
    }, 58);
  });

  /* 6. View Transitions when the browser has them; otherwise a short fade.
        Skips photos (lightbox), PDFs, mail, and off-site links. */
  if (!reduceOn() && typeof document.startViewTransition !== 'function') {
    document.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      if (a.classList.contains('glightbox') || a.closest('.glightbox-container, .stock-photo')) return;
      var u;
      try { u = new URL(a.href, location.href); } catch (err) { return; }
      if (u.origin !== location.origin) return;
      if (u.protocol === 'mailto:' || u.protocol === 'tel:') return;
      if (/\.(jpe?g|png|gif|webp|mp4|pdf)(\?|#|$)/i.test(u.pathname)) return;
      if (u.pathname === location.pathname && u.search === location.search) return;
      e.preventDefault();
      html.classList.add('fx-leave');
      setTimeout(function () { location.href = a.href; }, 180);
    }, true);
  }
})();
