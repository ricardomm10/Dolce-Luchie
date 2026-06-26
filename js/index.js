/* ============================================================
   DOLCE LUCHIE — main.js
   Funcionalidades: Navbar mobile toggle + Carrusel simple
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ────────────────────────────────
     Navbar: menú hamburguesa mobile
  ──────────────────────────────── */
  const toggle = document.querySelector('.navbar__toggle');
  const navMenu = document.getElementById('nav-menu');

  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Cerrar menú al hacer clic en un enlace
    navMenu.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !toggle.contains(e.target)) {
        navMenu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ────────────────────────────────
     Carrusel simple sin dependencias
  ──────────────────────────────── */
  const track  = document.getElementById('carouselTrack');
  const slides = track ? track.querySelectorAll('.carousel__slide') : [];
  const dots   = document.querySelectorAll('.carousel__dot');
  const btnPrev = document.querySelector('.carousel__btn--prev');
  const btnNext = document.querySelector('.carousel__btn--next');

  let current = 0;
  const total = slides.length;

  function goTo(index) {
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    current = index;

    // Mover track
    track.style.transform = `translateX(-${current * 100}%)`;

    // Actualizar dots
    dots.forEach((dot, i) => {
      const active = i === current;
      dot.classList.toggle('carousel__dot--active', active);
      dot.setAttribute('aria-selected', active);
    });
  }

  if (track && total > 0) {
    btnPrev && btnPrev.addEventListener('click', () => goTo(current - 1));
    btnNext && btnNext.addEventListener('click', () => goTo(current + 1));

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goTo(i));
    });

    // Auto-avance cada 5 s
    let autoplay = setInterval(() => goTo(current + 1), 5000);

    // Pausar al hover
    track.parentElement.addEventListener('mouseenter', () => clearInterval(autoplay));
    track.parentElement.addEventListener('mouseleave', () => {
      autoplay = setInterval(() => goTo(current + 1), 5000);
    });

    // Swipe táctil
    let startX = 0;
    track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    }, { passive: true });
  }

});
