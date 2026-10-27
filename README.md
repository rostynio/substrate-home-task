# Mellon servicing

Frontend for buyer loan servicing. Part 2 of the [Product Engineer Take-Home](https://substrate-industries.notion.site/Product-Engineer-Take-Home-3e48d8996bf5801ab651c230d5969b5a). Part 1 is personal and is not in this repo.

Substrate already funds loans and debits the monthly installment by ACH. Mellon, the current buyer portal, only lists applications. This repo adds the loan screen a funded buyer did not have.

The visual reference is the [Product Engineer Work Trial](https://www.figma.com/design/n9xGkRb55WCRaRCGEBKht4/Product-Engineer-Work-Trial?node-id=0-1) Figma file. Those frames are the application list. There is no servicing frame to copy. The loan page is new, in that visual language.

## Run

```bash
npm install
npm run dev
```

Open the printed local URL.

```bash
npm test
npm run build
```

`npm test` runs the loan math. `npm run build` typechecks, then builds.

The demo is one buyer, Dane Excavation LLC, with three funded loans. The portal date is fixed at 2026-10-27. The sidebar is Dashboard, Active loans, and My applications. **View loan** on a funded row opens that loan.

## Stack

Vite, React 19, TypeScript, and React Router 7. Tests are Vitest. There is no UI kit and no backend. Applications and this buyer's loans are fixtures. Money is integer cents. Dates are `YYYY-MM-DD`.

The only tested module is `src/domain/projectLoan.ts`. It turns a loan, the portal date, and an optional payoff date into the balance, the schedule, the history, and the payoff quote. The screens are checked in the browser.

## Decisions

The sidebar splits this buyer's portal into Dashboard, Active loans, and My applications. Dashboard summarizes the book. Active loans is the list. A funded application row still opens that loan. See [ADR-0001](docs/adr/0001-a-loan-opens-from-a-funded-application.md).

v1 shows the loan and does not move money. The buyer sees the remaining principal, the next debit, upcoming installments, history, and a payoff quote for a date they pick. Autopay is visible and not editable. A returned debit is still owed and does not reduce principal. The quote is an estimate on a 360-day year, not a payoff letter and not a payment. See [ADR-0002](docs/adr/0002-v1-quotes-payoff-and-does-not-move-money.md).

Substrate's other funded loans are not on this screen. Mellon shows one buyer's applications.

Words used in the product are defined in [GLOSSARY.md](GLOSSARY.md).

## Where to read

| What | Where |
| --- | --- |
| PRD | [.scratch/buyer-servicing/spec.md](.scratch/buyer-servicing/spec.md) |
| How this was made | [docs/work-log.md](docs/work-log.md) |
| Language | [GLOSSARY.md](GLOSSARY.md) |
| Decisions | [docs/adr/](docs/adr/) |
| Build tickets | [.scratch/buyer-servicing/issues/](.scratch/buyer-servicing/issues/) |
| Loan math | [src/domain/projectLoan.ts](src/domain/projectLoan.ts) |
| Book totals and formatting | [src/utils](src/utils) |
| Loan math tests | [src/domain/projectLoan.test.ts](src/domain/projectLoan.test.ts) |

The PRD is the document to paste into Notion. This README is the map of the repo.
