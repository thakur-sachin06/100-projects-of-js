const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArray = [];
let ready = false;
let imagesLoadedCount = 0;
let totalImages = 0;
let isInitialLoaded = true;

// unsplash api. // first time loading only 5 images for performance.
let initialCount = 5;
const apiKey = 'hAkSHPFytgzMM9743TksNKpU7KZnnr5YHSii5ODZ9A8';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

function updateApiURIWithNewCount(picCount) {
  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`;
}

// function to set attributes

function setAttributes(element, attribute) {
  for (const key in attribute) {
    element.setAttribute(key, attribute[key]);
  }
}

// will run for each image when it is loaded
function imageLoaded() {
  imagesLoadedCount++;
  if (imagesLoadedCount === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

function displayPhotos() {
  imagesLoadedCount = 0;
  totalImages = photosArray.length;
  photosArray.forEach(photo => {
    //create 'anchor' element
    const item = document.createElement('a');

    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    })
    // create img elt
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // check each image is loaded.
    img.addEventListener('load', imageLoaded());

    //put img in anchor tag created above
    item.appendChild(img);
    imageContainer.appendChild(item);
  })
}

// getting photos from api
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    if (isInitialLoaded) {
      updateApiURIWithNewCount(30);
      isInitialLoaded = false;
    }
  }
  catch (error) {

  }
}

// check whether we are at the bottom of the page while scrolling.
window.addEventListener('scroll', () => {
  if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 && ready) {
    getPhotos();
  }
})

getPhotos();