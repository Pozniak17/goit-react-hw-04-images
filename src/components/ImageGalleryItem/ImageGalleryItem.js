import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image, openModal }) => {
  const { webformatURL, tags } = image;
  return (
    <GalleryItem>
      <GalleryItemImage src={webformatURL} alt={tags} onClick={openModal} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
  openModal: PropTypes.func.isRequired,
};
