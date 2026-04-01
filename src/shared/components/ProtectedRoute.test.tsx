import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ProtectedRoute } from './ProtectedRoute'

const mockIsAuthenticated = vi.fn()

vi.mock('@/features/auth/hooks/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: mockIsAuthenticated(),
  }),
}))

describe('ProtectedRoute', () => {
  it('renders children when authenticated', () => {
    mockIsAuthenticated.mockReturnValue(true)
    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )
    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })

  it('redirects when not authenticated', () => {
    mockIsAuthenticated.mockReturnValue(false)
    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )
  })
})
