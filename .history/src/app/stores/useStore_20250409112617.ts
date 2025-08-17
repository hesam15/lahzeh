// stores/useStore.ts
import { create } from "zustand";

interface StoreState {
  dataMe: Record<string, any>[];
  setDataMe: (data: Record<string, any>[]) => void;
}

const useStore = create<StoreState>((set) => ({
  dataMe: [],
  setDataMe: (dataMe) => set({ dataMe }),
}));

export default useStore;
