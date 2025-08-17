'use client';

import Image from 'next/image';
import Podcast from '@/app/components/podcast/podcast';
import { useEffect, useState, useCallback } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import BottomNavbar from '@/app/components/bottomNavbar/bottomNavbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/app/globals.css';
import EmotionBox from '@/app/components/emotionBox/emotionBox';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { API_ENDPOINTS, apiHelpers } from '@/app/config/api';

type Category = {
  id: string;
  name: string;
};

type Post = {
  id: string;
  title: string;
  poster?: string;
  duration?: string;
  likes_count?: number;
  plays_count?: number;
};

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [userName, setUserName] = useState('کاربر عزیز');
  const [showEmotionBox, setShowEmotionBox] = useState(false);
  const router = useRouter();

  const getGreeting = useCallback(() => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) return 'صبح بخیر';
    if (hour >= 12 && hour < 17) return 'ظهر بخیر';
    if (hour >= 17 && hour < 21) return 'عصر بخیر';
    return 'شب بخیر';
  }, []);

  const handleCategoryClick = useCallback((categoryId: string) => {
    router.push(`/category/${categoryId}`);
  }, [router]);

  const getCurrentDate = () => {
    const today = new Date();
    return `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  };

  const handleCloseEmotionBox = () => {
    setShowEmotionBox(false);
    localStorage.setItem('emotionBoxClosedDate', getCurrentDate());
  };

  const fetchUser = useCallback(async (controller: AbortController) => {
    const token = Cookies.get('access_token');
    try {
      const response = await axios.get(API_ENDPOINTS.userMe(), {
        ...apiHelpers.getRequestConfig(token),
        signal: controller.signal,
      });
      setUserName(response.data?.data?.full_name || 'کاربر عزیز');
    } catch (error: any) {
      if (error.name === 'AbortError') return;
      console.error('خطا در دریافت اطلاعات کاربر:', error);
      setUserName('کاربر عزیز');
    }
  }, []);

  const fetchCategories = useCallback(async (controller: AbortController) => {
    const token = Cookies.get('access_token');
    try {
      const response = await axios.get(API_ENDPOINTS.postCategories(), {
        ...apiHelpers.getRequestConfig(token),
        signal: controller.signal,
      });
      setCategories(response.data.data || []);
    } catch (error: any) {
      if (error.name === 'AbortError') return;
      console.error('خطا در دریافت دسته‌بندی‌ها:', error);
    }
  }, []);

  const fetchPosts = useCallback(async (controller: AbortController) => {
    const token = Cookies.get('access_token');
    try {
      const response = await axios.get(API_ENDPOINTS.latestPosts(), {
        ...apiHelpers.getRequestConfig(token),
        signal: controller.signal,
      });
      setPosts(response.data.data || []);
    } catch (error: any) {
      if (error.name === 'AbortError') return;
      console.error('خطا در دریافت پست‌ها:', error);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const loadData = async () => {
      await Promise.all([
        fetchUser(controller),
        fetchCategories(controller),
        fetchPosts(controller),
      ]);

      const closedDate = localStorage.getItem('emotionBoxClosedDate');
      const currentDate = getCurrentDate();
      if (closedDate !== currentDate) {
        setShowEmotionBox(true);
      }

    };

    loadData();

    return () => controller.abort();
  }, [fetchUser, fetchCategories, fetchPosts]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start rtl relative pb-[100px] bg-transparent overflow-y-auto">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/bg-main-img.webp"
          alt="Background Image"
          className="object-cover blur-[3px]"
          fill
          placeholder="blur"
          blurDataURL="/images/low-res-bg-main-img.webp"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black"></div>
      </div>

      <div className="flex flex-col items-center w-full relative z-10 px-4">
        <h1 className="w-full text-center mt-12 p-3 flex flex-col items-center animate-fade-in">
          <span className="text-4xl font-bold bg-gradient-to-r from-[#00A3B3] to-[#00D4B4] bg-clip-text text-transparent">
            {getGreeting()}
          </span>
          <span className="text-3xl font-semibold text-white mt-1">{userName}</span>
        </h1>

        <div className="flex gap-2 flex-wrap p-3">
          {categories.length > 0 ? (
            categories.map((category) => (
              <button
                key={category?.id}
                onClick={() => handleCategoryClick(category?.id)}
                className="bg-[#00333E] hover:bg-[#004455] transition-colors rounded-full text-sm text-white px-4 py-2 shadow-lg specShadow"
              >
                {category?.name}
              </button>
            ))
          ) : (
            <div className="text-white/60 text-center py-4">هیچ دسته‌بندی یافت نشد</div>
          )}
        </div>

        <div className="px-[15px] w-full">
          <span className="w-full text-white flex items-center justify-center text-sm my-6 p-3 bg-white/5 rounded-full specShadow">
            <FaInfoCircle className="ml-2" /> اولین باره میخوای مدیتیشن کنی؟
            <a href="/meditation" className="text-md font-bold mr-2 text-blue-400 hover:text-blue-300">
              از اینجا شروع کن
            </a>
          </span>
        </div>

        {showEmotionBox && <EmotionBox onClose={handleCloseEmotionBox} />}

        <div className="text-white mt-8 mb-4 w-full">
          <div className="grid grid-cols-12 items-center w-full mb-4">
            <h4 className="text-xl font-bold text-right text-white col-span-8 pr-[15px]">
              آخرین پست‌ها
            </h4>
            <button className="text-sm text-white bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-full flex justify-center items-center gap-2 col-span-4 specShadow">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              مشاهده همه
            </button>
          </div>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={8}
            slidesPerView={2.5}
            navigation
            pagination={{ clickable: true }}
            className="w-full"
            dir="rtl"
            breakpoints={{
              640: {
                slidesPerView: 2.5,
                spaceBetween: 8,
              },
            }}
          >
            {posts.length > 0 ? (
              posts.slice(0, 10).map((post) => (
                <SwiperSlide key={post.id}>
                  <Link href={`/player/${post.id}`}>
                    <Podcast post={post} />
                  </Link>
                </SwiperSlide>
              ))
            ) : (
              <div className="text-white/60 text-center py-4">هیچ پستی یافت نشد</div>
            )}
          </Swiper>
        </div>
      </div>

      <BottomNavbar />
    </div>
  );
}