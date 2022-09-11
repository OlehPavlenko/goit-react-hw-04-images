import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ largeImageURL, tags, closeModal }) {
    useEffect(() => {
        const handleKeydown = event => {
            if (event.code === 'Escape') {
                closeModal();
            }
        };

        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    }, [closeModal]);

    const handleBackdropClick = e => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };
    return createPortal(
        <div className={s.Overlay} onClick={handleBackdropClick}>
            <div className={s.Modal}>
                <img src={largeImageURL} alt={tags} />
            </div>
        </div>,
        modalRoot
    );
}

Modal.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
};