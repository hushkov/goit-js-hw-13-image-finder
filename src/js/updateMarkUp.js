import cardMarkUp from '../templates/cardMarkUp.hbs';
import refs from './refs';

function updateMarkUp(arr) {
  refs.gallery.insertAdjacentHTML('beforeend', cardMarkUp(arr));
}
export default updateMarkUp;
