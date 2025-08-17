'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import BottomNavbar from '@/app/components/bottomNavbar/bottomNavbar';
import SubSubCategoryCard from '@/app/components/subSubCategoryCard/subSubCategoryCard';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/app/globals.css';
import { API_ENDPOINTS, apiHelpers } from '@/app/config/api';

export default function CategoryPage() {
  const params = useParams();
  const id = params?.id as string; // Type assertion
  const router = useRouter();

  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [subSubCategoriesBySubCategory, setSubSubCategoriesBySubCategory] = useState<{ [key: string]: any[] }>({});
  const [categoryName, setCategoryName] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const fetchSubCategories = useCallback(async () => {
    try {
      const token = Cookies.get('access_token');
      const res = await axios.get(API_ENDPOINTS.postCategorySubcategories(id), apiHelpers.getRequestConfig(token));

      const subCats = res.data?.data || [];

      if (subCats.length > 0) {
        setCategoryName(subCats[0].post_category_name);
      } else {
        setCategoryName('دسته‌بندی');
      }

      return subCats;
    } catch (error) {
      console.error('خطا در دریافت زیر‌دسته‌ها:', error);
      return [];
    }
  }, [id]);

  const fetchSubSubCategoriesForSubCategory = async (subCategoryId: string) => {
    try {
      const token = Cookies.get('access_token');
      const res = await axios.get(API_ENDPOINTS.postSubcategorySubSubcategories(subCategoryId), apiHelpers.getRequestConfig(token));
      return res.data?.data || [];
    } catch (error) {
      console.error(`خطا در دریافت زیر زیر دسته‌های زیر‌دسته ${subCategoryId}:`, error);
      return [];
    }
  };

  useEffect(() => {
    const loadData = async () => {
      if (!id) return; // Guard clause
      
      setLoading(true);
      const subCats = await fetchSubCategories();
      setSubCategories(subCats);

      const subSubCatsMap: { [key: string]: any[] } = {};
      for (const sub of subCats) {
        const subSubCats = await fetchSubSubCategoriesForSubCategory(sub.id);
        subSubCatsMap[sub.id] = subSubCats;
      }

      setSubSubCategoriesBySubCategory(subSubCatsMap);
      setLoading(false);
    };

    loadData();
  }, [id, fetchSubCategories]);

  // اگر id وجود نداشت
  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white">در حال بارگذاری...</p>
      </div>
    );
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

      <div className="relative z-10 w-full xl:w-1/2 px-4 flex flex-col items-center mt-10">
        <h1 className="text-2xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00A3B3] to-[#00D4B4] mb-8">
          {categoryName || 'پادکست‌ها'}
        </h1>

        {loading ? (
          <p className="text-white text-center mt-10">در حال بارگذاری...</p>
        ) : subCategories.length === 0 ? (
          <div className="text-white text-center mt-10 space-y-4">
            <p>این دسته‌بندی وجود ندارد یا زیر‌دسته‌ای برای آن تعریف نشده است.</p>
            <button
              onClick={() => router.push('/')}
              className="bg-[#00A3B3] text-white px-6 py-2 rounded-full hover:bg-[#00c4d1] transition-all"
            >
              بازگشت به صفحه اصلی
            </button>
          </div>
        ) : (
          subCategories.map((sub) => (
            <div key={sub.id} className="w-full mb-10">
              <div className="flex items-center justify-between mb-4">
                <Link href={`/sub-category/${sub.id}`}>
                  <button className="text-sm bg-[#004455] hover:bg-[#005566] text-white px-4 py-2 rounded-full transition-all">
                    مشاهده همه
                  </button>
                </Link>
                <h2 className="text-white font-bold text-lg">{sub.name}</h2>
              </div>

              {subSubCategoriesBySubCategory[sub.id]?.length > 0 ? (
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={8}
                  slidesPerView={2.5}
                  navigation
                  pagination={{ clickable: true }}
                  className="w-full"
                  dir="rtl"
                  breakpoints={{
                    640: {
                      slidesPerView: 2.5,
                      spaceBetween: 8,
                    },
                  }}
                >
                  {subSubCategoriesBySubCategory[sub.id].map((subSubCategory) => (
                    <SwiperSlide key={subSubCategory.id}>
                      <Link href={`/sub-sub-category/${subSubCategory.id}`}>
                        <SubSubCategoryCard subSubCategory={subSubCategory} />
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="text-white/60 text-center">زیر زیر دسته‌بندی‌ای برای این بخش وجود ندارد</div>
              )}
            </div>
          ))
        )}
      </div>
      <BottomNavbar />
    </div>
  );
}