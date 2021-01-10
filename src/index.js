import './main.scss';
import apiService from './js/apiService';
import updateMarkUp from './js/updateMarkUp';
import refs from './js/refs';
import * as basicLightbox from 'basiclightbox';
import toastrNotificator from './js/toastrNotificator';

//=================== Listeners ======================

refs.searchForm.addEventListener('submit', submitHandler);
refs.gallery.addEventListener('click', modalBoxHandler);

//=================== Functions ======================
function resetGallery() {
  refs.gallery.innerHTML = '';
}

function showLoader() {
  refs.loadMoreSpinner.classList.remove('is-hidden');
}
function hideLoader() {
  refs.loadMoreSpinner.classList.add('is-hidden');
}

function submitHandler(e) {
  e.preventDefault();
  const form = e.currentTarget;
  apiService.query = form.elements.query.value;
  resetGallery();
  hideLoader();
  apiService.resetPage();
  form.reset();
  apiService
    .fetchImages()
    .then(data => {
      updateMarkUp(data);
      return data;
    })
    .then(data => {
      if (!data.length) {
        toastrNotificator.error();
        return;
      }
      setTimeout(showLoader, 1000);
      return data;
    })
    .catch(err => console.log('error' + err));
  apiService.incrementPage();
}

function loadMoreHandler() {
  apiService
    .fetchImages()
    .then(data => {
      updateMarkUp(data);
      return data;
    })
    .then(data => {
      if (!data.length) {
        hideLoader();
        toastrNotificator.info();
      }

      return data;
    });
  apiService.incrementPage();
}

function modalBoxHandler({ target }) {
  const urlFullImage = target.dataset.fullImg;

  if (target.nodeName !== 'IMG' && target.nodeName !== 'DIV') {
    return;
  }
  const instance = basicLightbox
    .create(`<img src=${urlFullImage} width="1400" height="900">`)
    .show();
}

//=================== Intersection Observer ======================
const options = { threshold: 0.8 };

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadMoreHandler();
    }
  });
};

const loadMoreObserver = new IntersectionObserver(onEntry, options);

loadMoreObserver.observe(refs.loadMoreSpinner);
