function fetchImages(request, page) {
  return fetch(
    `https://pixabay.com/api/?q=${request}&page=${page}&key=18616543-61f088c3928fc4bac834774e6&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`The request ${request} wasn't found`));
  });
}

const api = {
  fetchImages,
};

export default api;
