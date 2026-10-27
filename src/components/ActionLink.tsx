import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export const ActionLink = ({ to, children }: { to: string; children: ReactNode }) => (
  <Button variant="link" className="h-auto p-0 whitespace-nowrap" asChild>
    <Link to={to}>
      {children} <span aria-hidden="true">→</span>
    </Link>
  </Button>
)
