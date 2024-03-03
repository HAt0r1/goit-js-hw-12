import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getDataFromServer as getInfo } from './js/pixabay-api';
import { addElement, list } from './js/render-functions';

let page = 1;
let inputValue;
let totalHits;

const form = document.querySelector('.image-search-form');
const loaderItem = document.querySelector('.load-item');
const loadButton = document.querySelector('.load-button');
const endpoint = 'https://pixabay.com/api/';

function smoothScroll() {
  const listItem = document.querySelector('.img-list');
  let sizeGallery = listItem.getBoundingClientRect();
  if (sizeGallery.height > 0) {
    let heightGallery = sizeGallery.height;
    window.scrollBy({
      top: heightGallery,
      behavior: 'smooth',
    });
  }
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  list.innerHTML = null;
  inputValue = event.currentTarget.input.value.trim();
  if (inputValue === '') {
    iziToast.show({
      title: 'Error',
      titleColor: '#ffffff',
      message: 'Write key word to search images',
      messageColor: '#ffffff',
      backgroundColor: '#EF4040',
      position: 'topRight',
      close: false,
    });
    return;
  }
  loaderItem.classList.add('loader');
  const array = await getInfo(endpoint, inputValue, page);
  loadButton.classList.remove('hide');
  totalHits = array.totalHits;
  if (array.hits.length === 0) {
    loadButton.classList.add('hide');
    iziToast.show({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      messageColor: '#ffffff',
      backgroundColor: '#EF4040',
      position: 'topRight',
    });
  }
  loaderItem.classList.remove('loader');
  addElement(array.hits);
  const lightbox = new SimpleLightbox('.image-item a', {
    animationSpeed: 300,
    captionsData: 'alt',
    captionDelay: 1000,
    overlayOpacity: 0.5,
  });
  lightbox.refresh();

  form.reset();
});

loadButton.addEventListener('click', async () => {
  page++;
  loaderItem.classList.add('loader');
  const data = await getInfo(endpoint, inputValue, page);
  loaderItem.classList.remove('loader');
  addElement(data.hits);
  smoothScroll();
  const lightbox = new SimpleLightbox('.image-item a', {
    animationSpeed: 300,
    captionsData: 'alt',
    captionDelay: 1000,
    overlayOpacity: 0.5,
  });
  lightbox.refresh();
  if ((page - 1) * 15 >= totalHits) {
    loadButton.classList.add('hide');
    iziToast.show({
      message: "We're sorry, but you've reached the end of search results.",
      backgroundColor: 'blue',
      messageColor: '#ffffff',
      timeout: 1000,
      position: 'bottomRight',
      maxWidth: 420,
    });
  }
});
