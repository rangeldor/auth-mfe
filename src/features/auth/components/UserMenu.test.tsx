import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { UserMenu } from './UserMenu'

const mockLogout = vi.fn()
const mockUser = { 
  id: '1', 
  name: 'John', 
  email: 'john@example.com', 
  role: 'user' as const,
  image: undefined,
  createdAt: new Date().toISOString()
}

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => ({
    user: mockUser,
    logout: mockLogout,
  }),
}))

describe('UserMenu', () => {
  it('renders user name', () => {
    render(<UserMenu />)
    expect(screen.getByText('John')).toBeInTheDocument()
  })

  it('renders user initial in avatar', () => {
    render(<UserMenu />)
    expect(screen.getByText('J')).toBeInTheDocument()
  })

  it('renders logout button', () => {
    render(<UserMenu />)
    expect(screen.getByRole('button', { name: /sair/i })).toBeInTheDocument()
  })
})
