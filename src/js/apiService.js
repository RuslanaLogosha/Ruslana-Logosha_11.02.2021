// const url = 'http://my-json-server.typicode.com/moviedb-tech/movies/list';

// export async function fetchMovies() {
//   try {
//     const data = await fetch(url);
//     const results = await data.json();
//     return results;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function fetchMoviesById(id) {
//   try {
//     const data = await fetch(`${url}/${id}`);
//     const results = await data.json();
//     return results;
//   } catch (error) {
//     console.log(error);
//   }
// }
import moviesTpl from '../templates/moviesTemplate.hbs';
import favouriteTpl from '../templates/favListItemTemplate.hbs';
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

export async function fetchMoviesGallery() {
  const data = await fetchMovies();
  const movies = appendMoviesGalleryMarkup(data);
  return movies;
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

export async function fetchFavouriteMoviesList(id) {
  const data = await fetchMoviesById(id);
  const movies = appendFavouriteListMarkup(data);
  return movies;
}

function appendFavouriteListMarkup(data) {
  refs.favouriteList.insertAdjacentHTML('beforeend', favouriteTpl(data));
}
