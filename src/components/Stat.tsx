export const Stat = ({ label, value, detail }: { label: string; value: string; detail: string }) => (
  <article className="card stat">
    <span>{label}</span>
    <strong>{value}</strong>
    <span className="muted">{detail}</span>
  </article>
)
