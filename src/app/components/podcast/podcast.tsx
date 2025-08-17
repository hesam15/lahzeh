'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { FaPlay, FaHeart, FaShare } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { API_ENDPOINTS, apiHelpers } from '@/app/config/api';

interface PostProps {
  post: {
    id: string;
    poster?: string;
    title: string;
    duration?: string;
    like_count?: number;
    plays_count?: number;
  };
}

export default function Podcast({ post }: PostProps) {
  const { poster, title, duration, id } = post;
  const [likeCount, setLikeCount] = useState(post.like_count || 0);
  const [isLiked, setIsLiked] = useState(false);
  // در آینده می‌توان از این state برای مدیریت وضعیت علاقه‌مندی استفاده کرد
  // const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkIfLiked = useCallback(async () => {
    const token = Cookies.get('access_token');
    if (!token || !id) return;

    try {
      const response = await fetch(API_ENDPOINTS.postLiked(id), {
        method: 'GET',
        ...apiHelpers.getRequestConfig(token),
        cache: 'no-store',
      });

      if (response.ok) {
        const data = await response.json();
        setIsLiked(data.liked || false);
        if (data.total !== undefined) {
          setLikeCount(data.total);
        }
      }
    } catch (error) {
      console.error('Error checking liked status:', error);
    }
  }, [id]);

  const checkIfFavorited = useCallback(async () => {
    const token = Cookies.get('access_token');
    if (!token || !id) return;

    try {
      const response = await fetch(API_ENDPOINTS.postFavourite(id), {
        method: 'GET',
        ...apiHelpers.getRequestConfig(token),
        cache: 'no-store',
      });

      if (response.ok) {
        // const data = await response.json();
        // setIsFavorited(data.favorited || false);
      }
    } catch (error) {
      console.error('Error checking favorited status:', error);
    }
  }, [id]);

  useEffect(() => {
    checkIfLiked();
    checkIfFavorited();
  }, [checkIfLiked, checkIfFavorited]);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const token = Cookies.get('access_token');
    if (!token || !id || isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.postLike(id), {
        method: 'POST',
        ...apiHelpers.getRequestConfig(token),
        cache: 'no-store',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message === 'Successful') {
          setLikeCount(data.total);
          setIsLiked(!isLiked);
        }
      } else {
        console.error('Error liking post:', response.statusText);
      }
    } catch (error) {
      console.error('Error network liking:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const shareData = {
      title: title,
      text: `${title} - مدیتیشن لحظه`,
      url: `${window.location.origin}/player/${id}`,
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert('لینک کپی شد!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      try {
        await navigator.clipboard.writeText(`${window.location.origin}/player/${id}`);
        alert('لینک کپی شد!');
      } catch (clipboardError) {
        console.error('Error copying to clipboard:', clipboardError);
      }
    }
  };

  return (
    <div className="relative group">
      <div className="relative w-[140px] h-[140px] rounded-xl overflow-hidden specShadow">
        <Image
          src={poster || '/images/pod.jpg'}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
            <FaPlay className="w-4 h-4 text-white" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
          <h3 className="text-sm font-bold mb-1 line-clamp-2 leading-tight">{title}</h3>
          <p className="text-xs opacity-80">{duration || 'مدت‌زمان نامشخص'}</p>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between px-1">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button 
              onClick={handleLike}
              disabled={isLoading}
              className={`transition-colors specShadow rounded-full p-1 ${
                isLiked 
                  ? 'text-red-500 hover:text-red-400' 
                  : 'text-white/70 hover:text-white'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <FaHeart className="w-4 h-4" />
            </button>
            <span className="text-white/70 text-xs">{likeCount}</span>
          </div>
          
          <button 
            onClick={handleShare}
            className="text-white/70 hover:text-white transition-colors specShadow rounded-full p-1 cursor-pointer"
          >
            <FaShare className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}