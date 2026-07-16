// ==========================================================
// INTELLECTS CLUB — site interactivity
// Vanilla JS, no build step, no dependencies.
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- 2. Hero stat counters ----------
     Update these target numbers if the club's real figures change.
  ---------------------------------------------------------------- */
  const stats = [
    { el: document.getElementById('statMembers'), target: 100, suffix: '+' },
    { el: document.getElementById('statEvents'),  target: 10,  suffix: '+' },
    { el: document.getElementById('statYear'),    target: 5,   suffix: '+' },
  ];

  function animateCount(stat) {
    if (!stat.el) return;
    const duration = 1000;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(progress * stat.target);
      stat.el.textContent = value + stat.suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else stat.el.textContent = stat.target + stat.suffix;
    }
    requestAnimationFrame(tick);
  }
  stats.forEach(animateCount);

  /* ---------- 3. Scroll reveal ---------- */
  const revealTargets = document.querySelectorAll(
    '.about-card, .benefit-card, .team-card, .timeline__item, .event-card, .achievement-card, .faq-item, .feed-card'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => observer.observe(el));

  /* ---------- 4. Sticky nav shadow on scroll ---------- */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 8 ? '0 8px 24px -16px rgba(0,0,0,0.6)' : 'none';
  });

  /* ---------- 5. Join form ----------
     IMPORTANT — this is a static site with no backend or database.
     Right now, submitting the form opens the user's email app with
     their details pre-filled, addressed to the club email.

     TODO (pick ONE before this goes live for real signups):
       a) Google Forms — create a Google Form with matching fields,
          then either replace this <form> with the Form's embed code,
          or POST to its "formResponse" URL from this script.
       b) Formspree (https://formspree.io) — free tier, no backend
          needed. Sign up, get a form endpoint, then replace the
          fetch URL below and remove the mailto fallback.
       c) A real backend (Node/Express, Firebase, etc.) if you want
          to store entries in a database yourself.
  ---------------------------------------------------------------- */
  const joinForm = document.getElementById('joinForm');
  const joinFormNote = document.getElementById('joinFormNote');

  if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const data = {
        name: document.getElementById('fname').value.trim(),
        regno: document.getElementById('fregno').value.trim(),
        dept: document.getElementById('fdept').value.trim(),
        year: document.getElementById('fyear').value,
        phone: document.getElementById('fphone').value.trim(),
        email: document.getElementById('femail').value.trim(),
      };

      // Basic phone sanity check (10 digits)
      if (!/^\d{10}$/.test(data.phone.replace(/\D/g, ''))) {
        joinFormNote.textContent = 'Please enter a valid 10-digit phone number.';
        joinFormNote.style.color = '#FF6B8B';
        return;
      }

      const subject = encodeURIComponent(`Intellects Club Membership — ${data.name}`);
      const body = encodeURIComponent(
        `New membership application:\n\n` +
        `Name: ${data.name}\n` +
        `Registration No: ${data.regno}\n` +
        `Department: ${data.dept}\n` +
        `Year of Study: ${data.year}\n` +
        `Phone: ${data.phone}\n` +
        `Email: ${data.email}\n`
      );

      window.location.href = `mailto:INTELLECTS@SRMIST.EDU.IN?subject=${subject}&body=${body}`;

      joinFormNote.textContent = 'Opening your email app with your details filled in — just hit send!';
      joinFormNote.style.color = '#4ADE9C';
      joinForm.reset();
    });
  }

  /* ---------- 6. Cursor-tracked glow + tilt on cards ----------
     Purely visual: updates --mx/--my (used by the CSS spotlight
     gradients) and adds a light 3D tilt on team cards.
  ---------------------------------------------------------------- */
  const glowTargets = document.querySelectorAll(
    '.about-card, .benefit-card, .team-card, .event-card'
  );
  glowTargets.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);

      if (card.classList.contains('team-card')) {
        const rx = ((y / rect.height) - 0.5) * -8;
        const ry = ((x / rect.width) - 0.5) * 8;
        card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
      }
    });
    card.addEventListener('mouseleave', () => {
      if (card.classList.contains('team-card')) {
        card.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg)';
      }
    });
  });

  /* ---------- 7. TODO: wire up real links ---------- */
  const repoLink = document.getElementById('repoLink');
  const deployLink = document.getElementById('deployLink');
  if (repoLink) repoLink.href = 'https://github.com/YOUR-USERNAME/YOUR-REPO';
  if (deployLink) {
    deployLink.href = 'https://YOUR-USERNAME.github.io/YOUR-REPO/';
    deployLink.textContent = 'https://YOUR-USERNAME.github.io/YOUR-REPO/';
  }

});
