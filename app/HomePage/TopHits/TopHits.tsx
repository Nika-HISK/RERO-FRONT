'use client';

import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import SectionTitle from '../SectionTitle/SectionTitle';
import styles from './TopHits.module.scss';
import { SongsState, audioPlayerState } from '@/app/Atoms/states';
import MusicRow from '@/app/Components/MusicRow/MusicRow';
import { Song } from '@/app/Components/SmallPlayer/interfaces/song-props.interface';
import BaseApi from '@/app/api/BaseApi';

const TopHits = () => {
  const [currentSong, setCurrentSong] = useRecoilState(audioPlayerState);
  const [data, setData] = useState<Song[]>([]);
  const [, setSongs] = useRecoilState(SongsState);

  useEffect(() => {
    BaseApi.get('/music').then((response) => {
      setData(response.data);
    });
  }, []);

  const handlePlayClick = async (id: number) => {
    try {
      await BaseApi.post(`/listeners/${id}`);
      setSongs(data);
    } catch (error) {
      alert(error);
    }

    setCurrentSong((prevState) => ({
      ...prevState,
      currentSongId: id,
    }));
  };

  return (
    <div className={styles.wrapper}>
      <SectionTitle title="Top Hits" link="/tophits" />
      <div className={styles.container}>
        {data.slice(0, 8).map((music) => (
          <MusicRow
            key={music.id}
            id={music.id}
            albumName={music.album?.name}
            duration={music.duration}
            coverImage={music.coverImage}
            music={music.name}
            artistName={music.artist?.artistName || ''}
            musicAudio={music.musicAudio}
            isPlaying={currentSong.currentSongId === music.id}
            onClick={() => handlePlayClick(music.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TopHits;
