import { useEffect } from 'react'
import { useAuthStore } from '@/features/auth/stores/authStore'
import { authApi } from '@/features/auth/services/authApi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Skeleton } from '@rangeldor/cindle-design-system'

const queryClient = new QueryClient()

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { isAuthenticated, token, setAuth, logout } = useAuthStore()

  useEffect(() => {
    const validateAuth = async () => {
      if (token && !isAuthenticated) {
        try {
          const user = await authApi.getCurrentUser()
          setAuth(user, token)
        } catch {
          logout()
        }
      }
    }

    validateAuth()
  }, [token, isAuthenticated, setAuth, logout])

  if (!isAuthenticated && token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Skeleton className="w-64 h-8" />
      </div>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
