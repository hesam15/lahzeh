'use client';

import Tabs from "../components/tab/tab";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import Preloader from "../preloader/page";
import { useEffect, useState } from "react";
import BottomNavbar from "../components/bottomNavbar/bottomNavbar";
import { apiRequest } from "../services/apiService";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState(1); // 1 = male, 0 = female



  const registerUser = async () => {
    try {
      const response = await apiRequest({
        method: 'POST',
        endpoint: 'register',
        body: {
          full_name: 'سید علیرضا خاتمی',
          gender: 1,
          phone_number: '09198035171',
          birth_date: '',
          password: '123456789',
          password_confirmation: '123456789',
          country: '+98',
        },
      });

      console.log('ثبت‌نام موفق:', response);
    } catch (error) {
      console.error('خطا در ثبت‌نام:', error);
    }
  };



  useEffect(() => {
    const handleLoad = () => setIsLoading(false);
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, []);



  if (isLoading) {
    return (
      <Preloader />
    );
  }
  const handleClick = () => {
    router.push('/verify');
  };

  const tabs = [
    {
      id: "tab1", label: "ثبت نام", content:
        <div className="flex flex-col items-center justify-center ">
          <Image src="/images/yellow sofa.png" alt="Login Image" className="mt-5" width={250} height={80} />

          <div className="flex items-center bg-[#0000001F] rounded-[5px] p-2 m-2 w-full">
            <input
              className="bg-transparent text-right p-2 w-full text-white text-xs focus:outline-none"
              placeholder="نام کاربری خود را وارد کنید"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="w-[1px] h-6 bg-white mx-2"></div>
            <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z" clipRule="evenodd" />
            </svg>
          </div>

          {/* رمز عبور */}
          <div className="flex items-center bg-[#0000001F] rounded-[5px] p-2 m-2 w-full">
            <input
              type="password"
              className="bg-transparent text-right p-2 w-full text-white text-xs focus:outline-none"
              placeholder="رمز عبور خود را وارد کنید"
              value={password}
              onChange={(e) => setPassword(e.target.value)}

            />
            <div className="w-[1px] h-6 bg-white mx-2"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-5 h-5"
            >
              <path d="M12 2C9.24 2 7 4.24 7 7v3H6c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2h-1V7c0-2.76-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3v3H9V7c0-1.66 1.34-3 3-3zm-6 8h12v8H6v-8zm6 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </div>

          {/* تکرار رمز عبور */}
          <div className="flex items-center bg-[#0000001F] rounded-[5px] p-2 m-2 w-full">
            <input
              type="password"
              className="bg-transparent text-right p-2 w-full text-white text-xs focus:outline-none"
              placeholder="تکرار رمز عبور"
              value={confirmPassword}
            />
            <div className="w-[1px] h-6 bg-white mx-2"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-5 h-5"
            >
              <path d="M12 2C9.24 2 7 4.24 7 7v3H6c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2h-1V7c0-2.76-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3v3H9V7c0-1.66 1.34-3 3-3zm-6 8h12v8H6v-8zm6 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </div>

          {/* تلفن همراه */}
          <div className="flex items-center bg-[#0000001F] rounded-[5px] p-2 m-2 w-full">
            <input
              type="tel"
              className="bg-transparent text-right p-2 w-full text-white text-xs focus:outline-none"
              placeholder="تلفن همراه"
            />
            <div className="w-[1px] h-6 bg-white mx-2"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-5 h-5"
            >
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24a11.72 11.72 0 003.66.59c.55 0 1 .45 1 1V21c0 .55-.45 1-1 1a19.91 19.91 0 01-9-2.39A19.89 19.89 0 012 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.29.2 2.54.59 3.66.12.35.03.75-.24 1.02l-2.2 2.2z" />
            </svg>
          </div>

          <div className="flex items-center bg-[#0000001F] rounded-[5px] p-2 m-2 w-full">
            <input
              type="text"
              className="bg-transparent text-right p-2 w-full text-white text-xs focus:outline-none appearance-none"
              placeholder="تاریخ تولد"
            />
            <div className="w-[1px] h-6 bg-white mx-2"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-5 h-5"
            >
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H5V8h14zm-6-9h2v2h-2zm-4 0h2v2H9zm8 0h2v2h-2zM7 15h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z" />
            </svg>
          </div>


          {/* تاریخ تولد */}

          <div className="flex flex-row w-full">
            <button className=" text-white bg-[#0000001F] rounded-[4px] p-4 my-2  text-xs w-full ml-1">آقا هستم<span className="text-xl ml-3">👨🏻</span></button>
            <button className=" text-white bg-[#0000001F] rounded-[4px] p-4 my-2  text-xs w-full mr-1">خانم هستم<span className="text-xl ml-3">👩🏻</span></button>
          </div>

          <div className="flex flex-row w-full">
            <button
              className="rounded-[4px] p-4 my-2 text-white text-xs w-full bg-[#005C70]"
              onClick={async () => {
                await registerUser();
                handleClick(); // رفتن به صفحه‌ی تأیید
              }}
            >
              ثبت نام
            </button>
          </div>

        </div>
    },
    {
      id: "tab2", label: "ورود", content:
        <div className="flex flex-col items-center justify-center ">
          <Image src="/images/profile.png" alt="Login Image" className="mt-5" width={150} height={80} />

          <div className="flex items-center bg-[#0000001F] rounded-[5px] p-2 m-2 w-full">


            <input
              className="bg-transparent text-right p-2 w-full text-white text-xs focus:outline-none"
              placeholder="نام کاربری خود را وارد کنید"
            />
            <div className="w-[1px] h-6 bg-white mx-2"></div>
            <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z" clipRule="evenodd" />
            </svg>
          </div>

          {/* رمز عبور */}
          <div className="flex items-center bg-[#0000001F] rounded-[5px] p-2 m-2 w-full">
            <input
              type="password"
              className="bg-transparent text-right p-2 w-full text-white text-xs focus:outline-none"
              placeholder="رمز عبور خود را وارد کنید"
            />
            <div className="w-[1px] h-6 bg-white mx-2"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-5 h-5"
            >
              <path d="M12 2C9.24 2 7 4.24 7 7v3H6c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2h-1V7c0-2.76-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3v3H9V7c0-1.66 1.34-3 3-3zm-6 8h12v8H6v-8zm6 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </div>
          <div className="flex flex-row w-full my-4">

            <a className='text-gray-300 text-xs text-right border-b pb-1' href="">رمز عبور یا نام کاربری رو فراموش کردم!</a>
          </div>
          <div className="flex flex-row w-full">
            <button className="rounded-[4px] p-4 m-2 text-white text-xs w-full bg-[#005C70]" onClick={handleClick}>ورود </button>
          </div>



        </div>
    },
  ];

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-3">
      <div className="text-white bg-[#00313CCC] rounded-[9px] p-4 text-right w-full my-4 xl:w-1/3">
        <h4>چرا باید ثبت نام کنم ؟</h4>
        <p className="text-xs mt-4">چون بتونید کاربری بهتر و کاربردی تری رو داشته باشید و بتونید به تمامی فایل ها دسترسی داشته باشید و کاربری بهتری رو تجربه کنید از روی دیگر دسته بندی و کلی خدمات دیگه رو به راحتی بتونیم بهتون ارئه بدیم
          <Image src="/images/Help.png" alt="Login Image" width={50} height={50} />
        </p>
      </div>

      <div className="w-full xl:w-1/3">
        <Tabs tabs={tabs} />
      </div>

      <div className="mt-30"></div>
      <BottomNavbar />

    </div>
  );
}
