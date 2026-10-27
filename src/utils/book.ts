import { projectLoan, type Loan, type LoanSnapshot } from '../domain/projectLoan'

export type BookLoan = Loan & { id: string; equipment: string }

export const postedCount = (snapshot: LoanSnapshot) =>
  snapshot.history.filter((entry) => entry.result === 'posted').length

export const debitReturned = (snapshot: LoanSnapshot) => snapshot.upcoming.some((debit) => debit.stillDue)

export const ledgerHasReturn = (snapshot: LoanSnapshot) =>
  snapshot.history.some((entry) => entry.result === 'returned')

export const openLoan = (loan: BookLoan, asOf: string, payoffDate = asOf) => {
  const snapshot = projectLoan(loan, asOf, payoffDate)
  const posted = postedCount(snapshot)
  return {
    loan,
    snapshot,
    posted,
    paymentsLeft: loan.termMonths - posted,
    principalPaidCents: loan.originalPrincipalCents - snapshot.outstandingPrincipalCents,
    returned: debitReturned(snapshot),
  }
}

export type OpenLoan = ReturnType<typeof openLoan>

export const summarizeBook = (rows: OpenLoan[]) => {
  const balanceCents = rows.reduce((sum, row) => sum + row.snapshot.outstandingPrincipalCents, 0)
  const originalCents = rows.reduce((sum, row) => sum + row.loan.originalPrincipalCents, 0)
  const posted = rows.reduce((sum, row) => sum + row.posted, 0)
  const termCount = rows.reduce((sum, row) => sum + row.loan.termMonths, 0)
  const upcoming = rows
    .flatMap((row) => {
      const debit = row.snapshot.upcoming[0]
      return debit ? [{ loan: row.loan, debit }] : []
    })
    .sort((a, b) => a.debit.date.localeCompare(b.debit.date) || a.loan.equipment.localeCompare(b.loan.equipment))
  const nextDate = upcoming[0]?.debit.date
  const nextBatch = upcoming.filter((item) => item.debit.date === nextDate)

  return {
    balanceCents,
    originalCents,
    paidCents: originalCents - balanceCents,
    posted,
    paymentsLeft: termCount - posted,
    returnedCount: rows.filter((row) => row.returned).length,
    upcoming,
    nextDate,
    nextCount: nextBatch.length,
    nextAmountCents: nextBatch.reduce((sum, item) => sum + item.debit.amountCents, 0),
    nextStillDue: nextBatch.some((item) => item.debit.stillDue),
  }
}
