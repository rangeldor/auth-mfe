import { Button } from '@rangeldor/cindle-design-system'
import { useAuth } from '../hooks/useAuth'

export function UserMenu() {
  const { user, logout } = useAuth()

  if (!user) return null

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
          {user.name.charAt(0)}
        </div>
        <span className="font-medium">{user.name}</span>
      </div>
      <Button variant="outline" onClick={logout}>
        Sair
      </Button>
    </div>
  )
}
