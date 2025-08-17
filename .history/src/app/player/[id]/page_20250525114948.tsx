'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import MusicPlayer from "../../components/musicPlayer/musicPlayer";
import Preloader from "../../preloader/page";
import BottomNavbar from "../../components/bottomNavbar/bottomNavbar";
import { useParams } from "next/navigation";

export default function Player() {
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        const handleLoad = () => setIsLoading(false);
        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
        }

        return () => window.removeEventListener('load', handleLoad);
    }, []);

    const fetchPost = async () => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`https://api.lahzeh.me/api/user/post/${id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                cache: 'no-store',
            });

            if (!res.ok) {
                console.error('خطا در دریافت پست:', res.statusText);
                return null;
            }

            const json = await res.json();
            console.log(json.data)
            setPostData(json.data)
            return json?.data || null;
        } catch (error) {
            console.error('خطای شبکه در دریافت پست:', error);
            return null;
        }
    }


    useEffect(() => {
        fetchPost();
    }, [id]);

    if (isLoading) {
        return <Preloader />;
    }

    return (
        <div className="flex h-[100vh] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#001B22] to-[#00333E]">
            <div className="flex flex-col items-center justify-center w-full xl:w-1/3 mt-3 xl:p-5 rounded-[8px] relative">
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
                <div className="relative z-20 w-full mb-30">
                    <MusicPlayer data={postData}/>
                </div>
            </div>
            <BottomNavbar />
        </div>
    );
}