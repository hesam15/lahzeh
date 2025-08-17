'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import Cookies from 'js-cookie';
// import { FaChevronLeft } from 'react-icons/fa';
import { API_ENDPOINTS } from '@/app/config/api';
// import { apiHelpers } from '@/app/config/api';
import '@/app/globals.css';
import Preloader from '@/app/preloader/page';

type UserProfile = {
  full_name: string;
  wake_up_time: string; // Format: HH:mm
  sleep_time: string; // Format: HH:mm
};

export default function EditProfile() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>({
    full_name: '',
    wake_up_time: '07:00',
    sleep_time: '23:00',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    const token = Cookies.get('access_token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const response = await axios.get(API_ENDPOINTS.userMe(), {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const data = response.data.data;
      setProfile({
        full_name: data.full_name || '',
        wake_up_time: data.wake_up_time || '07:00',
        sleep_time: data.sleep_time || '23:00',
      });
      setIsLoading(false);
    } catch (err) {
      console.error('خطا در دریافت اطلاعات پروفایل:', err);
      setError('دریافت اطلاعات پروفایل ناموفق بود.');
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setSuccess(null);
  };

  const validateInputs = () => {
    if (!profile.full_name.trim()) {
      setError('نام نمی‌تواند خالی باشد.');
      return false;
    }
    if (!/^\d{2}:\d{2}$/.test(profile.wake_up_time)) {
      setError('ساعت بیدار شدن نامعتبر است.');
      return false;
    }
    if (!/^\d{2}:\d{2}$/.test(profile.sleep_time)) {
      setError('ساعت خواب نامعتبر است.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;

    // const token = Cookies.get('access_token');
    try {
      // Note: Backend route for updating user profile does not exist
      // This needs to be implemented in backend: PUT /api/user/me
      setError('قابلیت ویرایش پروفایل هنوز در بک‌اند پیاده‌سازی نشده است.');
      return;
      
      // Commented out until backend implements the route:
      // await axios.put(API_ENDPOINTS.userUpdate(), profile, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     'Content-Type': 'application/json',
      //     Accept: 'application/json',
      //   },
      // });
      setSuccess('پروفایل با موفقیت به‌روزرسانی شد.');
      setError(null);
    } catch (err) {
      console.error('خطا در به‌روزرسانی پروفایل:', err);
      setError('به‌روزرسانی پروفایل ناموفق بود.');
      setSuccess(null);
    }
  };

  const handleLogout = () => {
    Cookies.remove('access_token');
    router.push('/login');
  };

  const handleBack = () => {
    router.back();
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center rtl relative pb-[100px] bg-transparent overflow-y-auto">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/bg-main-img.png"
          alt="Background Image"
          className="object-cover blur-[3px]"
          fill
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-4 flex flex-col">
        <div className="flex items-center mt-8 justify-start" dir="ltr">
          <button
            onClick={handleBack}
            className="flex items-center text-white hover:text-[#00A3B3] transition-colors"
          >
            <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>بازگشت</span>
          </button>
        </div>

        <h1 className="text-3xl font-bold text-center mt-4 bg-gradient-to-r from-[#00A3B3] to-[#00D4B4] bg-clip-text text-transparent animate-fade-in">
          ویرایش پروفایل
        </h1>

        <div>
          <form onSubmit={handleSubmit} className="w-full mt-8 flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="full_name" className="text-white text-sm mb-1">
                نام
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={profile.full_name}
                onChange={handleInputChange}
                placeholder="نام خود را وارد کنید"
                className="w-full py-3 px-4 text-white bg-white/10 border border-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00A3B3]"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="wake_up_time" className="text-white text-sm mb-1">
                ساعت بیدار شدن
              </label>
              <input
                type="time"
                id="wake_up_time"
                name="wake_up_time"
                value={profile.wake_up_time}
                onChange={handleInputChange}
                className="w-full py-3 px-4 text-white bg-white/10 border border-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00A3B3]"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="sleep_time" className="text-white text-sm mb-1">
                ساعت خواب
              </label>
              <input
                type="time"
                id="sleep_time"
                name="sleep_time"
                value={profile.sleep_time}
                onChange={handleInputChange}
                className="w-full py-3 px-4 text-white bg-white/10 border border-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00A3B3]"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}
            {success && (
              <p className="text-green-400 text-sm text-center">{success}</p>
            )}

            <button
              type="submit"
              className="mt-4 w-full py-3 px-6 bg-[#00A3B3] hover:bg-[#00D4B4] text-white font-semibold rounded-full transition-colors specShadow"
            >
              ذخیره تغییرات
            </button>
          </form>

          <button
            onClick={handleLogout}
            className="mt-12 mb-4 w-full py-3 px-6 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors"
          >
            خروج از حساب
          </button>
        </div>
      </div>
    </div>
  );
}