import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { SignupPage } from '@/features/auth/pages/SignupPage'

const router = createBrowserRouter(
  [
    { path: '/login', element: <LoginPage /> },
    { path: '/signup', element: <SignupPage /> },
    { index: true, loader: () => '/login' },
  ],
  {
    basename: import.meta.env.VITE_AUTH_URL || '/',
  }
)

export { RouterProvider, router }
