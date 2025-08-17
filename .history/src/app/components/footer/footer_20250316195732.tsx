// components/Loader.tsx

import React from 'react';
import Image from "next/image";
import "./style.css"
const Footer = () => {
  return (
    <div className="w-full rounded-t-[2-px]">
      <div className='flex flex-col'>
          <Image src="/icons/Customer.png" alt="Login Image" width={50} height={50} />
          <span>پروفایل</span>
      </div>
      <div className='flex flex-col'>
          <Image src="/icons/Customer.png" alt="Login Image" width={50} height={50} />
          <span>خواب</span>
      </div>
      <div className='flex flex-col'>
          <Image src="/icons/Customer.png" alt="Login Image" width={50} height={50} />
          <span>مدیتیشن</span>
      </div>
      <div className='flex flex-col'>
          <Image src="/icons/Customer.png" alt="Login Image" width={50} height={50} />
          <span>جستجو</span>
      </div>
      <div className='flex flex-col'>
          <Image src="/icons/Customer.png" alt="Login Image" width={50} height={50} />
          <span>خانه</span>
      </div>

    </div>
  );
};

export default Footer;
