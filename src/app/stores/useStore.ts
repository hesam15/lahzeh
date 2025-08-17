// stores/useStore.ts
import { create } from 'zustand'

interface User {
  id: number
  name: string
  email: string
}

export interface Post {
  id: number
  title: string
  content: string
}

interface StoreState {
  dataMe: User[]
  setDataMe: (data: User[]) => void

  posts: Post[]
  setPosts: (posts: Post[]) => void
}

const useStore = create<StoreState>((set) => ({
  dataMe: [],
  setDataMe: (dataMe) => set({ dataMe }),
  
  posts: [],
  setPosts: (posts) => set({ posts }),
}))

export default useStore
