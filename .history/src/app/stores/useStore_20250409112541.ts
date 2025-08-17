// stores/useStore.ts
import { create } from 'zustand'

interface StoreState {
  dataMe: Record<string, any>[]
  setDataMe: (data: Record<string, any>[]) => void

  dataDashboard: Record<string, any>[]
  setDataDashboard: (data: Record<string, any>[]) => void

  dataDashboardEval: Record<string, any>[]
  setDataDashboardEval: (data: Record<string, any>[]) => void

  dataPeriodList: Record<string, any>[]
  setDataPeriodList: (data: Record<string, any>[]) => void
}

const useStore = create<StoreState>((set) => ({
  dataMe: [],
  setDataMe: (dataMe) => set({ dataMe }),

  dataDashboard: [],
  setDataDashboard: (dataDashboard) => set({ dataDashboard }),

  dataDashboardEval: [],
  setDataDashboardEval: (dataDashboardEval) => set({ dataDashboardEval }),

  dataPeriodList: [],
  setDataPeriodList: (dataPeriodList) => set({ dataPeriodList }),
}))

export default useStore
