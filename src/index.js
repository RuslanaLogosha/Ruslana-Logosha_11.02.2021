import getRefs from './js/get-refs';
import { fetchMovies, fetchMoviesById } from './js/apiService';
import moviesTpl from './templates/moviesTemplate.hbs';
import favouriteTpl from './templates/listItemTemplate.hbs';
import modalTpl from './templates/modalTemplate.hbs';

const refs = getRefs();

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
  // console.log(data);
  const movies = appendFavouriteListMarkup(data);
  return movies;
}

function appendFavouriteListMarkup(data) {
  refs.favouriteList.insertAdjacentHTML('beforeend', favouriteTpl(data));
}

function initStorageDelayed() {
  setTimeout(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

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
          const list = refs.favouriteList;
          const arrayElms = Array.from(list.children);
          arrayElms.forEach(elem => elem.remove());
          favorites.forEach(id => fetchFavouriteMoviesList(id));
          item.classList.remove('checked');
        }
        // store array in local storage
        localStorage.setItem('favorites', JSON.stringify(favorites));
      });
  }, 1000);
}

initStorageDelayed();

function manageCrossIconClick() {
  refs.favouriteList.addEventListener('click', onCrossClick);

  function onCrossClick(e) {
    const item = e.target;
    const id = e.target.id;

    const itemBox = item.parentNode;
    itemBox.remove();

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const index = favorites.indexOf(id);
    favorites.splice(index, 1);

    console.log(favorites);
    localStorage.setItem('favorites', JSON.stringify(favorites));

    const arrayGalleryItems = Array.from(refs.filmsContainer.children);
    console.log(arrayGalleryItems);
    arrayGalleryItems.forEach(elem =>
      elem.id === id ? elem.classList.add('cross-checked') : console.log('ok'),
    );

    const deletedFromFavListMovie = document.querySelector('.cross-checked');
    const divElem = deletedFromFavListMovie.firstElementChild;
    const imgElem = divElem.firstElementChild;
    const inputElem = imgElem.nextElementSibling;
    inputElem.classList.remove('checked');
  }
}

manageCrossIconClick();

function manageModal() {
  const movieItems = document.querySelectorAll('.modal-target');
  const modalContainer = document.querySelector('.modal-container');
  const arrMovieItems = Array.from(movieItems);
  arrMovieItems.forEach(el => el.addEventListener('click', openModal));

  function openModal(e) {
    e.preventDefault();
    window.addEventListener('keydown', onEscPress);
    modalContainer.classList.add('is-open');

    const id = e.currentTarget.id;

    fetchMoviesInfoForModal(id);
    async function fetchMoviesInfoForModal(id) {
      const data = await fetchMoviesById(id);
      console.log(data);
      const movies = appendModalMarkup(data);
      return movies;
    }

    function appendModalMarkup(data) {
      modalContainer.insertAdjacentHTML('beforeEnd', modalTpl(data));
    }

    function onCloseModal(event) {
      window.removeEventListener('keydown', onEscPress);
      modalContainer.classList.remove('is-open');
      modalContainer.innerHTML = '';
    }

    function onEscPress(event) {
      const isEscKey = event.code === 'Escape';
      if (isEscKey) {
        onCloseModal();
      }
    }
  }
}

function delay() {
  setTimeout(() => {
    manageModal();
  }, 1000);
}

delay();
