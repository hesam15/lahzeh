'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function CategoryPage() {
  const { id } = useParams();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(`https://api.lahzeh.me/api/user/post-category/${id}/posts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPosts(response.data?.data || []);
      } catch (error) {
        console.error('خطا در دریافت پست‌ها:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPosts();
  }, [id]);

  if (loading) return <p className="text-white">در حال بارگذاری...</p>;

  return (
<div className="p-4">
  <h1 className="text-2xl font-bold text-white mb-4">پست‌های این دسته‌بندی</h1>

  {posts.length === 0 ? (
    <p className="text-white text-center mt-8">پستی برای این دسته‌بندی موجود نیست.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-[#00333E] text-white p-4 rounded shadow">
          <img
            src={post.poster}
            alt={post.title}
            className="w-full h-40 object-cover rounded mb-2"
          />
          <h3 className="text-lg font-bold">{post.title}</h3>
          <p className="text-sm opacity-80 mt-2">{post.content}</p>
        </div>
      ))}
    </div>
  )}
</div>

  );
}
