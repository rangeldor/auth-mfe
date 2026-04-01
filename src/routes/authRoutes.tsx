import type { RouteObject } from 'react-router'
import { LoginPageHost } from '@/features/auth/pages/LoginPageHost'
import { SignupPageHost } from '@/features/auth/pages/SignupPageHost'

export const authRoutes: RouteObject[] = [
  { path: 'login', element: <LoginPageHost /> },
  { path: 'signup', element: <SignupPageHost /> },
]
