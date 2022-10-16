import React from 'react';
import style from './style.module.scss';
import LibrarySong from 'components/LibrarySong';

const Library = ({ isPlaying, audioRef, setSongs, songs, setCurrentSong }) => {
  return (
    <div className={style.library}>
      <h2>Library</h2>
      <ul>
        {songs.map(song => {
          return (
            <li key={song.id}>
              <LibrarySong
                setSongs={setSongs}
                songs={songs}
                isPlaying={isPlaying}
                audioRef={audioRef}
                setCurrentSong={setCurrentSong}
                song={song}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Library;
