import { cn } from 'cn'

export const Fact = ({
  label,
  value,
  note,
  warn = false,
}: {
  label: string
  value: string
  note?: string
  warn?: boolean
}) => (
  <div className="grid grid-cols-[120px_1fr] gap-x-3 gap-y-1 border-t border-border px-[18px] py-3.5 first:border-t-0 max-md:grid-cols-1">
    <span className="text-muted-foreground">{label}</span>
    <strong className="font-semibold">{value}</strong>
    {note && (
      <p className={cn('col-start-2 text-[13px] max-md:col-start-1', warn ? 'text-returned' : 'text-muted-foreground')}>
        {note}
      </p>
    )}
  </div>
)
