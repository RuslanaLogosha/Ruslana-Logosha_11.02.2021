import { onCrossPress } from './modalCrossIconClick';
import { fetchMoviesById } from './apiService';
import modalTpl from '../templates/modalTemplate.hbs';
import { onStarIconcheck } from './starIconClick';

function onGalleryModal() {
  const modalTargetItems = document.querySelectorAll('.modal-target');
  const arrMovieItems = Array.from(modalTargetItems);

  arrMovieItems.forEach(el => el.addEventListener('click', openModal));

  async function openModal(e) {
    console.log(e.target);
    e.preventDefault();

    window.addEventListener('keydown', onEscPress);
    const backdropContainer = document.querySelector('.backdrop');
    backdropContainer.classList.add('is-open');

    const id = e.currentTarget.id;

    await fetchMoviesInfoForModal(id);
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

    function onEscPress(event) {
      const isEscKey = event.code === 'Escape';
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
      const backdrop = document.querySelector('.backdrop.is-open');
      const backdropChild = backdrop.querySelector('.modal-container');
      const starIcon = backdropChild.querySelector('.modal-icon');

      favorites.filter(favorite => {
        if (favorite === id) {
          starIcon.classList.add('checked');
        }
      });

      starIcon.addEventListener('click', onStarIconcheck);
      console.log(favorites);
    }
    manageStarInModalFav(id);
  }, 1000);
}

export function manageGalleryModal() {
  setTimeout(() => {
    onGalleryModal();
  }, 1000);
}
