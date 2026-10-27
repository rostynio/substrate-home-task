import { ActionLink } from '../components/ActionLink'
import { Shell } from '../components/Shell'
import { StandingPill } from '../components/StandingPill'
import { PORTAL_DATE, activeLoans } from '../fixtures'
import { openLoan } from '../utils/book'
import { formatDate, formatMoney } from '../utils/format'

export const LoansPage = () => {
  const loans = activeLoans()

  return (
    <Shell topic="loan">
      <h1>Active loans</h1>
      <p className="lede">Loans Substrate has funded for you</p>
      {loans.length === 0 && <p className="note">No active loans yet.</p>}
      <div className="cards">
        {loans.map((loan) => {
          const { snapshot, returned } = openLoan(loan, PORTAL_DATE)
          const nextDebit = snapshot.upcoming[0]

          return (
            <article key={loan.id} className="card">
              <div className="card-top">
                <h2>{loan.equipment}</h2>
                <StandingPill returned={returned} />
              </div>
              <p className="meta">
                {loan.buyer} · {loan.dealer} · Balance {formatMoney(snapshot.outstandingPrincipalCents)}
              </p>
              <div className="card-bottom">
                <p>
                  {nextDebit
                    ? `Next debit ${formatDate(nextDebit.date)} · ${formatMoney(nextDebit.amountCents)}`
                    : 'Paid off'}
                </p>
                <ActionLink to={`/loans/${loan.id}`}>View loan</ActionLink>
              </div>
            </article>
          )
        })}
      </div>
    </Shell>
  )
}
