"use client";

import { useRef, useState, useEffect } from "react";

const AudioPlayerCircle = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [volume, setVolume] = useState(0.5); // ولوم واقعیش
    const sliderRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputVal = parseFloat(e.target.value);
        setVolume(inputVal);
        if (audioRef.current) {
          audioRef.current.volume = 1 - inputVal; // معکوس‌سازی مقدار برای صدا
        }
      };
      

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




    const angle = (progress / 100) * 360 - 90;
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
        if (!isDragging) {
            togglePlay();
            seekAudio(e.clientX, e.clientY);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    };



    useEffect(() => {
        const slider = sliderRef.current;
        if (slider) {
            const percent = (1 - volume) * 100; // مقدار معکوس برای رنگ پس‌زمینه
            slider.style.background = `linear-gradient(to right, white ${percent}%, #888 ${percent}%)`;
        }
    }, [volume]);

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
            audio.removeEventListener("loadedmetadata", () => { });
            audio.removeEventListener("ended", () => setIsPlaying(false));
        };
    }, [isDragging]);

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, duration]);


    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);


    return (
        <div className="flex flex-col items-center justify-center p-4">
            <p className="text-gray-500 text-lg font-semibold">
                {formatTime(audioRef.current ? audioRef.current.currentTime : 0)}
            </p>

            <div className="relative w-32 h-32">
                {/* دایره‌های پالس هنگام پخش */}
                {isPlaying && (
                    <>
                        <div className="pulse-circle"></div>
                        <div className="pulse-circle" style={{ animationDelay: "0.2s" }}></div>
                        <div className="pulse-circle" style={{ animationDelay: "0.6s" }}></div>
                        <div className="pulse-circle" style={{ animationDelay: "0.8s" }}></div>

                    </>
                )}

                {/* SVG پلیر */}
                <svg
                    ref={svgRef}
                    className="absolute top-0 left-0 w-full h-full"
                    viewBox="0 0 100 100"
                    onMouseDown={handleMouseDown}
                    onClick={handleClick}
                >
                    {/* دایره پس زمینه */}
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke="gray"
                        strokeWidth="1"
                        fill="none"
                    />
                    {/* دایره پروگرس */}
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke="white"
                        strokeWidth="1.5"
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
                    <circle cx={markerX} cy={markerY} r="2" fill="white" stroke="white" strokeWidth="2" />
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
            <div className="mt-4 w-full flex flex-col items-center">
                <input
                    ref={sliderRef}
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleChange}
                    className=" mt-10 w-full h-1 rounded-lg appearance-none bg-gray-400 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                />
            </div>


            <audio ref={audioRef} src="/sounds/daryapanahi.mp3" preload="metadata" />

            {/* استایل برای دایره‌های پالس */}
            <style jsx>{`

        
 
        .pulse-circle {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1px solid white;
          opacity: 0.1;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.1;
          }
            40% {
            transform: scale(2);
            opacity: 0.01;
          }
          70% {
            transform: scale(3);
            opacity: 0.001;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
        </div>
    );
};

export default AudioPlayerCircle;
