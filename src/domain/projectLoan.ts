export type LedgerEntry = {
  date: string
  amountCents: number
  result: 'posted' | 'returned'
}

export type Loan = {
  originalPrincipalCents: number
  annualRateBps: number
  termMonths: number
  installmentCents: number
  fundedOn: string
  firstDebitDate: string
  entries: LedgerEntry[]
}

export type ScheduledDebit = {
  date: string
  amountCents: number
  stillDue: boolean
}

export type LoanSnapshot = {
  outstandingPrincipalCents: number
  interestPaidThrough: string
  upcoming: ScheduledDebit[]
  history: LedgerEntry[]
  payoffCents: number
  interestCents: number
  payoffDays: number
}

const DAY_BASIS = 3_600_000

const daysBetween = (from: string, to: string): number => {
  const start = Date.parse(`${from}T00:00:00Z`)
  const end = Date.parse(`${to}T00:00:00Z`)
  return Math.round((end - start) / 86_400_000)
}

const interestFor = (principalCents: number, annualRateBps: number, days: number): number => {
  if (days <= 0 || principalCents <= 0) return 0
  return Math.round((principalCents * annualRateBps * days) / DAY_BASIS)
}

const addMonths = (isoDate: string, months: number): string => {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1 + months, day)).toISOString().slice(0, 10)
}

const postedOn = (entries: LedgerEntry[], date: string): boolean => {
  return entries.some((entry) => entry.date === date && entry.result === 'posted')
}

const returnedOn = (entries: LedgerEntry[], date: string): boolean => {
  return entries.some((entry) => entry.date === date && entry.result === 'returned')
}

export const projectLoan = (loan: Loan, asOf: string, payoffDate = asOf): LoanSnapshot => {
  const posted = [...loan.entries]
    .filter((entry) => entry.result === 'posted')
    .sort((a, b) => a.date.localeCompare(b.date))

  let principal = loan.originalPrincipalCents
  let interestPaidThrough = loan.fundedOn

  for (const entry of posted) {
    const accrued = interestFor(principal, loan.annualRateBps, daysBetween(interestPaidThrough, entry.date))
    principal -= Math.max(0, entry.amountCents - accrued)
    interestPaidThrough = entry.date
  }

  const upcoming: ScheduledDebit[] = []
  for (let month = 0; month < loan.termMonths; month += 1) {
    const date = addMonths(loan.firstDebitDate, month)
    if (postedOn(loan.entries, date)) continue
    const stillDue = date <= asOf && returnedOn(loan.entries, date)
    const notYetDue = date > asOf
    if (!stillDue && !notYetDue) continue
    upcoming.push({ date, amountCents: loan.installmentCents, stillDue })
  }

  const payoffDays = Math.max(0, daysBetween(interestPaidThrough, payoffDate))
  const interestCents = interestFor(principal, loan.annualRateBps, payoffDays)

  return {
    outstandingPrincipalCents: principal,
    interestPaidThrough,
    upcoming,
    history: [...loan.entries].sort((a, b) => b.date.localeCompare(a.date)),
    payoffCents: principal + interestCents,
    interestCents,
    payoffDays,
  }
}
