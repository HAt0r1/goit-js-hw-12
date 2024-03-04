import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getDataFromServer as getInfo } from './js/pixabay-api';
import { addElement, list } from './js/render-functions';

let page = 1;
const pageItems = 15;
let inputValue;

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
  page = 1;
  list.innerHTML = null;
  inputValue = event.currentTarget.input.value.trim();
  if (inputValue === '') {
    iziToast.show({
      title: 'Error',
      titleColor: '#ffffff',
      message: 'Write keyword to search images',
      messageColor: '#ffffff',
      backgroundColor: '#EF4040',
      position: 'topRight',
      close: false,
    });
    return;
  }
  loaderItem.classList.add('loader');
  let array;
  try {
    array = await getInfo(endpoint, inputValue, page, pageItems);
    if (array.hits.length < pageItems) {
      loadButton.classList.add('hide');
    } else {
      loadButton.classList.remove('hide');
    }
    if (array.hits.length === 0) {
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: '#ffffff',
        backgroundColor: '#EF4040',
        position: 'topRight',
      });
    }
    loaderItem.classList.remove('loader');
  } catch (error) {
    loaderItem.classList.remove('loader');
    iziToast.error({
      title: error.name,
      titleColor: '#ffffff',
      message: error.message,
      messageColor: '#ffffff',
      backgroundColor: '#EF4040',
      position: 'topRight',
    });
  }
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
  const array = await getInfo(endpoint, inputValue, page, pageItems);
  loaderItem.classList.remove('loader');
  addElement(array.hits);
  smoothScroll();
  const lightbox = new SimpleLightbox('.image-item a', {
    animationSpeed: 300,
    captionsData: 'alt',
    captionDelay: 1000,
    overlayOpacity: 0.5,
  });
  lightbox.refresh();

  if (page * pageItems > array.totalHits) {
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
