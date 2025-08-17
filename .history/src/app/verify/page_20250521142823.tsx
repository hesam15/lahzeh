"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Preloader from "../preloader/page";
import BottomNavbar from "../components/bottomNavbar/bottomNavbar";
import { useRouter } from "next/navigation";
import { Alert } from "../components/alert/alert";
import axios from "axios";

export default function Verify() {



  const [isLoading, setIsLoading] = useState(true);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");



  const router = useRouter();



  useEffect(() => {

    const savedPhone = localStorage.getItem('userPhone');
    if (savedPhone) {
      setPhone(savedPhone);
    }

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

  const otpHandler = async () => {
    console.log('شروع تایید کد...');

    try {
      const response = await axios.post('https://api.lahzeh.me/api/user/otp-verify', {
        phone_number: phone,
        code: code,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      console.log('پاسخ دریافتی از سرور:', response);

      const statusCode = response?.status;
      const data = response?.data;

      if (statusCode === 200) {
        const token = data?.token;

        if (token) {
          localStorage.setItem('token', token);
        }

        setMessageType('success');
        setMessage('کد با موفقیت تایید شد.');
        setShow(true);
        router.push('/home');
        return;
      }

      setMessageType('error');
      setMessage(data?.message || 'تایید ناموفق بود.');
      setShow(true);

    } catch (error: unknown) {
      console.error('خطا در تایید کد:', error);

      if (axios.isAxiosError(error) && error.response) {
        const statusCode = error.response.status;
        const message = error.response.data?.message || 'مشکلی در تایید کد پیش آمده است.';

        setMessageType('error');
        setMessage(message);

        // مثال: شرط خاص برای 401
        if (statusCode === 401) {
          console.warn('نیاز به تایید مجدد یا ثبت‌نام!');
          // مثلاً هدایت به صفحه ثبت‌نام
        }

      } else {
        setMessageType('error');
        setMessage('خطای ناشناخته در تایید کد.');
      }

      setShow(true);
    }
  };



  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-3">

      <Alert
        type={messageType}           // نوع: success | error | warning | info
        message={message}  // پیام
        show={show}         // آیا نمایش داده شود؟
        onClose={() => setShow(false)} // بستن
        duration={4000}          // اختیاری: خودکار بسته شود (ms)
      />

      <div className="text-white bg-[#00313CCC] rounded-[9px] m-5 xl:m-0 p-4 text-right w-8/9 xl:w-1/3">
        <h4>احراز هویت تلفن همراه برای چیست ؟</h4>
        <p className="text-xs mt-4">این احراز هویت برای آن است که مطمئین شویم تلفن همراهی که کاربران وارد میکنند دسترسی به آن فقط برای خودشان است تا افراد سو استفاده گر و سودجو نتوانند از شماره تلفن شما یا دیگران برای ثبت نام در این پلتفرم یا دیگر پلتفرم ها استفاده کنند.
          <Image src="/images/Help.png" alt="Login Image" width={50} height={50} />
        </p>
      </div>

      <div className="flex flex-col items-center justify-center bg-[#00313CCC]  w-8/9  xl:w-1/3 mt-3 p-5 rounded-[8px]">
        <Image src="/images/speech.png" alt="Login Image" width={150} height={80} />

        <div className="flex items-center bg-[#0000001F] rounded-[5px] p-2 m-2 w-full">


          <input
            className="bg-transparent text-right p-2 w-full text-white text-xs focus:outline-none"
            placeholder="کد 5 رقمی احراز هویت را وارد کنید"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <div className="w-[1px] h-6 bg-white mx-2"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-6 h-6"
          >
            <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 12H4V8l8 5 8-5v8zm-8-6L4 6h16l-8 4z" />
          </svg>

        </div>


        <div className="flex flex-row w-full">
          <button className="rounded-[4px] p-4 my-2 text-white text-xs w-full bg-[#005C70]" onClick={async () => {
            await otpHandler();
          }}>اعتبار سنجی و تکمیل ثبت نام </button>
        </div>



      </div>

      <div className="mt-30"></div>

      <BottomNavbar />

    </div>
  );
}
