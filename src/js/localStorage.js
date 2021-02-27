import { fetchFavouriteMoviesList } from '../services/apiService';
import { onStarIconcheck } from './starIconClick';

export const initStorage = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (favorites.length > 0) {
    // add yellow color to start in movies gallery
    favorites.forEach(async id => {
      await fetchFavouriteMoviesList(id);
      const liElem = document.getElementById(id);
      const divElem = liElem.firstElementChild;
      const imgElem = divElem.firstElementChild;
      const inputElem = imgElem.nextElementSibling;
      inputElem.classList.add('checked');
    });
  }

  document
    .querySelector('.gallery-list')
    .addEventListener('click', onStarIconcheck);
};
