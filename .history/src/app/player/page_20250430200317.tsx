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
                alt="bg"
                src="/images/bg (2).gif"
                fill
                priority
                quality={100}
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
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
