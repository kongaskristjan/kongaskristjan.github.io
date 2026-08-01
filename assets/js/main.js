/* Small progressive enhancements: colour scheme, scroll reveals, media. */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- theme */

  function currentTheme() {
    var attr = root.getAttribute('data-theme');
    if (attr) return attr;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  var toggle = document.querySelector('[data-theme-toggle]');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try {
        localStorage.setItem('theme', next);
      } catch (e) {}
    });
  }

  /* -------------------------------------------------------------- header */

  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ------------------------------------------------------------- reveals */

  var revealables = document.querySelectorAll('.reveal');
  if (!revealables.length) {
    // nothing to do
  } else if (reduceMotion || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

    revealables.forEach(function (el) { observer.observe(el); });
  }

  /* --------------------------------------------------------------- media */

  // Looping clips only autoplay when the visitor is fine with motion.
  document.querySelectorAll('video[data-autoplay]').forEach(function (video) {
    if (reduceMotion) {
      video.removeAttribute('autoplay');
      video.pause();
      return;
    }
    video.play().catch(function () { /* autoplay blocked — poster stays */ });
  });

  // Click-to-play for the heavier screencasts, so nothing downloads uninvited.
  document.querySelectorAll('[data-play]').forEach(function (button) {
    button.addEventListener('click', function () {
      var frame = button.closest('.media');
      var video = frame && frame.querySelector('video');
      if (!video) return;
      video.setAttribute('controls', '');
      video.play().then(function () {
        frame.classList.add('is-playing');
      }).catch(function () {
        frame.classList.add('is-playing');
      });
    });
  });

  /* --------------------------------------------------------------- stars */

  var counters = document.querySelectorAll('[data-stars]');
  if (counters.length) {
    var total = 0;
    var pending = counters.length;
    var totalEl = document.querySelector('[data-stars-total]');

    counters.forEach(function (el) {
      var repo = el.getAttribute('data-stars');
      fetch('https://api.github.com/repos/' + repo, {
        headers: { Accept: 'application/vnd.github+json' }
      }).then(function (response) {
        if (!response.ok) throw new Error(response.status);
        return response.json();
      }).then(function (data) {
        if (typeof data.stargazers_count !== 'number') return;
        el.textContent = data.stargazers_count.toLocaleString('en-US');
        el.hidden = false;
        total += data.stargazers_count;
      }).catch(function () {
        /* Rate limited or offline: the static markup stays as it is. */
      }).then(function () {
        pending -= 1;
        if (pending === 0 && totalEl && total > 0) {
          totalEl.textContent = total.toLocaleString('en-US');
        }
      });
    });
  }
})();
