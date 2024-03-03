export const list = document.querySelector('.img-list');

export function addElement(array) {
  const markup = array
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="image-item">
    <a href="${largeImageURL}">
                <img class="image" src="${webformatURL}" alt="${tags}"/>
                <div class="image-info">
                    <p class="info"><b>Likes</b> ${likes}</p>
                    <p class="info"><b>Views</b> ${views}</p>
                    <p class="info"><b>Comments</b> ${comments}</p>
                    <p class="info"><b>Downloads</b> ${downloads}</p>
                </div>
            </a>
    </li>`;
      }
    )
    .join('');
  return list.insertAdjacentHTML('beforeend', markup);
}
