import getRefs from './get-refs';
const refs = getRefs();

function manageCrossIconClick() {
  refs.favouriteList.addEventListener('click', onCrossClick);

  function onCrossClick(e) {
    const nameField = document.querySelector('.fav-list-name');
    const liField = document.querySelector('.fav-list-item');
    const listField = document.querySelector('.fav-list');

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
    arrayGalleryItems.forEach(elem => {
      if (elem.id === id) {
        elem.classList.add('cross-checked');
      }
    });

    const deletedFromFavListMovie = document.querySelector('.cross-checked');
    const divElem = deletedFromFavListMovie.firstElementChild;
    const imgElem = divElem.firstElementChild;
    const inputElem = imgElem.nextElementSibling;
    inputElem.classList.remove('checked');
  }
}

export function onCrossIconClick() {
  setTimeout(() => {
    manageCrossIconClick();
  }, 1000);
}
