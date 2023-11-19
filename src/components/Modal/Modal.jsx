import { Overlay, ModalWindow } from './Modal.styled';
import Modal from 'react-modal';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const ModalComponent = ({
  isModalOpen,
  onClose,
  largeImageURL,
  tags,
}) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Gallary modal"
    >
      <ModalWindow>
        <img src={largeImageURL} alt={tags} />
      </ModalWindow>
    </Modal>
  );
};
