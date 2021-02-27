import getRefs from './get-refs';
const refs = getRefs();

export function onCrossIconClick() {
  refs.favouriteList.addEventListener('click', onCrossClick);

  function onCrossClick(e) {
    const crossIcons = document.querySelectorAll('.cross-icon');

    for (let icon of crossIcons) {
      if (e.target === icon) {
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
  }
}
