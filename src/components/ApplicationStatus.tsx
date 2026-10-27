import type { ApplicationStatus as Status } from '../fixtures'

const label = {
  action_required: 'Action required',
  blocked_by_vendor: 'Blocked by vendor',
  in_review: 'In review',
  funded: 'Funded',
} as const

export const ApplicationStatus = ({ status }: { status: Status }) => (
  <span className={`status status-${status}`}>{label[status]}</span>
)
