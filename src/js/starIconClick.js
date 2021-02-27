import getRefs from './get-refs';
import { fetchFavouriteMoviesList } from '../services/apiService';
import { manageFavListModal } from './onFavListModal';

const refs = getRefs();

export async function onStarIconcheck(e) {
  const inputEl = document.querySelector('.input-checkbox');
  const starEl = document.querySelector('.star-icon');

  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  const id = e.target.id,
    item = e.target,
    index = favorites.indexOf(id);
  if (!id) return;

  console.log(e.target);
  if (e.target === inputEl || e.target === starEl) {
    // item is not in favourites
    if (index == -1) {
      favorites.push(id);
      item.classList.add('checked');
      await fetchFavouriteMoviesList(id);
      manageFavListModal();

      // item is already favorite
    } else {
      favorites.splice(index, 1);
      const list = refs.favouriteList;
      const arrayElms = Array.from(list.children);
      arrayElms.forEach(elem => elem.remove());
      favorites.forEach(id => fetchFavouriteMoviesList(id));
      item.classList.remove('checked');
    }
  }
  // store array in local storage
  localStorage.setItem('favorites', JSON.stringify(favorites));
}
