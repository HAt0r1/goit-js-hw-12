import axios from 'axios';

export async function getDataFromServer(url, value, page, pageItems) {
  const responce = await axios.get(url, {
    params: {
      key: '42558235-d544995829d65acb68be95adf',
      q: value,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: pageItems,
    },
  });
  return responce.data;
}
