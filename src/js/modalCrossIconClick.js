function CrossPress() {
  const backdrop = document.querySelector('.backdrop');
  const modalContainer = backdrop.firstElementChild;
  const spanIconStar = modalContainer.firstElementChild;
  const closeIcon = spanIconStar.nextElementSibling;
  closeIcon.addEventListener('click', onCloseModal);
  function onCloseModal(e) {
    const backdropContainer = document.querySelector('.backdrop');
    backdropContainer.classList.remove('is-open');
    backdropContainer.innerHTML = '';
  }
}

export function onCrossPress() {
  setTimeout(() => {
    CrossPress();
  }, 1000);
}
