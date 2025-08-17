'use client';

import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import { PostSubSubCategory } from '@/types/api';
import { useState, useEffect } from 'react';

interface SubSubCategoryProps {
  subSubCategory: PostSubSubCategory;
}

export default function SubSubCategoryCard({ subSubCategory }: SubSubCategoryProps) {
  const { name, image } = subSubCategory;
  const [imageError, setImageError] = useState(false);

  // Reset image error when image changes
  useEffect(() => {
    setImageError(false);
  }, [image]);

  return (
    <div className="relative group">
      <div className="relative w-[140px] h-[140px] rounded-xl overflow-hidden specShadow">
        {/* Background Image - using image from API or fallback */}
        {image && !imageError ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="140px"
            priority={false}
            unoptimized={true}
            onError={() => {
              setImageError(true);
            }}
          />
        ) : (
          <Image
            src="/images/woman meditating.jpg"
            alt={name}
            fill
            className="object-cover"
            sizes="140px"
            priority={false}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        )}
        
        {/* Gradient Background Fallback - فقط اگر عکس نیست نمایش بده */}
        {(!image || imageError) && (
          <div 
            className="absolute inset-0 bg-gradient-to-br from-[#00333E] to-[#004455]"
            style={{ 
              backgroundImage: "linear-gradient(135deg, #00333E 0%, #004455 50%, #005566 100%)" 
            }}
          />
        )}
        
        {/* Permanent text overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Play Button on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
            <FaPlay className="w-4 h-4 text-white" />
          </button>
        </div>
        
        {/* Title at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
          <h3 className="text-sm font-bold line-clamp-2 leading-tight drop-shadow-lg">{name}</h3>
        </div>
      </div>
    </div>
  );
}
