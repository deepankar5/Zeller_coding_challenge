import { useQuery } from '@tanstack/react-query'
import { fetchZellerCustomers } from '../services/zellerApi'
import type { Customer } from '../types/customer'

interface UseCustomersResult {
  customers: Customer[]
  isLoading: boolean
  isRefetching: boolean
  error: string | null
  retry: () => void
}

export function useCustomers(): UseCustomersResult {
  const { data, error, isPending, isFetching, refetch } = useQuery({
    queryKey: ['zellerCustomers'],
    queryFn: ({ signal }) => fetchZellerCustomers(signal),
  })

  return {
    customers: data ?? [],
    isLoading: isPending,
    isRefetching: isFetching && !isPending,
    error: error instanceof Error ? error.message : null,
    retry: () => {
      void refetch()
    },
  }
}
