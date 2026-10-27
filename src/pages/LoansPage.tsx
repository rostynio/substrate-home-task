import { ActionLink } from '../components/ActionLink'
import { Shell } from '../components/Shell'
import { StandingPill } from '../components/StandingPill'
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { PORTAL_DATE, activeLoans } from '../fixtures'
import { openLoan } from '../utils/book'
import { formatDate, formatMoney } from '../utils/format'

export const LoansPage = () => {
  const loans = activeLoans()

  return (
    <Shell topic="loan">
      <h1 className="text-[22px] font-semibold tracking-tight">Active loans</h1>
      <p className="mt-1 text-[13px] text-muted-foreground">Loans Substrate has funded for you</p>
      {loans.length === 0 && <p className="mt-2 text-[13px] text-muted-foreground">No active loans yet.</p>}
      <div className="mt-[18px] grid gap-3">
        {loans.map((loan) => {
          const { snapshot, returned } = openLoan(loan, PORTAL_DATE)
          const nextDebit = snapshot.upcoming[0]

          return (
            <Card asChild key={loan.id} size="sm">
              <article>
                <CardHeader>
                  <CardTitle asChild className="text-[15px] font-semibold">
                    <h2>{loan.equipment}</h2>
                  </CardTitle>
                  <CardAction>
                    <StandingPill returned={returned} />
                  </CardAction>
                </CardHeader>
                <CardContent className="text-[13px] text-muted-foreground">
                  {loan.buyer} · {loan.dealer} · Balance {formatMoney(snapshot.outstandingPrincipalCents)}
                </CardContent>
                <CardFooter className="items-center justify-between gap-4 border-0 bg-transparent">
                  <p>
                    {nextDebit
                      ? `Next debit ${formatDate(nextDebit.date)} · ${formatMoney(nextDebit.amountCents)}`
                      : 'Paid off'}
                  </p>
                  <ActionLink to={`/loans/${loan.id}`}>View loan</ActionLink>
                </CardFooter>
              </article>
            </Card>
          )
        })}
      </div>
    </Shell>
  )
}
