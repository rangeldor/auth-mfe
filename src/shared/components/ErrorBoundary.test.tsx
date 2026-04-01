import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { ErrorBoundary } from './ErrorBoundary'

const ThrowError = () => {
  throw new Error('Test error')
}

describe('ErrorBoundary', () => {
  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <div>Content</div>
      </ErrorBoundary>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders fallback when error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    expect(screen.getByText(/algo deu errado/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /tentar novamente/i })).toBeInTheDocument()
  })

  it('calls resetError on button click', async () => {
    const user = userEvent.setup()
    render(
      <ErrorBoundary fallback={({ resetError }) => (
        <button onClick={resetError}>Reset</button>
      )}>
        <ThrowError />
      </ErrorBoundary>
    )

    await user.click(screen.getByRole('button', { name: /reset/i }))
    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})
