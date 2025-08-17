// components/Loader.tsx

import React from 'react';
import Image from "next/image";
import "./style.css"
const Footer = () => {
  return (
    <div className="w-full rounded-t-[2-px]">
      <div className='flex flex-col'>
          <Image src="/icons/Customer.png" alt="Login Image" width={50} height={50} />
          <span></span>
      </div>

    </div>
  );
};

export default Footer;
