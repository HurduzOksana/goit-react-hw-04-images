import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
// import axios from 'axios';
import apiGallery from 'api/api';

// const API_KEY = '31697968-406cab2af0ae45e7393df2600';

// const fetchImages = ({ searchQuery = '', page = 1 } = {}) => {
//   return axios
//     .get(
//       `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
//     )
//     .then(response => response.data.gallery);
// };

export const App = () => {
  const [gallery, setGallery] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // useEffect(() => {
  //   setLoading(true);

  //   fetchImages({ searchQuery: query, page })
  //     .then(responseGallery => {
  //       setGallery(prevGallery => [...prevGallery, ...responseGallery]);
  //       setPage(prevPage => prevPage + 1);
  //     })
  //     .catch(error => setError(error.message))
  //     .finally(() => setLoading(false));
  // }, [page, query]);

  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchImages = async () => {
      try {
        const request = await apiGallery(query, page);

        setGallery(prevImages => [...prevImages, ...request]);
      } catch (error) {
        setError('Something went wrong. Try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const onChangeQuery = query => {
    setQuery(query);
    setPage(1);
    setGallery('');
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  // const fetchRequest = async () => {
  //   try {
  //     const { query, page } = this.state;
  //     const response = await axios.get(
  //       `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  //     );

  //     return response.data.hits;
  //   } catch (error) {
  //     setError(true);
  //   }
  // };

  // useEffect(() => {
  //   if (query !== '') {
  //     fetch(
  //       `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  //     )
  //       .then(response => response.json())
  //       .then(gallery => {
  //         const newGallery = gallery.hits;

  //         setGallery(gallery => {
  //           if (page === 1) {
  //             return newGallery;
  //           }
  //           return [...gallery, ...newGallery];
  //         });
  //       });
  //   }
  // }, [query, page]);

  return (
    <>
      <Searchbar onSubmit={onChangeQuery} />
      {error && <h1>Oops, something went wrong</h1>}
      {!!gallery.length && !error && (
        <>
          <ImageGallery gallery={gallery} />
          {!isLoading && <Button loadMore={loadMore} />}
        </>
      )}
      {isLoading && <Loader />}
    </>
  );
};
