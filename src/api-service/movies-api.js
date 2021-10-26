const BASE_URL = 'https://api.themoviedb.org/3/';
const KEY = 'ec3ebd5ae8fa377543d5c9d8eab61a1b';

async function fetchWithErrorHandling(url = '') {
  const response = await fetch(url);
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
  return fetchWithErrorHandling(`${BASE_URL}movie/${moviesId}?api_key=${KEY}`);
}
export function fetchMoviesCredits(moviesId) {
  return fetchWithErrorHandling(
    ` ${BASE_URL}movie/${moviesId}/credits?api_key=${KEY}&language=en-US`,
  );
}
export function fetchMoviesReviews(moviesId) {
  return fetchWithErrorHandling(
    ` ${BASE_URL}movie/${moviesId}/reviews?api_key=${KEY}&language=en-US&page=1`,
  );
}
