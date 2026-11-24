/* Site helpers for the CNC laser programmer portfolio.
   - Theme toggle (dark is the default; the choice is saved in localStorage)
   - Banner swap so the steel nameplate matches the chosen theme
   - GLightbox gallery on photo (and video) links
     GLightbox 3.3.1 is MIT licensed (Copyright 2018 Biati Digital).
     https://github.com/biati-digital/glightbox/blob/master/LICENSE
*/

(function () {
  var STORAGE_KEY = 'site-theme';

  function currentTheme() {
    var attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'light' || attr === 'dark') return attr;
    return 'dark';
  }

  function syncBanner(theme) {
    var name = theme === 'light'
      ? 'banner-steel-light-animated.svg'
      : 'banner-steel-dark-animated.svg';
    document.querySelectorAll('picture').forEach(function (pic) {
      var img = pic.querySelector('img');
      if (!img) return;
      var src = img.getAttribute('src') || '';
      if (src.indexOf('banner-steel-') === -1) return;
      pic.querySelectorAll('source').forEach(function (source) {
        source.setAttribute('media', 'not all');
        source.removeAttribute('srcset');
      });
      img.setAttribute('src', src.replace(/banner-steel-(dark|light)-animated\.svg/, name));
    });
  }

  function updateToggle(theme) {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    var next = theme === 'light' ? 'dark' : 'light';
    var label = next === 'light' ? 'Switch to light theme' : 'Switch to dark theme';
    btn.setAttribute('aria-label', label);
    btn.setAttribute('title', label);
    var text = btn.querySelector('.theme-toggle-text');
    if (text) text.textContent = next === 'light' ? 'Light' : 'Dark';
  }

  function applyTheme(theme, persist) {
    if (theme !== 'light' && theme !== 'dark') theme = 'dark';
    if (theme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    if (persist) {
      try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
    }
    syncBanner(theme);
    updateToggle(theme);
  }

  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    applyTheme(saved === 'light' || saved === 'dark' ? saved : 'dark', false);

    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        applyTheme(currentTheme() === 'light' ? 'dark' : 'light', true);
      });
    }
  }

  function initLightbox() {
    if (typeof GLightbox !== 'function') return;

    var media = /\.(jpe?g|png|gif|webp|mp4)(\?|#|$)/i;
    document.querySelectorAll('.markdown-body a[href]').forEach(function (anchor) {
      var href = anchor.getAttribute('href') || '';
      if (!media.test(href)) return;
      if (!anchor.querySelector('img')) return;
      if (anchor.closest('.skill-badges, .site-header-bar, .stock-photo')) return;

      anchor.classList.add('glightbox');
      anchor.setAttribute('data-gallery', 'site-photos');
      if (/\.mp4(\?|#|$)/i.test(href)) {
        anchor.setAttribute('data-type', 'video');
      }

      var img = anchor.querySelector('img');
      var caption = (img && img.getAttribute('alt')) || '';
      /* Use the photo alt as the lightbox title. Leave the existing
         title="Open the full-size photo" tooltip alone for no-JS visitors. */
      if (caption) {
        anchor.setAttribute('data-title', caption);
      } else {
        anchor.setAttribute('data-title', '');
      }
    });

    GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: false,
      openEffect: 'fade',
      closeEffect: 'fade'
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initTheme();
      initLightbox();
    });
  } else {
    initTheme();
    initLightbox();
  }
})();
