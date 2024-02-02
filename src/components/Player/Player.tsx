'use client';

import { MusicContext } from '@/context/MusicContext';
import Image from 'next/image';
import { useContext, useRef, useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import {
  FiPlayCircle,
  FiPauseCircle,
  FiSkipBack,
  FiSkipForward,
  FiFastForward,
  FiRewind,
  FiVolume,
  FiVolumeX,
  FiVolume2,
  FiVolume1,
} from 'react-icons/fi';
import { PiMicrophoneStage } from 'react-icons/pi';

export default function Player() {
  const sliderTrackRef = useRef<HTMLInputElement>(null);
  const musicContext = useContext(MusicContext);
  const [drag, setDrag] = useState<boolean>(false);
  if (!musicContext) {
    return;
  }
  const {
    currentTime,
    currentDuration,
    music,
    handlePlayPause,
    handleNext,
    handlePrevious,
    handleVolume,
    handleChangeTrackTimeline,
    isPlay,
  } = musicContext;

  const currentTimeLine = () => {
    const time = (musicContext.currentTime * 100) / musicContext.currentDuration;
    return time ? time : 0;
  };

  const clockConvert = (time: number) => {
    if (!time) {
      time = 0;
    }
    const left = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const right = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');

    return left + ':' + right;
  };

  const volumeIcon = (volume: number) => {
    if (volume >= 0.6) {
      return <FiVolume2 size={26} />;
    } else if (volume >= 0.15) {
      return <FiVolume1 size={26} />;
    } else if (volume >= 0.01) {
      return <FiVolume size={26} />;
    } else {
      return <FiVolumeX size={26} />;
    }
  };

  if (sliderTrackRef.current) {
    sliderTrackRef.current.oninput = () => {
      setDrag(true);
    };

    sliderTrackRef.current.onpointerup = () => {
      setDrag(false);
      handleChangeTrackTimeline(sliderTrackRef.current!.valueAsNumber);
    };

    if (!drag) {
      sliderTrackRef.current.valueAsNumber = currentTimeLine();
    }
  }

  return (
    <div className="flex-grow-1 min-h-24 flex h-24 items-center justify-center gap-10">
      <div className="flex flex-1 items-center rounded-lg border border-silver-600 bg-black-800 p-3">
        <div className="flex flex-1 items-center gap-3 ">
          {music.imageUrl == '' ? (
            <div className="h-16 w-16 rounded-lg bg-black-700"></div>
          ) : (
            <Image className="rounded" src={music.imageUrl!} width={64} height={64} alt="" />
          )}
          <div>
            <p className="animate-pulse text-xs">Tocando agora...</p>
            <p className="text-base">{music.name}</p>
            <p className="text-xs">{music.authorName}</p>
          </div>
        </div>
        <AiOutlineHeart size={26} color={'#FF4C29'} />
      </div>
      <div className="flex h-full flex-1 flex-col justify-between">
        <div className="grid grid-cols-3 items-center justify-between">
          <div className="flex items-center justify-start"></div>

          <div className="flex items-center justify-center gap-2">
            <FiRewind size={26} />
            <div onClick={() => handlePrevious()} className="cursor-pointer">
              <FiSkipBack size={26} />
            </div>

            <div onClick={() => handlePlayPause()} className="cursor-pointer">
              {isPlay ? <FiPauseCircle size={46} /> : <FiPlayCircle size={46} />}
            </div>
            <div onClick={() => handleNext()} className="cursor-pointer">
              <FiSkipForward size={26} />
            </div>
            <FiFastForward size={26} />
          </div>

          <div className="flex items-center justify-end gap-2">
            {volumeIcon(1)}
            <input
              type="range"
              defaultValue={50}
              onChange={(e) => handleVolume(e.currentTarget.valueAsNumber * 0.01)}
              step={0.1}
            />
          </div>
        </div>
        <div className="flex gap-4">
          {clockConvert(currentTime)}

          <input ref={sliderTrackRef} type="range" max={100} step={0.01} defaultValue={0} className="flex flex-1" />

          {clockConvert(currentDuration)}
        </div>
      </div>
      <div className="flex flex-1 items-center gap-2">
        <PiMicrophoneStage size={26} />
        <div className="ga-2 flex h-24 flex-grow flex-col overflow-y-scroll">
          {music.letter?.verses.map((res, index) => {
            return (
              <div className="flex flex-col gap-1" key={index}>
                {res.map((res, index) => {
                  return (
                    <span
                      /* onClick={() => goToTime(res.time)} */
                      className={`cursor-pointer text-lg transition-all duration-300 ${
                        res.time < currentTime! ? 'text-orange' : 'text-gray-500'
                      } hover:text-white`}
                      key={index}>
                      {res.word}{' '}
                    </span>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
