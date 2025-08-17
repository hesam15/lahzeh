"use client";

import Image from "next/image";

interface HelpSectionProps {
  title: string;
  description: string;
  image: string;
  onClick: () => void;
}

const HelpSection: React.FC<HelpSectionProps> = ({
  title,
  description,
  image,
  onClick
}) => {
  return (
    <div 
      className="mt-8 bg-[#00313CCC] rounded-xl p-4 cursor-pointer hover:bg-[#00313C]/80 transition-colors duration-300"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h4 className="text-white font-medium mb-2">{title}</h4>
          <p className="text-sm text-gray-300">
            {description}
          </p>
        </div>
        <div className="relative w-16 h-16">
          <Image 
            src={image} 
            alt="Help" 
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default HelpSection; 