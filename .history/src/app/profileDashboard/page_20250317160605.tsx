"use client";

import Image from "next/image";
import Footer from "../components/footer/footer";
import Podcast from "../components/podcast/podcast";
import { useRef, useEffect } from "react";

export default function ProfileDashboard() {


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

        </div>
        <div className="flex flex-col text-white items-center justify-center">
          <h2 className="w-full text-right text-2xl text-white my-7">دریا پناهی</h2>
          <h3>09369491942</h3>
          <h4>User ID : 458922</h4>
        </div>

        <div className="flex flex-row gap-1 justify-end w-full my-4">
          <button className="bg-[#00333E] rounded-[30px] text-xs text-white py-6  w-1/3 flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 mb-4">
              <rect x="3" y="3" width="7" height="7" rx="1"></rect>
              <rect x="14" y="3" width="7" height="7" rx="1"></rect>
              <rect x="14" y="14" width="7" height="7" rx="1"></rect>
              <rect x="3" y="14" width="7" height="7" rx="1"></rect>
            </svg>
            <span>داشبورد</span>

          </button>
          <button className="bg-[#00333E] rounded-[30px] text-xs text-white py-6  w-1/3 flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-16 h-16 mb-4">
              <path d="M12 3v12"></path>
              <path d="M16 11l-4 4-4-4"></path>
              <path d="M4 20h16"></path>
            </svg>

            <span>دانلود ها</span>

          </button>
          <button className="bg-[#00333E] rounded-[30px] text-xs text-white py-6  w-1/3 flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-16 h-16 mb-4">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"></path>
            </svg>

            <span>علاقه مندی ها</span>

          </button>

        </div>

        <div className="relative bg-[#0466c8] rounded-[13px] p-5 text-white flex flex-col items-center w-full">
          <span className="text-xs">دانیال عزیز آخرین محتوایی که گوش هات رو بهش سپردی</span>
          <span className="text-sm m-4">“خواب قسمت 6 “</span>
          <span className="text-xs">بوده اینجا کلیک کن تابریم به فایل و مسیرت رو ادامه بدی ...</span>



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
            <h4 className="text-right">آخرین فایل های شنیده شده</h4>
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

        <div className="text-white bg-[#00313CCC] rounded-[9px] m-5 xl:m-0 p-4 text-right ">
          <h4>چطور از برنامه استفاده کنم؟</h4>
          <div className="flex flex-row-reverse items-center justify-between">
            <p className="text-xs mt-4">
              دانیال عزیز برای آموزش کامل استفاده از اپ میتونی به راحتی از این قسمت کمک بگیری تا بهترین تجربه کاربری رو داشته باشی            </p>
            <Image src="/images/Help.png" alt="Login Image" width={100} height={100} />

          </div>
        </div>
      </div>


      <Footer />

    </div>
  );
}
