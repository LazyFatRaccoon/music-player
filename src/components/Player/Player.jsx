import React from 'react';
import style from './style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from '@fortawesome/free-solid-svg-icons';

export default function Player({
  audioRef,
  currentSong,
  isPlaying,
  setIsPlaying,
  songInfo,
  setSongInfo,
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

  return (
    <div className={style.player}>
      <div className={style['time-control']}>
        <p>{minuteTimeFormat(songInfo.currentTime)}</p>
        <input
          type="range"
          min={0}
          max={songInfo.duration ? songInfo.duration : 0}
          step={1}
          value={songInfo.currentTime}
          onChange={handleRangeChange}
        />
        <p>{songInfo.duration ? minuteTimeFormat(songInfo.duration) : 0}</p>
      </div>
      <div className={style['play-control']}>
        <FontAwesomeIcon icon={faAngleLeft} />
        <FontAwesomeIcon
          onClick={playSongHandler}
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon icon={faAngleRight} />
      </div>
    </div>
  );
}
