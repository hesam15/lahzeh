"use client";

import { useRef, useState } from "react";

export default function CustomVideoPlayer() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="relative w-full max-w-2xl mx-auto">
            {/* ویدیو */}
            <video
                ref={videoRef}
                src="/video/sample.mp4"
                className="w-full rounded-lg"
            />

            {/* دکمه پخش سفارشی */}
            <button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg transition-opacity duration-300 hover:bg-opacity-30"
            >
               
            </button>
        </div>
    );
}
