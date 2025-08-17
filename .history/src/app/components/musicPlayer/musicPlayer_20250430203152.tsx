"use client";

import AudioPlayer from "../audioPlayer/audioPlayer";
import { IoIosClose } from "react-icons/io";
import { useState, useEffect, useRef } from "react";
import "./style.css";

export default function MusicPlayer() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    const handleToggle = () => {
        setShowPlayer(prev => !prev);
    };

    const handleInnerClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const resetInactivityTimer = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setShowPlayer(false);
        }, 5000);
    };

    useEffect(() => {
        if (showPlayer) {
            window.addEventListener("click", resetInactivityTimer);
            resetInactivityTimer();
        }

        return () => {
            window.removeEventListener("click", resetInactivityTimer);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [showPlayer]);

    return (
        <div
            className="relative h-[80vh] mt-20 p-4 w-full bg-cover bg-center bg-no-repeat flex flex-col justify-end items-center"
            onClick={handleToggle}
        >
            {/* همیشه رندر میشه ولی نمایش کنترل میشه با کلاس‌ها */}
            <div
                className={`backdrop-blur-md w-full flex items-end justify-center flex-col text-white rounded-t-2xl transition-all duration-500 
                ${showPlayer ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 "}`}
                onClick={handleInnerClick}
            >
                <div className="relative w-full flex items-end justify-center flex-col">
                    {isExpanded ? (
                        <IoIosClose
                            size={30}
                            color="white"
                            className="cursor-pointer absolute top-4 left-4 hover:opacity-80 transition-opacity"
                            onClick={toggleExpansion}
                        />
                    ) : (
                        <>
                            <div className="w-full text-center top-0">
                                <h3 className="text-sm text-gray-200 my-2 px-3 ">
                                    فایل شماره 3 مدیتیشن چگونه به خواب برویم؟
                                </h3>
                                <h2 className="px-3 pt-4 text-lg font-medium">دریا پناهی</h2>
                            </div>
                            <div className="w-full">
                                <AudioPlayer />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
