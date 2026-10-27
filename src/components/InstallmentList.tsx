import { formatDate, formatMoney } from '../utils/format'

export type InstallmentTone = 'posted' | 'expected' | 'failed'

export const InstallmentList = ({
  rows,
}: {
  rows: { key: string; date: string; amountCents: number; tone: InstallmentTone; label: string }[]
}) => (
  <ol className="rows">
    {rows.map((row) => (
      <li key={row.key} className={`row-${row.tone}`}>
        <span>{formatDate(row.date)}</span>
        <span>{formatMoney(row.amountCents)}</span>
        <span className="tag">{row.label}</span>
      </li>
    ))}
  </ol>
)
