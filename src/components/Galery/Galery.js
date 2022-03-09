import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { getPhotos } from '../../utils/utils';
import { AlbumFilter } from '../AlbumFilter/AlbumFilter';
import { Photo } from '../Photo/Photo';
import { Popup } from '../Popup/Popup';
import styles from './Galery.module.scss';

const limit = 48;

export const Galery = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [selectedAlbums, setSelectedAlbums] = useState([]);

  const scrollParentRef = useRef(null);
  const scrollRef = useRef(null);

  const selectedAlbumsIds = useMemo(() => {
    return selectedAlbums.map(({ id }) => id);
  }, [selectedAlbums]);

  const handleSelectedAlbum = useCallback((albums) => {
    scrollParentRef.current.scrollTo({top: 0, left: 0, behavior: "smooth"});

    setTimeout(() => {
      setHasMore(true);

      const albumsIds = albums.map(({ id }) => id);

      getPhotos(0, limit, albumsIds)
        .then(({ data }) => {
          setPhotos(data);
        });

      if (scrollRef) {
        scrollRef.current.pageLoaded = 0;
      }

      setSelectedAlbums(albums);
    }, 1000)
  }, [scrollParentRef, scrollRef]);

  useEffect(() => {
    getPhotos(0, limit, [])
      .then(({ data }) => {
        setPhotos(data);
      });
  }, []);

  const loadMore = (page) => {
    const startItem = page * limit;

    getPhotos(startItem, limit, selectedAlbumsIds)
      .then(({ data }) => {
        if (data.length) {
          setPhotos((prevPhotos) => [prevPhotos, data].flat());
        } else {
          setHasMore(false);
        }
      });
  };

  const removePhoto = () => {
    setPhotos(prevState => prevState.filter(({ id }) => id !== selectedPhoto?.id));
    setSelectedPhoto(null);
  };

  const handleShowModal = (id, url) => {
    setSelectedPhoto({id, url});
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className={styles.galeryContainer}>
      <AlbumFilter
        selectedAlbums={selectedAlbums}
        handleSelectedAlbum={handleSelectedAlbum}
      />
      <div
        className={styles.galery}
        ref={scrollParentRef}
      >
        <InfiniteScroll
          ref={scrollRef}
          pageStart={0}
          loadMore={loadMore}
          hasMore={!!photos.length && hasMore}
          loader={
            <div className={styles.loader} key={0}>
              Loading...
            </div>
          }
          useWindow={false}
          getScrollParent={() => scrollParentRef.current}
        >
          <ul className={styles.list}>
            {photos.map(({ id, url, thumbnailUrl, title }) => (
              <li key={id} className={styles.item}>
                <Photo
                  url={url}
                  thumbnailUrl={thumbnailUrl}
                  title={title}
                  id={id}
                  handleShowModal={handleShowModal}
                />
              </li>
            ))}
          </ul>
        </InfiniteScroll>
        <Popup
          isOpenModal={Boolean(selectedPhoto)}
          handleCloseModal={handleCloseModal}
          removePhoto={removePhoto}
          photo={selectedPhoto}
        />
      </div>
    </div>
  );
};
