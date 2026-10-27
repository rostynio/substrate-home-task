import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export const ActionLink = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link className="action" to={to}>
    {children} <span aria-hidden="true">→</span>
  </Link>
)
