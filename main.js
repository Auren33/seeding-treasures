// main.js — Seeding Treasures Site Interactions

document.addEventListener('DOMContentLoaded', () => {
  // === Mobile Menu ===
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-menu__close');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.add('mobile-menu--open');
      document.body.style.overflow = 'hidden';
    });

    const closeMenu = () => {
      mobileMenu.classList.remove('mobile-menu--open');
      document.body.style.overflow = '';
    };

    if (mobileClose) {
      mobileClose.addEventListener('click', closeMenu);
    }

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // === Dropdown (desktop) ===
  const dropdowns = document.querySelectorAll('.nav__dropdown');
  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.nav__dropdown-trigger');
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.toggle('nav__dropdown--open');
      });
    }
  });

  // Close dropdowns on click outside
  document.addEventListener('click', (e) => {
    dropdowns.forEach(dropdown => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('nav__dropdown--open');
      }
    });
  });

  // === Scroll animations (fade-up) ===
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
  });

  // === Header scroll shadow ===
  const header = document.querySelector('.header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const scroll = window.scrollY;
      if (scroll > 10) {
        header.style.boxShadow = '0 2px 16px rgba(45,43,40,0.12)';
      } else {
        header.style.boxShadow = '';
      }
      lastScroll = scroll;
    }, { passive: true });
  }

  // === Smooth scroll for anchor links ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // === Mobile submenu toggle ===
  const mobileSubTriggers = document.querySelectorAll('.mobile-menu__sub-trigger');
  mobileSubTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const sub = trigger.nextElementSibling;
      if (sub) {
        sub.style.display = sub.style.display === 'none' ? 'block' : 'none';
        trigger.classList.toggle('open');
      }
    });
  });

  // === Form validation styling ===
  document.querySelectorAll('.form__input, .form__textarea').forEach(input => {
    input.addEventListener('blur', () => {
      if (input.value.trim()) {
        input.style.borderColor = 'var(--color-primary-light)';
      } else {
        input.style.borderColor = '';
      }
    });
  });
});
