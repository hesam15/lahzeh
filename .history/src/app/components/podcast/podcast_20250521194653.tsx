"use client";

import React from "react";
import Image from "next/image";
import { FaPlay, FaHeart, FaShare } from "react-icons/fa";

export default function Podcast({ post }: { post: any }) {
  const { poster, title, duration, likes_count, plays_count } = post;

  return (
    <div className="relative group">
      <div className="relative w-[280px] h-[280px] rounded-2xl overflow-hidden">
        <Image
          src={poster || "/images/pod.jpg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
            <FaPlay className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-lg font-bold mb-1">{title}</h3>
          <p className="text-sm opacity-80">{duration || "مدت‌زمان نامشخص"}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
          <button className="text-white/70 hover:text-white transition-colors">
            <FaHeart className="w-5 h-5" />
          </button>
          <button className="text-white/70 hover:text-white transition-colors">
            <FaShare className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center justify-center gap-2 text-white/70 text-sm">
          <span>{likes_count || 0}</span>
          <span>•</span>
          <span>{plays_count || 0}</span>
        </div>
      </div>
    </div>
  );
}
