'use client';

import React, { useEffect, useState } from 'react';
import BackgroundAlbumCard from '../BackgroundAlbumCard/BackgroundAlbumCard';
import { BackgroundAlbumCardPropsInterface } from '../BackgroundAlbumCard/interfaces/background-album-card-props.interface';
import styles from './TopAlbumLibrary.module.scss';
import BaseApi from '@/app/api/BaseApi';

const TopAlbumLibrary = () => {
  const [albumData, setAlbumData] = useState<
    BackgroundAlbumCardPropsInterface[]
  >([]);

  useEffect(() => {
    BaseApi.get(`/album`).then((response) => {
      setAlbumData(response.data);
    });
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.wrap}>
          {albumData.map((album, index) => (
            <BackgroundAlbumCard
              key={index}
              name={album.name}
              artistName={album.artist.artistName}
              releaseDate={album.releaseDate}
              songCount={album.songCount}
              backgroundImage={album.backgroundImage}
              id={album.id} 
              artist={album.artist}
              />
          ))}
        </div>
      </div>
    </>
  );
};

export default TopAlbumLibrary;
