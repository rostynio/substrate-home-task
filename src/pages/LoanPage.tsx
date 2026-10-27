import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Fact } from '../components/Fact'
import { InstallmentList } from '../components/InstallmentList'
import { LoanProgress } from '../components/LoanProgress'
import { BackLink, Shell } from '../components/Shell'
import { StandingPill } from '../components/StandingPill'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
        <h1 className="text-[22px] font-semibold tracking-tight">Loan not found</h1>
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
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-[22px] font-semibold tracking-tight">{loan.equipment}</h1>
        <StandingPill returned={returned} />
      </div>
      <p className="mt-1.5 text-[13px] text-muted-foreground">
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

      <Card className="mt-[18px] gap-0 py-0">
        <Fact label="Balance" value={formatMoney(snapshot.outstandingPrincipalCents)} />
        <Fact
          label="Next debit"
          value={nextDebit ? `${formatDate(nextDebit.date)} · ${formatMoney(nextDebit.amountCents)}` : 'Paid off'}
          note={nextDebit?.stillDue ? 'Still due. This debit was returned.' : undefined}
          warn={nextDebit?.stillDue}
        />
        <Fact
          label="Autopay"
          value={`On · ${loan.autopay.bankName} ····${loan.autopay.last4}`}
          note="Collected at signing."
        />
      </Card>

      <section className="mt-6">
        <h2 className="text-base font-semibold">Upcoming</h2>
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
          <Button
            type="button"
            variant="link"
            className="mt-2.5 h-auto p-0"
            onClick={() => setShowAll(true)}
          >
            Show remaining {hiddenCount}
          </Button>
        )}
      </section>

      <section className="mt-6">
        <h2 className="text-base font-semibold">History</h2>
        {ledgerHasReturn(snapshot) && (
          <p className="mt-2 text-[13px] text-muted-foreground">
            A returned debit is still owed. It does not reduce the balance.
          </p>
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

      <Card asChild className="mt-6">
        <section aria-label="Payoff quote">
          <div className="flex items-end justify-between gap-4 px-(--card-spacing)">
            <h2 className="text-base font-semibold">Payoff quote</h2>
            <div className="grid gap-1">
              <Label htmlFor="payoff-date" className="text-[13px] font-normal text-muted-foreground">
                As of
              </Label>
              <Input
                id="payoff-date"
                type="date"
                className="w-auto"
                value={payoffDate}
                onChange={(event) => {
                  if (event.target.value) setPayoffDate(event.target.value)
                }}
              />
            </div>
          </div>
          <p className="mt-3 px-(--card-spacing) text-[32px] font-semibold tracking-tight">
            {formatMoney(snapshot.payoffCents)}
          </p>
          <p className="mt-2 px-(--card-spacing) text-[13px] text-muted-foreground">
            {snapshot.payoffDays === 0
              ? `No additional interest. Interest is paid through ${formatDate(snapshot.interestPaidThrough)}.`
              : `Includes ${formatMoney(snapshot.interestCents)} of interest for ${snapshot.payoffDays} days, on a 360-day year.`}{' '}
            This is an estimate, not a payoff letter.
          </p>
        </section>
      </Card>
    </Shell>
  )
}
