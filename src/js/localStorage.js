import { fetchFavouriteMoviesList } from './apiService';
import { onStarIconcheck } from './starIconClick';
// delay2();
export function initStorage() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  console.log('in initStorage' + ' ' + favorites.length);

  if (favorites.length > 0) {
    setTimeout(() => {
      favorites.forEach(id => {
        fetchFavouriteMoviesList(id);
        const liElem = document.getElementById(id);
        const divElem = liElem.firstElementChild;
        const imgElem = divElem.firstElementChild;
        const inputElem = imgElem.nextElementSibling;
        inputElem.classList.add('checked');
      });
    }, 1000);
  }

  document
    .querySelector('.gallery-list')
    .addEventListener('click', onStarIconcheck);
}
