import axios from 'axios';

const fetchImages = async (whatToSearch, a, b) => {
  const PIXA_KEY = '28421542-cf6e39e982023e61859492efc';
  const URL = `https://pixabay.com/api/?key=${PIXA_KEY}`;

  return axios.get(
    `${URL}&q=${whatToSearch}&image_type=photo&safesearch=false&orientation=horizontal&per_page=${a}&page=${b}`
  );
};

export default fetchImages;