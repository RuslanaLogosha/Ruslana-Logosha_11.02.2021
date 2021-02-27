import { onCrossPress } from './modalCrossIconClick';
import { onStarIconcheck } from './starIconClick';
import { fetchMoviesInfoForModal } from '../services/apiService';

import getRefs from './get-refs';
const refs = getRefs();

export function manageGalleryModal() {
  refs.filmsContainer.addEventListener('click', openModal);

  async function openModal(e) {
    const imgEls = document.querySelectorAll('.img');

    for (let img of imgEls) {
      if (e.target === img) {
        const id = e.target.id;

        await fetchMoviesInfoForModal(id);

        window.addEventListener('keydown', onEscPress);
        refs.backdropContainer.classList.add('is-open');

        manageStarInModalFav(id);
        onCrossPress();
      }
    }
  }
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscPress);
  refs.backdropContainer.classList.remove('is-open');
  refs.backdropContainer.innerHTML = '';
}

function onEscPress(event) {
  const isEscKey = event.code === 'Escape';
  if (isEscKey) {
    onCloseModal();
  }
}

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
}
