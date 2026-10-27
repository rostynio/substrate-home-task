import { Link } from 'react-router-dom'
import { ActionLink } from '../components/ActionLink'
import { LoanProgress } from '../components/LoanProgress'
import { Shell } from '../components/Shell'
import { StandingPill } from '../components/StandingPill'
import { Stat } from '../components/Stat'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PORTAL_DATE, activeLoans, applications } from '../fixtures'
import { openLoan, summarizeBook } from '../utils/book'
import { formatDate, formatMoney } from '../utils/format'

export const DashboardPage = () => {
  const rows = activeLoans().map((loan) => openLoan(loan, PORTAL_DATE))
  const book = summarizeBook(rows)
  const openApplications = applications.filter((application) => application.status !== 'funded').length

  return (
    <Shell topic="loan">
      <h1 className="text-[22px] font-semibold tracking-tight">Dashboard</h1>
      <p className="mt-1 text-[13px] text-muted-foreground">Where your loans stand</p>
      {rows.length === 0 ? (
        <p className="mt-2 text-[13px] text-muted-foreground">No active loans yet.</p>
      ) : (
        <>
          <div className="mt-[18px] grid grid-cols-2 gap-3 max-md:grid-cols-1">
            <Stat
              label="Active loans"
              value={String(rows.length)}
              detail={book.returnedCount === 0 ? 'All current' : `${book.returnedCount} with a returned debit`}
            />
            <Stat label="Balance" value={formatMoney(book.balanceCents)} detail="Remaining principal" />
            <Stat
              label="Principal paid"
              value={formatMoney(book.paidCents)}
              detail={`of ${formatMoney(book.originalCents)}`}
            />
            <Stat
              label="Next debit"
              value={book.nextDate ? formatDate(book.nextDate) : 'None'}
              detail={
                book.nextDate
                  ? `${formatMoney(book.nextAmountCents)} across ${book.nextCount} ${book.nextCount === 1 ? 'loan' : 'loans'}${book.nextStillDue ? ' · still owed' : ''}`
                  : 'Nothing scheduled'
              }
            />
          </div>

          <LoanProgress
            id="portfolio"
            originalCents={book.originalCents}
            detail={`Across ${rows.length} loans`}
            principalPaidCents={book.paidCents}
            principalLeftCents={book.balanceCents}
            paymentsPosted={book.posted}
            paymentsLeft={book.paymentsLeft}
          />

          <Card className="mt-[18px]">
            <CardHeader>
              <CardTitle className="text-[15px] font-semibold">Coming up</CardTitle>
            </CardHeader>
            <CardContent>
              {book.upcoming.length === 0 && <p className="text-[13px] text-muted-foreground">Nothing scheduled.</p>}
              <div>
                {book.upcoming.map(({ loan, debit }) => (
                  <Link
                    key={loan.id}
                    className="grid grid-cols-[132px_minmax(0,1fr)_auto_auto] items-center gap-3 border-t border-border py-3 text-foreground no-underline first:border-t-0 max-md:grid-cols-[1fr_auto]"
                    to={`/loans/${loan.id}`}
                  >
                    <span className="max-md:col-span-full">{formatDate(debit.date)}</span>
                    <span>{loan.equipment}</span>
                    <span>{formatMoney(debit.amountCents)}</span>
                    <StandingPill returned={debit.stillDue} />
                  </Link>
                ))}
              </div>
              <p className="mt-2.5 text-right">
                <ActionLink to="/loans">Active loans</ActionLink>
              </p>
            </CardContent>
          </Card>

          {openApplications > 0 && (
            <p className="mt-3.5 text-[13px]">
              <Link className="text-foreground" to="/applications">
                {openApplications} {openApplications === 1 ? 'application is' : 'applications are'} still open
              </Link>
            </p>
          )}
        </>
      )}
    </Shell>
  )
}
