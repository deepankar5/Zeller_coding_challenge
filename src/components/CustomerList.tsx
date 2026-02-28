import type { Customer, UserType } from '../types/customer'
import { getInitial } from '../utils/customer'

interface CustomerListProps {
  customers: Customer[]
  selectedUserType: UserType
}

export function CustomerList({ customers, selectedUserType }: CustomerListProps) {
  const heading = selectedUserType === 'ADMIN' ? 'Admin Users' : 'Manager Users'

  return (
    <section className="card">
      <h2 className="section-title">{heading}</h2>
      <ul className="customer-list" aria-label={`${heading} list`}>
        {customers.map((customer) => (
          <li key={customer.id} className="customer-row">
            <span className="avatar" aria-hidden="true">
              {getInitial(customer.name)}
            </span>
            <div>
              <p className="customer-name">{customer.name}</p>
              <p className="customer-role">{customer.role === 'ADMIN' ? 'Admin' : 'Manager'}</p>
            </div>
          </li>
        ))}
      </ul>
      {customers.length === 0 ? <p className="empty-state">No users found.</p> : null}
    </section>
  )
}
