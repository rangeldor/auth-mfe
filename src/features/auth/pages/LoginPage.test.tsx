import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { LoginPage } from './LoginPage'

vi.mock('../components/LoginForm', () => ({
  LoginForm: () => <div>LoginForm</div>,
}))

describe('LoginPage', () => {
  it('renders login page', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    )
    expect(screen.getByText(/entrar/i)).toBeInTheDocument()
    expect(screen.getByText(/não tem conta/i)).toBeInTheDocument()
  })
})
