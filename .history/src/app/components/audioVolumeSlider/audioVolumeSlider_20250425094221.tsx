import { useRef, useState, useEffect } from "react";

const AudioVolumeSlider = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const percentage = (video.currentTime / video.duration) * 100;
    setProgress(percentage);
  };

  // محاسبه طول مسیر دایره
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <video
        ref={videoRef}
        src="/video.mp4"
        onTimeUpdate={handleTimeUpdate}
        className="w-[300px] mb-4"
      />

      <div className="relative w-[120px] h-[120px]">
        <svg width="120" height="120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#e5e5e5"
            strokeWidth="6"
            fill="none"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#3b82f6"
            strokeWidth="6"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.3s linear" }}
          />
        </svg>
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center text-3xl text-blue-600"
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>
      </div>
    </div>
  );
};

export default AudioVolumeSlider;
