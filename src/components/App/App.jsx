import { Toaster } from 'react-hot-toast';
import { Seachbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { Button } from './App.styled';
import { articlesWithQuery } from 'components/services/Api';
import { useState, useEffect } from 'react';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getPhotos = async () => {
      setIsLoading(true);

      try {
        const { hits, totalHits } = await articlesWithQuery(query, page);

        if (hits.length === 0) {
          return alert('We dont find');
        }

        setImages(prevImages => [...prevImages, ...hits]);
        setTotal(totalHits);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (page !== 1 || query !== '') {
      getPhotos();
    }
  }, [page, query]);

  const handleFormSubmit = newQuery => {
    if (query !== newQuery) {
      setQuery(newQuery);
      setImages([]);
      setPage(1);
    }
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const allPage = total / images.length;

  return (
    <>
      {error && <h1>Whoops, something went wrong</h1>}
      <Seachbar onSubmit={handleFormSubmit} />
      {isLoading && <Loader />}
      {images.length > 0 && <ImageGallery data={images} />}

      {allPage > 1 && !isLoading && images.length > 0 && (
        <Button onClick={handleLoadMore}>Load more</Button>
      )}
      <Toaster position="top-center" />
    </>
  );
};
