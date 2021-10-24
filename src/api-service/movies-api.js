const BASE_URL = 'https://api.themoviedb.org/3/';
const KEY = 'ec3ebd5ae8fa377543d5c9d8eab61a1b';
// const KEY = '47af3f3eb3cebf089eb55cbdac9542a5';

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchPopular() {
  return fetchWithErrorHandling(
    `${BASE_URL}trending/movie/day?api_key=${KEY}&page=1&include_adult=false`,
  );
}

export function fetchSearch(query) {
  return fetchWithErrorHandling(
    `${BASE_URL}search/movie?api_key=${KEY}&query=${query} `,
  );
}

export function fetchDetails(moviesId) {
  return fetchWithErrorHandling(
    `${BASE_URL}movie/${moviesId}?api_key=${KEY}&page=1&include_adult=false`,
  );
}
export function fetchMoviesCredits(moviesId) {
  return fetchWithErrorHandling(
    `${BASE_URL}credits/${moviesId}?api_key=${KEY}&page=1&include_adult=false`,
  );
}
export function fetchMoviesReviews(moviesId) {
  return fetchWithErrorHandling(
    `${BASE_URL}review/${moviesId}?api_key=${KEY}&page=1&include_adult=false `,
  );
}
