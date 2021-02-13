import { fetchMoviesGallery } from './js/apiService';
import { initStorage } from './js/localStorage';
import { manageGalleryModal } from './js/onGalleryModal';

fetchMoviesGallery();

initStorage();

manageGalleryModal();
