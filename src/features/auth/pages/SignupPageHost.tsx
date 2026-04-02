import { useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@rangeldor/cindle-design-system'
import { SignupForm } from '../components/SignupForm'
import { useAuth } from '../hooks/useAuth'

export function SignupPageHost() {
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
          <CardTitle>Criar conta</CardTitle>
        </CardHeader>
        <CardContent>
          <SignupForm />
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Já tem conta?{' '}
            <a href="/login" className="text-primary hover:underline">
              Entrar
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
