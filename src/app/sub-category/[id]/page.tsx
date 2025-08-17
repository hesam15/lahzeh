'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import BottomNavbar from '@/app/components/bottomNavbar/bottomNavbar';
import Image from 'next/image';
import { API_ENDPOINTS, apiHelpers } from '@/app/config/api';
import Podcast from '@/app/components/podcast/podcast';

export default function SubCategoryPage() {
  const params = useParams();
  const id = params?.id as string; // Type assertion
  
  const [subSubCategories, setSubSubCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [subCategoryName, setSubCategoryName] = useState<string>('');
    const [postsBySubSubCategory, setPostsBySubSubCategory] = useState<Record<string, any[]>>({});
    const [postsLoading, setPostsLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchSubSubCategories = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const token = Cookies.get('access_token');
        const res = await axios.get(API_ENDPOINTS.postSubcategorySubSubcategories(id), apiHelpers.getRequestConfig(token));
        setSubSubCategories(res.data?.data || []);
        // اگر نام زیر‌دسته در پاسخ هست، ذخیره کن
        if (res.data?.data?.length > 0 && res.data.data[0].post_sub_category_name) {
          setSubCategoryName(res.data.data[0].post_sub_category_name);
        } else {
          setSubCategoryName('زیر زیر دسته‌بندی‌ها');
        }
          // گرفتن پست‌های هر زیرزیر‌دسته
          const postsPromises = (res.data?.data || []).map(async (subSubCat: any) => {
            setPostsLoading((prev) => ({ ...prev, [subSubCat.id]: true }));
            try {
              const postsRes = await axios.get(API_ENDPOINTS.postSubSubcategoryPosts(subSubCat.id), apiHelpers.getRequestConfig(token));
              setPostsBySubSubCategory((prev) => ({ ...prev, [subSubCat.id]: postsRes.data?.data || [] }));
            } catch {
              setPostsBySubSubCategory((prev) => ({ ...prev, [subSubCat.id]: [] }));
            } finally {
              setPostsLoading((prev) => ({ ...prev, [subSubCat.id]: false }));
            }
          });
          await Promise.all(postsPromises);
      } catch {
        console.error('خطا در دریافت زیر زیر دسته‌بندی‌ها');
        setSubCategoryName('زیر زیر دسته‌بندی‌ها');
      } finally {
        setLoading(false);
      }
    };

    fetchSubSubCategories();
  }, [id]);

  // اگر id وجود نداشت
  if (!id) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-start rtl relative pb-[100px] bg-transparent overflow-y-auto">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/bg-main-img.webp"
            alt="Background Image"
            className="object-cover blur-[3px]"
            fill
            placeholder="blur"
            blurDataURL="/images/low-res-bg-main-img.webp"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black"></div>
        </div>
        <div className="relative z-10 text-white text-center">
          <h1 className="text-2xl font-bold mb-4">خطا</h1>
          <p className="mb-4">شناسه زیر دسته‌بندی یافت نشد</p>
          <Link href="/home" className="text-blue-400 hover:text-blue-300">
            بازگشت به خانه
          </Link>
        </div>
        <BottomNavbar />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start rtl relative pb-[100px] bg-transparent overflow-y-auto">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/bg-main-img.webp"
          alt="Background Image"
          className="object-cover blur-[3px]"
          fill
          placeholder="blur"
          blurDataURL="/images/low-res-bg-main-img.webp"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black"></div>
      </div>

      <div className="flex flex-col items-center w-full relative z-10 px-4">
        <h1 className="w-full text-center mt-12 p-3 text-3xl font-bold text-white">
          {subCategoryName}
        </h1>

        {loading ? (
          <div className="text-white text-center py-8">در حال بارگذاری...</div>
        ) : subSubCategories.length > 0 ? (
            <div className="w-full px-2 mt-8 flex flex-col gap-8">
              {subSubCategories.map((subSubCategory) => (
                <section key={subSubCategory.id} className="w-full bg-[#00333E]/60 rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold text-white">{subSubCategory.name}</h2>
                    <Link href={`/sub-sub-category/${subSubCategory.id}`} className="text-blue-300 text-sm">مشاهده همه</Link>
                  </div>
                  {postsLoading[subSubCategory.id] ? (
                    <div className="text-white/80 py-4">در حال بارگذاری پست‌ها...</div>
                  ) : postsBySubSubCategory[subSubCategory.id]?.length > 0 ? (
                    <div className="w-full overflow-x-auto flex gap-4 pb-2">
                      {postsBySubSubCategory[subSubCategory.id].map((post: any) => (
                        <div key={post.id} className="min-w-[140px] max-w-[140px]">
                          <Podcast post={{
                            id: post.id,
                            poster: post.poster || '/images/pod.jpg',
                            title: post.title,
                            duration: post.duration,
                            like_count: post.like_count,
                            plays_count: post.plays_count,
                          }} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-white/60 py-4">هیچ پستی در این زیرزیر‌دسته وجود ندارد.</div>
                  )}
                </section>
              ))}
            </div>
        ) : (
          <div className="text-white/60 text-center py-8">
            <p className="text-lg">هیچ زیر زیر دسته‌بندی در این بخش یافت نشد</p>
            <Link href="/home" className="text-blue-400 hover:text-blue-300 mt-4 inline-block">
              بازگشت به خانه
            </Link>
          </div>
        )}
      </div>

      <BottomNavbar />
    </div>
  );
}