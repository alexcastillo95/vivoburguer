/* ================================================
   VIVO BURGER STUDIO — JavaScript
   Scroll animations · Tab system · Mobile nav
================================================ */

(function () {
  'use strict';

  /* ── Hero: start animations only after fonts load ── */
  document.fonts.ready.then(function () {
    const hero = document.querySelector('.hero');
    if (hero) hero.classList.add('fonts-loaded');
  });

  /* ── Stats counters ────────────────────────── */
  const statsBar = document.getElementById('story-stats');
  if (statsBar) {
    function easeOut(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function animateCounter(el, delay) {
      setTimeout(function () {
        if (el.dataset.type === 'infinity') {
          const digits = '0123456789';
          let flashes = 0;
          const interval = setInterval(function () {
            el.textContent = digits[Math.floor(Math.random() * 10)] + digits[Math.floor(Math.random() * 10)];
            if (++flashes >= 12) {
              clearInterval(interval);
              el.textContent = '∞';
            }
          }, 80);
          return;
        }

        const from   = parseInt(el.dataset.from, 10);
        const to     = parseInt(el.dataset.to,   10);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const duration = 1500;
        const start  = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const value    = Math.round(from + (to - from) * easeOut(progress));
          el.textContent = prefix + value + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }, delay);
    }

    const statEls = statsBar.querySelectorAll('.stat-number');
    let fired = false;

    const statsObserver = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !fired) {
        fired = true;
        statEls.forEach(function (el, i) { animateCounter(el, i * 200); });
        statsObserver.disconnect();
      }
    }, { threshold: 0.3 });

    statsObserver.observe(statsBar);
  }

  /* ── Nav: scroll state ─────────────────────── */
  const nav = document.getElementById('nav');

  const updateNav = () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── Mobile nav ────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const openMobileNav = () => {
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileNav = () => {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    if (mobileNav.classList.contains('open')) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      closeMobileNav();
      hamburger.focus();
    }
  });

  /* ── Scroll reveal (IntersectionObserver) ── */
  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right'
  );

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: show all immediately
    revealElements.forEach(el => el.classList.add('visible'));
  }

  /* ── Menu Tab System ───────────────────────── */
  const tabButtons = document.querySelectorAll('.menu-tab-btn');
  const tabPanels = document.querySelectorAll('.menu-panel');
  const tabIndicator = document.getElementById('tab-indicator');

  const moveIndicator = (btn) => {
    const tabsContainer = btn.closest('.menu-tabs');
    const containerRect = tabsContainer.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    tabIndicator.style.left = (btnRect.left - containerRect.left) + 'px';
    tabIndicator.style.width = btnRect.width + 'px';
  };

  // Set indicator on load
  const activeTabBtn = document.querySelector('.menu-tab-btn.active');
  if (activeTabBtn) {
    // Wait for layout
    requestAnimationFrame(() => moveIndicator(activeTabBtn));
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;

      // Update buttons
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Move indicator
      moveIndicator(btn);

      // Switch panels
      tabPanels.forEach(panel => panel.classList.remove('active'));
      const targetPanel = document.getElementById('panel-' + targetTab);
      if (targetPanel) {
        targetPanel.classList.add('active');

        // Re-trigger scroll reveals in the newly active panel
        const panelCards = targetPanel.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        panelCards.forEach(card => {
          if (!card.classList.contains('visible')) {
            card.classList.add('visible');
          }
        });
      }
    });
  });

  // Recalculate indicator on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const currentActive = document.querySelector('.menu-tab-btn.active');
      if (currentActive) moveIndicator(currentActive);
    }, 100);
  }, { passive: true });

  /* ── Smooth active nav link highlighting ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const highlightNav = () => {
    let current = '';
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      if (scrollY >= section.offsetTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.style.color = '';
      const href = link.getAttribute('href');
      if (href === '#' + current) {
        link.style.color = 'var(--yellow)';
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  /* ── Hero: parallax on bg text ─────────────── */
  const heroBgText = document.querySelector('.hero-bg-text');

  if (heroBgText) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBgText.style.transform =
          `translate(-50%, calc(-50% + ${scrolled * 0.15}px))`;
      }
    }, { passive: true });
  }

  /* ── Gallery: keyboard accessibility ───────── */
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'img');

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        // Toggle overlay for keyboard users
        const overlay = item.querySelector('.gallery-overlay');
        if (overlay) {
          const isVisible = overlay.style.opacity === '1';
          overlay.style.opacity = isVisible ? '' : '1';
          overlay.style.clipPath = isVisible ? '' : 'inset(0% 0 0 0)';
        }
      }
    });
  });

  /* ── Prevent layout shift: set tab indicator width after fonts load ── */
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      const currentActive = document.querySelector('.menu-tab-btn.active');
      if (currentActive) moveIndicator(currentActive);
    });
  }

})();
