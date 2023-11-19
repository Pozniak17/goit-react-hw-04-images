import { ModalComponent } from 'components/Modal/Modal';
import { Item, Image } from './ImageGalleryItem.styled';
import { useState } from 'react';

export const ImageGalleryItem = ({ id, webformatURL, tags, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(prevState => !prevState);

  return (
    <Item key={id}>
      <Image src={webformatURL} alt={tags} onClick={toggleModal} />
      {showModal && (
        <ModalComponent
          isModalOpen={showModal}
          onClose={toggleModal}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      )}
    </Item>
  );
};
