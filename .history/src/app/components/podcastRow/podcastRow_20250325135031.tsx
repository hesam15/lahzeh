// components/Loader.tsx
"use client";

import React from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
const PodcastRow = () => {

const router = useRouter();

  const handleClick = () => {
    router.push('/player');
  };



  return (
    <div className="rounded-[10px] w-full p-1 text-right text-[#5e6472] flex flex-row-reverse m-3" style={{background: "#00000082"}} onClick={handleClick}>
      <Image
        src="/images/pod.jpg"
        alt="Login Image"
        width={100}
        height={100}
        className="rounded-[10px] h-[100px] w-[100px] object-cover"
      />
      <div className='mr-3'>
        <div className='my-1'>
          <h2 className='text-white text-sm font-bold'>نام فایل</h2>
          <span className='text-[10px] text-right py-3 text-white'>این متن به عنوان نمونه برای توضیح صدا در نظر گرفته شده است و ترجیحات دوخط است.</span>
        </div>
        <div className='flex flex-row items-right w-full justify-end border-t'>
          <div className='flex flex-row m-1 text-gray-500 text-xs flex-nowrap'>
            بهمن ۱۴۰۳
          </div>
         <>


        </div>
      </div>


    </div>
  );
};

export default PodcastRow;
