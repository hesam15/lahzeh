'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import MusicPlayer from "../components/musicPlayer/musicPlayer";
import Preloader from "../preloader/page";
import BottomNavbar from "../components/bottomNavbar/bottomNavbar";

export default function Player() {
    const [isLoading, setIsLoading] = useState(true);
    const [showPlayer, setShowPlayer] = useState(false);

    useEffect(() => {
        const handleLoad = () => setIsLoading(false);
        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
        }

        return () => window.removeEventListener('load', handleLoad);
    }, []);

    if (isLoading) {
        return <Preloader />;
    }

    const handleToggle = () => {
        setShowPlayer(prev => !prev);
    };

    return (
        <div
            onClick={handleToggle}
            className="relative flex h-screen w-screen items-center justify-center overflow-hidden cursor-pointer"
        >
            {/* بک‌گراند تمام‌صفحه که همیشه دیده میشه */}
            <Image
    src="/images/bg-2.gif"
    alt="bg"
    fill
    className="object-cover"
  />

            {/* محتوای پلیر (فقط وقتی فعال باشه دیده میشه) */}
            {showPlayer && (
                <div className="relative z-10 flex flex-col items-center justify-center w-full xl:w-1/3 mt-3 xl:p-5 rounded-[8px]">
                    <MusicPlayer />
                </div>
            )}

            {/* همیشه نشون داده بشه */}
            <div className="absolute bottom-0 z-10 w-full">
                <BottomNavbar />
            </div>
        </div>
    );
}
