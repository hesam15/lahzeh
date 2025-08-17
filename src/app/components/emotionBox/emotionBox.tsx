"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const emotions = [
  { id: 1, name: "خوشحال", icon: "/icons/grinning face emoji.png", color: "#FFD700" },
  { id: 2, name: "عادی", icon: "/icons/neutral face emoji.png", color: "#A9A9A9" },
  { id: 3, name: "غمگین", icon: "/icons/pleading face emoji.png", color: "#4169E1" },
  { id: 4, name: "خسته", icon: "/icons/sleepy face emoji.png", color: "#8B4513" },
  { id: 5, name: "خوشحال", icon: "/icons/slightly smiling face emoji.png", color: "#32CD32" },
];

interface EmotionBoxProps {
  onClose: () => void;
}

export default function EmotionBox({ onClose }: EmotionBoxProps) {
  const [selectedEmotion, setSelectedEmotion] = useState<number | null>(null);

  return (
    <div className="px-[15px]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-2xl p-[15px] text-white w-full backdrop-blur-xl"
        style={{ 
          background: "rgba(0, 98, 119, 0.2)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}
      >
        <div className="flex items-center justify-between mb-8">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg font-medium text-right"
          >
            همین الان بگو بهم چه حسی داری؟
          </motion.span>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M6.225 4.811a1 1 0 0 1 1.414 0L12 9.172l4.361-4.361a1 1 0 0 1 1.414 1.414L13.414 10.586l4.361 4.361a1 1 0 0 1-1.414 1.414L12 12l-4.361 4.361a1 1 0 0 1-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 0 1 0-1.414Z"
                clipRule="evenodd"
              />
            </svg>
          </motion.button>
        </div>

        <div className="flex flex-row-reverse justify-center gap-1">
          {emotions.map((emotion, index) => (
            <motion.button
              key={emotion.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedEmotion(emotion.id)}
              className={`transform transition-all duration-300 p-2 rounded-xl relative overflow-hidden
                ${selectedEmotion === emotion.id 
                  ? 'bg-white/20 ring-2 ring-white/50' 
                  : 'bg-white/5 hover:bg-white/10'}`}
            >
              <div className="relative z-10">
                <Image 
                  src={emotion.icon} 
                  alt={emotion.name} 
                  width={120} 
                  height={120}
                  className="transition-transform duration-300 hover:scale-110"
                />
              </div>
              {selectedEmotion === emotion.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}