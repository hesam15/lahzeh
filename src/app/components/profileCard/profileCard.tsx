"use client";

import Image from "next/image";
import { GiNightSleep } from "react-icons/gi";
import { RiVipCrown2Line } from "react-icons/ri";
import { FiClock } from "react-icons/fi";

interface ProfileCardProps {
  name: string;
  userId: string;
  avatar: string;
  wakeTime: string;
  sleepTime: string;
  vipDaysLeft: number;
  vipHoursLeft: number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  userId,
  avatar,
  wakeTime,
  sleepTime,
  vipDaysLeft,
  vipHoursLeft
}) => {
  return (
    <div className="bg-[#004C5C]/30 rounded-xl p-6 mb-8 backdrop-blur-sm border border-white/10">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="flex-1 text-center md:text-right">
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex flex-col items-center md:items-end gap-2">
              <h2 className="text-xl font-heavy text-white">{name}</h2>
              <p className="text-white/80 font-medium">ID: {userId}</p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-2">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <FiClock className="w-4 h-4" />
                <span>زمان بیدار شدن: {wakeTime}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <GiNightSleep className="w-4 h-4" />
                <span>زمان خوابیدن: {sleepTime}</span>
              </div>
              <div className="text-xs text-yellow-300 font-medium mt-2">
                {vipDaysLeft} روز و {vipHoursLeft} ساعت VIP
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2">
            <button className="px-4 py-1.5 bg-[#004C5C] text-white rounded-lg text-sm font-medium hover:bg-[#004C5C]/80 transition-colors">
              ویرایش پروفایل
            </button>
            <button className="px-4 py-1.5 bg-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/20 transition-colors">
              تنظیمات
            </button>
          </div>
          <div className="relative">
            <div className="relative w-32 h-32">
              <Image
                src={avatar}
                alt="Profile"
                fill
                className="rounded-full border-4 border-white/20 object-cover"
              />
              <div className="absolute -top-2 -right-2 bg-[#004C5C] rounded-full p-2">
                <RiVipCrown2Line className="text-yellow-300" size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard; 