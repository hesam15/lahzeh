// app/category/[id]/page.tsx

import axios from 'axios';

interface Params {
  params: {
    id: string;
  };
}

export default async function CategoryPage({ params }: Params) {
  const res = await axios.get(`http://api.lahzeh.me/api/user/post-category/${params.id}/posts`);
  const posts = res.data?.data || [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-white mb-4">پست‌های این دسته‌بندی</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post: any) => (
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
    </div>
  );
}
