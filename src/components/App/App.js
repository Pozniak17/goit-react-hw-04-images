import { useEffect, useState } from 'react';
import { Box } from 'utils/Box';
import { Button } from 'components/Button/Button';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import { getFetchImages } from 'services/api';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      return;
    }

    async function fetchData() {
      try {
        const fetchImages = await getFetchImages(searchQuery, page);
        const requiredPropertiesImages = fetchImages.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );

        setImages(images => [...images, ...requiredPropertiesImages]);
        setTotalPages(Math.ceil(fetchImages.total / 12));
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [searchQuery, page]);

  const handleSearchbarSubmit = event => {
    event.preventDefault();

    const inputValue = event.target.elements.search.value.trim();

    if (inputValue === '') {
      setSearchQuery('');
      setPage(1);
      setImages([]);
      return;
    }

    if (inputValue === searchQuery) {
      return;
    }

    setIsLoading(true);
    setSearchQuery(inputValue);
    setPage(1);
    setImages([]);

    event.target.reset();
  };

  const handleLoadMoreButton = () => {
    setPage(page => page + 1);
    setIsLoading(true);
  };

  const openModal = largeImageURL => {
    setShowModal(true);
    setModalImage(largeImageURL);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImage(null);
  };

  return (
    <>
      <Box display="grid" gridTemplateColumns="1fr" gridGap="16px" pb="24px">
        <Searchbar onSubmit={handleSearchbarSubmit} />
        {error && <p>Seems like something went wrong :( {error.message}</p>}
        {isLoading && <Loader />}
        {images.length > 0 && (
          <>
            <ImageGallery images={images} openModal={openModal} />
            <Box display="flex" justifyContent="center">
              <Button
                onFetchMore={handleLoadMoreButton}
                disabled={totalPages === page}
              />
            </Box>
          </>
        )}
      </Box>

      {showModal && (
        <Modal onClose={closeModal}>
          <img src={modalImage} alt={searchQuery} />
        </Modal>
      )}
    </>
  );
};
