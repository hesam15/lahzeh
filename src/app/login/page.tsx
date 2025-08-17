'use client';

import Tabs from '../components/tab/tab';
import Image from 'next/image';
import Preloader from '../preloader/page';
import { useEffect, useState, useRef, useCallback } from 'react';
import BottomNavbar from '@/app/components/bottomNavbar/bottomNavbar';
import { Alert } from '@/app/components/alert/alert';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import CountryCodeSelector, { getCountryCode } from '@/app/components/CountryCodeSelector';
import { HiEye, HiEyeSlash } from 'react-icons/hi2';
import { debounce } from 'lodash';
import { API_ENDPOINTS } from '@/app/config/api';
// import { apiHelpers } from '@/app/config/api';

// Firebase imports
import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';

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

interface ApiResponse {
  token?: string;
  message?: string;
}

type MessageType = 'error' | 'success' | 'info';

export default function Login() {
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState("IR");
  const [gender, setGender] = useState(1);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<MessageType>('error');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // Remove activeTab state management since Tabs component handles it internally
  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);
  const isInitializing = useRef(false);
  const router = useRouter();

  useEffect(() => {
    const handleLoad = () => setIsLoading(false);
    if (typeof document !== 'undefined' && document.readyState === 'complete') {
      handleLoad();
    } else if (typeof window !== 'undefined') {
      window.addEventListener('load', handleLoad);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('load', handleLoad);
      }
    };
  }, []);

  const initializeRecaptcha = useCallback(async (): Promise<void> => {
    if (typeof window === 'undefined') return;

    const container = document.getElementById('recaptcha-container');
    if (!container) {
      console.error('Recaptcha container not found');
      return;
    }

    if (isInitializing.current) return;
    if (recaptchaRef.current) {
      setIsRecaptchaReady(true);
      return;
    }

    try {
      isInitializing.current = true;
      container.innerHTML = '';

      recaptchaRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          console.log('Recaptcha solved');
        },
        'expired-callback': () => {
          console.log('Recaptcha expired');
          setIsRecaptchaReady(false);
        },
        'error-callback': (error: Error) => {
          console.error('Recaptcha error:', error);
          setIsRecaptchaReady(false);
        }
      });

      await recaptchaRef.current.render();
      setIsRecaptchaReady(true);
      console.log('Recaptcha initialized successfully');
    } catch (error) {
      console.error('Error initializing recaptcha:', error);
      setIsRecaptchaReady(false);
      recaptchaRef.current = null;
    } finally {
      isInitializing.current = false;
    }
  }, []);

  const cleanupRecaptcha = useCallback((): void => {
    if (recaptchaRef.current) {
      try {
        recaptchaRef.current.clear();
      } catch (error) {
        console.error('Error clearing recaptcha:', error);
      }
      recaptchaRef.current = null;
      setIsRecaptchaReady(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        initializeRecaptcha();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading, initializeRecaptcha]);

  useEffect(() => {
    return () => {
      cleanupRecaptcha();
    };
  }, [cleanupRecaptcha]);

  const normalizePhoneNumber = (phoneNumber: string): string => {
    const normalized = phoneNumber.replace(/^0+/, '').replace(/\D/g, '');
    if (!normalized) {
      throw new Error('شماره تلفن معتبر نیست.');
    }
    return normalized;
  };

  // تابع بهبود یافته برای ذخیره اطلاعات تلفن
  const handleSavePhone = (phone: string, countryCode: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userPhone', phone);
      localStorage.setItem('userCountryCode', countryCode); // ذخیره کد کشور
    }
  };

  const registerUser = async (): Promise<void> => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const normalizedPhone = normalizePhoneNumber(phone);
      if (!normalizedPhone.match(/^\d{9,12}$/)) {
        setMessageType('error');
        setMessage('شماره تلفن باید بین 9 تا 12 رقم باشد (بدون صفر ابتدایی).');
        setShow(true);
        return;
      }

      const countryCode = getCountryCode(selectedCountry);
      const phoneNumber = normalizedPhone;

      const response = await axios.post<ApiResponse>(API_ENDPOINTS.register(), {
        full_name: username,
        gender: gender,
        phone_number: phoneNumber,
        country: countryCode,
        birth_date: `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year.padStart(4, '0')}`,
        password: password,
        password_confirmation: confirmPassword,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (response.status === 200) {
        Cookies.set('access_token', response.data?.token || '', {
          expires: 7,
          path: '/',
          secure: true,
          sameSite: 'Strict',
        });

        // ذخیره هم شماره و هم کد کشور
        handleSavePhone(phoneNumber, countryCode);

        if (selectedCountry !== 'IR' && !phoneNumber.startsWith('98')) {
          if (!recaptchaRef.current || !isRecaptchaReady) {
            setMessageType('error');
            setMessage('Recaptcha آماده نیست. لطفا کمی صبر کنید و دوباره تلاش کنید.');
            setShow(true);
            return;
          }

          try {
            const fullPhone = `+${countryCode}${phoneNumber}`;
            console.log('Sending SMS to:', fullPhone);
            const confirmationResult: ConfirmationResult = await signInWithPhoneNumber(auth, fullPhone, recaptchaRef.current);
            localStorage.setItem('verificationId', confirmationResult.verificationId);
            console.log('SMS sent successfully');
          } catch (smsError: any) {
            console.error('SMS sending error:', smsError);
            setMessageType('error');
            setMessage(
              smsError.code === 'auth/too-many-requests'
                ? 'تعداد درخواست‌ها بیش از حد است. لطفاً چند دقیقه صبر کنید.'
                : 'خطا در ارسال کد تأیید. لطفاً دوباره تلاش کنید.'
            );
            setShow(true);
            return;
          }
        }

        router.push('/verify');
      } else {
        setMessageType('error');
        setMessage(response.data?.message || 'ثبت‌نام ناموفق بود.');
        setShow(true);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessageType('error');
      setMessage('خطا در ثبت‌نام.');
      setShow(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const debouncedRegisterUser = debounce(registerUser, 1000);

  const loginUser = async (): Promise<void> => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const normalizedPhone = normalizePhoneNumber(phone);
      if (!normalizedPhone.match(/^\d{9,12}$/)) {
        setMessageType('error');
        setMessage('شماره تلفن باید بین 9 تا 12 رقم باشد (بدون صفر ابتدایی).');
        setShow(true);
        return;
      }

      const phoneNumber = normalizedPhone;
      const countryCode = getCountryCode(selectedCountry);
      const fullPhoneNumber = `${countryCode}${phoneNumber}`;
      
      const response = await axios.post<ApiResponse>(API_ENDPOINTS.login(), {
        phone_number: fullPhoneNumber,
        password: password
      });      const statusCode = response?.status;
      const data = response?.data;

      if (statusCode === 200) {
        Cookies.set('access_token', data?.token || '', {
          expires: 7,
          path: '/',
          secure: true,
          sameSite: 'Strict',
        });

        setMessageType('success');
        setMessage('ورود با موفقیت انجام شد.');
        setShow(true);
        // ذخیره هم شماره و هم کد کشور
        handleSavePhone(phoneNumber, countryCode);
        router.push('/home');
      } else {
        setMessageType('error');
        setMessage(data?.message || 'ورود ناموفق بود.');
        setShow(true);
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const statusCode = err.response.status;
        const message = err.response.data?.message || err.message;

        if (statusCode === 401) {
          setMessageType('info');
          setMessage('شماره شما نیاز به تأیید دارد.');
          setShow(true);
          router.push('/verify');
        } else {
          setMessageType('error');
          setMessage(message);
        }
      } else {
        setMessageType('error');
        setMessage('مشکلی در ورود پیش آمده است.');
      }
      setShow(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDay(e.target.value.replace(/\D/g, '').slice(0, 2));
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMonth(e.target.value.replace(/\D/g, '').slice(0, 2));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setYear(e.target.value.replace(/\D/g, '').slice(0, 4));
  };

  const tabsData = [
    {
      id: 'tab1',
      label: 'ثبت نام',
      content: (
        <div className="flex flex-col items-center justify-center max-w-full">
          <Image
            src="/images/yellow sofa.png"
            alt="Login Image"
            className="mt-5 max-w-full h-auto"
            width={250}
            height={80}
          />

          <div className="flex items-center bg-[#0000001F] rounded-[5px] p-2 m-2 w-full max-w-full">
            <input
              type="text"
              className="bg-transparent text-right p-2 w-full text-white text-base focus:outline-none"
              placeholder="نام و نام خانوادگی خود را وارد کنید"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="w-[1px] h-6 bg-white mx-2"></div>
            <svg
              className="w-5 h-5 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="white"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 1 1 4 4v1a2 2 0 0 1-2 2h-4.535Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div className="flex items-center bg-[#0000001F] rounded-[5px] p-2 m-2 w-full max-w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              className="bg-transparent text-right p-2 w-full text-white text-base focus:outline-none"
              placeholder="رمز عبور خود را وارد کنید"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-white focus:outline-none"
            >
              {showPassword ? (
                <HiEyeSlash className="w-5 h-5" />
              ) : (
                <HiEye className="w-5 h-5" />
              )}
            </button>
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

          <div className="flex items-center bg-[#0000001F] rounded-[5px] p-2 m-2 w-full max-w-full">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className="bg-transparent text-right p-2 w-full text-white text-base focus:outline-none"
              placeholder="تکرار رمز عبور"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-white focus:outline-none"
            >
              {showConfirmPassword ? (
                <HiEyeSlash className="w-5 h-5" />
              ) : (
                <HiEye className="w-5 h-5" />
              )}
            </button>
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

          <CountryCodeSelector
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            phone={phone}
            setPhone={setPhone}
          />

          <div className="flex items-center bg-[#0000001F] rounded-[5px] m-2 p-2 w-full max-w-full">
            <div className="flex w-full text-white">
              <input
                type="text"
                inputMode="numeric"
                placeholder="روز"
                value={day}
                onChange={handleDayChange}
                className="bg-transparent border-l border-[#ffffff59] px-2 py-1 text-base w-1/4 text-center"
              />
              <input
                type="text"
                inputMode="numeric"
                placeholder="ماه"
                value={month}
                onChange={handleMonthChange}
                className="bg-transparent border-l border-[#ffffff59] px-2 py-1 text-base w-1/4 text-center"
              />
              <input
                type="text"
                inputMode="numeric"
                placeholder="سال"
                value={year}
                onChange={handleYearChange}
                className="bg-transparent px-2 py-1 text-base w-1/2 text-center"
              />
            </div>
            <div className="w-[1px] h-6 bg-white mx-2"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-5 h-5"
            >
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H5V8h14v13zm-6-9h2v2h-2v-2zm-4 0h2v2H9v-2zm8 0h2v2H4v-2zM7 15h2v2H7v-2zm4 0h2v2H4v-2zm4 0h2v2H4v-2z" />
            </svg>
          </div>

          <div className="flex flex-row w-full max-w-full">
            <button
              type="button"
              className={`rounded-[4px] p-4 my-2 text-base w-full ml-1 text-white ${gender === 1 ? 'bg-[#2D2D2D]' : 'bg-[#0000001F]'}`}
              onClick={() => setGender(1)}
            >
              آقا هستم<span className="text-xl ml-3">👨🏻</span>
            </button>
            <button
              type="button"
              className={`rounded-[4px] p-4 my-2 text-base w-full mr-1 text-white ${gender === 0 ? 'bg-[#2D2D2D]' : 'bg-[#0000001F]'}`}
              onClick={() => setGender(0)}
            >
              خانم هستم<span className="text-xl ml-3">👩🏻</span>
            </button>
          </div>

          <div className="flex flex-row w-full max-w-full">
            <button
              type="button"
              className="rounded-[4px] p-4 my-2 text-white text-base w-full bg-[#005C70] disabled:opacity-50"
              onClick={debouncedRegisterUser}
              disabled={isSubmitting || (selectedCountry !== 'IR' && !isRecaptchaReady)}
            >
              {isSubmitting ? 'در حال پردازش...' : 'ثبت نام و ارسال کد تایید'}
              {selectedCountry !== 'IR' && !isRecaptchaReady && (
                <span className="text-xs block">در حال آماده سازی...</span>
              )}
            </button>
          </div>
          <div id="recaptcha-container" style={{ display: 'none' }}></div>
        </div>
      ),
    },
    {
      id: 'tab2',
      label: 'ورود',
      content: (
        <div className="flex flex-col items-center justify-center max-w-full">
          <Image
            src="/images/profile.png"
            alt="Login Image"
            className="mt-5 max-w-full h-auto"
            width={150}
            height={80}
          />

          <CountryCodeSelector
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            phone={phone}
            setPhone={setPhone}
          />

          <div className="flex items-center bg-[#0000001F] rounded-[5px] p-2 m-2 w-full max-w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              className="bg-transparent text-right p-2 w-full text-white text-base focus:outline-none"
              placeholder="رمز عبور خود را وارد کنید"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-white focus:outline-none"
            >
              {showPassword ? (
                <HiEyeSlash className="w-5 h-5" />
              ) : (
                <HiEye className="w-5 h-5" />
              )}
            </button>
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
          <div className="flex flex-row w-full max-w-full my-4">
            <a className="text-gray-300 text-base text-right border-b pb-1" href="">
              رمز عبور یا نام کاربری رو فراموش کردم!
            </a>
          </div>
          <div className="flex flex-row w-full max-w-full">
            <button
              type="button"
              className="rounded-[4px] p-4 m-2 text-white text-base w-full bg-[#005C70] disabled:opacity-50"
              onClick={loginUser}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'در حال پردازش...' : 'ورود'}
            </button>
          </div>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-3 overflow-x-hidden">
      <div className="text-white bg-[#00313CCC] rounded-[9px] p-4 text-right w-full max-w-full my-4 xl:w-1/3">
        <h4>چرا باید ثبت نام کنم؟</h4>
        <p className="text-base mt-4">
          چون بتونید کاربری بهتر و کاربردی تری رو داشته باشید و بتونید به تمامی فایل‌ها دسترسی داشته باشید و کاربری بهتری رو تجربه کنید. از روی دیگر دسته‌بندی و کلی خدمات دیگه رو به راحتی بتونیم بهتون ارائه بدیم
          <Image
            src="/images/Help.png"
            alt="Login Image"
            width={50}
            height={50}
            className="inline-block max-w-full h-auto"
          />
        </p>
      </div>
      <Alert
        type={messageType}
        message={message}
        show={show}
        onClose={() => setShow(false)}
        duration={4000}
      />
      <div className="w-full max-w-full xl:w-1/3 mb-30">
        <Tabs tabs={tabsData} />
      </div>
      <div className="mt-8"></div>
      <BottomNavbar />
    </div>
  );
}