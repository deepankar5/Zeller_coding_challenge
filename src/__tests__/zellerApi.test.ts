import { afterEach, describe, expect, it, vi } from 'vitest'
import { fetchZellerCustomers } from '../services/zellerApi'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('fetchZellerCustomers', () => {
  it('returns mapped customers when response is valid', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        data: {
          listZellerCustomers: {
            items: [
              {
                id: '1',
                name: 'John Smith',
                email: 'john@example.com',
                role: 'ADMIN',
              },
              {
                id: '2',
                name: 'Perri Smith',
                email: 'perri@example.com',
                role: 'manager',
              },
              null,
            ],
          },
        },
      }),
    } as Response)

    const result = await fetchZellerCustomers()

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(result).toEqual([
      { id: '1', name: 'John Smith', email: 'john@example.com', role: 'ADMIN' },
      { id: '2', name: 'Perri Smith', email: 'perri@example.com', role: 'MANAGER' },
    ])
  })

  it('throws when http response is not ok', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
    } as Response)

    await expect(fetchZellerCustomers()).rejects.toThrow('Failed to fetch customers: 500')
  })

  it('throws graphql error message', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        errors: [{ message: 'Request denied' }],
      }),
    } as Response)

    await expect(fetchZellerCustomers()).rejects.toThrow('Request denied')
  })

  it('filters invalid items from api payload', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        data: {
          listZellerCustomers: {
            items: [
              { id: '1', name: 'John Smith', email: null, role: 'ADMIN' },
              { id: '2', name: 'Perri Smith', email: 'perri@example.com', role: 'OWNER' },
            ],
          },
        },
      }),
    } as Response)

    await expect(fetchZellerCustomers()).resolves.toEqual([])
  })
})
