document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ duration: 900, once: true, offset: 80 });

  if (window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  const cursor = document.querySelector('.custom-cursor');
  document.addEventListener('mousemove', (e) => {
    if (cursor && window.gsap) gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.12, ease: 'power2.out' });
  });

  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    if (window.gsap) {
      gsap.to(preloader, { opacity: 0, duration: 0.8, onComplete: () => preloader.style.display = 'none' });
    } else {
      preloader.style.display = 'none';
    }
  });

  const counters = document.querySelectorAll('.counter');
  const animateCounters = () => {
    counters.forEach((counter) => {
      if (counter.dataset.done) return;
      counter.dataset.done = '1';
      const target = parseInt(counter.dataset.target, 10);
      let count = 0;
      const step = Math.max(1, Math.ceil(target / 120));
      const tick = () => {
        count += step;
        counter.textContent = count >= target ? `${target}+` : count;
        if (count < target) requestAnimationFrame(tick);
      };
      tick();
    });
  };

  if (window.ScrollTrigger) {
    ScrollTrigger.create({ trigger: '.stats-section', start: 'top 75%', once: true, onEnter: animateCounters });
  } else animateCounters();

  new Swiper('.testimonialSwiper', {
    loop: true,
    spaceBetween: 24,
    pagination: { el: '.swiper-pagination', clickable: true },
    autoplay: { delay: 3500, disableOnInteraction: false },
    breakpoints: {
      0: { slidesPerView: 1 },
      992: { slidesPerView: 2 }
    }
  });

  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 500);
  });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const quickViewModal = new bootstrap.Modal('#quickViewModal');
  document.querySelectorAll('.open-inquiry, .view-details').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.getElementById('quickViewTitle').textContent = 'AJ Linen Product';
      document.getElementById('quickViewText').textContent = 'Premium export-quality textile product available for OEM, private label, and hospitality projects.';
      quickViewModal.show();
    });
  });

  document.querySelectorAll('.ripple-btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const rect = this.getBoundingClientRect();
      ripple.style.left = `${e.clientX - rect.left}px`;
      ripple.style.top = `${e.clientY - rect.top}px`;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
});