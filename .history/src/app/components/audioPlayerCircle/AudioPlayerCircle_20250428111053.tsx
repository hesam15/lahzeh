"use client";

import { useRef, useState, useEffect } from "react";

const AudioPlayerCircle = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

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
    const dur = audioRef.current.duration;
    setProgress((current / dur) * 100);
    setDuration(dur);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", () => {
      if (audio.duration) setDuration(audio.duration);
    });
    audio.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", () => {});
      audio.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, []);

  // زاویه مارکر (شروع از بالای دایره یعنی -90 درجه یا -Math.PI/2)
  const angle = (progress / 100) * 2 * Math.PI - Math.PI / 2;
  const markerX = centerX + radius * Math.cos(angle);
  const markerY = centerY + radius * Math.sin(angle);

  // تابع هندل کلیک یا درگ
  const handleSeek = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!audioRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const svgX = e.clientX - rect.left;
    const svgY = e.clientY - rect.top;

    const dx = svgX - centerX;
    const dy = svgY - centerY;
    let newAngle = Math.atan2(dy, dx);

    // تنظیم شروع از بالا
    newAngle += Math.PI / 2;
    if (newAngle < 0) {
      newAngle += 2 * Math.PI;
    }

    const newProgress = (newAngle / (2 * Math.PI)) * 100;
    setProgress(newProgress);

    // تنظیم زمان جدید صدا
    const newTime = (newProgress / 100) * duration;
    audioRef.current.currentTime = newTime;
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div ref={containerRef} className="relative w-32 h-32">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 100 100"
          onClick={handleSeek}
        >
          {/* دایره پس‌زمینه */}
          <circle
            className="text-gray-300"
            stroke="currentColor"
            strokeWidth="2"
            fill="transparent"
            r={radius}
            cx={centerX}
            cy={centerY}
          />
          {/* دایره‌ی پرشونده */}
          <circle
            className="text-blue-500"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            r={radius}
            cx={centerX}
            cy={centerY}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (progress / 100) * circumference}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.1s linear" }}
          />
          {/* مارکر متحرک */}
          {progress > 0 && (
            <circle
              cx={markerX}
              cy={markerY}
              r="5"
              fill="white"
              stroke="blue"
              strokeWidth="2"
              style={{ transition: "all 0.1s linear" }}
            />
          )}
        </svg>
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center rounded-full"
        >
          {isPlaying ? (
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>

      {/* پلیر صوتی */}
      <audio ref={audioRef} src="/sounds/daryapanahi.mp3" preload="metadata" />
    </div>
  );
};

export default AudioPlayerCircle;
