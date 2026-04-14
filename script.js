// SVG path data
const svgPaths = {
  p19b5fe00: "M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z",
  p15f04e40: "M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM18 12.75H12.75V18C12.75 18.41 12.41 18.75 12 18.75C11.59 18.75 11.25 18.41 11.25 18V12.75H6C5.59 12.75 5.25 12.41 5.25 12C5.25 11.59 5.59 11.25 6 11.25H11.25V6C11.25 5.59 11.59 5.25 12 5.25C12.41 5.25 12.75 5.59 12.75 6V11.25H18C18.41 11.25 18.75 11.59 18.75 12C18.75 12.41 18.41 12.75 18 12.75Z",
  p28b30580: "M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM18.53 12.53L14.24 16.82C14.09 16.97 13.9 17.04 13.71 17.04C13.52 17.04 13.33 16.97 13.18 16.82C12.89 16.53 12.89 16.05 13.18 15.76L16.19 12.75H6C5.59 12.75 5.25 12.41 5.25 12C5.25 11.59 5.59 11.25 6 11.25H16.19L13.18 8.24C12.89 7.95 12.89 7.47 13.18 7.18C13.47 6.89 13.95 6.89 14.24 7.18L18.53 11.47C18.67 11.61 18.75 11.8 18.75 12C18.75 12.2 18.67 12.39 18.53 12.53Z"
};

const tickSvg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="' + svgPaths.p19b5fe00 + '" fill="#0671bb"/></svg>';
const addSvg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="' + svgPaths.p15f04e40 + '" fill="#0671bb"/></svg>';
const arrowSvg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="' + svgPaths.p28b30580 + '" fill="#0671bb"/></svg>';

// Helper to build list items
function listItem(text) {
  return '<div class="list-item animate-on-scroll">' + tickSvg + '<span>' + text + '</span></div>';
}

document.addEventListener('DOMContentLoaded', function () {

  // --- Scroll-based animations (IntersectionObserver for fade-ins) ---
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '-50px' }
  );
  document.querySelectorAll('.animate-on-scroll').forEach(function (el) { observer.observe(el); });

  // --- Parallax on scroll ---
  var handleScroll = function () {
    var scrollY = window.scrollY;
    var heroBg = document.querySelector('.parallax-hero-bg');
    var heroCard = document.querySelector('.parallax-hero-card');
    var bigCard = document.querySelector('.parallax-big-card');

    if (heroBg) heroBg.style.transform = 'translateY(' + (scrollY * 0.1875) + 'px)';
    if (heroCard) heroCard.style.transform = 'translateY(' + (scrollY * -0.1) + 'px)';
    if (bigCard) {
      var rect = bigCard.parentElement.getBoundingClientRect();
      var progress = Math.max(0, Math.min(1, 1 - rect.bottom / (window.innerHeight + rect.height)));
      bigCard.style.transform = 'translateY(' + (-50 + (progress - 0.5) * 100) + '%) translateX(0)';
    }

    // Active nav
    var navItems = ['home', 'features', 'who-its-for', 'how-it-works'];
    var scrollPos = scrollY + 200;
    navItems.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
        document.querySelectorAll('.nav-btn').forEach(function (btn) {
          btn.classList.toggle('nav-active', btn.getAttribute('data-section') === id);
        });
      }
    });
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  // --- Modal logic ---
  var openContactModal = function () {
    var m = document.getElementById('contact-modal');
    if (m) {
      m.style.display = 'flex';
      m.querySelector('.modal-form').style.display = 'flex';
      m.querySelector('.modal-thanks').style.display = 'none';
    }
  };
  var closeContactModal = function () {
    var m = document.getElementById('contact-modal');
    if (m) m.style.display = 'none';
  };
  var openInfoModal = function (type) {
    var m = document.getElementById('info-modal');
    if (m) {
      m.style.display = 'flex';
      m.querySelector('.info-terms').style.display = type === 'terms' ? 'block' : 'none';
      m.querySelector('.info-privacy').style.display = type === 'privacy' ? 'block' : 'none';
      m.querySelector('.info-title').textContent = type === 'terms' ? 'Terms & Conditions' : 'Privacy Policy';
    }
  };
  var closeInfoModal = function () {
    var m = document.getElementById('info-modal');
    if (m) m.style.display = 'none';
  };

  document.querySelectorAll('.open-contact').forEach(function (b) { b.addEventListener('click', openContactModal); });
  document.querySelectorAll('.close-contact').forEach(function (b) { b.addEventListener('click', closeContactModal); });
  var closeInfoBtn = document.querySelector('.close-info');
  if (closeInfoBtn) closeInfoBtn.addEventListener('click', closeInfoModal);
  var openTermsBtn = document.querySelector('.open-terms');
  if (openTermsBtn) openTermsBtn.addEventListener('click', function () { openInfoModal('terms'); });
  var openPrivacyBtn = document.querySelector('.open-privacy');
  if (openPrivacyBtn) openPrivacyBtn.addEventListener('click', function () { openInfoModal('privacy'); });

  // Smooth scroll nav
  document.querySelectorAll('.nav-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-section');
      if (id) document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Form submit
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var modal = document.getElementById('contact-modal');
      if (modal) {
        modal.querySelector('.modal-form').style.display = 'none';
        modal.querySelector('.modal-thanks').style.display = 'flex';
      }
    });
  }

  // Hero entrance animation
  document.querySelectorAll('.hero-animate').forEach(function (el, i) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    setTimeout(function () {
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 200 + i * 200);
  });

  // Hamburger menu toggle
  var hamburgerBtn = document.getElementById('hamburger-btn');
  var mobileNav = document.getElementById('mobile-nav');
  var mobileNavClose = document.getElementById('mobile-nav-close');

  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', function () {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
  if (mobileNavClose && mobileNav) {
    mobileNavClose.addEventListener('click', function () {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Mobile nav smooth scroll
  document.querySelectorAll('.mobile-nav-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-section');
      if (id) document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
      if (mobileNav) {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // Mobile contact button closes nav
  var mobileContactBtn = document.querySelector('.mobile-contact-btn');
  if (mobileContactBtn && mobileNav) {
    mobileContactBtn.addEventListener('click', function () {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Close modals on overlay click
  document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        overlay.style.display = 'none';
      }
    });
  });
});
