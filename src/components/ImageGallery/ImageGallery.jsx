import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';

export function ImageGallery({ imageGallery }) {
    const [showModal, setShowModal] = useState(false);
    const [largeImageURL, setLargeImageURL] = useState('');
    const [tags, setTags] = useState('');

    const openModal = ({ largeImageURL, tags }) => {
        setShowModal(true);
        setLargeImageURL(largeImageURL);
        setTags(tags);
    };

    const closeModal = () => {
        setShowModal(false);
        setLargeImageURL('');
        setTags('');
    };

    return (
        <>
            <ul className={s.ImageGallery}>
                {imageGallery.map(({ id, webformatURL, largeImageURL, tags }) => {
                    return (
                        <ImageGalleryItem
                            key={id}
                            webformatURL={webformatURL}
                            largeImageURL={largeImageURL}
                            tags={tags}
                            showModal={openModal}
                        />
                    );
                })}
            </ul>
            {showModal && (
                <Modal
                    largeImageURL={largeImageURL}
                    tags={tags}
                    closeModal={closeModal}
                />
            )}
        </>
    );
}

ImageGallery.propTypes = {
    imageGallery: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
        })
    ),
};