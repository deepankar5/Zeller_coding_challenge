export type UserType = 'ADMIN' | 'MANAGER'

export interface Customer {
  id: string
  name: string
  email: string
  role: UserType
}

export interface ListZellerCustomersResponse {
  listZellerCustomers?: {
    items?: Array<{
      id?: string | null
      name?: string | null
      email?: string | null
      role?: string | null
    } | null> | null
  } | null
}
