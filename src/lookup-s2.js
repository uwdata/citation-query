import fetch from './fetch.js';

const API_URL = 'https://api.semanticscholar.org/graph/v1/';

export function urlS2(endpoint, params = {}, method = 'paper') {
  // Convert object of query parameters to a query string
  const queryParams = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  const query = queryParams ? `?${queryParams}` : '';

  // Combine API URL, method, and query string
  return `${API_URL}${method}/${endpoint}${query}`;
}

export function lookupS2(endpoint, params, method) {
  return fetch(urlS2(endpoint, params, method))
    .then(res => res.json());
}
