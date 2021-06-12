import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

import cardMarkup from '../templates/card.hbs';
import ImageApiService from './apiService';
import LoadMoreButton from './load-more-button';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallerySet: document.querySelector('.gallery'),
};

const loadMoreButton = new LoadMoreButton({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const imageApiService = new ImageApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreButton.refs.button.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  clearGallery();
  imageApiService.query = e.currentTarget.elements.query.value;

  if (imageApiService.query === '') {
    loadMoreButton.disable();
    return noResults();
  }

  loadMoreButton.show();
  imageApiService.resetPage();
  fetchCards();
}

function fetchCards() {
  loadMoreButton.disable();
  return imageApiService.fetchImage().then(cards => {
    renderMarkup(cards);

    scrollingPage();
    loadMoreButton.enable();

    if (cards.length === 0) {
      loadMoreButton.hide();
      noMatches();
    }
  });
}

function onLoadMore() {
  fetchCards();
}

function renderMarkup(hits) {
  refs.gallerySet.insertAdjacentHTML('beforeend', cardMarkup(hits));
}

function clearGallery() {
  refs.gallerySet.innerHTML = '';
}

function noResults() {
  error({
    text: 'Please enter word!',
    delay: 1000,
  });
}

function noMatches() {
  error({
    text: 'No matches found. Please try again.',
    delay: 1500,
  });
}

function scrollingPage() {
  try {
    setTimeout(() => {
        refs.gallerySet.scrollIntoView({
            block: 'end',
            behavior: 'smooth',
      });        
    }, 1000);
  } catch (error) {
    console.log(error);
  }
}