// lib/getPosts.ts
export interface Post {
    id: number
    title: string
    content: string
  }
  
  export async function getPosts(): Promise<Post[]> {
    const res = await fetch('https://api.lahzeh.me/posts', {
      cache: 'no-store', 
    })
  
    if (!res.ok) {
      throw new Error('خطا در دریافت پست‌ها')
    }
    // 👇 ذخیره در zustand (دقت کن که این فقط در client جواب میده)
    if (typeof window !== 'undefined') {
        const setPosts = usePostsStore.getState().setPosts
        setPosts(data)
      }
    return res.json()
  }
  