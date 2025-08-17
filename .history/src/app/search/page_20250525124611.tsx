"use client";

// import Podcast from "../components/podcast/podcast";
import { useRef, useEffect, useState } from "react";
import Preloader from "../preloader/page";
import BottomNavbar from "../components/bottomNavbar/bottomNavbar";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Search() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories] = useState([
    "باران", "دریا", "جنگل", "مدیتیشن", "خواب", "ریلکسیشن", "موسیقی"
  ]);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      startX.current = e.pageX - scrollContainer.offsetLeft;
      scrollLeft.current = scrollContainer.scrollLeft;
      scrollContainer.style.cursor = "grabbing";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !scrollContainer) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const move = (x - startX.current) * 2;
      scrollContainer.scrollLeft = scrollLeft.current - move;
    };

    const stopDragging = () => {
      isDragging.current = false;
      if (scrollContainer) scrollContainer.style.cursor = "grab";
    };

    scrollContainer.addEventListener("mousedown", handleMouseDown);
    scrollContainer.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopDragging);

    return () => {
      scrollContainer.removeEventListener("mousedown", handleMouseDown);
      scrollContainer.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDragging);
    };
  }, []);
  
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
    return <Preloader/>;
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-start overflow-y-auto bg-gradient-to-b from-[#001B22] to-[#00333E]">
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          width: 40px !important;
          height: 40px !important;
          background: rgba(255, 255, 255, 0.1) !important;
          backdrop-filter: blur(10px) !important;
          border-radius: 50% !important;
          color: white !important;
          transition: all 0.3s ease !important;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 0.2) !important;
          transform: scale(1.1) !important;
        }

        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 18px !important;
          font-weight: bold !important;
        }

        .swiper-button-disabled {
          opacity: 0.5 !important;
          cursor: not-allowed !important;
        }
      `}</style>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-start w-full"
      >
        <div className="w-full px-4 py-6">
          <div className="flex items-center bg-[#00313C] p-3 w-full rounded-t-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-gray-400 cursor-pointer ml-4"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجوی صداهای آرامش‌بخش..."
              className="bg-transparent outline-none w-full p-2 px-6 text-white placeholder-gray-400 text-right text-sm"
            />
          </div>

          <div className="w-full bg-[#00313C] p-4 rounded-b-xl">
            <div className="flex flex-wrap gap-2 justify-end">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm transition-all duration-300"
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full mt-8">
          <div className="text-white text-right flex flex-col items-center justify-center w-full">
            <div className="flex flex-row-reverse items-center justify-between w-full mb-4 px-4">
              <button className="text-xs bg-[#003844] hover:bg-[#004455] p-3 rounded-[10px] flex-nowrap flex flex-row-reverse items-center justify-center text-white transition-colors duration-300">
                مشاهده همه
              </button>
              <h4 className="text-right text-lg text-white font-bold">آرامش‌بخش‌های محبوب</h4>
            </div>
            <Swiper
              modules={[Navigation]}
              spaceBetween={8}
              slidesPerView={1.4}
              navigation
              className="w-full"
              dir="rtl"
              centeredSlides={true}
              breakpoints={{
                640: {
                  slidesPerView: 1.4,
                  spaceBetween: 8,
                },
                768: {
                  slidesPerView: 1.4,
                  spaceBetween: 8,
                },
                1024: {
                  slidesPerView: 1.4,
                  spaceBetween: 8,
                },
              }}
            >
              <SwiperSlide className="w-auto">
                <div className="flex flex-col items-center">
                  {/* <Podcast /> */}
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-bold text-white mb-2">صدای باران</h3>
                    <p className="text-sm text-white/70">30 دقیقه</p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="w-auto">
                <div className="flex flex-col items-center">
                  {/* <Podcast /> */}
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-bold text-white mb-2">صدای دریا</h3>
                    <p className="text-sm text-white/70">45 دقیقه</p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="w-auto">
                <div className="flex flex-col items-center">
                  {/* <Podcast /> */}
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-bold text-white mb-2">صدای جنگل</h3>
                    <p className="text-sm text-white/70">60 دقیقه</p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="w-auto">
                <div className="flex flex-col items-center">
                  {/* <Podcast /> */}
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-bold text-white mb-2">مدیتیشن صبحگاهی</h3>
                    <p className="text-sm text-white/70">15 دقیقه</p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="w-auto">
                <div className="flex flex-col items-center">
                  {/* <Podcast /> */}
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-bold text-white mb-2">ریلکسیشن عمیق</h3>
                    <p className="text-sm text-white/70">25 دقیقه</p>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>

        <div className="w-full mt-8 mb-[15em]">
          <div className="text-white text-right flex flex-col items-center justify-center w-full">
          <div className="flex flex-row-reverse items-center justify-between w-full mb-4 px-4">
          <button className="text-xs bg-[#003844] hover:bg-[#004455] p-3 rounded-[10px] flex-nowrap flex flex-row-reverse items-center justify-center text-white transition-colors duration-300">
                مشاهده همه
              </button>
              <h4 className="text-right text-lg text-white font-bold">پیشنهاد شده برای شما</h4>
            </div>
            <Swiper
              modules={[Navigation]}
              spaceBetween={8}
              slidesPerView={1.4}
              navigation
              className="w-full"
              dir="rtl"
              centeredSlides={true}
              breakpoints={{
                640: {
                  slidesPerView: 1.4,
                  spaceBetween: 8,
                },
                768: {
                  slidesPerView: 1.4,
                  spaceBetween: 8,
                },
                1024: {
                  slidesPerView: 1.4,
                  spaceBetween: 8,
                },
              }}
            >
              <SwiperSlide className="w-auto">
                <div className="flex flex-col items-center">
                  {/* <Podcast /> */}
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-bold text-white mb-2">آواز پرندگان</h3>
                    <p className="text-sm text-white/70">40 دقیقه</p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="w-auto">
                <div className="flex flex-col items-center">
                  {/* <Podcast /> */}
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-bold text-white mb-2">صدای آبشار</h3>
                    <p className="text-sm text-white/70">35 دقیقه</p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="w-auto">
                <div className="flex flex-col items-center">
                  {/* <Podcast /> */}
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-bold text-white mb-2">موسیقی آرامش‌بخش</h3>
                    <p className="text-sm text-white/70">50 دقیقه</p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="w-auto">
                <div className="flex flex-col items-center">
                  {/* <Podcast /> */}
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-bold text-white mb-2">مدیتیشن عصرگاهی</h3>
                    <p className="text-sm text-white/70">20 دقیقه</p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="w-auto">
                <div className="flex flex-col items-center">
                  {/* <Podcast /> */}
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-bold text-white mb-2">خواب عمیق</h3>
                    <p className="text-sm text-white/70">90 دقیقه</p>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </motion.div>

      <BottomNavbar />
    </div>
  );
}
