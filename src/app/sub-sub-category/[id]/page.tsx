'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import Podcast from '@/app/components/podcast/podcast';
import Link from 'next/link';
import BottomNavbar from '@/app/components/bottomNavbar/bottomNavbar';
import Image from 'next/image';
import { API_ENDPOINTS, apiHelpers } from '@/app/config/api';

export default function SubSubCategoryPage() {
  const params = useParams();
  const id = params?.id as string; // Type assertion
  
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [subSubCategoryName, setSubSubCategoryName] = useState<string>('');

  useEffect(() => {
    const fetchPosts = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const token = Cookies.get('access_token');
        const res = await axios.get(API_ENDPOINTS.postSubSubcategoryPosts(id), apiHelpers.getRequestConfig(token));
        setPosts(res.data?.data || []);
        
        // از additional data برای نام زیر زیر دسته استفاده کن
        if (res.data?.post_sub_sub_category) {
          setSubSubCategoryName(res.data.post_sub_sub_category);
        } else {
          setSubSubCategoryName('پست‌های این زیر زیر دسته');
        }
      } catch (err) {
        console.error('خطا در دریافت پست‌ها:', err);
        setSubSubCategoryName('پست‌های این زیر زیر دسته');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [id]);

  // اگر id وجود نداشت
  if (!id) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center rtl relative">
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
          <p className="mb-4">شناسه زیر زیر دسته‌بندی یافت نشد</p>
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
          {subSubCategoryName}
        </h1>

        {loading ? (
          <div className="text-white text-center py-8">در حال بارگذاری...</div>
        ) : posts.length > 0 ? (
          <div className="w-full px-4 mt-8">
            <div className="grid grid-cols-2 gap-4">
              {posts.map((post) => (
                <Link key={post.id} href={`/player/${post.id}`}>
                  <Podcast post={post} />
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-white/60 text-center py-8">
            <p className="text-lg">هیچ پستی در این زیر زیر دسته‌بندی یافت نشد</p>
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
