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
        <div className="p-4">
            <h1 className="text-2xl font-bold text-white mb-6 text-center">پست‌های دسته‌بندی</h1>

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
                    pagination={{ clickable: true, el: ".custom-pagination" }}
                    className="w-full"
                    dir="rtl"
                    centeredSlides={true}
                    breakpoints={{
                        640: { slidesPerView: 1.4, spaceBetween: 32 },
                        768: { slidesPerView: 1.4, spaceBetween: 32 },
                        1024: { slidesPerView: 1.4, spaceBetween: 32 },
                    }}
                >
                    {posts.map((post: any) => (
                        <SwiperSlide key={post.id} className="w-auto">
                            {/* ... محتوای پست‌ها ... */}
                        </SwiperSlide>
                    ))}
                </Swiper>

{/* نقطه‌ها اینجا میان پایینتر نمایش داده می‌شن */}
            <div className="custom-pagination mt-6 flex justify-center" />

      )}
        </div>
    );
}
