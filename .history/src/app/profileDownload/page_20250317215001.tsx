"use client";

import Image from "next/image";
import Footer from "../components/footer/footer";


export default function ProfileDownload() {

  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-3">


      <div className="flex flex-col items-center justify-center bg-[#00313CCC]  w-8/9  xl:w-1/3 mt-3 p-5 rounded-[8px]">
          {/* تصویر فول اسکرین */}
          <Image
            src="/images/vip.png"
            alt="Background Image"
            className=" rounded-[300px]"
            width={200}
            height={200}
          />

        <div className="flex flex-col text-white items-center justify-center">
          <h3 className="text-yellow-500 font-bold text-xl">VIP USER</h3>
          <h2 className="w-full text-right text-2xl text-white ">دریا پناهی </h2>
          <h3 className="text-gray-500">09369491942</h3>
          <h4 className="text-gray-500">User ID : 458922</h4>
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
        
        </div>
      </div>


      <Footer />

    </div>
  );
}
