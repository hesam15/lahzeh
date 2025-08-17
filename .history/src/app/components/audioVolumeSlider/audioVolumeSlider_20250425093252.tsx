"use client";
import { Play, Pause } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const useAudioProgress = (audioRef: React.RefObject<HTMLAudioElement>) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let animationFrame: number;

        const updateProgress = () => {
            if (audioRef.current && audioRef.current.duration) {
                const percentage = (audioRef.current.currentTime / audioRef.current.duration) * 100;
                setProgress(percentage);
            }
            animationFrame = requestAnimationFrame(updateProgress);
        };

        animationFrame = requestAnimationFrame(updateProgress);

        return () => cancelAnimationFrame(animationFrame);
    }, [audioRef]);

    return progress;
};

const CircularProgress = ({ size = 60, strokeWidth = 4, progress }: { size?: number, strokeWidth?: number, progress: number }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <svg width={size} height={size}>
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#ccc"
                strokeWidth={strokeWidth}
                fill="transparent"
            />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#0af"
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
        </svg>
    );
};

const AudioControl = ({ src, imgSrc }: { src: string, imgSrc: string }) => {
    const [volume, setVolume] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const progress = useAudioProgress(audioRef);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (audioRef.current.paused) {
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            if (volume === 0) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else if (isPlaying && audioRef.current.paused) {
                audioRef.current.play();
            }
        }
    }, [volume]);

    return (
        <div className="flex flex-col items-center my-5">
            <div className="flex items-center justify-center relative">
                <div className="relative">
                    <button onClick={togglePlay} className="absolute top-0 left-0 flex items-center justify-center w-[60px] h-[60px] rounded-full">
                        <div className="absolute inset-0">
                            <CircularProgress progress={progress} />
                        </div>
                        {isPlaying ? <Pause className="text-white z-10" /> : <Play className="text-white z-10" />}
                    </button>
                    <Image src={imgSrc} alt="sound icon" width={60} height={60} className="opacity-0" />
                </div>
                <div className="flex-1 relative ml-4">
                    <span className="text-white text-sm absolute -top-6 left-3">{Math.round(volume * 100)}%</span>
                    <audio ref={audioRef} src={src} loop />
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        className="w-1/3 m-3"
                    />
                </div>
            </div>
        </div>
    );
};

const AudioVolumeSlider: React.FC = () => {
    return (
        <div className='flex w-full flex-col items-center justify-center p-8'>
            <AudioControl src="/sounds/rain.mp3" imgSrc="/images/rain.png" />
            <AudioControl src="/sounds/forest.mp3" imgSrc="/images/Nature.png" />
            <AudioControl src="/sounds/sea.mp3" imgSrc="/images/Sea Waves.png" />
        </div>
    );
};

export default AudioVolumeSlider;
