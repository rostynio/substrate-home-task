import type { Loan } from './domain/projectLoan'

export const PORTAL_DATE = '2026-10-27'

const installmentCents = 186_400

const monthlyDates = (start: string, count: number): string[] => {
  const [year, month, day] = start.split('-').map(Number)
  return Array.from({ length: count }, (_, index) =>
    new Date(Date.UTC(year, month - 1 + index, day)).toISOString().slice(0, 10),
  )
}

const postedDates = monthlyDates('2025-12-15', 11)

export type ApplicationStatus = 'action_required' | 'blocked_by_vendor' | 'in_review' | 'funded'

export type Application = {
  id: string
  equipment: string
  buyer: string
  dealer: string
  offerCents: number
  status: ApplicationStatus
  detail: string
  notice?: string
  loanId?: string
}

export const applications: Application[] = [
  {
    id: 'kubota-kx080-4',
    equipment: '2025 Kubota KX080-4',
    buyer: 'Dane Excavation LLC',
    dealer: 'Garage',
    offerCents: 8_950_000,
    status: 'action_required',
    detail: 'Review and accept your offer and 3 more inside',
    notice: 'This offer expires Fri 12 Sep',
  },
  {
    id: 'john-deere-350g',
    equipment: '2025 John Deere 350G',
    buyer: 'Dane Excavation LLC',
    dealer: 'Garage',
    offerCents: 8_950_000,
    status: 'blocked_by_vendor',
    detail: 'Garage owes us the equipment invoice',
  },
  {
    id: 'bobcat-t76',
    equipment: '2022 Bobcat T76',
    buyer: 'Dane Excavation LLC',
    dealer: 'Garage',
    offerCents: 8_950_000,
    status: 'funded',
    detail: '',
    loanId: 'bobcat-t76',
  },
  {
    id: 'cat-259d',
    equipment: '2021 CAT 259D',
    buyer: 'Dane Excavation LLC',
    dealer: 'Garage',
    offerCents: 12_450_000,
    status: 'funded',
    detail: '',
    loanId: 'cat-259d',
  },
  {
    id: 'takeuchi-tb240',
    equipment: '2024 Takeuchi TB240',
    buyer: 'Dane Excavation LLC',
    dealer: 'Garage',
    offerCents: 4_280_000,
    status: 'funded',
    detail: '',
    loanId: 'takeuchi-tb240',
  },
]

export type ServicedLoan = Loan & {
  id: string
  equipment: string
  buyer: string
  dealer: string
  autopay: { bankName: string; last4: string }
}

export const loans: Record<string, ServicedLoan> = {
  'bobcat-t76': {
    id: 'bobcat-t76',
    equipment: '2022 Bobcat T76',
    buyer: 'Dane Excavation LLC',
    dealer: 'Garage',
    originalPrincipalCents: 8_950_000,
    annualRateBps: 890,
    termMonths: 60,
    installmentCents,
    fundedOn: '2025-11-15',
    firstDebitDate: '2025-12-15',
    autopay: { bankName: 'Checking', last4: '4821' },
    entries: [
      ...postedDates.map((date) => ({
        date,
        amountCents: installmentCents,
        result: 'posted' as const,
      })),
    ],
  },
  'cat-259d': {
    id: 'cat-259d',
    equipment: '2021 CAT 259D',
    buyer: 'Dane Excavation LLC',
    dealer: 'Garage',
    originalPrincipalCents: 12_450_000,
    annualRateBps: 790,
    termMonths: 48,
    installmentCents: 305_000,
    fundedOn: '2023-10-15',
    firstDebitDate: '2023-11-15',
    autopay: { bankName: 'Checking', last4: '2290' },
    entries: monthlyDates('2023-11-15', 36).map((date) => ({
      date,
      amountCents: 305_000,
      result: 'posted' as const,
    })),
  },
  'takeuchi-tb240': {
    id: 'takeuchi-tb240',
    equipment: '2024 Takeuchi TB240',
    buyer: 'Dane Excavation LLC',
    dealer: 'Garage',
    originalPrincipalCents: 4_280_000,
    annualRateBps: 990,
    termMonths: 36,
    installmentCents: 148_000,
    fundedOn: '2026-06-20',
    firstDebitDate: '2026-07-20',
    autopay: { bankName: 'Checking', last4: '7742' },
    entries: monthlyDates('2026-07-20', 4).map((date) => ({
      date,
      amountCents: 148_000,
      result: 'posted' as const,
    })),
  },
}

export const applicationById = (id: string): Application | undefined =>
  applications.find((application) => application.id === id)

export const activeLoans = (): ServicedLoan[] =>
  applications.flatMap((application) => {
    const loan = application.loanId ? loans[application.loanId] : undefined
    return loan ? [loan] : []
  })
