// ===== LEADJIO — script.js =====

// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  const isOpen = navLinks.classList.contains('open');
  spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity = isOpen ? '0' : '1';
  spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '1';
    spans[2].style.transform = '';
  });
});

// Scroll fade-in animation
const fadeEls = document.querySelectorAll(
  '.sol-card, .feature-card, .testi-card, .step, .step-card, .compare-col'
);

fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.index
          ? parseInt(entry.target.dataset.index) * 80
          : 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

fadeEls.forEach(el => observer.observe(el));

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = nav.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Contact form submission
const ctaForm = document.getElementById('ctaForm');
ctaForm.addEventListener('submit', e => {
  e.preventDefault();
  const btn = ctaForm.querySelector('button[type="submit"]');
  const original = btn.innerHTML;
  btn.innerHTML = '✓ Sent! We\'ll be in touch within 24 hours.';
  btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = '';
    btn.disabled = false;
    ctaForm.reset();
  }, 5000);
});

// Number counter animation for hero stats
const statNums = document.querySelectorAll('.stat-num');

const animateCounter = el => {
  const text = el.textContent;
  const match = text.match(/^(\d+)(.*)$/);
  if (!match) return;

  const target = parseInt(match[1]);
  const suffix = match[2];
  const duration = 1800;
  const start = performance.now();

  const tick = now => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

const statsObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

statNums.forEach(el => {
  if (/^\d+/.test(el.textContent)) {
    statsObserver.observe(el);
  }
});
