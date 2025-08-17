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
}

const useStore = create<StoreState>((set) => ({
  dataMe: [],
  setDataMe: (dataMe) => set({ dataMe }),
}))

export default useStore
