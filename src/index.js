import './main.scss';
import apiService from './js/apiService';
import updateMarkUp from './js/updateMarkUp';
import refs from './js/refs';
import * as basicLightbox from 'basiclightbox';

//=================== Listeners ======================

refs.searchForm.addEventListener('submit', submitHandler);
refs.gallery.addEventListener('click', modalBoxHandler);

//=================== Functions ======================
function resetGallery() {
  refs.gallery.innerHTML = '';
}

function submitHandler(e) {
  e.preventDefault();
  const form = e.currentTarget;
  apiService.query = form.elements.query.value;
  resetGallery();
  apiService.resetPage();
  form.reset();
  apiService.fetchImages().then(updateMarkUp);
  apiService.incrementPage();

  setTimeout(showLoader, 1000);
}

function showLoader() {
  refs.loadMoreSpinner.classList.remove('is-hidden');
}

function loadMoreHandler() {
  apiService.fetchImages().then(updateMarkUp);
  apiService.incrementPage();
}

function modalBoxHandler({ target }) {
  const urlFullImage = target.dataset.fullImg;

  if (target.nodeName !== 'IMG') {
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
