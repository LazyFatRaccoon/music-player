import { useState, useRef, useEffect } from 'react';

import Song from 'components/Song';
import Player from 'components/Player';
import Library from 'components/Library';
import Nav from 'components/Nav';

//import { Notify } from 'notiflix/build/notiflix-notify-aio';
import music from 'songs-data';

export default function App() {
  const audioRef = useRef(null);

  const [songs, setSongs] = useState(music());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooped, setIsLooped] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [libraryIsOpen, setLibraryIsOpen] = useState(false);

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  const songEndHandler = () => {
    const index = songs.findIndex(song => song.id === currentSong.id);
    let randomIndex = index;
    let newIndex = index === songs.length - 1 ? 0 : index + 1;
    if (isLooped) {
      audioRef.current.play();
      return;
    }
    if (isRandom) {
      while (randomIndex === index) {
        randomIndex = Math.floor(Math.random() * songs.length);
      }
    }

    setCurrentSong(songs[newIndex]);
  };

  useEffect(() => {
    if (isPlaying) audioRef.current.play();
  }, [currentSong, isPlaying]);

  const timeUpdateHandler = () => {
    const animationPercentage = Math.round(
      (audioRef.current.currentTime / audioRef.current.duration) * 100
    );
    setSongInfo({
      ...songInfo,
      currentTime: audioRef.current.currentTime,
      duration: audioRef.current.duration,
      animationPercentage,
    });
  };

  return (
    <div className={`app ${libraryIsOpen ? 'library-active' : ''}`}>
      <Library
        libraryIsOpen={libraryIsOpen}
        isPlaying={isPlaying}
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
        currentSong={currentSong}
      />

      <Nav libraryIsOpen={libraryIsOpen} setLibraryIsOpen={setLibraryIsOpen} />
      <Song currentSong={currentSong} />

      <Player
        audioRef={audioRef}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        isLooped={isLooped}
        setIsLooped={setIsLooped}
        isRandom={isRandom}
        setIsRandom={setIsRandom}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        onEnded={songEndHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}
