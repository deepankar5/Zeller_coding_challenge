import type { UserType } from '../types/customer'

interface UserTypeFilterProps {
  selectedUserType: UserType
  onUserTypeChange: (role: UserType) => void
}

const USER_TYPE_OPTIONS: Array<{ label: string; value: UserType }> = [
  { label: 'Admin', value: 'ADMIN' },
  { label: 'Manager', value: 'MANAGER' },
]

export function UserTypeFilter({ selectedUserType, onUserTypeChange }: UserTypeFilterProps) {
  return (
    <section className="card">
      <h2 className="section-title">User Types</h2>
      <div className="radio-group" role="radiogroup" aria-label="User Types">
        {USER_TYPE_OPTIONS.map((option) => {
          const isSelected = selectedUserType === option.value

          return (
            <label key={option.value} className={`radio-row ${isSelected ? 'selected' : ''}`}>
              <input
                type="radio"
                name="user-type"
                value={option.value}
                checked={isSelected}
                onChange={() => onUserTypeChange(option.value)}
              />
              <span>{option.label}</span>
            </label>
          )
        })}
      </div>
    </section>
  )
}
