"use client";

import { useRef, useState, useEffect } from "react";

const AudioPlayerCircle = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const radius = 45;
  const center = 50;
  const circumference = 2 * Math.PI * radius;

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
    if (!audioRef.current || isDragging) return;
    const current = audioRef.current.currentTime;
    const dur = audioRef.current.duration;
    if (dur > 0) {
      setProgress((current / dur) * 100);
      setDuration(dur);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });
    audio.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", () => {});
      audio.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, [isDragging]);

  const angle = (progress / 100) * 360 - 90; // شروع از بالا (12)
  const rad = (angle * Math.PI) / 180;
  const markerX = center + radius * Math.cos(rad);
  const markerY = center + radius * Math.sin(rad);

  const seekAudio = (clientX: number, clientY: number) => {
    if (!svgRef.current || !audioRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const dx = x - center;
    const dy = y - center;

    let theta = Math.atan2(dy, dx);
    theta -= Math.PI / 2;
    if (theta < 0) theta += 2 * Math.PI;

    const percent = (theta / (2 * Math.PI)) * 100;
    setProgress(percent);
    const newTime = (percent / 100) * duration;
    audioRef.current.currentTime = newTime;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    seekAudio(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      seekAudio(e.clientX, e.clientY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    // جلوگیری از کلیک مستقیم روی پراگرس بار و تغییر وضعیت پخش
    if (!isDragging) {
      togglePlay(); // تغییر وضعیت پخش
      seekAudio(e.clientX, e.clientY); // تغییر زمان
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, duration]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-32 h-32">
        {/* نمایش زمان */}
        <p className="absolute top-[-20px] text-white text-lg font-semibold">
          {formatTime(audioRef.current ? audioRef.current.currentTime : 0)}
        
        </p>

        <svg
          ref={svgRef}
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 100 100"
          onMouseDown={handleMouseDown}
          onClick={handleClick}
        >
          {/* پس زمینه */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="gray"
            strokeWidth="2"
            fill="none"
          />
          {/* پراگرس */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (progress / 100) * circumference}
            strokeLinecap="round"
            style={{
              transition: isDragging ? "none" : "stroke-dashoffset 0.1s linear",
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%",
            }}
          />
          {/* مارکر */}
          <circle cx={markerX} cy={markerY} r="5" fill="white" stroke="white" strokeWidth="2" />
        </svg>

        {/* دکمه پلی/پاز */}
        <button
          onClick={(e) => {
            if (!isDragging) togglePlay();
          }}
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

      <audio ref={audioRef} src="/sounds/daryapanahi.mp3" preload="metadata" />
    </div>
  );
};

export default AudioPlayerCircle;
