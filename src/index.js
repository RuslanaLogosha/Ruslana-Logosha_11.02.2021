import getRefs from './js/get-refs';
import { fetchMovies, fetchMoviesById } from './js/apiService';
import moviesTpl from './templates/moviesTemplate.hbs';
import favouriteTpl from './templates/listItemTemplate.hbs';

const refs = getRefs();

function initStorageDelayed() {
  setTimeout(() => {
    var favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    console.log(favorites);
    favorites.forEach(id => {
      fetchFavouriteMoviesList(id);
      const liElem = document.getElementById(id);
      const divElem = liElem.firstElementChild;
      const imgElem = divElem.firstElementChild;
      const inputElem = imgElem.nextElementSibling;
      inputElem.classList.add('checked');
    });

    document
      .querySelector('.gallery-list')
      .addEventListener('click', function (e) {
        const id = e.target.id,
          item = e.target,
          index = favorites.indexOf(id);
        console.log(item);

        if (!id) return;

        // item is not favorite
        if (index == -1) {
          favorites.push(id);
          item.classList.add('checked');
          console.log(favorites);

          fetchFavouriteMoviesList(id);

          // item is already favorite
        } else {
          favorites.splice(index, 1);
          item.classList.remove('checked');
        }
        // store array in local storage
        localStorage.setItem('favorites', JSON.stringify(favorites));
      });
  }, 1000);
}

initStorageDelayed();

async function fetchMoviesGallery() {
  const data = await fetchMovies();
  const movies = appendMoviesGalleryMarkup(data);
  return movies;
}

function appendMoviesGalleryMarkup(data) {
  refs.filmsContainer.insertAdjacentHTML('beforeend', moviesTpl(data));
}

fetchMoviesGallery();

async function fetchFavouriteMoviesList(id) {
  const data = await fetchMoviesById(id);
  const movies = appendFavouriteListMarkup(data);
  return movies;
}

function appendFavouriteListMarkup(data) {
  refs.favouriteList.insertAdjacentHTML('beforeend', favouriteTpl(data));
}
