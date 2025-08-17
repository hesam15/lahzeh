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
  
    return res.json()
  }
  