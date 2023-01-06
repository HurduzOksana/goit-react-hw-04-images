import axios from 'axios';

// export const instance = axios.create({
//   baseUrl: 'https://pixabay.com/api',
//   params: {
//     key: '31697968-406cab2af0ae45e7393df2600',
//     _limit: 12,
//     // q: q,
//     image_type: 'photo',
//     orientation: 'horizontal',
//   },
// });

// export const getImages = async (_page = 1) => {
//   const { data } = await instance.get('/', {
//     params: {
//       _page,
//     },
//   });
//   return data;
// };

const apiGallery = async (query, page) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=31697968-406cab2af0ae45e7393df2600&image_type=photo&orientation=horizontal&per_page=12`
  );

  return data.hits;
};

export default apiGallery;
