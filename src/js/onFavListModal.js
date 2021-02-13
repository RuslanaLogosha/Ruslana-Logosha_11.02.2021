import { fetchMoviesById } from './apiService';
import modalTpl from '../templates/modalTemplate.hbs';
import { onStarIconcheck } from './starIconClick';
import { onCrossPress } from './modalCrossIconClick';

function onFavListModal() {
  const modalFavItem = document.querySelector('.fav-list-name');
  if (modalFavItem) {
    modalFavItem.addEventListener('click', openModal);
  }

  function openModal(e) {
    e.preventDefault();
    console.log('click to open modal');

    window.addEventListener('keydown', onEscPress);
    const backdropContainer = document.querySelector('.backdrop');
    backdropContainer.classList.add('is-open');

    const id = e.target.id;

    fetchMoviesInfoForModal(id);
    delayModal(id);
    onCrossPress();

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

export function manageFavListModal() {
  setTimeout(() => {
    onFavListModal();
  }, 1000);
}
