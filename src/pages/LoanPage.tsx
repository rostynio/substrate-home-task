import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Fact } from '../components/Fact'
import { InstallmentList } from '../components/InstallmentList'
import { LoanProgress } from '../components/LoanProgress'
import { BackLink, Shell } from '../components/Shell'
import { StandingPill } from '../components/StandingPill'
import { PORTAL_DATE, loans } from '../fixtures'
import { ledgerHasReturn, openLoan } from '../utils/book'
import { formatDate, formatMoney } from '../utils/format'

const previewCount = 3

export const LoanPage = () => {
  const { loanId } = useParams()
  const loan = loanId ? loans[loanId] : undefined
  const [payoffDate, setPayoffDate] = useState(PORTAL_DATE)
  const [showAll, setShowAll] = useState(false)

  if (!loan) {
    return (
      <Shell topic="loan">
        <BackLink to="/loans">Active loans</BackLink>
        <h1>Loan not found</h1>
      </Shell>
    )
  }

  const { snapshot, posted, paymentsLeft, principalPaidCents, returned } = openLoan(loan, PORTAL_DATE, payoffDate)
  const nextDebit = snapshot.upcoming[0]
  const visible = showAll ? snapshot.upcoming : snapshot.upcoming.slice(0, previewCount)
  const hiddenCount = snapshot.upcoming.length - visible.length

  return (
    <Shell topic="loan">
      <BackLink to="/loans">Active loans</BackLink>
      <div className="card-top title-row">
        <h1>{loan.equipment}</h1>
        <StandingPill returned={returned} />
      </div>
      <p className="meta">
        {loan.buyer} · {loan.dealer}
      </p>

      <LoanProgress
        id={loan.id}
        originalCents={loan.originalPrincipalCents}
        rateBps={loan.annualRateBps}
        termMonths={loan.termMonths}
        principalPaidCents={principalPaidCents}
        principalLeftCents={snapshot.outstandingPrincipalCents}
        paymentsPosted={posted}
        paymentsLeft={paymentsLeft}
      />

      <section className="card facts">
        <Fact label="Balance" value={formatMoney(snapshot.outstandingPrincipalCents)} />
        <Fact
          label="Next debit"
          value={
            nextDebit ? `${formatDate(nextDebit.date)} · ${formatMoney(nextDebit.amountCents)}` : 'Paid off'
          }
          note={nextDebit?.stillDue ? 'Still due. This debit was returned.' : undefined}
          warn={nextDebit?.stillDue}
        />
        <Fact
          label="Autopay"
          value={`On · ${loan.autopay.bankName} ····${loan.autopay.last4}`}
          note="Collected at signing."
        />
      </section>

      <section className="block">
        <h2>Upcoming</h2>
        <InstallmentList
          rows={visible.map((debit) => ({
            key: debit.date,
            date: debit.date,
            amountCents: debit.amountCents,
            tone: debit.stillDue ? 'failed' : 'expected',
            label: debit.stillDue ? 'Failed' : 'Expected',
          }))}
        />
        {hiddenCount > 0 && (
          <button type="button" className="text-button show-more" onClick={() => setShowAll(true)}>
            Show remaining {hiddenCount}
          </button>
        )}
      </section>

      <section className="block">
        <h2>History</h2>
        {ledgerHasReturn(snapshot) && (
          <p className="note">A returned debit is still owed. It does not reduce the balance.</p>
        )}
        <InstallmentList
          rows={snapshot.history.map((entry) => ({
            key: `${entry.date}-${entry.result}`,
            date: entry.date,
            amountCents: entry.amountCents,
            tone: entry.result === 'returned' ? 'failed' : 'posted',
            label: entry.result === 'returned' ? 'Failed' : 'Paid',
          }))}
        />
      </section>

      <section className="card payoff">
        <div className="payoff-head">
          <h2>Payoff quote</h2>
          <label>
            As of
            <input
              type="date"
              value={payoffDate}
              onChange={(event) => {
                if (event.target.value) setPayoffDate(event.target.value)
              }}
            />
          </label>
        </div>
        <p className="payoff-amount">{formatMoney(snapshot.payoffCents)}</p>
        <p className="note">
          {snapshot.payoffDays === 0
            ? `No additional interest. Interest is paid through ${formatDate(snapshot.interestPaidThrough)}.`
            : `Includes ${formatMoney(snapshot.interestCents)} of interest for ${snapshot.payoffDays} days, on a 360-day year.`}{' '}
          This is an estimate, not a payoff letter.
        </p>
      </section>
    </Shell>
  )
}
