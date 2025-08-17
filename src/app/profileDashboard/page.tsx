'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Tabs from '@/app/components/tab/tab';
import PodcastRow from '@/app/components/podcastRow/podcastRow';
import HelpSection from '@/app/components/helpSection/helpSection';
import { RiVipCrown2Line } from 'react-icons/ri';
import { FiSettings } from 'react-icons/fi';
import BottomNavbar from '@/app/components/bottomNavbar/bottomNavbar';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { API_ENDPOINTS, apiHelpers } from '@/app/config/api';

export default function ProfileDashboard() {
  const [user, setUser] = useState<any>(null);
  const [favourites, setFavourites] = useState<any[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get('access_token');

      try {
        const res = await fetch(API_ENDPOINTS.userMe(), {
          method: 'GET',
          ...apiHelpers.getRequestConfig(token),
        });

        if (!res.ok) {
          console.error('خطا در دریافت اطلاعات کاربر');
          return;
        }

        const json = await res.json();
        setUser(json.data);
      } catch (error) {
        console.error('خطای شبکه در دریافت اطلاعات کاربر:', error);
      }
    };

    const fetchFavourites = async () => {
      const token = Cookies.get('access_token');

      try {
        const res = await fetch(API_ENDPOINTS.favouritePosts(), {
          method: 'GET',
          ...apiHelpers.getRequestConfig(token),
        });

        if (!res.ok) {
          console.error('خطا در دریافت علاقه‌مندی‌ها');
          return;
        }

        const json = await res.json();
        setFavourites(json.data || []); // فرض می‌کنیم داده‌ها در فیلد data باشد
      } catch (error) {
        console.error('خطای شبکه در دریافت علاقه‌مندی‌ها:', error);
      }
    };

    const loadData = async () => {
      await Promise.all([fetchUser(), fetchFavourites()]);
    };

    loadData();
  }, []);

  const tabs = [
    {
      id: 'tab1',
      label: 'پادکست‌ها',
      content: (
        <div className="text-white text-right my-8 flex flex-col items-center justify-center w-full">
          <div className="flex flex-col w-full gap-4">
            <PodcastRow title="مدیتیشن آرامش بخش" description="یک جلسه مدیتیشن عمیق برای آرامش ذهن و بدن" date="بهمن ۱۴۰۳" duration="15:30" id={''} />
            <PodcastRow title="مدیتیشن خواب" description="مدیتیشن ویژه برای خواب بهتر و آرام‌تر" date="بهمن ۱۴۰۳" duration="20:15" id={''} />
            <PodcastRow title="مدیتیشن صبحگاهی" description="شروع روز با انرژی و نشاط با این مدیتیشن" date="بهمن ۱۴۰۳" duration="12:45" id={''} />
          </div>
        </div>
      ),
    },
    {
      id: 'tab2',
      label: 'دانلودها',
      content: (
        <div className="text-white text-right my-8 flex flex-col items-center justify-center w-full">
          <div className="flex flex-col w-full gap-4">
            <PodcastRow title="مدیتیشن تنفسی" description="تمرینات تنفسی برای کاهش استرس و اضطراب" date="بهمن ۱۴۰۳" duration="18:20" id={''} />
            <PodcastRow title="مدیتیشن ذهن آگاهی" description="تمرینات ذهن آگاهی برای زندگی بهتر" date="بهمن ۱۴۰۳" duration="25:10" id={''} />
          </div>
        </div>
      ),
    },
    {
      id: 'tab3',
      label: 'علاقه‌مندی‌ها',
      content: (
        <div className="text-white text-right my-8 flex flex-col items-center justify-center w-full">
          <div className="flex flex-col w-full gap-4">
            {favourites.length > 0 ? (
              favourites.map((item) => (
                <PodcastRow
                  key={item.id}
                  title={item.title || 'بدون عنوان'}
                  description={item.content || 'بدون توضیح'}
                  date={item.create_dates ? item.create_dates.created_human : 'تاریخ نامشخص'}
                  duration={item.duration || 'نامشخص'}
                  id={item.id || ''}
                />
              ))
            ) : (
              <p className="text-white/60 text-center">هیچ علاقه‌مندی ثبت نشده است.</p>
            )}
          </div>
        </div>
      ),
    },
  ];
  
  const getAvatarImage = () => {
    if (!user) return '/images/man avatar.png';
    if (user.profile_image && user.profile_image.trim() !== '') return user.profile_image;
    return user.gender === 'آقا' ? '/images/man avatar.png' : '/images/woman avatar.png';
  };

  // Loading state
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#007994] to-[#00333E] flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#007994] to-[#00333E]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-gradient-to-b from-[#007994]/95 to-[#00333E]/95 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6 relative">
          <Link href="/profileDashboard/edit" className="absolute top-4 right-4 flex items-center justify-center w-12 h-12 bg-[#004C5C] text-white rounded-full p-3 hover:bg-[#004C5C]/80 transition-colors">
            <FiSettings className="w-5 h-5" />
          </Link>

          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-lg">
                <Image
                  src={getAvatarImage()}
                  alt="Profile Image"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
              {user?.premium && (
                <div className="absolute -top-2 -right-2 bg-[#004C5C] rounded-full p-2 shadow-sm">
                  <RiVipCrown2Line className="text-yellow-300" />
                </div>
              )}
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-heavy text-white mb-2">{user?.full_name || 'کاربر'}</h2>
              <p className="text-white/80 text-sm font-medium">{user?.verified ? 'کاربر تایید شده' : 'کاربر عادی'}</p>
            </div>

            {/* Stats */}
            <div className="flex gap-8 text-center">
              <div>
                <p className="text-white/60 text-sm">تاریخ تولد</p>
                <p className="text-white font-medium">
                  {user?.birth_date && user.birth_date !== '0000-00-00' ? user.birth_date : 'نامشخص'}
                </p>
              </div>
              <div>
                <p className="text-white/60 text-sm">شماره تلفن</p>
                <p className="text-white font-medium">{user?.phone_number || 'نامشخص'}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm">اشتراک ویژه</p>
                {user?.premium ? (
                  <p className="text-yellow-300 font-medium">{user?.daysLeft || 0} روز باقی‌مانده</p>
                ) : (
                  <Link
                    href="/subscriptions"
                    className="text-white font-medium bg-gradient-to-r from-yellow-200 to-yellow-400 px-4 py-1 rounded-xl text-sm hover:from-yellow-300 hover:to-yellow-500 transition-all shadow-sm"
                  >
                    خرید اشتراک
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-[320px] pb-[100px] z-10">
        <div className="w-full bg-[#004C5C]/20 rounded-t-3xl py-2">
          <Tabs tabs={tabs} />
        </div>

        <HelpSection
          title="راهنمای استفاده"
          description="برای آموزش کامل استفاده از اپ، اینجا کلیک کنید"
          image="/images/Help.png"
          onClick={() => {}}
        />
      </main>

      <BottomNavbar />
    </div>
  );
}