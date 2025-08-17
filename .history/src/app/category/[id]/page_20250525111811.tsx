"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Podcast from "@/app/components/podcast/podcast";
import BottomNavbar from "@/app/components/bottomNavbar/bottomNavbar";

export default function CategoryPage() {
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                `https://api.lahzeh.me/api/user/post-category/${id}/posts`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setPosts(response.data?.data || []);
        } catch (error) {
            console.error("خطا در دریافت پست‌ها:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [id]);

    return (
        <div className="flex h-full w-full flex-col items-center justify-center xl:mt-3 rtl relative">

            <div className="flex flex-col items-center justify-center w-full xl:w-1/3 xl:mt-3 rounded-[8px] relative z-10">
                <div className="text-white my-8 w-full">
                    <div className="grid grid-cols-12 items-center w-full mb-4">
                        <h4 className="text-xl font-bold text-right text-white col-span-8 pr-[15px]">آخرین پست ها</h4>
                        <button className="text-sm text-white bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-full flex justify-center items-center gap-2 col-span-4">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            مشاهده همه
                        </button>
                    </div>
                    {loading ? (
                        <p className="text-white text-center">در حال بارگذاری...</p>
                    ) : posts.length === 0 ? (
                        <p className="text-white text-center mt-8">هیچ پستی در این دسته‌بندی وجود ندارد.</p>
                    ) : (
                        <Swiper
                            modules={[Navigation, Pagination]}
                            spaceBetween={32}
                            slidesPerView={1.4}
                            navigation
                            className="w-full mb-10"
                            dir="rtl"
                            centeredSlides={true}
                            breakpoints={{
                                640: {
                                    slidesPerView: 1.4,
                                    spaceBetween: 32,
                                },
                                768: {
                                    slidesPerView: 1.4,
                                    spaceBetween: 32,
                                },
                                1024: {
                                    slidesPerView: 1.4,
                                    spaceBetween: 32,
                                },
                            }}
                        >
                            {posts.map((post: any) => (
                                <SwiperSlide key={post.id} className="w-auto">
                                    <Link href={`/podcast/${post.id}`}>

                                        <div className="flex flex-col items-center">
                                            <Podcast post={post} />
                                            <div className="mt-4 text-center">
                                                <h3 className="text-lg font-bold text-white mb-2">{post.title}</h3>
                                                <p className="text-sm text-white/70">{post.duration || "بدون مدت‌زمان"}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>
            </div>
            <BottomNavbar />
        </div>
    );
}
