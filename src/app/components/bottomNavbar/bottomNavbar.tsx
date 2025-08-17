"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HiOutlineHome, 
  HiOutlineMagnifyingGlass, 
  HiOutlineSparkles, 
  HiOutlineMoon, 
  HiOutlineUser 
} from 'react-icons/hi2';

const navItems = [
  { href: '/home', label: 'خانه', icon: HiOutlineHome },
  { href: '/search', label: 'جستجو', icon: HiOutlineMagnifyingGlass },
  { href: '/meditation', label: 'مدیتیشن', icon: HiOutlineSparkles },
  { href: '/sleep', label: 'خواب', icon: HiOutlineMoon },
  { href: '/profileDashboard', label: 'پروفایل', icon: HiOutlineUser }
];

export default function BottomNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-4 mb-4">
        <div className="bg-[#004C5C]/20 backdrop-blur-2xl rounded-2xl border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
          <div className="flex items-center justify-around p-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-300 ease-in-out ${
                    isActive 
                      ? 'text-white bg-[#004C5C]/40 scale-105' 
                      : 'text-white/50 hover:text-white hover:bg-[#004C5C]/10'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
} 