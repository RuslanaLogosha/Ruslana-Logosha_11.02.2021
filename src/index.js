import getRefs from './js/get-refs';
import { fetchMovies, fetchMoviesById } from './js/apiService';
import moviesTpl from './templates/moviesTemplate.hbs';
import favouriteTpl from './templates/listItemTemplate.hbs';

// import { parseWithoutProcessing } from 'handlebars';

const refs = getRefs();

function initStorageDelayed() {
  setTimeout(() => {
    var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    // add class 'fav' to each favorite
    favorites.forEach(function (favorite) {
      document.getElementById(favorite).className = 'checked';
    });
    // register click event listener
    document
      .querySelector('.gallery-list')
      .addEventListener('change', function (e) {
        var id = e.target.id,
          item = e.target,
          index = favorites.indexOf(id);
        // return if target doesn't have an id (shouldn't happen)
        if (!id) return;
        // item is not favorite
        if (index == -1) {
          favorites.push(id);
          item.className = 'checked';
          fetchFavouriteMoviesList(id);

          // item is already favorite
        } else {
          favorites.splice(index, 1);
          item.className = '';
        }
        // store array in local storage
        localStorage.setItem('favorites', JSON.stringify(favorites));
      });
    // const favourites = JSON.parse(localStorage.getItem('favourites')) || [];

    // document
    //   .querySelector('.gallery-list')
    //   .addEventListener('change', function (e) {
    //     const id = e.target.id,
    //       item = e.target,
    //       index = favourites.indexOf(id);
    //     const checked = item.checked;
    //     if (checked) {
    //       favourites.push(id);
    //       fetchFavouriteMoviesList(id);
    //     }
    //     if (!checked) {
    //       favourites.splice(index, 1);
    //     }

    //     localStorage.setItem('favourites', JSON.stringify(favourites));
    //     console.log(favourites);
    //   });
  }, 1000);
}

// const favouritesList = JSON.parse(localStorage.getItem('favourites'));
// if (favouritesList) {
// }

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
