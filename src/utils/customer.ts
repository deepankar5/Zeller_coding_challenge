import type { Customer, UserType } from '../types/customer'

export function normalizeRole(role?: string | null): UserType | null {
  const upperRole = role?.toUpperCase()

  if (upperRole === 'ADMIN' || upperRole === 'MANAGER') {
    return upperRole
  }

  return null
}

export function mapCustomer(rawCustomer: {
  id?: string | null
  name?: string | null
  email?: string | null
  role?: string | null
}): Customer | null {
  const role = normalizeRole(rawCustomer.role)

  if (!rawCustomer.id || !rawCustomer.name || !rawCustomer.email || !role) {
    return null
  }

  return {
    id: rawCustomer.id,
    name: rawCustomer.name,
    email: rawCustomer.email,
    role,
  }
}

export function getInitial(name: string): string {
  return name.trim().charAt(0).toUpperCase()
}
