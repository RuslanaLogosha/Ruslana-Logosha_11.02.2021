import moviesTpl from '../templates/moviesTemplate.hbs';
import favouriteTpl from '../templates/favListItemTemplate.hbs';
import modalTpl from '../templates/modalTemplate.hbs';
import getRefs from './get-refs';
const refs = getRefs();

const BASE_URL = `https://api.themoviedb.org/3`;
const KEY = `d91911ebb88751cf9e5c4b8fdf4412c9`;

export async function fetchMovies() {
  const url = `${BASE_URL}/movie/popular?api_key=${KEY}&language=en-US&page=1`;

  try {
    const data = await fetch(url);
    const { results } = await data.json();
    return results;
  } catch (error) {
    console.log(error);
  }
}

export function fetchMoviesGallery() {
  // fetch movies for gallery
  fetchMovies().then(appendMoviesGalleryMarkup);
}

function appendMoviesGalleryMarkup(data) {
  refs.filmsContainer.insertAdjacentHTML('beforeend', moviesTpl(data));
}

export async function fetchMoviesById(id) {
  const url = `${BASE_URL}/movie/${id}?api_key=${KEY}&language=en-US`;

  try {
    const data = await fetch(url);
    const results = await data.json();
    return results;
  } catch (error) {
    console.log(error);
  }
}

export function fetchFavouriteMoviesList(id) {
  // fetch movies for favorite list
  return fetchMoviesById(id).then(appendFavouriteListMarkup);
}

function appendFavouriteListMarkup(data) {
  refs.favouriteList.insertAdjacentHTML('beforeend', favouriteTpl(data));
}

export function fetchMoviesInfoForModal(id) {
  // fetch movies for Modal
  return fetchMoviesById(id).then(appendModalMarkup);
}

function appendModalMarkup(data) {
  refs.backdropContainer.insertAdjacentHTML('beforeEnd', modalTpl(data));
}
