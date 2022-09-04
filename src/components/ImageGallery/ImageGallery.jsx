import ImageItem from '../ImageGalleryItem/ImageGalleryItem';
import { useState, useEffect } from 'react';
import { LoaderBtn } from '../Button/Button';
import Loading from '../Loadmore/Loadmore';
import { Modal } from '../Modal/Modal';
import fetchImg from '../Api/GetImages';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// class ImageGallery extends Component {
export const ImageGallery = ({ getSearchterm }) => {
    const [page, setPage] = useState(1);
    const [perPage] = useState(20);
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const [btn, setBtn] = useState(false);
    const [modal, setModal] = useState(false);
    const [status, setStatus] = useState('idle');
    // 'idle' 'pending' 'resolve' 'rejected'
    const [selectedImg, setSelectedImg] = useState('');

    const onClickLoadMore = number => {
        setPage(prevState => prevState + number);
    };

    const toggleBtn = () => {
        setBtn(!btn);
    };

    const openModal = largeImageURL => {
        setSelectedImg(largeImageURL);
        setModal(true);
    };

    const closeModalByESC = () => {
        setSelectedImg('');
        setModal(false);
    };

    const closeModal = e => {
        if (e.target.classList.value === 'Overlay') {
            setSelectedImg('');
            setModal(false);
        }
    };

    useEffect(() => {
        if (getSearchterm !== '') {
            const getResults = async () => {
                setStatus('pending');
                setError(null);
                setBtn(false);
                setPage(1);
                await fetchImg(getSearchterm, perPage, page)
                    .then(r => {
                        r.data.totalHits > 0
                            ? Notify.success(
                                `Horrey! Found ${r.data.totalHits} images of "${getSearchterm}" reqest!`
                            )
                            : Notify.failure(
                                `Ooops! We did not dound any images under receipt ${getSearchterm}`
                            );

                        setStatus('resolve');
                        setImages(r.data.hits);
                        if (r.data.totalHits > r.data.hits.length) {
                            toggleBtn();
                        }
                    })
                    .catch(error => {
                        setError(error);
                        setStatus('rejected');
                    });
            };
            getResults();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getSearchterm]);

    useEffect(() => {
        if (page !== 1) {
            const getResults = async () => {
                await fetchImg(getSearchterm, perPage, page)
                    .then(r => {
                        setImages([...images, ...r.data.hits]);

                        Notify.success(
                            `Succesfyly loaded ${r.data.hits.length} images.
        Total loaded ${images.length + r.data.hits.length} of ${r.data.totalHits
                            } images`
                        );
                        images.length + perPage > r.data.totalHits && toggleBtn();
                    })
                    .catch(error => {
                        setError(error);
                        setStatus('rejected');
                    });
            };

            getResults();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    if (status === 'idle') {
        return;
    }

    if (status === 'pending') {
        return <Loading />;
    }

    if (status === 'rejected') {
        return <p>Виникла помилка {error.message}</p>;
    }

    if (status === 'resolve' && images.length > 0) {
        return (
            <div
                className="gallery-wrapper"
                onChange={e => {
                    console.log(e);
                }}
            >
                <ul className="ImageGallery">
                    <ImageItem images={images} openModal={openModal} />
                </ul>

                {btn && <LoaderBtn addPage={onClickLoadMore} />}

                {modal && (
                    <Modal
                        bigImage={selectedImg}
                        onClose={closeModalByESC}
                        closeModal={closeModal}
                    />
                )}
            </div>
        );
    }
};