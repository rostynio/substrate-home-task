import type { ApplicationStatus as Status } from '../fixtures'
import { Badge } from '@/components/ui/badge'

const label = {
  action_required: 'Action required',
  blocked_by_vendor: 'Blocked by vendor',
  in_review: 'In review',
  funded: 'Funded',
} as const

const variant = {
  action_required: 'action',
  blocked_by_vendor: 'blocked',
  in_review: 'review',
  funded: 'current',
} as const

export const ApplicationStatus = ({ status }: { status: Status }) => (
  <Badge variant={variant[status]}>{label[status]}</Badge>
)
