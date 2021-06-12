const API_KEY = '21846259-00969bf223f24e256b3cce73a';
const BASE_URL = 'https://pixabay.com/api';

export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImage() {
    const responseUrl = await fetch(
      `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`,
    );

    const { hits: images } = await responseUrl.json();
    this.incrementPage();

    return images;
  }

  fetchImage() {
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

    return fetch(url).then(response =>
      response.json().then(({ hits }) => {
        this.incrementPage();
        return hits;
      }),
    );
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}