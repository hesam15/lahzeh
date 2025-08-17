"use client";

import React from 'react';
import BottomNavbar from "../components/bottomNavbar/bottomNavbar";
import Preloader from "../preloader/page";
import { useState, useEffect } from "react";

export default function Meditation() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#007994] to-[#00333E]">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8 text-right">مدیتیشن</h1>
        {/* محتوای صفحه مدیتیشن اینجا اضافه خواهد شد */}
      </main>
      <BottomNavbar />
    </div>
  );
} 