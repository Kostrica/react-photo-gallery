import axios from 'axios';
import { BASE_URL } from './BaseURL';

export const getPhotos = (start, limit, albumId) => {
  return axios.get(`${BASE_URL}/photos`, {
    params: {
      _start: start,
      _limit: limit,
      albumId: albumId,
    },
  });
};

export const getAlbums = () => {
  return axios.get(`${BASE_URL}/albums`);
};
