"use client";

import { useRef, useState, useEffect } from "react";

const AudioPlayerCircle = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  const centerX = 50;
  const centerY = 50;

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const updateProgress = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    if (duration > 0) {
      setProgress((current / duration) * 100);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, []);

  // Calculate marker position
  const angle = (progress / 100) * 2 * Math.PI - Math.PI / 2; // شروع از بالا (۱۲ ساعت)
  const markerX = centerX + radius * Math.cos(angle);
  const markerY = centerY + radius * Math.sin(angle);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-24 h-24">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
          {/* Background Circle */}
          <circle
            className="text-gray-300"
            stroke="currentColor"
            strokeWidth="2"
            fill="transparent"
            r={radius}
            cx={centerX}
            cy={centerY}
          />
          {/* Progress Circle */}
          <circle
            className="text-white"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            r={radius}
            cx={centerX}
            cy={centerY}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (progress / 100) * circumference}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.3s ease" }}
          />
          {/* Moving Marker */}
          {progress > 0 && (
            <circle
              cx={markerX}
              cy={markerY}
              r="4"
              fill="white"
              stroke="blue"
              strokeWidth="1"
            />
          )}
        </svg>
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center rounded-full shadow-md"
        >
          {isPlaying ? (
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} src="/sounds/daryapanahi.mp3" preload="metadata" />
    </div>
  );
};

export default AudioPlayerCircle;
