import { Card } from '@/components/ui/card'
import { formatMoney, formatRate } from '../utils/format'

const Ring = ({
  id,
  portion,
  center,
  title,
  paidLine,
  leftLine,
}: {
  id: string
  portion: number
  center: string
  title: string
  paidLine: string
  leftLine: string
}) => {
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const clamped = Math.min(1, Math.max(0, portion))
  const drawn = circumference * clamped
  const gradientId = `ring-${id}`

  return (
    <figure className="m-0 grid justify-items-center text-center">
      <svg className="size-[168px]" viewBox="0 0 140 140" role="img" aria-label={`${title}: ${paidLine}, ${leftLine}`}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3dbe6e" />
            <stop offset="1" stopColor="#146b38" />
          </linearGradient>
        </defs>
        <circle fill="#f4faf6" cx="70" cy="70" r="40" />
        <circle fill="none" stroke="#e7eee9" strokeWidth="12" cx="70" cy="70" r={radius} />
        <circle
          className="origin-[70px_70px] -rotate-90"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="12"
          strokeLinecap="round"
          cx="70"
          cy="70"
          r={radius}
          strokeDasharray={`${drawn} ${circumference - drawn}`}
        />
        <text className="fill-foreground text-[22px] font-semibold" x="70" y="76" textAnchor="middle">
          {center}
        </text>
      </svg>
      <figcaption className="grid gap-0.5">
        <strong className="text-sm">{title}</strong>
        <span className="text-[13px]">{paidLine}</span>
        <span className="text-[13px] text-muted-foreground">{leftLine}</span>
      </figcaption>
    </figure>
  )
}

export const LoanProgress = ({
  id,
  originalCents,
  rateBps,
  termMonths,
  detail,
  principalPaidCents,
  principalLeftCents,
  paymentsPosted,
  paymentsLeft,
}: {
  id: string
  originalCents: number
  rateBps?: number
  termMonths?: number
  detail?: string
  principalPaidCents: number
  principalLeftCents: number
  paymentsPosted: number
  paymentsLeft: number
}) => {
  const principalTotal = principalPaidCents + principalLeftCents
  const paymentTotal = paymentsPosted + paymentsLeft
  const caption = detail ?? `${formatRate(rateBps ?? 0)} · ${termMonths ?? 0} months`

  return (
    <Card asChild className="mt-[18px]">
      <section aria-label="Loan progress">
        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
          <div className="col-span-full mb-1 grid gap-0.5">
            <span className="text-[13px] text-muted-foreground">Loan amount</span>
            <strong className="text-[28px] font-semibold tracking-tight">{formatMoney(originalCents)}</strong>
            <span className="text-muted-foreground">{caption}</span>
          </div>
          <Ring
            portion={principalTotal === 0 ? 0 : principalPaidCents / principalTotal}
            center={`${Math.round((principalTotal === 0 ? 0 : principalPaidCents / principalTotal) * 100)}%`}
            id={`${id}-principal`}
            title="Principal"
            paidLine={`${formatMoney(principalPaidCents)} paid`}
            leftLine={`${formatMoney(principalLeftCents)} left`}
          />
          <Ring
            portion={paymentTotal === 0 ? 0 : paymentsPosted / paymentTotal}
            center={`${paymentsPosted}/${paymentTotal}`}
            id={`${id}-payments`}
            title="Payments"
            paidLine={`${paymentsPosted} paid`}
            leftLine={`${paymentsLeft} left`}
          />
        </div>
      </section>
    </Card>
  )
}
