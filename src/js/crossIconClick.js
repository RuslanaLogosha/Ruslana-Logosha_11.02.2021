import getRefs from './get-refs';
const refs = getRefs();

export function onCrossIconClick() {
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
    itemBox.remove(); //remove item from favoriteList in side bar

    const liElem = document.getElementById(id); // remove "checked" yellow start from gallery
    const divElem = liElem.firstElementChild;
    const imgElem = divElem.firstElementChild;
    const inputElem = imgElem.nextElementSibling;
    inputElem.classList.remove('checked');

    const favorites = JSON.parse(localStorage.getItem('favorites')) || []; // remove deleted movie from local storage
    const index = favorites.indexOf(id);

    favorites.splice(index, 1);

    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}
