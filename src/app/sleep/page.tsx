'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import BottomNavbar from '@/app/components/bottomNavbar/bottomNavbar';
import SubSubCategoryCard from '@/app/components/subSubCategoryCard/subSubCategoryCard';
/* import Preloader from '@/app/preloader/page'; */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import axios from 'axios';
import Link from 'next/link';
import '@/app/globals.css';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { API_ENDPOINTS, apiHelpers } from '@/app/config/api';

type Category = { id: string; name: string };
type SubCategory = { id: string; name: string };

export default function Sleep() {
/*  const [isLoading, setIsLoading] = useState(true); */
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [subSubCategoriesBySubCategory, setSubSubCategoriesBySubCategory] = useState<Record<string, any[]>>({});
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchCategories = async () => {
      try {
        const res = await axios.get(API_ENDPOINTS.postCategories(), apiHelpers.getRequestConfig(token));
        setCategories(res.data.data || []);
      } catch (e) {
        console.error('خطا در دریافت دسته‌بندی‌ها:', e);
      }
    };

    const fetchSubCategories = async () => {
      try {
        const res = await axios.get(API_ENDPOINTS.sleepSubcategories(), apiHelpers.getRequestConfig(token));
        setSubCategories(res.data.data || []);
      } catch (e) {
        console.error('خطا در دریافت زیر دسته‌بندی‌ها:', e);
      }
    };

    const load = async () => {
      await Promise.all([fetchCategories(), fetchSubCategories()]);
     /* setIsLoading(false); */
    };

    load();
  }, [router]);

  useEffect(() => {
    if (subCategories.length === 0) return;
    const token = Cookies.get('access_token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchAllSubSubCategories = async () => {
      const subSubCatsBySubCat: Record<string, any[]> = {};
      for (const subCat of subCategories) {
        try {
          const res = await axios.get(
            API_ENDPOINTS.postSubcategorySubSubcategories(subCat.id),
            apiHelpers.getRequestConfig(token)
          );
          subSubCatsBySubCat[subCat.id] = res.data?.data || [];
        } catch (e) {
          console.error(`خطا در دریافت زیر زیر دسته‌بندی‌های زیر دسته‌بندی ${subCat.id}:`, e);
          subSubCatsBySubCat[subCat.id] = [];
        }
      }
      setSubSubCategoriesBySubCategory(subSubCatsBySubCat);
    };

    fetchAllSubSubCategories();
  }, [subCategories, router]);

/*  if (isLoading) return <Preloader />; */

  const category7 = categories.find((cat) => cat.id === '7');

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

      <div className="relative z-10 w-full px-4 flex flex-col items-center mb-8">
        <div className="mt-12 w-full max-w-md flex items-center justify-between">
          <h1
            className="text-center font-bold bg-gradient-to-r from-[#00A3B3] to-[#00D4B4] bg-clip-text text-transparent animate-fade-in text-4xl"
          >
            {category7?.name || 'خواب'}
          </h1>
        </div>

        {subCategories.map((subCat) => (
          <div key={subCat.id} className="mt-8 w-full text-white">
            <div className="mb-4 grid grid-cols-12 items-center">
              <h4 className="col-span-8 pr-4 text-right text-xl font-bold">
                {subCat.name}
              </h4>
              <button
                className="col-span-4 flex items-center gap-2 justify-center rounded-full bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                مشاهده همه
              </button>
            </div>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={8}
              slidesPerView={2.5}
              navigation
              pagination={{ clickable: true }}
              dir="rtl"
              className="w-full"
            >
              {subSubCategoriesBySubCategory?.[subCat.id]?.length > 0 ? (
                subSubCategoriesBySubCategory[subCat.id].map((subSubCategory) => (
                  <SwiperSlide key={subSubCategory.id}>
                    <Link href={`/sub-sub-category/${subSubCategory.id}`}>
                      <SubSubCategoryCard subSubCategory={subSubCategory} />
                    </Link>
                  </SwiperSlide>
                ))
              ) : (
                <div className="py-4 text-center text-white/60">
                  زیر زیر دسته‌بندی‌ای برای این بخش یافت نشد
                </div>
              )}
            </Swiper>
          </div>
        ))}

        <BottomNavbar />
      </div>
    </div>
  );
}