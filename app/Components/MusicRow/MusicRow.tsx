import { useState } from 'react';
import SelectPlaylistPopUp from '../SelectPlaylistPopUp/SelectPlaylistPopUp';
import styles from './MusicRow.module.scss';
import MusicRowImage from './components/MusicRowImage/MusicRowImage';
import { MusicRowPropsInterface } from './interfaces/music-row-props.interface';
import BaseApi from '@/app/api/BaseApi';

const AlbumRow = (props: MusicRowPropsInterface) => {
  const [open, setOpen] = useState<boolean>(false);

  const handlePlayClick = async () => {
    try {
      await BaseApi.post(`/listeners/${props.id}`);
    } catch (error) {
      console.error('Error posting listener count:', error);
    }

    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <div className={styles.containerWrapper}>
      <div className={styles.wrapper} onClick={handlePlayClick}>
        <MusicRowImage
          cover={props.coverImage}
          music={props.music}
          artist={props.artistName}
        />
        <p>{props.albumName}</p>
        <div className={styles.container}>
          <p>{props.duration ? props.duration : 'N/A'}</p>
          <div className={styles.plus} onClick={() => setOpen(true)}></div>
        </div>
      </div>
      {open && <SelectPlaylistPopUp option={open} setOpen={setOpen} />}
    </div>
  );
};

export default AlbumRow;
