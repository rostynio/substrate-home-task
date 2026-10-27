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
  <div className="fact">
    <span>{label}</span>
    <strong>{value}</strong>
    {note && <em className={warn ? 'warn' : undefined}>{note}</em>}
  </div>
)
