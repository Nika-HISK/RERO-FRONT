/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from './RowAlbumSection.module.scss';
import { RowAlbumSectionPropsInterface } from './interfaces/row-album-section-props.interface';
import { MusicInterface } from '@/app/(authorized)/tophits/interfaces/music-props.interface';
import { audioPlayerState } from '@/app/Atoms/states';
import MusicRow from '@/app/Components/MusicRow/MusicRow';
import BaseApi from '@/app/api/BaseApi';

const RowAlbumSection = (props: RowAlbumSectionPropsInterface) => {
  const [currentSong, setCurrentSong] = useRecoilState(audioPlayerState);
  const [, setData] = useState<MusicInterface[]>([]);

  useEffect(() => {
    BaseApi.get('/music').then((response) => {
      setData(response.data);
    });
  }, []);

  const handlePlayClick = (id: number) => {
    setCurrentSong((prevState) => ({
      ...prevState,
      currentSongId: id,
    }));
  };

  return (
    <div className={styles.topMusicContainer}>
      <div className={styles.topMusicWrapper}>
        {props.albums.map((album) => (
          <MusicRow
            key={album.id}
            id={album.id}
            duration={album.duration}
            albumName={album.album?.name!}
            coverImage={album.coverImage}
            music={album.name}
            artistName={album.artist?.artistName!}
            musicAudio={album.musicAudio!}
            isPlaying={currentSong.currentSongId === album.id}
            onClick={() => handlePlayClick(album.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default RowAlbumSection;
