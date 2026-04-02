import { useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@rangeldor/cindle-design-system'
import { LoginForm } from '../components/LoginForm'
import { useAuth } from '../hooks/useAuth'

export function LoginPageHost() {
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated()) {
      window.location.href = '/'
    }
  }, [])

  if (isAuthenticated()) return null

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Entrar</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Não tem conta?{' '}
            <a href="/signup" className="text-primary hover:underline">
              Cadastre-se
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
