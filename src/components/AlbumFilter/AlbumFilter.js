import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import { getAlbums } from '../../utils/utils';
import styles from './AlbumFilter.module.scss';

export const AlbumFilter = ({ selectedAlbums, handleSelectedAlbum }) => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    getAlbums()
      .then(({ data }) => {
        setAlbums(data);
      });
  }, []);

  return (
    <div className={styles.albumFilter}>
      <Select
        getOptionValue={(option) => option.id}
        getOptionLabel={(option) => option.title}
        defaultValue={selectedAlbums}
        onChange={handleSelectedAlbum}
        options={albums}
        placeholder="Select albums..."
        isMulti={true}
      />
    </div>
  );
};
