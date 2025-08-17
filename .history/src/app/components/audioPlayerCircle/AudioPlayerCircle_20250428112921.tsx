import React, { useRef, useState } from 'react';

const AudioPlayerCircle = () => {
  const svgRef = useRef(null);
  const audioRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const radius = 40; // شعاع دایره
  const center = 50; // مرکز دایره
  const circumference = 2 * Math.PI * radius;

  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateProgress(e);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      updateProgress(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateProgress = (e) => {
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const angle = Math.atan2(y - center, x - center);
    const percentage = ((angle + Math.PI) / (2 * Math.PI)) * 100;
    
    setProgress(Math.max(0, Math.min(100, percentage)));
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-32 h-32">
        <svg
          ref={svgRef}
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 100 100"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp} // برای اطمینان از اینکه در صورت خروج ماوس، کشیدن متوقف شود
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
            stroke="blue"
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
        </svg>
        
        {/* دکمه پلی/پاز */}
        <button
          className="absolute inset-0 flex items-center justify-center rounded-full"
          onClick={() => {
            if (audioRef.current.paused) {
              audioRef.current.play();
            } else {
              audioRef.current.pause();
            }
          }}
        >
          {audioRef.current && audioRef.current.paused ? 'Play' : 'Pause'}
        </button>
      </div>

      <audio ref={audioRef} src="/sounds/daryapanahi.mp3" preload="metadata" />
    </div>
  );
};

export default AudioPlayerCircle;
