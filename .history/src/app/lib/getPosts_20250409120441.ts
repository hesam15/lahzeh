

export async function getPosts(): Promise<Post[]> {
  const res = await fetch('https://api.lahzeh.me/posts', {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('خطا در دریافت پست‌ها')
  }

  const data: Post[] = await res.json()

  // فقط در مرورگر داده‌ها رو داخل استور بریز
  if (typeof window !== 'undefined') {
    const setPosts = useStore.getState().setPosts
    setPosts(data)
  }

  return data
}
