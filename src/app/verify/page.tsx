'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import Preloader from "../preloader/page";
import BottomNavbar from "../components/bottomNavbar/bottomNavbar";
import { useRouter } from "next/navigation";
import { Alert } from "../components/alert/alert";
import axios from "axios";
import { API_ENDPOINTS } from '@/app/config/api';
// import { apiHelpers } from '@/app/config/api';

// Firebase imports
import { initializeApp } from "firebase/app";
import { getAuth, PhoneAuthProvider, signInWithCredential } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBR-qqolkE6QL_TQH4_2wVmbrU7-SqXr0w",
  authDomain: "lahzeh-bdef8.firebaseapp.com",
  projectId: "lahzeh-bdef8",
  storageBucket: "lahzeh-bdef8.firebasestorage.app",
  messagingSenderId: "520126430900",
  appId: "1:520126430900:web:b2f9642ccb0165602921e1"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// تابع بهبود یافته برای تشخیص شماره ایرانی
const detectIranianPhone = (phoneNumber: string, countryCode: string | null = null): boolean => {
  // اگر کد کشور موجود باشه، از اون استفاده کن
  if (countryCode) {
    return countryCode === '98' || countryCode === '+98';
  }
  
  // حذف علائم اضافی و فاصله‌ها
  const normalized = phoneNumber.replace(/[\s\-\(\)\+]/g, '');
  
  // بررسی انواع مختلف فرمت شماره ایرانی
  const iranianPatterns = [
    /^98\d{10}$/,        // +98xxxxxxxxxx
    /^0098\d{10}$/,      // 0098xxxxxxxxxx
    /^09\d{9}$/,         // 09xxxxxxxxx
    /^9\d{9}$/           // 9xxxxxxxxx (بدون صفر)
  ];
  
  return iranianPatterns.some(pattern => pattern.test(normalized));
};

interface ApiResponse {
  token?: string;
  message?: string;
}

export default function Verify() {
  const [isLoading, setIsLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success">("error");
  const [isIran, setIsIran] = useState(true);
  const [verificationId, setVerificationId] = useState('');

  const router = useRouter();

  useEffect(() => {
    const savedPhone = localStorage.getItem('userPhone');
    const savedCountryCode = localStorage.getItem('userCountryCode');
    const savedVerificationId = localStorage.getItem('verificationId');
    
    if (!savedPhone) {
      setMessageType('error');
      setMessage('لطفاً ابتدا شماره تلفن خود را وارد کنید.');
      setShow(true);
      setTimeout(() => router.push('/login'), 2000);
    } else {
      setPhoneNumber(savedPhone);
      
      // تشخیص شماره ایرانی یا غیرایرانی با استفاده از کد کشور ذخیره شده
      const isIranianPhone = detectIranianPhone(savedPhone, savedCountryCode);
      setIsIran(isIranianPhone);
      
      console.log('Phone:', savedPhone, 'Country Code:', savedCountryCode, 'Is Iran:', isIranianPhone);
      
      // اگر شماره غیرایرانی است، verificationId را بازیابی کن
      if (!isIranianPhone && savedVerificationId) {
        setVerificationId(savedVerificationId);
      }
    }

    const handleLoad = () => setIsLoading(false);
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, [router]);

  if (isLoading) {
    return <Preloader />;
  }

  // تایید کد برای شماره ایرانی
  const verifyIranOtp = async (): Promise<void> => {
    try {
      const response = await axios.post<ApiResponse>(API_ENDPOINTS.otpVerify(), {
        phone_number: phoneNumber,
        code: code,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const statusCode = response?.status;
      const data = response?.data;

      if (statusCode === 200) {
        const token = data?.token;
        if (token) {
          localStorage.setItem("token", token);
        }
        setMessageType('success');
        setMessage('کد با موفقیت تأیید شد.');
        setShow(true);
        setTimeout(() => router.push('/home'), 2000);
        return;
      }

      setMessageType('error');
      setMessage(data?.message || 'تأیید ناموفق بود.');
      setShow(true);
    } catch (err) {
      let errorMessage = 'خطای ناشناخته در تأیید کد.';
      
      if (axios.isAxiosError(err) && err.response) {
        const statusCode = err.response.status;
        errorMessage = err.response.data?.message || 'مشکلی در تأیید کد پیش آمده است.';
        
        if (statusCode === 401) {
          console.warn('نیاز به تأیید مجدد یا ثبت‌نام!');
        }
      }
      
      setMessageType('error');
      setMessage(errorMessage);
      setShow(true);
    }
  };

  // تایید کد برای شماره غیرایرانی با Firebase و ارسال idToken به بک‌اند
  const verifyFirebaseOtp = async (): Promise<void> => {
    if (!verificationId) {
      setMessageType('error');
      setMessage('شناسه تایید (verificationId) موجود نیست. لطفاً مجدداً ثبت‌نام کنید.');
      setShow(true);
      return;
    }
    
    try {
      // ساخت credential و ورود با Firebase
      const credential = PhoneAuthProvider.credential(verificationId, code);
      const userCredential = await signInWithCredential(auth, credential);
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      // ارسال idToken به بک‌اند برای دریافت JWT
      const response = await axios.post<ApiResponse>(API_ENDPOINTS.otpFirebaseVerify(), {
        idToken: idToken,
        phone_number: phoneNumber,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const statusCode = response?.status;
      const data = response?.data;

      if (statusCode === 200) {
        const token = data?.token;
        if (token) {
          localStorage.setItem("token", token);
        }
        setMessageType('success');
        setMessage('شماره با موفقیت تایید شد.');
        setShow(true);
        setTimeout(() => router.push('/home'), 2000);
        return;
      }

      setMessageType('error');
      setMessage(data?.message || 'تأیید ناموفق بود.');
      setShow(true);
    } catch {
      setMessageType('error');
      setMessage('کد وارد شده صحیح نیست یا منقضی شده است.');
      setShow(true);
    }
  };

  const otpHandler = async (): Promise<void> => {
    if (!phoneNumber) {
      setMessageType('error');
      setMessage('شماره تلفن معتبر نیست. لطفاً دوباره وارد شوید.');
      setShow(true);
      return;
    }

    // اعتبارسنجی کد بر اساس نوع شماره (ایرانی: 4 رقم، غیرایرانی: 6 رقم)
    if (!code.match(isIran ? /^\d{4}$/ : /^\d{6}$/)) {
      setMessageType('error');
      setMessage(isIran ? 'کد تأیید باید 4 رقم باشد.' : 'کد تأیید باید 6 رقم باشد.');
      setShow(true);
      return;
    }

    // انتخاب روش تایید بر اساس نوع شماره
    if (isIran) {
      await verifyIranOtp();
    } else {
      await verifyFirebaseOtp();
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.replace(/\D/g, "").slice(0, isIran ? 4 : 6);
    setCode(value);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-3">
      <Alert
        message={message}
        type={messageType}
        show={show}
        onClose={() => setShow(false)}
        duration={4000}
      />

      <div className="text-white bg-[#00313CCC] rounded-[9px] m-5 xl:m-0 p-4 text-right w-8/9 xl:w-1/3">
        <h4>احراز هویت تلفن همراه برای چیست؟</h4>
        <p className="text-base mt-4">
          این احراز هویت برای آن است که مطمئن شویم تلفن همراهی که کاربران وارد می‌کنند دسترسی به آن فقط برای خودشان است تا افراد سوءاستفاده‌گر و سودجو نتوانند از شماره تلفن شما یا دیگران برای ثبت‌نام در این پلتفرم یا دیگر پلتفرم‌ها استفاده کنند.
          <Image src="/images/Help.png" alt="Help Image" width={50} height={50} />
        </p>
      </div>

      <div className="flex flex-col items-center justify-center bg-[#00313CCC] w-8/9 xl:w-1/3 mt-3 p-5 rounded-[8px]">
        <Image src="/images/speech.png" alt="Verify Image" width={150} height={80} />

        {/* نمایش شماره تلفن به‌صورت غیرقابل ویرایش */}
        <div className="flex items-center bg-[#0000001F] rounded-[5px] p-2 m-2 w-full">
          <input
            className="bg-transparent text-right p-2 w-full text-white text-base focus:outline-none"
            value={phoneNumber}
            readOnly
            type="text"
          />
          <div className="w-[1px] h-6 bg-white mx-2"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-6 h-6"
          >
            <path d="M6.62 10.79a15.93 15.93 0 006.59 6.59l2.2-2.2a1 1 0 011.39-.13l3.16 2.11a1 1 0 01.32 1.39l-1.43 2.86a1 1 0 01-1.39.32A17.93 17.93 0 013.1 5.58a1 1 0 01.32-1.39l2.86-1.43a1 1 0 011.39.32l2.11 3.16a1 1 0 01-.13 1.39l-2.2 2.2z" />
          </svg>
        </div>

        {/* فیلد ورود کد تایید */}
        <div className="flex items-center bg-[#0000001F] rounded-[5px] p-2 m-2 w-full">
          <input
            className="bg-transparent text-right p-2 w-full text-white text-base focus:outline-none"
            placeholder={isIran ? "کد 4 رقمی احراز هویت را وارد کنید" : "کد 6 رقمی احراز هویت را وارد کنید"}
            value={code}
            onChange={handleCodeChange}
            inputMode="numeric"
            maxLength={isIran ? 4 : 6}
            type="text"
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

        {/* دکمه تایید */}
        <div className="flex flex-row w-full">
          <button
            className="rounded-[4px] p-4 my-2 text-white text-base w-full bg-[#005C70] hover:bg-[#004A5C] transition-colors duration-200 disabled:opacity-50"
            onClick={otpHandler}
            disabled={code.length !== (isIran ? 4 : 6)}
            type="button"
          >
            اعتبار سنجی و تکمیل ثبت‌نام
          </button>
        </div>

        {/* نمایش راهنمای کد */}
        <div className="text-center mt-2 text-gray-300 text-sm">
          {isIran ? 
            "کد 4 رقمی ارسال شده به شماره شما را وارد کنید" : 
            "کد 6 رقمی ارسال شده به شماره شما را وارد کنید"
          }
        </div>

        {/* نمایش نوع شماره برای دیباگ */}
        <div className="text-center mt-1 text-gray-400 text-xs">
          {isIran ? '🇮🇷 شماره ایرانی' : '🌍 شماره خارجی'}
        </div>
      </div>

      <div className="mt-30"></div>
      <BottomNavbar />
    </div>
  );
}