import './index.css';
import { initSearch } from './search';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Search
  initSearch();

  // Page Loader
  setTimeout(() => {
    const loader = document.getElementById('page-loader');
    if(loader) {
      loader.classList.add('fade-out');
      setTimeout(() => loader.remove(), 500);
    }
  }, 1000);

  // Nav scroll
  const nav = document.querySelector('.main-nav');
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
    if (window.scrollY > lastScrollY && window.scrollY > 200) {
      nav?.classList.add('hidden-nav');
    } else {
      nav?.classList.remove('hidden-nav');
    }
    lastScrollY = window.scrollY;
  });

  // Mobile menu
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileSidebar = document.querySelector('.mobile-nav-sidebar');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');
  mobileMenuBtn?.addEventListener('click', () => {
    mobileSidebar?.classList.add('open');
    mobileOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  mobileOverlay?.addEventListener('click', () => {
    mobileSidebar?.classList.remove('open');
    mobileOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  });

  // Carousel
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  let currentSlide = 0;
  let carouselInterval: any;

  function goToSlide(index: number) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() { goToSlide(currentSlide + 1); }
  function prevSlide() { goToSlide(currentSlide - 1); }

  document.getElementById('carousel-next')?.addEventListener('click', nextSlide);
  document.getElementById('carousel-prev')?.addEventListener('click', prevSlide);
  
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => goToSlide(idx));
  });

  function startCarousel() {
    carouselInterval = setInterval(nextSlide, 5000);
  }
  startCarousel();

  const hero = document.querySelector('.hero');
  hero?.addEventListener('mouseenter', () => clearInterval(carouselInterval));
  hero?.addEventListener('mouseleave', startCarousel);

  // Countdown timers
  const timers = document.querySelectorAll('.countdown-timer');
  setInterval(() => {
    timers.forEach(timer => {
      let seconds = parseInt(timer.getAttribute('data-seconds') || '0', 10);
      if (seconds > 0) {
        seconds--;
        timer.setAttribute('data-seconds', seconds.toString());
        const d = Math.floor(seconds / (3600*24));
        const h = Math.floor((seconds % (3600*24)) / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        timer.textContent = `⏱️ ${d}d ${h}h ${m}m ${s}s`;
        if (seconds < 7200) timer.classList.add('badge--orange');
      }
    });
  }, 1000);

  // Intersect Observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

  // Cookie banner
  if(!localStorage.getItem('cookies-accepted')) {
    setTimeout(() => {
      document.getElementById('cookie-banner')?.classList.add('show');
    }, 1500);
  }
  document.getElementById('accept-cookies')?.addEventListener('click', () => {
    localStorage.setItem('cookies-accepted', 'true');
    document.getElementById('cookie-banner')?.classList.remove('show');
  });
});
