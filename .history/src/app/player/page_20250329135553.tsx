'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Footer from "../components/footer/footer";
import MusicPlayer from "../components/musicPlayer/musicPlayer";
import Preloader from "../preloader/page";

export default function Player() {

    const [isLoading, setIsLoading] = useState(true);

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
        return (
            <Preloader />
        );
    }


    return (
        <div className="flex h-[100vh] w-full flex-col items-center justify-center mt-3">
            <div className="flex flex-col items-center justify-center w-8/9 xl:w-1/3 mt-3 xl:p-5 rounded-[8px] relative">
                <Image
                    alt="bg"
                    className="absolute top-0 left-0 w-[100%] h-[100%] object-cover z-0 rounded-[8px]"
                    src="/images/bg (2).gif"
                    width={500}
                    height={500}
                    priority
                    quality={100}
                    loading="eager"
                />
                <div className="relative z-10 w-full">
                    <MusicPlayer />
                </div>
            </div>
            <Footer />
        </div>

    );
}
