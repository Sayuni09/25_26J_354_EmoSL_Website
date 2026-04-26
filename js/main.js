/* ============================================================
   EMOSENSE — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ------ Navbar hamburger ------ */
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
      }
    });
  }

  /* ------ Active nav link ------ */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
  });

  /* ------ Navbar scroll shadow ------ */
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ------ Scroll reveal ------ */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => revealObs.observe(el));

  /* ------ Tab switcher ------ */
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });

  /* ------ Counter animation ------ */
  const counters = document.querySelectorAll('[data-count]');
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el  = e.target;
      const end = parseInt(el.dataset.count);
      const dur = 1800;
      const step = end / (dur / 16);
      let curr = 0;
      const run = setInterval(() => {
        curr += step;
        if (curr >= end) {
          el.textContent = end.toLocaleString() + (el.dataset.suffix || '');
          clearInterval(run);
        } else {
          el.textContent = Math.floor(curr).toLocaleString() + (el.dataset.suffix || '');
        }
      }, 16);
      countObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => countObs.observe(c));

  /* ------ Contact form ------ */
  window.handleSubmit = function(btn) {
    const email = document.getElementById('email')?.value;
    const fname = document.getElementById('fname')?.value;
    const msg   = document.getElementById('message')?.value;
    if (!email || !fname || !msg) {
      btn.textContent = '⚠ Fill in all required fields';
      btn.style.background = 'var(--tan-brown)';
      btn.style.color = 'var(--white)';
      setTimeout(() => {
        btn.textContent = 'Send Message ↗';
        btn.style.background = '';
        btn.style.color = '';
      }, 2500);
      return;
    }
    btn.textContent = '✓ Message Sent!';
    btn.style.background = 'var(--sage-green)';
    btn.style.color = 'var(--white)';
    setTimeout(() => {
      btn.textContent = 'Send Message ↗';
      btn.style.background = '';
      btn.style.color = '';
    }, 3500);
  };

});
