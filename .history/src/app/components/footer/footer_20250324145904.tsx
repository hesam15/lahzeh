'use client';

import React from 'react';
import Image from "next/image";
import "./style.css";
import { useRouter } from 'next/navigation';

const Footer = () => {
  const router = useRouter();


  return (
    <div className="w-full xl:w-1/3 fixed flex flex-row-reverse rounded-t-[20px] bg-[#00293299] items-center justify-center bottom-0">
      <div className='flex flex-col text-white p-4 items-center justify-center' onClick={()=>router.push('/profileDashboard')}>
        <Image src="/icons/Customer.png" alt="Login Image" width={30} height={30} />
        <span className='text-xs'>پروفایل</span>
      </div>
      <div className='flex flex-col text-white p-4 items-center justify-center' onClick={()=>router.push('/profileDashboard')}>
        <Image src="/icons/Moon and Stars.png" alt="Login Image" width={30} height={30} />
        <span>خواب</span>
      </div>
      <div className='flex flex-col text-white p-4 items-center justify-center' onClick={()=>router.push('/player')}>
        <Image src="/icons/Guru.png" alt="Login Image" width={30} height={30} />
        <span>مدیتیشن</span>
      </div>
      <div className='flex flex-col text-white p-4 items-center justify-center' onClick={()=>router.push('/search')}>
        <Image src="/icons/Search.png" alt="Login Image" width={30} height={30} />
        <span>جستجو</span>
      </div>
      <div className='flex flex-col text-white p-4 items-center justify-center' onClick={()=>router.push('/home')}>
        <Image src="/icons/Home.png" alt="Login Image" width={30} height={30} />
        <span>خانه</span>
      </div>

    </div>
  );
};

export default Footer;
