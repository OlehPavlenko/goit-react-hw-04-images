import { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';




export const App = () => {
  const [searchterm, setSearchterm] = useState('');

  const getSearchterm = searchterm => {
    setSearchterm(searchterm);
  };

  return (
    <div>
      <Searchbar onSubmit={getSearchterm} />
      <ImageGallery getSearchterm={searchterm} />
    </div>
  );
};