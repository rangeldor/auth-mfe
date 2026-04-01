import axios from 'axios'
import type { AuthResponse, LoginCredentials, SignupCredentials } from '../types/auth.types'

const api = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_URL,
  withCredentials: true,
})

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials)
    return data
  },

  signup: async (credentials: SignupCredentials): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/signup', credentials)
    return data
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout')
  },

  getCurrentUser: async (): Promise<AuthResponse['user']> => {
    const { data } = await api.get<AuthResponse['user']>('/auth/me')
    return data
  },

  validateToken: async (): Promise<boolean> => {
    try {
      await api.get('/auth/validate')
      return true
    } catch {
      return false
    }
  },
}
