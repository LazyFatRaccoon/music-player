import React from 'react';
import style from './style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
  faRepeat,
  faShuffle,
  faVolumeUp,
  faMinus,
  faPlus,
  faVolumeMute,
} from '@fortawesome/free-solid-svg-icons';

export default function Player({
  audioRef,
  currentSong,
  isPlaying,
  setIsPlaying,
  songInfo,
  setSongInfo,
  songs,
  setCurrentSong,
  setIsLooped,
  isLooped,
  setIsRandom,
  isRandom,
  setSongs,
}) {
  let buffered = 0;
  if (audioRef.current?.buffered?.length) {
    buffered = (
      (100 * audioRef.current.buffered.end(0)) /
      audioRef.current.duration
    ).toFixed(1);
  }

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const previousSongHandler = () => {
    const index = songs.findIndex(song => song.id === currentSong.id);
    let newIndex = index;
    if (isRandom) {
      while (newIndex === index) {
        newIndex = Math.floor(Math.random() * songs.length);
      }
      setCurrentSong(songs[newIndex]);
      return;
    }
    index === 0
      ? setCurrentSong(songs[songs.length - 1])
      : setCurrentSong(songs[index - 1]);
  };

  const nextSongHandler = () => {
    const index = songs.findIndex(song => song.id === currentSong.id);
    let newIndex = index;
    if (isRandom) {
      while (newIndex === index) {
        newIndex = Math.floor(Math.random() * songs.length);
      }
      setCurrentSong(songs[newIndex]);
      return;
    }
    index === songs.length - 1
      ? setCurrentSong(songs[0])
      : setCurrentSong(songs[index + 1]);
  };

  const handleRangeChange = e => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({
      ...songInfo,
      currentTime: e.target.value,
    });
  };

  const minuteTimeFormat = number => {
    return `${Math.floor(number / 60)}:${(
      '0' +
      (Math.floor(number) % 60)
    ).slice(-2)}`;
  };

  const changeVolumeHandler = (direction, volue) => {
    if (direction === '-' && audioRef.current.volume >= volue / 100)
      audioRef.current.volume -= volue / 100;
    if (direction === '+' && audioRef.current.volume < 1)
      audioRef.current.volume += volue / 100;
    console.log(audioRef.current.volume);
  };

  const muteVolumeHandler = () => {
    audioRef.current.muted = audioRef.current.muted ? false : true;
  };

  //styles
  const trackAnimation = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  const trackBuffered = {
    transform: `translateX(${buffered}%)`,
  };

  return (
    <div className={style.player}>
      <div className={style['time-control']}>
        <p>{minuteTimeFormat(songInfo.currentTime)}</p>
        <div
          className={style.track}
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
        >
          {' '}
          <input
            type="range"
            min={0}
            max={songInfo.duration ? songInfo.duration : 0}
            step={1}
            value={songInfo.currentTime}
            onChange={handleRangeChange}
          />
          <div style={trackAnimation} className={style['animate-track']}></div>
          <div style={trackBuffered} className={style['buffered-track']}></div>
        </div>
        <p>
          {songInfo.duration ? minuteTimeFormat(songInfo.duration) : '0:00'}
        </p>
      </div>
      <div className={style['play-control']}>
        <FontAwesomeIcon
          onClick={previousSongHandler}
          size="2x"
          icon={faAngleLeft}
        />

        <FontAwesomeIcon
          onClick={playSongHandler}
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />

        <FontAwesomeIcon
          onClick={nextSongHandler}
          size="2x"
          icon={faAngleRight}
        />
      </div>
      <div className={style['play-control']}>
        <FontAwesomeIcon
          onClick={() => changeVolumeHandler('-', 10)}
          size="2x"
          icon={faMinus}
        />
        <div>
          <FontAwesomeIcon
            onClick={muteVolumeHandler}
            size="2x"
            icon={audioRef?.current?.muted ? faVolumeMute : faVolumeUp}
          />
          <p style={{ textAlign: 'center' }}>
            {audioRef?.current?.volume
              ? (audioRef.current.volume * 100).toFixed(0) + '%'
              : ''}
          </p>
        </div>

        <FontAwesomeIcon
          onClick={() => changeVolumeHandler('+', 10)}
          size="2x"
          icon={faPlus}
        />
      </div>
      <div className={style['play-control']}>
        <FontAwesomeIcon
          onClick={() => setIsLooped(!isLooped)}
          size="2x"
          style={isLooped ? { color: 'rgb(227, 151, 230)' } : ''}
          icon={faRepeat}
        />

        <FontAwesomeIcon
          onClick={() => setIsRandom(!isRandom)}
          size="2x"
          style={isRandom ? { color: 'rgb(227, 151, 230)' } : ''}
          icon={faShuffle}
        />
      </div>
    </div>
  );
}
