"use client";

import AudioPlayer from "../audioPlayer/audioPlayer";
import { IoIosClose } from "react-icons/io";
import { useState, useEffect, useRef } from "react";
import "./style.css";

type MusicPlayerProps = {
  title: string;
  artist: string;
  audio: string;
  poster: string;
};

export default function MusicPlayer({ datapost }: MusicPlayerProps) {
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
      style={{ backgroundImage: `url(${poster})` }}
      onClick={handleToggle}
    >
      <div
        className={`z-10 backdrop-blur-md w-full flex items-end justify-center flex-col text-white rounded-t-2xl transition-all duration-300 ${
          showPlayer ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
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
                <h3 className="text-sm text-gray-200 my-2 px-3">{title}</h3>
                <h2 className="px-3 pt-4 text-lg font-medium">{artist}</h2>
              </div>
              <div className="w-full">
                <AudioPlayer src={audio} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
