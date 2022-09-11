// import axios from 'axios';

// const fetchImages = async (whatToSearch, a, b) => {
//   const PIXA_KEY = '28421542-cf6e39e982023e61859492efc';
//   const URL = `https://pixabay.com/api/?key=${PIXA_KEY}`;

//   return axios.get(
//     `${URL}&q=${whatToSearch}&image_type=photo&safesearch=false&orientation=horizontal&per_page=${a}&page=${b}`
//   );
// };

export function ImagesAPI(searchQuery, page = 1) {
  return fetch(
    `https://pixabay.com/api/?key=28421542-cf6e39e982023e61859492efc&q=${searchQuery}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error());
  });
}