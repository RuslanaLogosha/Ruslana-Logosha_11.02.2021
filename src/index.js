import { fetchMoviesGallery } from './js/apiService';
import { initStorage } from './js/localStorage';
import { manageGalleryModal } from './js/onGalleryModal';
import { onCrossIconClick } from './js/crossIconClick';

fetchMoviesGallery();

initStorage();

onCrossIconClick();

manageGalleryModal();
