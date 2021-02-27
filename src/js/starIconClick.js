import getRefs from './get-refs';
import { fetchFavouriteMoviesList } from './apiService';
import { manageFavListModal } from './onFavListModal';

const refs = getRefs();

export async function onStarIconcheck(e) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // console.log('in starIconClick' + ' ' + favorites.length);

  const id = e.target.id,
    item = e.target,
    index = favorites.indexOf(id);

  if (!id) return;

  // item is not favorite
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
  // store array in local storage
  localStorage.setItem('favorites', JSON.stringify(favorites));
}
