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
  setSongs,
}) {
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
    index === 0
      ? setCurrentSong(songs[songs.length - 1])
      : setCurrentSong(songs[index - 1]);
  };

  const nextSongHandler = () => {
    const index = songs.findIndex(song => song.id === currentSong.id);
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

  const changeVolumeHandler = direction => {
    if (direction === '-' && audioRef.current.volume >= 0.1)
      audioRef.current.volume -= 0.1;
    if (direction === '+' && audioRef.current.volume < 1)
      audioRef.current.volume += 0.1;
  };

  const muteVolumeHandler = () => {
    audioRef.current.muted = audioRef.current.muted ? false : true;
  };

  //styles
  const trackAnimation = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
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
          onClick={() => changeVolumeHandler('-')}
          size="2x"
          icon={faMinus}
        />
        <FontAwesomeIcon
          onClick={muteVolumeHandler}
          size="2x"
          icon={audioRef?.current?.muted ? faVolumeMute : faVolumeUp}
        />

        <FontAwesomeIcon
          onClick={() => changeVolumeHandler('+')}
          size="2x"
          icon={faPlus}
        />
      </div>
      <div className={style['play-control']}>
        <FontAwesomeIcon onClick={playSongHandler} size="2x" icon={faRepeat} />

        <FontAwesomeIcon onClick={playSongHandler} size="2x" icon={faShuffle} />
      </div>
    </div>
  );
}
