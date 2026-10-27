import { cn } from 'cn'
import { Badge } from '@/components/ui/badge'
import { formatDate, formatMoney } from '../utils/format'

export type InstallmentTone = 'posted' | 'expected' | 'failed'

const toneVariant = {
  posted: 'paid',
  expected: 'expected',
  failed: 'failed',
} as const

const toneEdge = {
  posted: 'shadow-[inset_3px_0_0_#157a3e]',
  expected: 'shadow-[inset_3px_0_0_#d4a017]',
  failed: 'shadow-[inset_3px_0_0_#c44545]',
} as const

export const InstallmentList = ({
  rows,
}: {
  rows: { key: string; date: string; amountCents: number; tone: InstallmentTone; label: string }[]
}) => (
  <ol className="mt-3 list-none overflow-hidden rounded-xl border border-border p-0">
    {rows.map((row) => (
      <li
        key={row.key}
        className={cn(
          'grid grid-cols-[1fr_auto_auto] items-center gap-4 border-t border-border px-4 py-3 first:border-t-0',
          toneEdge[row.tone],
        )}
      >
        <span>{formatDate(row.date)}</span>
        <span>{formatMoney(row.amountCents)}</span>
        <Badge variant={toneVariant[row.tone]}>{row.label}</Badge>
      </li>
    ))}
  </ol>
)
