import React from 'react';
import style from './style.module.scss';

const Song = ({ currentSong }) => {
  const { cover, name, artist } = currentSong;

  return (
    <div className={style.song}>
      <img className={style.cover} src={cover} alt={name} />
      <h2>{name}</h2>
      <h3>{artist}</h3>
    </div>
  );
};

export default Song;
