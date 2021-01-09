import axios from 'axios';

export default {
  page: 1,
  searchQuery: '',
  keyApi: '19777596-ee9495d04e68c58a9c6bc9d2a',

  fetchImages() {
    const baseURL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${this.keyApi}`;
    return axios.get(baseURL).then(({ data }) => data.hits);

    // return fetch(baseURL)
    //   .then(res => res.json())
    //   .then(({ hits }) => hits);
  },

  resetPage() {
    this.page = 1;
  },

  incrementPage() {
    this.page += 1;
  },

  get query() {
    return this.searchQuery;
  },

  set query(value) {
    this.searchQuery = value;
  },
};
