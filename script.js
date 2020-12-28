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
const btnJoke = document.querySelector('.joke');

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
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

const locate = async function () {
  try {
    const geodata = await fetch(
      `http://ip-api.com/json/?fields=country,lat,lon`
    );
    if (!geodata.ok) throw new Error('No location data');
    return await geodata.json();
  } catch (err) {
    console.error(`Locate: ${err}`);
  }
};
(async function () {
  //visitor's data
  let visitor = await locate();
  let vLat = visitor.lat;
  let vLng = visitor.lon;
  let vCountry = visitor.country;
  // my data
  const myLat = 39.5696;
  const myLng = 2.6502;
  const myCountry = 'Spain';

  let map = L.map('map', {
    center: [vLat, vLng],
    zoom: 2,
    scrollWheelZoom: false,
  });
  const marker = L.icon({
    iconUrl: 'img/marker.png',
    shadowUrl: 'img/marker-shadow.png',

    shadowSize: [50, 64], // size of the shadow
    shadowAnchor: [4, 62], // the same for the shadow
    iconSize: [32, 45], // size of the icon
    iconAnchor: [16, 43], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -35], // point from which the popup should open relative to the iconAnchor
  });

  const vMarker = L.icon({
    iconUrl: 'img/vMarker.png',
    shadowUrl: 'img/marker-shadow.png',

    shadowSize: [50, 64], // size of the shadow
    shadowAnchor: [4, 62], // the same for the shadow
    iconSize: [32, 45], // size of the icon
    iconAnchor: [15, 45], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -35], // point from which the popup should open relative to the iconAnchor
  });

  let myFilter = [
    'invert:100%',
    'brightness:45%',
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

  const popupOptions = {
    maxWidth: '200',
    className: 'popupCustom',
  };

  const vPopupOptions = {
    maxWidth: '200',
    className: 'vPopupCustom',
  };

  L.marker([vLat, vLng], { icon: vMarker })
    .addTo(map)
    .bindPopup(
      `How are things in ${vCountry}? This map visually shows the impact of my work as a product designer. It's implemented from scratch with the Leaflet library and the IP-API to get your location and country.`,
      vPopupOptions
    )
    .openPopup();

  L.marker([34.7465, -92.2896], { icon: marker })
    .addTo(map)
    .bindPopup(
      "I'm helping over 500 thousand patients access their medical data, and hundreds of doctors get their jobs done productively as a Product Designer at Greyfinch.",
      popupOptions
    );

  L.circle([34.7465, -92.2896], {
    radius: 1000000,
    fillColor: 'rgba(255, 141, 0, 0.5)',
    color: 'rgba(255, 141, 0, 0.5)',
    weight: 1,
  }).addTo(map);

  L.marker([39.73915, -104.9847], { icon: marker })
    .addTo(map)
    .bindPopup(
      "Technology layer I've helped design powers e-learning platform serving over 50 million primary and secondary school students across the US.",
      popupOptions
    );

  L.circle([39.73915, -104.9847], {
    radius: 1500000,
    fillColor: 'rgba(255, 141, 0, 0.5)',
    color: 'rgba(255, 141, 0, 0.5)',
    weight: 1,
  }).addTo(map);

  L.marker([49.2827, -123.1207], { icon: marker })
    .addTo(map)
    .bindPopup(
      "I'm helping a product team in Vancuver to speed up their financial system software delivery.",
      popupOptions
    );

  L.circle([49.2827, -123.1207], {
    radius: 50000,
    fillColor: 'rgba(255, 141, 0, 0.5)',
    color: 'rgba(255, 141, 0, 0.5)',
    weight: 1,
  }).addTo(map);

  L.marker([53.2707, -9.0568], { icon: marker })
    .addTo(map)
    .bindPopup(
      'My adventure in UX started by helping universities in Ireland to run scientific conferences for thousands of participans.',
      popupOptions
    );

  L.circle([53.2707, -9.0568], {
    radius: 140000,
    fillColor: 'rgba(255, 141, 0, 0.5)',
    color: 'rgba(255, 141, 0, 0.5)',
    weight: 1,
  }).addTo(map);

  L.marker([42.3601, -71.0589], { icon: marker })
    .addTo(map)
    .bindPopup(
      "I've helped over 50 thousand Fidelity employees world-wide to find a better career path.",
      popupOptions
    );

  L.circle([42.3601, -71.0589], {
    radius: 250000,
    fillColor: 'rgba(255, 141, 0, 0.5)',
    color: 'rgba(255, 141, 0, 0.5)',
    weight: 1,
  }).addTo(map);

  L.marker([12.9716, 77.5946], { icon: marker })
    .addTo(map)
    .bindPopup(
      "As part of an internal Fidelity HR platform, I've helped hundreds of employees in India on their path to professional success.",
      popupOptions
    );

  L.circle([12.9716, 77.5946], {
    radius: 250000,
    fillColor: 'rgba(255, 141, 0, 0.5)',
    color: 'rgba(255, 141, 0, 0.5)',
    weight: 1,
  }).addTo(map);

  L.marker([-33.8688, 151.2093], { icon: marker })
    .addTo(map)
    .bindPopup(
      "I've helped a small product team to re-design a remote productivity app, called Time Doctor. It got very successful during the pandemic.",
      popupOptions
    );

  L.circle([-33.8688, 151.2093], {
    radius: 150000,
    fillColor: 'rgba(255, 141, 0, 0.5)',
    color: 'rgba(255, 141, 0, 0.5)',
    weight: 1,
  }).addTo(map);

  L.marker([19.076, 72.8777], { icon: marker })
    .addTo(map)
    .bindPopup(
      "I'm helping dev shops in India to deliver high quality software at competitive price point.",
      popupOptions
    );

  L.circle([19.076, 72.8777], {
    radius: 50000,
    fillColor: 'rgba(255, 141, 0, 0.5)',
    color: 'rgba(255, 141, 0, 0.5)',
    weight: 1,
  }).addTo(map);

  L.marker([54.4416, 18.5601], { icon: marker })
    .addTo(map)
    .bindPopup(
      "I'm helping thousands of stock traders to make higher profits by accessing time-sensitive financial stock information on their mobile phones.",
      popupOptions
    );

  L.circle([54.4416, 18.5601], {
    radius: 200000,
    fillColor: 'rgba(255, 141, 0, 0.5)',
    color: 'rgba(255, 141, 0, 0.5)',
    weight: 1,
  }).addTo(map);
})();

/////////RANDOM JOKE

const getJoke = async function () {
  try {
    const jokes = await fetch(
      `http://api.icndb.com/jokes/random?limitTo=[nerdy]&firstName=Tom&lastName=Parandyk`
    );
    if (!jokes.ok) throw new Error('No jokes data');
    return await jokes.json();
  } catch (err) {
    console.error(`Jokes: ${err}`);
  }
};
getJoke();

var content;

let makeQuote = async function () {
  let response = await getJoke();
  // console.log(response);
  let text = response.value.joke;
  // console.log(text);
  // const quote = document.createElement('P');
  content = document.createTextNode(`${text}`);
  const addQuote = await document
    .getElementById('quote-container')
    .appendChild(content);
};
makeQuote();

const removeQuote = function () {
  content.parentNode.removeChild(content);
};

btnJoke.addEventListener('click', function () {
  getJoke();
  removeQuote();
  makeQuote();
});
