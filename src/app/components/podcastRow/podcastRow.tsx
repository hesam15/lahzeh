// components/Loader.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { FiPlay, FiClock, FiCalendar } from 'react-icons/fi';

interface PodcastRowProps {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: string;
}

export default function PodcastRow({ id, title, description, date, duration }: PodcastRowProps) {
  const router = useRouter();

  return (
    <div 
      onClick={() => router.push(`/player/${id}`)}
      className="flex items-center gap-6 p-4 bg-[#004C5C]/20 rounded-xl cursor-pointer hover:bg-[#004C5C]/30 transition-colors"
    >
      {/* Play Button */}
      <div className="w-12 h-12 rounded-full bg-[#004C5C] flex items-center justify-center flex-shrink-0 hover:bg-[#004C5C]/80 transition-colors">
        <FiPlay className="w-6 h-6 text-white" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-2">
        <h3 className="text-base font-bold text-white/90">{title}</h3>
        <p className="text-sm text-white/70 line-clamp-2">{description}</p>
        <div className="flex items-center gap-4 text-sm text-white/50">
          <div className="flex items-center gap-1">
            <FiCalendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiClock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
