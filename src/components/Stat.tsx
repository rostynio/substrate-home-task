import { Card } from '@/components/ui/card'

export const Stat = ({ label, value, detail }: { label: string; value: string; detail: string }) => (
  <Card size="sm" className="gap-0.5 px-4">
    <span className="text-[13px] text-muted-foreground">{label}</span>
    <strong className="text-[26px] leading-none font-semibold tracking-tight tabular-nums">{value}</strong>
    <span className="text-[13px] text-muted-foreground">{detail}</span>
  </Card>
)
