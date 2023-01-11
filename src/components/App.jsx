import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import apiGallery from 'api/api';

export const App = () => {
  const [gallery, setGallery] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
    setLoading(true);
  }, [query, page]);

  const onChangeQuery = query => {
    setQuery(query);
    setPage(1);
    setGallery('');
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (page > 1)
      window.scrollBy({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
  }, [gallery, page]);

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
