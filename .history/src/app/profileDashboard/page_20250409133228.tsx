"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Tabs from "../components/tab/tab";
import PodcastRow from "../components/podcastRow/podcastRow";
import HelpSection from "../components/helpSection/helpSection";
import Preloader from "../preloader/page";
import { RiVipCrown2Line } from "react-icons/ri";
import BottomNavbar from "../components/bottomNavbar/bottomNavbar";

export default function ProfileDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    {
      id: "tab1",
      label: "پادکست‌ها",
      content: (
        <div className="text-white text-right my-8 flex flex-col items-center justify-center w-full">
          <div className="flex flex-col w-full gap-4">
            <PodcastRow
              title="مدیتیشن آرامش بخش"
              description="یک جلسه مدیتیشن عمیق برای آرامش ذهن و بدن"
              date="بهمن ۱۴۰۳"
              duration="15:30"
            />
            <PodcastRow
              title="مدیتیشن خواب"
              description="مدیتیشن ویژه برای خواب بهتر و آرام‌تر"
              date="بهمن ۱۴۰۳"
              duration="20:15"
            />
            <PodcastRow
              title="مدیتیشن صبحگاهی"
              description="شروع روز با انرژی و نشاط با این مدیتیشن"
              date="بهمن ۱۴۰۳"
              likes={4}
              duration="12:45"
            />
          </div>
        </div>
      )
    },
    {
      id: "tab2",
      label: "دانلودها",
      content: (
        <div className="text-white text-right my-8 flex flex-col items-center justify-center w-full">
          <div className="flex flex-col w-full gap-4">
            <PodcastRow
              title="مدیتیشن تنفسی"
              description="تمرینات تنفسی برای کاهش استرس و اضطراب"
              date="بهمن ۱۴۰۳"
              views={64}
              likes={2}
              duration="18:20"
            />
            <PodcastRow
              title="مدیتیشن ذهن آگاهی"
              description="تمرینات ذهن آگاهی برای زندگی بهتر"
              date="بهمن ۱۴۰۳"
              views={88}
              likes={6}
              duration="25:10"
            />
          </div>
        </div>
      )
    },
    {
      id: "tab3",
      label: "علاقه‌مندی‌ها",
      content: (
        <div className="text-white text-right my-8 flex flex-col items-center justify-center w-full">
          <div className="flex flex-col w-full gap-4">
            <PodcastRow
              title="مدیتیشن عشق"
              description="مدیتیشن برای تقویت احساسات مثبت"
              date="بهمن ۱۴۰۳"
              views={120}
              likes={8}
              duration="22:30"
            />
            <PodcastRow
              title="مدیتیشن شفقت"
              description="تمرینات شفقت به خود و دیگران"
              date="بهمن ۱۴۰۳"
              views={95}
              likes={7}
              duration="16:45"
            />
          </div>
        </div>
      )
    }
  ];

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#007994] to-[#00333E]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-gradient-to-b from-[#007994]/95 to-[#00333E]/95 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center gap-6">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
                <Image
                  src="/images/woman avatar.png"
                  alt="Profile"
                  width={500} // عرض تصویر
                  height={500} // ارتفاع تصویر
                  className="object-cover"
                />
              </div>
              <div className="absolute -top-2 -right-2 bg-[#004C5C] rounded-full p-2">
                <RiVipCrown2Line className="text-yellow-300" size={24} />
              </div>
            </div>

            {/* User Info */}
            <div className="text-center">
              <h2 className="text-2xl font-heavy text-white mb-2">دریا پناهی</h2>
              <p className="text-white/80 text-sm font-medium">VIP User</p>
            </div>

            {/* Stats */}
            <div className="flex gap-8 text-center">
              <div>
                <p className="text-white/60 text-sm">زمان بیدار شدن</p>
                <p className="text-white font-medium">۰۸:۳۰:۰۰</p>
              </div>
              <div>
                <p className="text-white/60 text-sm">زمان خوابیدن</p>
                <p className="text-white font-medium">۲۳:۳۰:۰۰</p>
              </div>
              <div>
                <p className="text-white/60 text-sm">اشتراک ویژه</p>
                <p className="text-yellow-300 font-medium">۲۰ روز</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-4">
              <button className="px-6 py-2 bg-[#004C5C] text-white rounded-lg text-sm font-medium hover:bg-[#004C5C]/80 transition-colors">
                ویرایش پروفایل
              </button>
              <button className="px-6 py-2 bg-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/20 transition-colors">
                تنظیمات
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-[400px] pb-16">
        {/* Content Sections */}
        <div className="w-full bg-[#004C5C]/30 rounded-none">
          <Tabs tabs={tabs} />
        </div>

        <HelpSection
          title="راهنمای استفاده"
          description="برای آموزش کامل استفاده از اپ، اینجا کلیک کنید"
          image="/images/Help.png"
          onClick={() => { }}
        />
      </main>

      <BottomNavbar />
    </div>
  );
}
