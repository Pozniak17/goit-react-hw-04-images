import { createPortal } from 'react-dom';
import { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ModalWindow, Overlay } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

export const Modal = ({ onClose, children }) => {
  const handleEscapeDown = useCallback(
    event => {
      if (event.code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleEscapeDown);

    return () => {
      window.removeEventListener('keydown', handleEscapeDown);
    };
  }, [handleEscapeDown]);

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow>{children}</ModalWindow>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = { onClose: PropTypes.func.isRequired };
