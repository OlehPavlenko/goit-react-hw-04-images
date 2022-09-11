import { useEffect, useState } from 'react';
import s from './App.module.css';

import { SearchBar } from './Searchbar/Searchbar';
import { Loader } from './Loadmore/Loadmore';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { ImagesAPI } from './Api/GetImages';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [imageGallery, setImageGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(null);
  const [, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    setLoading(true);
    ImagesAPI(searchQuery, page)
      .then(data => {
        if (data.totalHits === 0) {
          setError(`images ${searchQuery} not found `);
          return;
        } else {
          setLoading(false);
          setImageGallery(gallery => {
            return [...gallery, ...data.hits];
          });
          setTotalHits(data.totalHits);
        }
      })
      .catch(error => {
        setError(error);
      });
  }, [searchQuery, page]);

  const onSubmit = e => {
    e.preventDefault();
    const value = e.target.elements.searchBar.value;
    setImageGallery([]);
    setSearchQuery(value);
    setPage(1);
    setTotalHits(null);
  };

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const totalPages = totalHits / 12;
  return (
    <div className={s.App}>
      <SearchBar onSubmit={onSubmit} />
      <ImageGallery imageGallery={imageGallery} />
      {loading && <Loader />}
      {totalPages > page && <Button onClick={onLoadMore} />}
    </div>
  );
}
