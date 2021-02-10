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
  const movies = appendFavouriteListMarkup(data);
  return movies;
}

function appendFavouriteListMarkup(data) {
  refs.favouriteList.insertAdjacentHTML('beforeend', favouriteTpl(data));
}

function initStorageDelayed() {
  setTimeout(() => {
    delay2();

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

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
      .addEventListener('click', onStarIconcheckOnGallery);
    // onStarIconcheck(e);
  }, 1000);
}

initStorageDelayed();

function manageCrossIconClick() {
  refs.favouriteList.addEventListener('click', onCrossClick);

  function onCrossClick(e) {
    const nameField = document.querySelector('.fav-list-name');
    const liField = document.querySelector('.fav-list-item');
    const listField = document.querySelector('.fav-list');
    const modalFavItem = document.querySelector('.modal-fav');
    // modalFavItem.remove();

    console.log(e.target);
    if (
      e.target === nameField ||
      e.target === liField ||
      e.target === listField
    ) {
      return;
    }

    const item = e.target;
    const id = e.target.id;

    const itemBox = item.parentNode;
    itemBox.remove();

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const index = favorites.indexOf(id);

    favorites.splice(index, 1);

    localStorage.setItem('favorites', JSON.stringify(favorites));

    const arrayGalleryItems = Array.from(refs.filmsContainer.children);
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
function delayCrossIconClick() {
  setTimeout(() => {
    manageCrossIconClick();
  }, 1000);
}

delayCrossIconClick();

function manageModal() {
  const modalTargetItems = document.querySelectorAll('.modal-target');
  const arrMovieItems = Array.from(modalTargetItems);
  arrMovieItems.forEach(el => el.addEventListener('click', openModal));

  function openModal(e) {
    e.preventDefault();
    console.log('click to open modal');
    window.addEventListener('keydown', onEscPress);
    const backdropContainer = document.querySelector('.backdrop');
    backdropContainer.classList.add('is-open');

    const id = e.currentTarget.id;
    console.log(id);

    fetchMoviesInfoForModal(id);
    delayModal(id);

    async function fetchMoviesInfoForModal(id) {
      const data = await fetchMoviesById(id);
      const movies = appendModalMarkup(data);
      return movies;
    }

    function appendModalMarkup(data) {
      backdropContainer.insertAdjacentHTML('beforeEnd', modalTpl(data));
    }

    function onCloseModal(e) {
      window.removeEventListener('keydown', onEscPress);
      backdropContainer.classList.remove('is-open');
      backdropContainer.innerHTML = '';
    }

    function onEscPress(event) {
      const isEscKey = event.code === 'Escape';
      if (isEscKey) {
        onCloseModal();
      }
    }

    function delayModal(id) {
      setTimeout(() => {
        function manageStarInModalFav(id) {
          const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

          favorites.filter(favorite => {
            if (favorite === id) {
              const backdrop = document.querySelector('.backdrop.is-open');
              const backdropChild = backdrop.querySelector('.modal-container');
              const starIcon = backdropChild.querySelector('.modal-icon');
              //starIcon.addEventListener('click', onStarIconcheckOnGallery);
              // starIcon.classList.add('checked');
            }
          });
        }
        manageStarInModalFav(id);
      }, 1000);
    }
  }
}

function delay() {
  setTimeout(() => {
    manageModal();
  }, 1000);
}

delay();

function manageModal2() {
  const modalFavItem = document.querySelector('.fav-list-name');
  if (modalFavItem) {
    modalFavItem.addEventListener('click', openModal);
  }

  function openModal(e) {
    e.preventDefault();
    console.log('click to open modal');
    console.log(e.target);
    window.addEventListener('keydown', onEscPress);
    const backdropContainer = document.querySelector('.backdrop');
    backdropContainer.classList.add('is-open');

    const id = e.target.id;

    fetchMoviesInfoForModal(id);
    delayModal(id);

    async function fetchMoviesInfoForModal(id) {
      const data = await fetchMoviesById(id);
      const movies = appendModalMarkup(data);
      return movies;
    }

    function appendModalMarkup(data) {
      backdropContainer.insertAdjacentHTML('beforeEnd', modalTpl(data));
    }

    function onCloseModal(e) {
      window.removeEventListener('keydown', onEscPress);
      backdropContainer.classList.remove('is-open');
      backdropContainer.innerHTML = '';
    }

    function onEscPress(e) {
      const isEscKey = e.code === 'Escape';
      if (isEscKey) {
        onCloseModal();
      }
    }

    function delayModal(id) {
      setTimeout(() => {
        function manageStarInModalFav(id) {
          const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

          favorites.filter(favorite => {
            if (favorite === id) {
              const backdrop = document.querySelector('.backdrop.is-open');
              const backdropChild = backdrop.querySelector('.modal-container');
              const starIcon = backdropChild.querySelector('.modal-icon');
              starIcon.classList.add('checked');
              starIcon.addEventListener('click', onStarIconcheck);
            }
          });
        }
        manageStarInModalFav(id);
      }, 1000);
    }
  }
}

function delay2() {
  setTimeout(() => {
    manageModal2();
  }, 1000);
}

delay2();

function onStarIconcheck(e) {
  console.log('click');
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  const id = e.target.id,
    item = e.target,
    index = favorites.indexOf(id);

  console.log('onStarIconcheck');
  if (!id) return;

  // item is not favorite
  if (index == -1) {
    favorites.push(id);
    console.log('onStarIconcheck');

    item.classList.add('checked');
    fetchFavouriteMoviesList(id);
    delay2();

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

function onStarIconcheckOnGallery(e) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  const id = e.target.id,
    item = e.target,
    index = favorites.indexOf(id);
  console.log(e.target.id);

  console.log('onStarIconcheck1');
  if (!id) return;

  // item is not favorite
  if (index == -1) {
    favorites.push(id);
    item.classList.add('checked');
    fetchFavouriteMoviesList(id);
    delay2();

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
