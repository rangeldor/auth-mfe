import { useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '../stores/authStore'
import { authApi } from '../services/authApi'
import type { LoginCredentials, SignupCredentials } from '../types/auth.types'
import { loginSchema, signupSchema } from '../schemas/auth.schemas'

export function useAuth() {
  const { user, token, isAuthenticated, setAuth, logout: clearAuth } = useAuthStore()

  const getRedirectUrl = () => {
    const params = new URLSearchParams(window.location.search)
    return params.get('redirect') || '/'
  }

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const validated = loginSchema.parse(credentials)
      return authApi.login(validated)
    },
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken)
      window.location.href = getRedirectUrl()
    },
  })

  const signupMutation = useMutation({
    mutationFn: async (credentials: SignupCredentials) => {
      const validated = signupSchema.parse(credentials)
      return authApi.signup(validated)
    },
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken)
      window.location.href = getRedirectUrl()
    },
  })

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      clearAuth()
      window.location.href = '/login'
    },
    onError: () => {
      clearAuth()
      window.location.href = '/login'
    },
  })

  const logout = useCallback(() => {
    logoutMutation.mutate()
  }, [logoutMutation])

  const isAuthenticatedCheck = useCallback(() => {
    return isAuthenticated && !!user && !!token
  }, [isAuthenticated, user, token])

  return {
    user,
    isAuthenticated: isAuthenticatedCheck(),
    login: loginMutation.mutate,
    signup: signupMutation.mutate,
    logout,
    isLoading: loginMutation.isPending || signupMutation.isPending,
    error: loginMutation.error || signupMutation.error,
  }
}
