import getRefs from './js/get-refs';
import fetchMovies from './js/apiService';
import moviesTpl from './templates/moviesTemplate.hbs';
import { parseWithoutProcessing } from 'handlebars';

const refs = getRefs();

async function fetchMoviesGallery() {
  const data = await fetchMovies();
  const movies = appendImagesMarkup(data);
  return movies;
}

function appendImagesMarkup(data) {
  refs.filmsContainer.insertAdjacentHTML('beforeend', moviesTpl(data));
}

fetchMoviesGallery();
