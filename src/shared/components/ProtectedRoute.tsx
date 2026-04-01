import { useAuth } from '@/features/auth/hooks/useAuth'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    window.location.href = '/login'
    return null
  }

  return <>{children}</>
}
