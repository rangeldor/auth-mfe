import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { UserMenu } from './UserMenu'

export function AuthNav() {
  const { user, isAuthenticated } = useAuth()
  if (isAuthenticated) return <UserMenu />
  return (
    <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">
      Entrar
    </Link>
  )
}
