import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '../types/auth.types'

interface AuthStore {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setAuth: (user: User, token: string) => void
  logout: () => void
  invalidate: () => void
  checkAuth: () => boolean
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) => {
        set({ user, token, isAuthenticated: true })
        try {
          if (token) {
            // Also store a simple token key for consumers that expect it
            localStorage.setItem('token', token)
          }
        } catch {
          /* ignore storage errors */
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
        try {
          localStorage.removeItem('token')
        } catch {
          /* ignore storage errors */
        }
      },

      invalidate: () => {
        set({ user: null, token: null, isAuthenticated: false })
        try {
          localStorage.removeItem('token')
          localStorage.removeItem('auth-storage')
        } catch {
          /* ignore storage errors */
        }
      },

      checkAuth: () => {
        const { token, user } = get()
        return !!token && !!user
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
