import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getDataFromServer as getImages } from './js/pixabay-api.js';
import { list, addElement } from './js/render-functions.js';

const form = document.querySelector('.image-search-form');
const loaderItem = document.querySelector('.load-item');
const endpoint = 'https://pixabay.com/api/';

form.addEventListener('submit', event => {
  event.preventDefault();
  list.innerHTML = '';
  const inputValue = event.currentTarget.input.value;
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
  getImages(endpoint, inputValue)
    .then(array => {
      // SetTimeout is set to demonstrate loader work
      setTimeout(() => {
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
        addElement(array.hits);
        const lightbox = new SimpleLightbox('.image-item a', {
          animationSpeed: 300,
          captionsData: 'alt',
          captionDelay: 1000,
          overlayOpacity: 0.5,
        });
        lightbox.refresh();
      }, 4000);
    })
    .catch(error => console.log(error));
  form.reset();
});
