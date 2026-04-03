import { useAuthStore } from '@/features/auth/stores/authStore'

export function invalidateAuth() {
  useAuthStore.getState().invalidate()
}

export function logout() {
  useAuthStore.getState().logout()
}
