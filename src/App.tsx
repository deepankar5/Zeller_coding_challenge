import { useMemo, useState, useTransition } from 'react'
import { CustomerList } from './components/CustomerList'
import { UserTypeFilter } from './components/UserTypeFilter'
import { useCustomers } from './hooks/useCustomers'
import type { UserType } from './types/customer'
import './App.css'

function App() {
  const [selectedUserType, setSelectedUserType] = useState<UserType>('ADMIN')
  const [isFilterTransitionPending, startTransition] = useTransition()
  const { customers, isLoading, isRefetching, error, retry } = useCustomers()

  const filteredCustomers = useMemo(
    () => customers.filter((customer) => customer.role === selectedUserType),
    [customers, selectedUserType],
  )

  const handleUserTypeChange = (role: UserType) => {
    startTransition(() => {
      setSelectedUserType(role)
    })
  }

  return (
    <main className="app-shell">
      <UserTypeFilter selectedUserType={selectedUserType} onUserTypeChange={handleUserTypeChange} />

      {isLoading ? (
        <p className="status-message" role="status" aria-live="polite">
          Loading customers...
        </p>
      ) : null}

      {error ? (
        <div className="status-message error" role="alert">
          <p className="status-copy">{error}</p>
          <button type="button" className="retry-button" onClick={retry}>
            Try again
          </button>
        </div>
      ) : null}

      {!isLoading && !error ? (
        <div
          key={selectedUserType}
          className={`list-panel ${isFilterTransitionPending || isRefetching ? 'is-updating' : ''}`}
          aria-busy={isFilterTransitionPending || isRefetching}
        >
          <CustomerList customers={filteredCustomers} selectedUserType={selectedUserType} />
        </div>
      ) : null}
    </main>
  )
}

export default App
