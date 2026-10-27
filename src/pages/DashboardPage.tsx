import { Link } from 'react-router-dom'
import { ActionLink } from '../components/ActionLink'
import { LoanProgress } from '../components/LoanProgress'
import { Shell } from '../components/Shell'
import { StandingPill } from '../components/StandingPill'
import { Stat } from '../components/Stat'
import { PORTAL_DATE, activeLoans, applications } from '../fixtures'
import { openLoan, summarizeBook } from '../utils/book'
import { formatDate, formatMoney } from '../utils/format'

export const DashboardPage = () => {
  const rows = activeLoans().map((loan) => openLoan(loan, PORTAL_DATE))
  const book = summarizeBook(rows)
  const openApplications = applications.filter((application) => application.status !== 'funded').length

  return (
    <Shell topic="loan">
      <h1>Dashboard</h1>
      <p className="lede">Where your loans stand</p>
      {rows.length === 0 ? (
        <p className="note">No active loans yet.</p>
      ) : (
        <>
          <div className="stats">
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

          <section className="card coming">
            <h2>Coming up</h2>
            {book.upcoming.length === 0 && <p className="note">Nothing scheduled.</p>}
            <div className="coming-list">
              {book.upcoming.map(({ loan, debit }) => (
                <Link key={loan.id} className="coming-row" to={`/loans/${loan.id}`}>
                  <span>{formatDate(debit.date)}</span>
                  <span>{loan.equipment}</span>
                  <span>{formatMoney(debit.amountCents)}</span>
                  <StandingPill returned={debit.stillDue} />
                </Link>
              ))}
            </div>
            <p className="dash-open">
              <ActionLink to="/loans">Active loans</ActionLink>
            </p>
          </section>

          {openApplications > 0 && (
            <p className="dash-aside">
              <Link to="/applications">
                {openApplications} {openApplications === 1 ? 'application is' : 'applications are'} still open
              </Link>
            </p>
          )}
        </>
      )}
    </Shell>
  )
}
