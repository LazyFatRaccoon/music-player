import React from 'react';
import style from './style.module.scss';

const LibrarySong = ({
  isPlaying,
  audioRef,
  song,
  songs,
  setCurrentSong,
  setSongs,
  currentSong,
}) => {
  const { cover, name, artist, id } = song;

  return (
    <div
      onClick={() => {
        setCurrentSong(song);

        // const newSongs = songs.map(song =>
        //   song.id === id
        //     ? { ...song, active: true }
        //     : { ...song, active: false }
        // );
        // await setSongs(newSongs);
        //console.log(newSongs);
      }}
      className={(currentSong.id === id ? style.active : '') + ' ' + style.song}
    >
      <img className={style.cover} src={cover} alt={name} />
      <div className={style.text}>
        <h3>{name}</h3>
        <h4>{artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
