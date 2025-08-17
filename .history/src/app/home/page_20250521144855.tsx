"use client";

import Image from "next/image";
import Podcast from "../components/podcast/podcast";
import { useEffect, useState } from "react";
import "./style.css";
import "./swiper.css";
import { FaInfoCircle } from "react-icons/fa";
import Preloader from "../preloader/page";
import BottomNavbar from "../components/bottomNavbar/bottomNavbar";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import EmotionBox from "../components/emotionBox/emotionBox";
import useStore from "../stores/useStore";
import { getPosts } from "../lib/getPosts";
import axios from "axios";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState();

  const setPosts = useStore((state) => state.setPosts);

  useEffect(() => {

    const token = localStorage.getItem("token");

    axios.get("https://api.lahzeh.me/api/user/post-category/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(response => {
      setCategories(response.data);
    })
      .catch(error => {
        console.error("خطا در دریافت دسته‌بندی‌ها:", error);
      });


    const handleLoad = () => setIsLoading(false);
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const posts = await getPosts();
        setPosts(posts);
      } catch (error) {
        console.error("خطا در دریافت پست‌ها:", error);
      }
    };

    fetchData();
  }, [setPosts]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center xl:mt-3 rtl relative">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/bg-main-img.png"
          alt="Background Image"
          className="object-cover blur-[3px]"
          fill
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black"></div>
      </div>

      <div className="flex flex-col items-center justify-center w-full xl:w-1/3 xl:mt-3 rounded-[8px] relative z-10">
        <h1 className="w-full text-center text-4xl text-white mt-6 font-bold p-3">شب بخیر دریا</h1>

        <div className="flex flex-row-reverse flex-wrap scrollbar-none w-full p-2 gap-2 justify-end">
          {categories?.map(category => (
            <button
              key={category.id}
              className="bg-[#00333E] hover:bg-[#004455] transition-colors rounded-full text-sm text-white px-4 py-2 shadow-lg"
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="px-[15px] w-full">
          <span className="w-full text-white flex items-center justify-center text-sm my-6 p-3 bg-white/5 rounded-full">
            <FaInfoCircle className="ml-2" /> اولین باره میخوای مدیتیشن کنی؟
            <a href="" className="text-md font-bold mr-2 text-blue-400 hover:text-blue-300">از اینجا شروع کن</a>
          </span>
        </div>

        <EmotionBox />

        <div className="w-full">
          <div className="grid grid-cols-12 items-center w-full mb-4 mt-[20px]">
            <h4 className="text-xl font-bold text-right text-white col-span-8 pr-[15px]">آرامش‌بخش‌های محبوب</h4>
            <button className="text-sm text-white bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-full flex justify-center items-center gap-2 col-span-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              مشاهده همه
            </button>
          </div>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={32}
            slidesPerView={1.4}
            navigation
            pagination={{ clickable: true }}
            className="w-full"
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
            <SwiperSlide className="w-auto">
              <div className="flex flex-col items-center">
                <Podcast />
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-bold text-white mb-2">صدای باران</h3>
                  <p className="text-sm text-white/70">30 دقیقه</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="w-auto">
              <div className="flex flex-col items-center">
                <Podcast />
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-bold text-white mb-2">صدای دریا</h3>
                  <p className="text-sm text-white/70">45 دقیقه</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="w-auto">
              <div className="flex flex-col items-center">
                <Podcast />
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-bold text-white mb-2">صدای جنگل</h3>
                  <p className="text-sm text-white/70">60 دقیقه</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="w-auto">
              <div className="flex flex-col items-center">
                <Podcast />
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-bold text-white mb-2">مدیتیشن</h3>
                  <p className="text-sm text-white/70">20 دقیقه</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="w-auto">
              <div className="flex flex-col items-center">
                <Podcast />
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-bold text-white mb-2">خواب آرام</h3>
                  <p className="text-sm text-white/70">90 دقیقه</p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="text-white my-8 w-full">
          <div className="grid grid-cols-12 items-center w-full mb-4">
            <h4 className="text-xl font-bold text-right text-white col-span-8 pr-[15px]">پیشنهاد شده برای شما</h4>
            <button className="text-sm text-white bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-full flex justify-center items-center gap-2 col-span-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              مشاهده همه
            </button>
          </div>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={32}
            slidesPerView={1.4}
            navigation
            pagination={{ clickable: true }}
            className="w-full"
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
            <SwiperSlide className="w-auto">
              <div className="flex flex-col items-center">
                <Podcast />
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-bold text-white mb-2">مدیتیشن صبحگاهی</h3>
                  <p className="text-sm text-white/70">15 دقیقه</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="w-auto">
              <div className="flex flex-col items-center">
                <Podcast />
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-bold text-white mb-2">آواز پرندگان</h3>
                  <p className="text-sm text-white/70">40 دقیقه</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="w-auto">
              <div className="flex flex-col items-center">
                <Podcast />
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-bold text-white mb-2">ریلکسیشن عمیق</h3>
                  <p className="text-sm text-white/70">25 دقیقه</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="w-auto">
              <div className="flex flex-col items-center">
                <Podcast />
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-bold text-white mb-2">موسیقی درمانی</h3>
                  <p className="text-sm text-white/70">35 دقیقه</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="w-auto">
              <div className="flex flex-col items-center">
                <Podcast />
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-bold text-white mb-2">تنفس عمیق</h3>
                  <p className="text-sm text-white/70">10 دقیقه</p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div className="mt-8"></div>

      <BottomNavbar />
    </div>
  );
}
