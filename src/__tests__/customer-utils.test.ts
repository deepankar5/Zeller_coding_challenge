import { describe, expect, it } from 'vitest'
import { getInitial, mapCustomer, normalizeRole } from '../utils/customer'

describe('customer utilities', () => {
  it('normalizes known roles', () => {
    expect(normalizeRole('admin')).toBe('ADMIN')
    expect(normalizeRole('MANAGER')).toBe('MANAGER')
    expect(normalizeRole('owner')).toBeNull()
  })

  it('maps valid customer payload', () => {
    expect(
      mapCustomer({
        id: '1',
        name: 'John Smith',
        email: 'john@example.com',
        role: 'ADMIN',
      }),
    ).toEqual({
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      role: 'ADMIN',
    })
  })

  it('drops invalid customer payload', () => {
    expect(
      mapCustomer({
        id: null,
        name: 'John Smith',
        email: 'john@example.com',
        role: 'ADMIN',
      }),
    ).toBeNull()
  })

  it('returns uppercase initial', () => {
    expect(getInitial(' perri smith')).toBe('P')
  })
})
