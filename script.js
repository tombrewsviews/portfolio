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
const section7 = document.querySelector('#section--7');
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
    console.log(entries[0].boundingClientRect.bottom, 'elese bottom smaller');
    nav.classList.remove('solid__background__light');
    nav.classList.add('solid__background__dark');
    navMenuItem.forEach(e => e.classList.add('nav__links__dark'));
  } else if (
    entries[0].boundingClientRect.bottom > 0 &&
    entries[0].isIntersecting
  ) {
    console.log(entries[0].boundingClientRect.bottom, 'elese top greater');
    nav.classList.add('solid__background__light');
    nav.classList.remove('solid__background__dark');
    navMenuItem.forEach(e => e.classList.remove('nav__links__dark'));
  }
});

let observerSecTwoBottom = new IntersectionObserver(entries => {
  if (entries[0].boundingClientRect.bottom < 0) {
    console.log(entries[0].boundingClientRect.bottom, 'elese bottom smaller');
    nav.classList.add('solid__background__light');
    nav.classList.remove('solid__background__dark');
    navMenuItem.forEach(e => e.classList.remove('nav__links__dark'));
  } else if (
    entries[0].boundingClientRect.bottom > 0 &&
    entries[0].isIntersecting
  ) {
    console.log(entries[0].boundingClientRect.bottom, 'elese bottom greater');
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
  threshold: 0.05,
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
  const s7coords = section7.getBoundingClientRect();
  section7.scrollIntoView({ behavior: 'smooth' });
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

///////// LOCATION
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const locate = async function () {
  try {
    const position = await getPosition();
    const { latitude: lat, longitude: lng } = position.coords;
    // console.log(position);
    const geocode = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!geocode.ok) throw new Error('No location data');
    const dataGeo = await geocode.json();

    const country = dataGeo.country;
    // console.log(country);
    return { lat, lng, country };
  } catch (err) {
    console.error(`Locate: ${err}`);
  }
};
(async function () {
  //visitor's data
  let result = await locate();
  let vLat = result.lat;
  let vLng = result.lng;
  let vCountry = result.country;
  // my data
  const myLat = 39.5696;
  const myLng = 2.6502;
  const myCountry = 'Spain';

  let map = L.map('map', {
    center: [vLat, vLng],
    zoom: 2,
    scrollWheelZoom: false,
  });
  let myFilter = [
    'invert:100%',
    'brightness:110%',
    'grayscale:100%',
    'hue:360deg',
    // 'opacity:100%',
    // 'contrast:130%',
    // 'blur:0px',
    // 'saturate:300%',
    // 'sepia:10%',
  ];
  //https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png
  //https://github.com/xtk93x/Leaflet.TileLayer.ColorFilter
  L.tileLayer
    .colorFilter('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      // attribution:
      //   '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      filter: myFilter,
    })
    .addTo(map);

  L.marker([vLat, vLng])
    .addTo(map)
    .bindPopup(`You are in ${vCountry}`)
    .openPopup();

  L.marker([34.7465, -92.2896])
    .addTo(map)
    .bindPopup('AAAAAAAA.<br> Easily customizable.');

  L.circle([34.7465, -92.2896], { radius: 1000000 }).addTo(map);
})();
// const visitor = locate().then(visitor => console.log(visitor));

//TODO calculate distance
//TODO draw route
//TODO calculate timezone difference in hours

///////////ENDORSEMENTS

// const content = async function () {
//   try {
//     const jokes = await fetch(
//       `http://api.icndb.com/jokes/random/5?limitTo=[nerdy]&firstName=Tom&lastName=Parandyk`
//     );
//     if (!jokes.ok) throw new Error('No jokes data');
//     const text = await jokes.json();
//     //TODO call the render function with text. forEach
//   } catch (err) {
//     console.error(`Jokes: ${err}`);
//   }
// };
// content();
// console.log(content);
