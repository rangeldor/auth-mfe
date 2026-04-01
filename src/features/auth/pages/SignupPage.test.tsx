import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { SignupPage } from './SignupPage'

vi.mock('../components/SignupForm', () => ({
  SignupForm: () => <div>SignupForm</div>,
}))

describe('SignupPage', () => {
  it('renders signup page', () => {
    render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    )
    expect(screen.getByText(/criar conta/i)).toBeInTheDocument()
    expect(screen.getByText(/já tem conta/i)).toBeInTheDocument()
  })
})
