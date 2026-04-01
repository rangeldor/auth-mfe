import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@rangeldor/cindle-design-system'
import { useAuth } from '../hooks/useAuth'
import type { SignupFormData } from '../schemas/auth.schemas'
import { signupSchema } from '../schemas/auth.schemas'

export function SignupForm() {
  const { signup, isLoading, error } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  return (
    <form onSubmit={handleSubmit((data) => signup(data))} className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="name" className="text-sm font-medium">Nome</label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>
      <div className="space-y-1">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>
      <div className="space-y-1">
        <label htmlFor="password" className="text-sm font-medium">Senha</label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>
      {error && <p className="text-sm text-destructive">{error.message}</p>}
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Criando conta...' : 'Criar conta'}
      </Button>
    </form>
  )
}
