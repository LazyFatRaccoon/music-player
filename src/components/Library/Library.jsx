import React from 'react';
import style from './style.module.scss';
import LibrarySong from 'components/LibrarySong';

const Library = ({
  libraryIsOpen,
  isPlaying,
  audioRef,
  setSongs,
  songs,
  setCurrentSong,
  currentSong,
}) => {
  return (
    <div className={style.library + ' ' + (libraryIsOpen ? style.open : '')}>
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
                currentSong={currentSong}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Library;
