import { Badge } from '@/components/ui/badge'

export const StandingPill = ({ returned }: { returned: boolean }) => (
  <Badge variant={returned ? 'returned' : 'current'}>{returned ? 'Returned' : 'Current'}</Badge>
)
