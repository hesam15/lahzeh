'use client';

import AudioPlayer from '../audioPlayer/audioPlayer';
import { IoIosClose } from 'react-icons/io';
import { useState, useEffect, useRef } from 'react';
import './style.css';

interface Sound {
  id: number;
  title: string;
  file_path?: string;
  description?: string;
  active?: number;
  create_dates?: {
    created_human: string;
    created_at: string;
  };
}

interface PlayerProps {
  data: {
    title?: string;
    content?: string;
    narration?: { file_path?: string };
    sounds?: Sound[];
  };
  postId: string | string[];
  onLike: () => Promise<boolean>;
  isLiked: boolean;
  onFavourite: () => Promise<boolean>;
  isFavourited: boolean;
}

export const MusicPlayer: React.FC<PlayerProps> = ({
  data,
  onLike,
  isLiked,
  onFavourite,
  isFavourited,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // State to control visibility
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const HIDE_TIMEOUT = 5000; // 5 seconds timeout

  // Start or reset the timer to hide MusicPlayer
  const startTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, HIDE_TIMEOUT);
  };

  // Handle click on the container to show MusicPlayer
  const handleContainerClick = () => {
    if (!isVisible) {
      setIsVisible(true);
      startTimer();
    }
  };

  // Reset timer on interaction
  const handleInteraction = () => {
    setIsVisible(true); // Ensure it's visible on interaction
    startTimer();
  };

  // Start timer when component mounts
  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
    handleInteraction(); // Reset timer on expansion toggle
  };

  return (
    <div
      className="relative h-[80vh] p-4 w-full bg-cover bg-center bg-no-repeat flex flex-col justify-end items-center"
      onClick={handleContainerClick} // Show MusicPlayer on click
    >
      <div
        className={`z-[10] w-full flex items-end justify-center flex-col text-white rounded-t-2xl transition-all duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
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
                <h3 className="text-sm text-gray-200 my-2 px-3">{data.title}</h3>
                <h2 className="px-3 pt-4 text-lg font-medium">{data.content}</h2>
              </div>
              <div className="w-full">
                <AudioPlayer
                  data={data}
                  onLike={onLike}
                  isLiked={isLiked}
                  onFavourite={onFavourite}
                  isFavourited={isFavourited}
                  onInteraction={handleInteraction} // Pass interaction handler
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};