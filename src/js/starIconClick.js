import getRefs from './get-refs';
import { fetchFavouriteMoviesList } from '../services/apiService';
import { manageFavListModal } from './onFavListModal';

const refs = getRefs();

export async function onStarIconcheck(e) {
  const inputEl = document.querySelectorAll('.input-checkbox');

  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  const id = e.target.id,
    item = e.target,
    index = favorites.indexOf(id);
  if (!id) return;

  console.log(e.target);

  for (let input of inputEl) {
    if (e.target === input) {
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
}
