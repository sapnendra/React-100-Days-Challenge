import React, { useRef, useState } from "react";
import {
  Pause,
  Play,
  Plus,
  SoupIcon,
  StepBack,
  StepForward,
  Volume2,
  VolumeOff,
} from "lucide-react";
import WavesurferPlayer from "@wavesurfer/react";

const App = () => {
  const audio = useRef(null);
  const [url, setUrl] = useState("/background.mp3");
  const [songTitle, setSongTitle] = useState("Background music.mp3");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentDuration, setCurrentDuration] = useState(0);

  const onReady = (ws) => {
    audio.current = ws;
    setDuration(ws.getDuration());
    ws.on("audioprocess", (time) => {
      setCurrentDuration(time);
    });
  };

  const formatDuration = (second) => {
    const h = Math.floor(second / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((second % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(second % 60)
      .toString()
      .padStart(2, "0");

    return `${h}:${m}:${s}`;
  };

  const playPause = () => {
    if (audio.current) {
      const player = audio.current;
      player.playPause();
    }
  };

  const muteUnmute = () => {
    const player = audio.current;
    if (player) {
      const isMuted = player.getMuted();
      player.setMuted(!isMuted);
      setIsMute(!isMuted);
    }
  };

  const chooseSong = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "audio/*";
    input.click();
    input.onchange = () => {
      const file = input.files[0];
      setSongTitle(file.name);
      const selectedSong = URL.createObjectURL(file);
      setUrl(selectedSong);
    };
  };

  const seek = (time) => {
    const player = audio.current;
    if (player) {
      let currentTime = player.getCurrentTime() + time;
      const duration = player.getDuration();
      if (currentTime < 0) currentTime = 0;
      if (currentTime > duration) currentTime = 1;
      player.seekTo(currentTime / duration);
    }
  };

  return (
    <div className="bg-rose-50 h-screen items-center flex justify-center">
      <div className="w-4xl rounded-lg bg-linear-to-r from-rose-500 via-orange-500 to-rose-600">
        <div className="px-8 py-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-white capitalize">
            <marquee direction="left">{songTitle}</marquee>
          </h1>
          <label className="text-lg font-semibold text-white">
            {formatDuration(currentDuration)} / {formatDuration(duration)}
          </label>
        </div>
        <div className="bg-white py-2 border-2 border-rose-600">
          <WavesurferPlayer
            height={200}
            waveColor="black"
            url={url}
            onReady={onReady}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        </div>
        <div className="px-8 py-3 flex items-center justify-center gap-6">
          <button
            onClick={chooseSong}
            className="w-12 h-12 bg-white hover:scale-105 duration-200 active:scale-90 flex items-center justify-center rounded-full"
          >
            <Plus />
          </button>
          <button
            onClick={() => seek(-10)}
            className="w-12 h-12 bg-white hover:scale-105 duration-200 active:scale-90 flex items-center justify-center rounded-full"
          >
            <StepBack />
          </button>
          <button
            onClick={playPause}
            className="w-20 h-20 bg-white hover:scale-105 duration-200 active:scale-90 flex items-center justify-center rounded-full"
          >
            {!isPlaying ? <Play size={32} /> : <Pause size={32} />}
          </button>
          <button
            onClick={() => seek(10)}
            className="w-12 h-12 bg-white hover:scale-105 duration-200 active:scale-90 flex items-center justify-center rounded-full"
          >
            <StepForward />
          </button>
          <button
            onClick={muteUnmute}
            className="w-12 h-12 bg-white hover:scale-105 duration-200 active:scale-90 flex items-center justify-center rounded-full"
          >
            {!isMute ? <Volume2 /> : <VolumeOff />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
