"use client";

import AudioPlayer from "../audioPlayer/audioPlayer";
import { IoIosClose } from "react-icons/io";
import { useState } from "react";
import "./style.css"

export default function MusicPlayer() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false); // کنترل نمایش MusicPlayer

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };
    const handleToggle = () => {
        setShowPlayer(prev => !prev);
    };
    return (
        <div className="relative h-[80vh] mt-20 p-4 w-full bg-cover bg-center bg-no-repeat flex flex-col justify-end items-center">
            <div className="backdrop-blur-md w-full flex items-end justify-center flex-col text-white rounded-t-2xl transition-all duration-300">
                <div className="relative w-full flex items-end justify-center flex-col">
                    {isExpanded ? (
                        <>
                            <IoIosClose
                                size={30}
                                color="white"
                                className="cursor-pointer absolute top-4 left-4 hover:opacity-80 transition-opacity"
                                onClick={toggleExpansion}
                            />
                        </>
                    ) : (
                        <>
                            <div className="w-full text-center top-0">
                                <h3 className="text-sm text-gray-200 my-2 px-3 ">فایل شماره 3 مدیتیشن چگونه به خواب برویم؟</h3>
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
