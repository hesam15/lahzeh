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

        <div className="relative bg-[##1B76FFA1] rounded-[13px] p-5 text-white flex flex-col items-center">
          <span className="text-xs">دانیال عزیز آخرین محتوایی که گوش هات رو بهش سپردی</span>
          <span className="text-sm">“خواب قسمت 6 “</span>
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
