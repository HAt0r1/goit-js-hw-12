export function getDataFromServer(endpoint, value) {
  const urlParams = new URLSearchParams({
    key: '42558235-d544995829d65acb68be95adf',
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  return fetch(`${endpoint}?${urlParams}`).then(responce => {
    if (!responce.ok) {
      throw new Error(responce.status);
    }
    return responce.json();
  });
}
