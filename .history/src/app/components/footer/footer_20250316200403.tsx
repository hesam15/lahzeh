// components/Loader.tsx

import React from 'react';
import Image from "next/image";
import "./style.css"
const Footer = () => {
  return (
    <div className="w-full fixed flex flex-row rounded-t-[20px] bg-[#00293299] items-center justify-center bottom-0">
      <div className='flex flex-col text-white p-4'>
          <Image src="/icons/Customer.png" alt="Login Image" width={50} height={50} />
          <span>پروفایل</span>
      </div>
      <div className='flex flex-col text-white p-4'>
          <Image src="/icons/Moon and Stars.png" alt="Login Image" width={50} height={50} />
          <span>خواب</span>
      </div>
      <div className='flex flex-col text-white p-4'>
          <Image src="/icons/Guru.png" alt="Login Image" width={50} height={50} />
          <span>مدیتیشن</span>
      </div>
      <div className='flex flex-col text-white p-4'>
          <Image src="/icons/Search.png" alt="Login Image" width={50} height={50} />
          <span>جستجو</span>
      </div>
      <div className='flex flex-col text-white p-4'>
          <Image src="/icons/Home.png" alt="Login Image" width={50} height={50} />
          <span>خانه</span>
      </div>

    </div>
  );
};

export default Footer;
