import { describe, expect, it } from 'vitest'
import { projectLoan, type Loan } from './projectLoan'

const workedExample: Loan = {
  originalPrincipalCents: 1_000_000,
  annualRateBps: 900,
  termMonths: 4,
  installmentCents: 50_000,
  fundedOn: '2026-01-01',
  firstDebitDate: '2026-02-01',
  entries: [{ date: '2026-02-01', amountCents: 50_000, result: 'posted' }],
}

const withReturn: Loan = {
  ...workedExample,
  entries: [
    ...workedExample.entries,
    { date: '2026-03-01', amountCents: 50_000, result: 'returned' },
  ],
}

describe('projectLoan', () => {
  it('reduces principal by the installment minus interest when a debit posts', () => {
    // $10,000 at 9% for 31 days on a 360-day year is $77.50 of interest.
    // A $500 installment leaves principal of $9,577.50.
    const snapshot = projectLoan(workedExample, '2026-02-01')

    expect(snapshot.outstandingPrincipalCents).toBe(957_750)
  })

  it('leaves principal unchanged when the next debit is returned', () => {
    const snapshot = projectLoan(withReturn, '2026-03-01')

    expect(snapshot.outstandingPrincipalCents).toBe(957_750)
  })

  it('adds 28 days of interest to the payoff quote on the returned date', () => {
    // $9,577.50 for 28 days at 9% on a 360-day year is $67.04.
    // Payoff is $9,644.54.
    const snapshot = projectLoan(withReturn, '2026-03-01')

    expect(snapshot.interestCents).toBe(6_704)
    expect(snapshot.payoffCents).toBe(964_454)
    expect(snapshot.payoffDays).toBe(28)
  })

  it('keeps the returned debit as the next amount still due', () => {
    const snapshot = projectLoan(withReturn, '2026-03-10')

    expect(snapshot.upcoming[0]).toEqual({
      date: '2026-03-01',
      amountCents: 50_000,
      stillDue: true,
    })
  })

  it('adds no interest when the quote date is the posted debit', () => {
    const snapshot = projectLoan(workedExample, '2026-02-01', '2026-02-01')

    expect(snapshot.interestCents).toBe(0)
    expect(snapshot.payoffCents).toBe(957_750)
  })
})
