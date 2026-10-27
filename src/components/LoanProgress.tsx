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
    <figure className="ring">
      <svg viewBox="0 0 140 140" role="img" aria-label={`${title}: ${paidLine}, ${leftLine}`}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3dbe6e" />
            <stop offset="1" stopColor="#146b38" />
          </linearGradient>
        </defs>
        <circle className="ring-disc" cx="70" cy="70" r="40" />
        <circle className="ring-track" cx="70" cy="70" r={radius} />
        <circle
          className="ring-arc"
          cx="70"
          cy="70"
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeDasharray={`${drawn} ${circumference - drawn}`}
        />
        <text className="ring-center" x="70" y="76">
          {center}
        </text>
      </svg>
      <figcaption>
        <strong>{title}</strong>
        <span>{paidLine}</span>
        <span className="muted">{leftLine}</span>
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
    <section className="card rings" aria-label="Loan progress">
      <div className="loan-amount">
        <span>Loan amount</span>
        <strong>{formatMoney(originalCents)}</strong>
        <span className="muted">{caption}</span>
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
    </section>
  )
}
