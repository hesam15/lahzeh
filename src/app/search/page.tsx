'use client';

import { useEffect, useState, useCallback } from 'react';
import BottomNavbar from '../components/bottomNavbar/bottomNavbar';
import PodcastRow from '../components/podcastRow/podcastRow';
import { motion } from 'framer-motion';
import Link from 'next/link';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { API_ENDPOINTS, apiHelpers } from '@/app/config/api';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showNoResult, setShowNoResult] = useState(false);
  const router = useRouter();

  const fetchSubcategories = useCallback(async () => {
    const token = Cookies.get('access_token');
    if (!token) return router.push('/login');
    try {
      const catRes = await axios.get(API_ENDPOINTS.postCategories(), apiHelpers.getRequestConfig(token));
      const categories = catRes.data.data || [];
      const allSubcategories: any[] = [];

      for (const cat of categories) {
        const subRes = await axios.get(API_ENDPOINTS.postCategorySubcategories(cat.id), apiHelpers.getRequestConfig(token));
        const subs = subRes.data.data || [];
        for (const sub of subs) {
          // دریافت زیر زیر دسته‌بندی‌ها
          const subSubRes = await axios.get(
            API_ENDPOINTS.postSubcategorySubSubcategories(sub.id),
            apiHelpers.getRequestConfig(token)
          );
          const subSubs = subSubRes.data?.data || [];
          
          // اگر زیر زیر دسته‌بندی دارد، پست‌ها را از آن‌ها بگیر
          if (subSubs.length > 0) {
            let allPosts: any[] = [];
            for (const subSub of subSubs) {
              const postsRes = await axios.get(
                API_ENDPOINTS.postSubSubcategoryPosts(subSub.id),
                apiHelpers.getRequestConfig(token)
              );
              const posts = postsRes.data?.data || [];
              allPosts = [...allPosts, ...posts];
            }
            if (allPosts.length > 0) {
              allSubcategories.push({ ...sub, posts: allPosts.slice(0, 3) });
            }
          } else {
            // اگر زیر زیر دسته‌بندی ندارد، مستقیماً پست‌ها را بگیر
            const postsRes = await axios.get(
              API_ENDPOINTS.postSubSubcategoryPosts(sub.id),
              apiHelpers.getRequestConfig(token)
            );
            const posts = postsRes.data?.data || [];
            if (posts.length > 0) {
              allSubcategories.push({ ...sub, posts: posts.slice(0, 3) });
            }
          }
        }
      }
      setSubcategories(allSubcategories);
    } catch (err: any) {
      console.error('Error fetching subcategories:', err);
      setError('دریافت زیر‌دسته‌ها ناموفق بود.');
    }
  }, [router]);

  const searchPosts = useCallback(async (query: string) => {
    const token = Cookies.get('access_token');
    if (!token) {
      router.push('/login');
      return;
    }
    try {
      const response = await axios.post(
        API_ENDPOINTS.postsSearch(),
        { query },
        apiHelpers.getRequestConfig(token)
      );
      const results = response.data.data || [];
      setSearchResults(results);
      setShowNoResult(results.length === 0);
    } catch (err: any) {
      console.error('Error searching posts:', err);
      setError('جستجو ناموفق بود.');
      setSearchResults([]);
      setShowNoResult(true);
    }
  }, [router]);

  useEffect(() => {
    fetchSubcategories();
  }, [fetchSubcategories]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.length >= 3) {
        searchPosts(searchQuery);
      } else if (searchQuery.length === 0) {
        setSearchResults([]);
        setShowNoResult(false);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, searchPosts]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-start overflow-y-auto bg-gradient-to-b from-[#001B22] to-[#00333E]">
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          width: 40px !important;
          height: 40px !important;
          background: rgba(255, 255, 255, 0.1) !important;
          backdrop-filter: blur(10px) !important;
          border-radius: 50% !important;
          color: white !important;
          transition: all 0.3s ease !important;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 0.2) !important;
          transform: scale(1.1) !important;
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 18px !important;
          font-weight: bold !important;
        }
        .swiper-button-disabled {
          opacity: 0.5 !important;
          cursor: not-allowed !important;
        }
      `}</style>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col items-center justify-start w-full">
        <div className="w-full px-4 py-6">
          <div className="flex items-center bg-gray-800 p-3 w-full rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-400 cursor-pointer ml-4">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجوی صداهای آرامش‌بخش..."
              className="bg-transparent outline-none w-full p-2 px-4 text-white placeholder-gray-400 text-right text-basse"
            />
          </div>
        </div>

        <div className="w-full pb-[100px]">
          <div className="text-white text-right flex flex-col items-center justify-center w-full">
            {searchQuery.trim() && searchResults.length > 0 && (
              <>
                <div className="flex flex-row-reverse items-center justify-between w-full mb-4 px-4">
                  <h4 className="text-right text-lg text-white font-bold">نتایج جستجو</h4>
                </div>
                <div className="flex flex-col w-full gap-4 px-4">
                  {searchResults.map(post => (
                    <Link key={post.id} href={`/player/${post.id}`}>
                      <PodcastRow {...post} id={post.id} />
                    </Link>
                  ))}
                </div>
              </>
            )}

            {searchQuery.trim() && showNoResult && (
              <div className="w-full px-4 mt-4">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 text-center shadow-md">
                  <svg className="w-6 h-6 text-white/50 mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-white font-medium">نتیجه‌ای برای جستجوی شما یافت نشد</p>
                  <p className="text-white/70 text-sm">لطفاً عبارت دیگری را امتحان کنید.</p>
                </div>
              </div>
            )}

            {!searchQuery.trim() && subcategories.map(sub => (
              <div key={sub.id} className="w-full mb-8">
                <div className="flex flex-row-reverse items-center justify-between w-full mb-4 px-4">
                  <h4 className="text-right text-lg text-white font-bold">{sub.name}</h4>
                  <Link href={`/sub-category/${sub.id}`} className="text-sm text-white/70 hover:text-white">مشاهده بیشتر</Link>
                </div>
                <div className="flex flex-col w-full gap-4 px-4">
                  {sub.posts.map((post: any) => (
                    <Link key={post.id} href={`/player/${post.id}`}>
                      <PodcastRow {...post} id={post.id} />
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {!searchQuery.trim() && subcategories.length === 0 && (
              <div className="text-white/60 text-center py-4 px-4">هیچ زیر‌دسته‌ای با پست پیدا نشد</div>
            )}

            {error && !searchQuery.trim() && (
              <div className="text-white/60 text-center py-4 px-4">{error}</div>
            )}
          </div>
        </div>
      </motion.div>

      <BottomNavbar />
    </div>
  );
}
