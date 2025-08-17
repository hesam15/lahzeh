"use client";

import Image from "next/image";
import Footer from "../components/footer/footer";
import Podcast from "../components/podcast/podcast";
import { useRef, useEffect } from "react";

export default function profileDashboard() {


  const scrollRef = useRef<HTMLDivElement>(null);
  let isDragging = false;
  let startX: number;
  let scrollLeft: number;

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.pageX - scrollContainer.offsetLeft;
      scrollLeft = scrollContainer.scrollLeft;
      scrollContainer.style.cursor = "grabbing";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !scrollContainer) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const move = (x - startX) * 2; // تنظیم سرعت حرکت
      scrollContainer.scrollLeft = scrollLeft - move;
    };

    const stopDragging = () => {
      isDragging = false;
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
  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-3">


      <div className="flex flex-col items-center justify-center bg-[#00313CCC]  w-8/9  xl:w-1/3 mt-3 p-5 rounded-[8px]">
        <div className="relative w-full h-[300px]">
          {/* تصویر فول اسکرین */}
          <Image
            src="/images/meditating.jpg"
            alt="Background Image"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
          />

          {/* فیلتر گرادینت با کاهش Opacity از بالا به پایین */}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-#00313ccc"></div>
        </div>
        <h2 className="w-full text-right text-2xl text-white my-7">شب بخیر دریا </h2>

        <div className="flex flex-wrap gap-1 justify-end">
          <button className="bg-[#00333E] rounded-[30px] text-xs text-white py-2 px-6">دسته بندی</button>
          <button className="bg-[#00333E] rounded-[30px] text-xs text-white py-2 px-6">دسته بندی</button>
          <button className="bg-[#00333E] rounded-[30px] text-xs text-white py-2 px-6">دسته بندی</button>
          <button className="bg-[#00333E] rounded-[30px] text-xs text-white py-2 px-6">دسته بندی</button>
          <button className="bg-[#00333E] rounded-[30px] text-xs text-white py-2 px-6">دسته بندی</button>
          <button className="bg-[#00333E] rounded-[30px] text-xs text-white py-2 px-6">دسته بندی</button>
          <button className="bg-[#00333E] rounded-[30px] text-xs text-white py-2 px-6">دسته بندی</button>
          <button className="bg-[#00333E] rounded-[30px] text-xs text-white py-2 px-6">دسته بندی</button>
          <button className="bg-[#00333E] rounded-[30px] text-xs text-white py-2 px-6">دسته بندی</button>
          <button className="bg-[#00333E] rounded-[30px] text-xs text-white py-2 px-6">دسته بندی</button>

        </div>
        <span className="w-full text-white text-right text-xs my-4">اولین باره میخوای مدیتیشن کنی ؟ <a href="" className="text-sm">از اینجا شروع کن</a></span>

        <div className="relative bg-[#00627747] rounded-[13px] p-5 text-white flex flex-col items-center">
          <span>همین الان بگو بهم چه حسی داری؟</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-6 h-6 absolute left-0 top-0 m-2"
          >
            <path
              fillRule="evenodd"
              d="M6.225 4.811a1 1 0 0 1 1.414 0L12 9.172l4.361-4.361a1 1 0 0 1 1.414 1.414L13.414 10.586l4.361 4.361a1 1 0 0 1-1.414 1.414L12 12l-4.361 4.361a1 1 0 0 1-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 0 1 0-1.414Z"
              clipRule="evenodd"
            />
          </svg>



          <div className="flex flex-row mt-4">
            <Image src="/icons/grinning face emoji.svg" alt="Login Image" width={80} height={80} />
            <Image src="/icons/neutral face emoji.svg" alt="Login Image" width={80} height={80} />
            <Image src="/icons/pleading face emoji.svg" alt="Login Image" width={80} height={80} />
            <Image src="/icons/sleepy face emoji.svg" alt="Login Image" width={80} height={80} />
            <Image src="/icons/slightly smiling face emoji.svg" alt="Login Image" width={80} height={80} />

          </div>

        </div>

        <div className="text-white text-right my-6 flex flex-col items-center justify-center w-full ">
          <div className="flex flex-row items-center justify-between w-full">
            <button className="text-xs bg-[#43aa8b] p-3 rounded-[10px] flex-nowrap flex flex-row-reverse items-center justify-center">مشاهده همه

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 rotate-180"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </button>
            <h4 className="text-right">آرامش‌بخش‌های محبوب</h4>
          </div>
          <div
            ref={scrollRef}
            className="flex flex-row overflow-x-auto scrollbar-none w-full max-w-[90%] cursor-grab select-none">
            <Podcast />
            <Podcast />
            <Podcast />
            <Podcast />
            <Podcast />
          </div>
        </div>
        <div className="text-white text-right my-6 flex flex-col items-center justify-center w-full ">
          <div className="flex flex-row items-center justify-between w-full">
            <button className="text-xs bg-[#43aa8b] p-3 rounded-[10px] flex-nowrap flex flex-row-reverse items-center justify-center">مشاهده همه

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 rotate-180"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </button>
            <h4 className="text-right">آرامش‌بخش‌های محبوب</h4>
          </div>
          <div
            ref={scrollRef}
            className="flex flex-row overflow-x-auto scrollbar-none w-full max-w-[90%] cursor-grab select-none">
            <Podcast />
            <Podcast />
            <Podcast />
            <Podcast />
            <Podcast />
          </div>
        </div>

      </div>
      <Footer />

    </div>
  );
}
