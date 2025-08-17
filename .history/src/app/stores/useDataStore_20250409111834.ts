import { create } from 'zustand'

type DataStore = {
  data: any
  loading: boolean
  error: string | null
  fetchData: (url: string, method?: string, body?: any, headers?: Record<string, string>) => void
}

export const useDataStore = create<DataStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchData: async (url, method = 'GET', body = null, headers = {}) => {
    set({ loading: true, error: null })

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: method !== 'GET' ? JSON.stringify(body) : undefined,
      })

      if (!res.ok) throw new Error(`خطا: ${res.status}`)

      const json = await res.json()
      set({ data: json, loading: false })
    } catch (err: any) {
      set({ error: err.message, loading: false, data: null })
    }
  },
}))
