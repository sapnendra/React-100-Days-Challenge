import { Maximize, Pause, Play, Plus, Volume2, VolumeX } from "lucide-react";
import React, { useRef, useState } from "react";

const App = () => {
  const videoRef = useRef(null);
  const [src, setSrc] = useState("/sample-30s.mp4");
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState("00:51");
  const [currentTime, setCurrentTime] = useState("00:00");
  const [progress, setProgress] = useState(0);
  const container = useRef(null);

  const playPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };
  const addVideo = (e) => {
    const input = e.target;
    const file = input.files[0];
    const blobURL = URL.createObjectURL(file);
    setSrc(blobURL);
  };
  const onLoadedMetadata = (e) => {
    if (src !== "/sample-30s.mp4") {
      playPause();
      const video = e.currentTarget;
      const duration = (video.duration / 60).toFixed(2);
      setDuration(duration);
    }
  };
  const onTimeUpdate = (e) => {
    const video = e.currentTarget;
    const timer = (video.currentTime / 60).toFixed(2);
    setCurrentTime(timer);
    const progressTime = (video.currentTime / video.duration) * 100;
    setProgress(progressTime);
  };
  const muteControl = () => {
    const video = videoRef.current;
    if (video.muted) {
      video.muted = false;
      setMuted(false);
    } else {
      video.muted = true;
      setMuted(true);
    }
  };
  const toggleScreen = () => {
    const div = container.current;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      div.requestFullscreen();
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className="w-9/12 relative" ref={container}>
        <video
          ref={videoRef}
          src={src}
          className="w-full rounded-lg"
          onLoadedMetadata={onLoadedMetadata}
          onTimeUpdate={onTimeUpdate}
        ></video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 via-black/40% to transparent flex items-end justify-between">
          <div className="px-6 py-4 space-x-5 flex items-center flex-1">
            <button className="relative bg-orange-600 p-2 rounded-md text-white active:scale-80 duration-300">
              <Plus />
              <input
                type="file"
                accept="video/*"
                className="absolute w-full h-full top-0 left-0 opacity-0"
                onChange={addVideo}
              />
            </button>
            <button
              onClick={playPause}
              className="bg-orange-600 p-2 rounded-md text-white active:scale-80 duration-300"
            >
              {playing ? <Pause /> : <Play />}
            </button>

            <div className="w-full text-white flex gap-5">
              <label className="font-medium">
                {currentTime} / {duration}
              </label>
              <div className="flex-1 bg-white/40 p-0.5 rounded w-full">
                <div
                  className="bg-orange-600 h-full rounded"
                  style={{ width: progress + "%" }}
                ></div>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 space-x-5">
            <button
              onClick={muteControl}
              className="bg-orange-600 p-2 rounded-md text-white active:scale-80 duration-300"
            >
              {muted ? <VolumeX /> : <Volume2 />}
            </button>
            <button
              onClick={toggleScreen}
              className="bg-orange-600 p-2 rounded-md text-white active:scale-80 duration-300"
            >
              <Maximize />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
