import { useRef, useState, useEffect } from "react";

const AudioPlayerCircle = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [volume, setVolume] = useState(0.5); // Default volume value

    const radius = 45;
    const center = 50;
    const circumference = 2 * Math.PI * radius;

    const updateProgress = () => {
        if (!audioRef.current || isDragging) return;
        const current = audioRef.current.currentTime;
        const dur = audioRef.current.duration;
        if (dur > 0) {
            setProgress((current / dur) * 100);
            setDuration(dur);
        }
    };

    // Update time based on mouse position
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
        setProgress(percent); // Update progress
        const newTime = (percent / 100) * duration; // Calculate new time based on percentage
        audioRef.current.currentTime = newTime; // Set new currentTime
    };

    // Handle mouse down event to start dragging
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        seekAudio(e.clientX, e.clientY);  // Change the time when mouse is down
    };

    // Handle mouse move event to drag progress circle
    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            seekAudio(e.clientX, e.clientY); // Update time when dragging
        }
    };

    // Handle mouse up event to stop dragging
    const handleMouseUp = () => {
        setIsDragging(false);  // Stop dragging
    };

    // Toggle play/pause
    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);  // Toggle play state
    };

    // Format time (minutes:seconds)
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    };

    // Handle volume change
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputVal = parseFloat(e.target.value);
        setVolume(inputVal);
        if (audioRef.current) {
            audioRef.current.volume = inputVal;
        }
    };

    // Update background of volume slider based on volume
    useEffect(() => {
        const slider = document.querySelector('input[type="range"]') as HTMLInputElement;
        if (slider) {
            const percent = volume * 100;
            slider.style.background = `linear-gradient(to right, white ${percent}%, #888 ${percent}%)`;
        }
    }, [volume]);

    // Update progress on time change
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

    // Add event listeners for mouse move and mouse up
    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div className="w-full flex flex-col items-center justify-center p-4">
            <p className="text-gray-300 text-lg font-semibold">
                {formatTime(audioRef.current ? audioRef.current.currentTime : 0)}
            </p>

            <div className="relative w-60 h-60">
                {isPlaying && (
                    <div className="pulse-circle"></div>
                )}

                <svg
                    ref={svgRef}
                    className="absolute top-0 left-0 w-full h-full"
                    viewBox="0 0 100 100"
                    onMouseDown={handleMouseDown}
                >
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke="white"
                        strokeWidth="0.8"
                        fill="none"
                    />
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
                    <circle
                        cx={center + radius * Math.cos((progress / 100) * 2 * Math.PI - Math.PI / 2)}
                        cy={center + radius * Math.sin((progress / 100) * 2 * Math.PI - Math.PI / 2)}
                        r="2"
                        fill="white"
                    />
                </svg>

                <button
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center rounded-full"
                >
                    {isPlaying ? (
                        <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                    ) : (
                        <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    )}
                </button>
            </div>

            <div className="w-full flex flex-row items-center justify-center">
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full h-1 rounded-lg appearance-none bg-gray-400"
                />
            </div>

            <audio ref={audioRef} src="/sounds/daryapanahi.mp3" preload="metadata" />
        </div>
    );
};

export default AudioPlayerCircle;
