// components/Loader.tsx

import React from 'react';
import Image from "next/image";
import "./style.css";
import { useRouter } from 'next/navigation';

const Footer = () => {
  const router = useRouter();


  return (
    <div className="w-full xl:w-1/3 fixed flex flex-row rounded-t-[20px] bg-[#98c1d9] items-center justify-center bottom-0">
      <div className='flex flex-col text-white p-4 items-center justify-center' onClick={()=>    router.push('/intro');
}>
        <Image src="/icons/Customer.png" alt="Login Image" width={30} height={30} />
        <span>پروفایل</span>
      </div>
      <div className='flex flex-col text-white p-4 items-center justify-center'>
        <Image src="/icons/Moon and Stars.png" alt="Login Image" width={30} height={30} />
        <span>خواب</span>
      </div>
      <div className='flex flex-col text-white p-4 items-center justify-center'>
        <Image src="/icons/Guru.png" alt="Login Image" width={30} height={30} />
        <span>مدیتیشن</span>
      </div>
      <div className='flex flex-col text-white p-4 items-center justify-center' >
        <Image src="/icons/Search.png" alt="Login Image" width={30} height={30} />
        <span>جستجو</span>
      </div>
      <div className='flex flex-col text-white p-4 items-center justify-center'>
        <Image src="/icons/Home.png" alt="Login Image" width={30} height={30} />
        <span>خانه</span>
      </div>

    </div>
  );
};

export default Footer;
