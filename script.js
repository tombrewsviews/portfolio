'use strict';

console.log(
  "I will let you on a little secret of mine - I've been a designer for as long as I can remember, but I discovered my engineering soul a couple of years ago. It would be more useful to have an engineering mind rather than soul, but you can't have everything, can you? And yes, I've designed and implemented this site, including CSS, HTML, Javascript, and 3d illustrations."
);

const modal = document.querySelector('.modal');
const modalVideo = document.querySelector('.modal__video');
const overlay = document.querySelector('.overlay');
const overlayVideo = document.querySelector('.overlay__video');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnCloseModalVideo = document.querySelector('.btn--close-modal-video');
const btnOpenModal = document.querySelector('.btn--show-modal');
const btnOpenModalVideo = document.querySelector('.btn--show-modal-video');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const navMenuItem = document.querySelectorAll('.menu__item');
const tabs = document.querySelectorAll('.skills__tab');
const tabsContainer = document.querySelector('.skills__tab-container');
const tabsContent = document.querySelectorAll('.skills__content');

///////////////// Canvas loading
function removeElement(elementId) {
  const element = document.getElementById(elementId);
  element.parentNode.removeChild(element);
}
const removeLoader = (window.onload = event => {
  removeElement('loader');
});

///////////////// Nav
/////TODO refactor onscroll to use the observer API
let scrolling = false;

window.onscroll = () => {
  scrolling = true;
};
setInterval(() => {
  if (scrolling) {
    scrolling = false;
    const Ypos = window.pageYOffset;

    if (Ypos > 100) {
      nav.classList.add('solid__background__light');
    } else if (Ypos < 100) {
      nav.classList.remove('solid__background__light');
    }
  }
}, 500);

let observerSecTwoTop = new IntersectionObserver(entries => {
  if (entries[0].boundingClientRect.bottom < 0) {
    nav.classList.remove('solid__background__light');
    nav.classList.add('solid__background__dark');
    navMenuItem.forEach(e => e.classList.add('nav__links__dark'));
  } else if (entries[0].boundingClientRect.bottom > 0) {
    nav.classList.add('solid__background__light');
    nav.classList.remove('solid__background__dark');
    navMenuItem.forEach(e => e.classList.remove('nav__links__dark'));
  }
});

let observerSecTwoBottom = new IntersectionObserver(entries => {
  if (entries[0].boundingClientRect.bottom < 0) {
    nav.classList.add('solid__background__light');
    nav.classList.remove('solid__background__dark');
    navMenuItem.forEach(e => e.classList.remove('nav__links__dark'));
  } else if (entries[0].boundingClientRect.bottom > 0) {
    nav.classList.remove('solid__background__light');
    nav.classList.add('solid__background__dark');
    navMenuItem.forEach(e => e.classList.add('nav__links__dark'));
  }
});
observerSecTwoTop.observe(document.querySelector('#top--track'));
observerSecTwoBottom.observe(document.querySelector('#bottom--track'));

///////////////////////////////////////
// Modal window

// TODO see if there is more DRY way to implement modals?

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const openModalVideo = function (e) {
  e.preventDefault();
  modalVideo.classList.remove('hidden');
  overlayVideo.classList.remove('hidden');
};

const closeModalVideo = function () {
  modalVideo.classList.add('hidden');
  overlayVideo.classList.add('hidden');
};

// btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnOpenModal.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

btnOpenModalVideo.addEventListener('click', openModalVideo);
btnCloseModalVideo.addEventListener('click', closeModalVideo);
overlayVideo.addEventListener('click', closeModalVideo);

document.addEventListener('keydown', function (e) {
  if (
    (e.key === 'Escape' && !modal.classList.contains('hidden')) ||
    !modalVideo.classList.contains('hidden')
  ) {
    closeModal();
    closeModalVideo();
  }
});

///////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//////////// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

///////////////////////////////////////
// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page navigation

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// Tabbed component

tabsContainer.addEventListener('mouseover', function (e) {
  const hovered = e.target.closest('.skills__tab');

  // Guard clause
  if (!hovered) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('skills__tab--active'));
  tabsContent.forEach(c => c.classList.remove('skills__content--active'));

  // Activate tab
  hovered.classList.add('skills__tab--active');

  // Activate content area
  document
    .querySelector(`.skills__content--${hovered.dataset.tab}`)
    .classList.add('skills__content--active');
});
