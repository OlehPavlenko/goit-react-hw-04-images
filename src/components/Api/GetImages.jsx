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