import React from 'react';

import { ReactComponent as RemoveIcon } from '../../assets/img/remove.svg';
import styles from './Photo.module.scss';

export const Photo = ({ url, thumbnailUrl, title, id, handleShowModal }) => (
  <div className={styles.photo}>
    <img
      className={styles.img}
      src={thumbnailUrl}
      alt={title}
      onClick={() => handleShowModal(id, url)}
    />
    <RemoveIcon
      className={styles.removeIcon}
      onClick={() => handleShowModal(id)}
    />
  </div>
);
