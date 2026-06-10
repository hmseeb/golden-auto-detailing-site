/* ===========================
   GOLDEN AUTO DETAILING – JS
   =========================== */

(function () {
  'use strict';

  /* --- Sticky Header --- */
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Mobile Nav Toggle --- */
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close nav on outside click
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !toggle.contains(e.target)) {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  /* --- Intersection Observer for fade-up animations --- */
  const animTargets = document.querySelectorAll(
    '.service-card, .testimonial-card, .stat, .why-us__item, .contact-card'
  );

  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.animationDelay = `${i * 0.06}s`;
        el.classList.add('fade-up');
        observer.unobserve(el);
      }
    });
  }, observerOptions);

  animTargets.forEach(el => observer.observe(el));

  /* --- Contact Form --- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simple client-side validation
      const name = form.querySelector('#name');
      const phone = form.querySelector('#phone');
      let valid = true;

      [name, phone].forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#ef4444';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (!valid) return;

      // Show success message (since no backend)
      let msg = form.querySelector('.form-success');
      if (!msg) {
        msg = document.createElement('div');
        msg.className = 'form-success';
        msg.textContent = "Thanks! We'll be in touch shortly. Or call us at (402) 875-1369 for immediate help.";
        form.prepend(msg);
      }
      msg.classList.add('show');

      // Disable button
      const btn = form.querySelector('[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Request Sent!';
      btn.style.opacity = '.7';

      // Reset after 6s
      setTimeout(() => {
        form.reset();
        msg.classList.remove('show');
        btn.disabled = false;
        btn.textContent = 'Send Request';
        btn.style.opacity = '';
      }, 6000);
    });
  }

  /* --- Smooth scroll for hash links --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* --- Active nav link highlight on scroll --- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}`
            ? 'var(--gold)'
            : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

})();
