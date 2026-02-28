import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from '../App'
import { useCustomers } from '../hooks/useCustomers'

vi.mock('../hooks/useCustomers', () => ({
  useCustomers: vi.fn(),
}))

const mockedUseCustomers = vi.mocked(useCustomers)

describe('App', () => {
  it('shows admin users by default', () => {
    mockedUseCustomers.mockReturnValue({
      isLoading: false,
      isRefetching: false,
      error: null,
      retry: vi.fn(),
      customers: [
        { id: '1', name: 'John Smith', email: 'john@example.com', role: 'ADMIN' },
        { id: '2', name: 'Adam Muller', email: 'adam@example.com', role: 'ADMIN' },
        { id: '3', name: 'Perri Smith', email: 'perri@example.com', role: 'MANAGER' },
      ],
    })

    render(<App />)

    expect(screen.getByText('Admin Users')).toBeInTheDocument()
    expect(screen.getByText('John Smith')).toBeInTheDocument()
    expect(screen.getByText('Adam Muller')).toBeInTheDocument()
    expect(screen.queryByText('Perri Smith')).not.toBeInTheDocument()
  })

  it('filters users when manager is selected', () => {
    mockedUseCustomers.mockReturnValue({
      isLoading: false,
      isRefetching: false,
      error: null,
      retry: vi.fn(),
      customers: [
        { id: '1', name: 'John Smith', email: 'john@example.com', role: 'ADMIN' },
        { id: '2', name: 'Adam Muller', email: 'adam@example.com', role: 'ADMIN' },
        { id: '3', name: 'Perri Smith', email: 'perri@example.com', role: 'MANAGER' },
      ],
    })

    render(<App />)

    fireEvent.click(screen.getByLabelText('Manager'))

    expect(screen.getByText('Manager Users')).toBeInTheDocument()
    expect(screen.getByText('Perri Smith')).toBeInTheDocument()
    expect(screen.queryByText('John Smith')).not.toBeInTheDocument()
  })

  it('shows loading status with a11y role', () => {
    mockedUseCustomers.mockReturnValue({
      isLoading: true,
      isRefetching: false,
      error: null,
      retry: vi.fn(),
      customers: [],
    })

    render(<App />)

    expect(screen.getByRole('status')).toHaveTextContent('Loading customers...')
  })

  it('shows error message and allows retry', () => {
    const retry = vi.fn()

    mockedUseCustomers.mockReturnValue({
      isLoading: false,
      isRefetching: false,
      error: 'Failed to fetch customers: 500',
      retry,
      customers: [],
    })

    render(<App />)

    expect(screen.getByRole('alert')).toHaveTextContent('Failed to fetch customers: 500')
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }))
    expect(retry).toHaveBeenCalledTimes(1)
  })

  it('shows empty state when selected role has no customers', () => {
    mockedUseCustomers.mockReturnValue({
      isLoading: false,
      isRefetching: false,
      error: null,
      retry: vi.fn(),
      customers: [{ id: '1', name: 'John Smith', email: 'john@example.com', role: 'ADMIN' }],
    })

    render(<App />)

    fireEvent.click(screen.getByLabelText('Manager'))

    expect(screen.getByText('No users found.')).toBeInTheDocument()
  })

  it('marks list as busy while refetching', () => {
    mockedUseCustomers.mockReturnValue({
      isLoading: false,
      isRefetching: true,
      error: null,
      retry: vi.fn(),
      customers: [{ id: '1', name: 'John Smith', email: 'john@example.com', role: 'ADMIN' }],
    })

    render(<App />)

    expect(screen.getByLabelText('Admin Users list').closest('.list-panel')).toHaveAttribute('aria-busy', 'true')
  })
})
