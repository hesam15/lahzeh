// stores/useStore.ts
import { create } from 'zustand'

interface User {
  id: number
  name: string
  email: string
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
}))

export default useStore
