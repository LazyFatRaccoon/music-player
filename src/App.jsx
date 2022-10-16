import { useState, useRef } from 'react';

import Song from 'components/Song';
import Player from 'components/Player';
import Library from 'components/Library';

//import { Notify } from 'notiflix/build/notiflix-notify-aio';
import music from 'songs-data';

export default function App() {
  const audioRef = useRef(null);

  const [songs, setSongs] = useState(music());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  const timeUpdateHandler = () => {
    setSongInfo({
      ...songInfo,
      currentTime: audioRef.current.currentTime,
      duration: audioRef.current.duration,
    });
  };

  return (
    <div>
      <div>
        <Library
          isPlaying={isPlaying}
          audioRef={audioRef}
          songs={songs}
          setCurrentSong={setCurrentSong}
          setSongs={setSongs}
        />
      </div>

      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}
