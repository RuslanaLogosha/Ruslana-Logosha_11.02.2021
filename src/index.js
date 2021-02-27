import { fetchMoviesGallery } from './js/apiService';
import { initStorage } from './js/localStorage';
import { manageGalleryModal } from './js/onGalleryModal';
import { onCrossIconClick } from './js/crossIconClick';

const initApp = async () => {
  try {
    await fetchMoviesGallery();

    initStorage();

    onCrossIconClick();

    manageGalleryModal();
  } catch (error) {
    console.log(error);
  }
};

initApp();
