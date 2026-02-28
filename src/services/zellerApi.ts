import { ListZellerCustomers } from '../../graphql/queries'
import { awsConfig } from '../config/awsConfig'
import type { Customer, ListZellerCustomersResponse } from '../types/customer'
import { mapCustomer } from '../utils/customer'

const { aws_appsync_graphqlEndpoint: endpoint, aws_appsync_apiKey: apiKey } = awsConfig

export async function fetchZellerCustomers(signal?: AbortSignal): Promise<Customer[]> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify({ query: ListZellerCustomers }),
    signal,
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch customers: ${response.status}`)
  }

  const payload = (await response.json()) as {
    data?: ListZellerCustomersResponse
    errors?: Array<{ message?: string }>
  }

  if (payload.errors?.length) {
    const message = payload.errors[0]?.message ?? 'GraphQL request failed'
    throw new Error(message)
  }

  const rawItems = payload.data?.listZellerCustomers?.items ?? []

  return rawItems
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .map(mapCustomer)
    .filter((customer): customer is Customer => Boolean(customer))
}
