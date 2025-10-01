import { create } from 'zustand'
import { adminAuth } from './adminAuth'

export const useAuth = create((set) => ({
  user: null,
  loading: false,
  error: null,

  check: async () => {
    try {
      set({ loading: true, error: null })
      const r = await adminAuth.me()
      set({ user: r.user || { username: 'admin' }, loading: false })
      return true
    } catch {   // no variable here, avoids ESLint warning
      set({ user: null, loading: false })
      return false
    }
  },

  login: async (username, password) => {
    set({ loading: true, error: null })
    try {
      const r = await adminAuth.login(username, password)
      set({ user: r.user || { username }, loading: false })
      return true
    } catch (e) {
      set({ error: e.message, loading: false })
      return false
    }
  },

  logout: async () => {
    await adminAuth.logout()
    set({ user: null })
  },
}))
