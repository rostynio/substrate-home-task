Status: ready-for-agent

# Buyer servicing v1

Decisions below are the ones settled with the approved v1 hypothesis. Terms follow `GLOSSARY.md`. ADR-0001 and ADR-0002 hold.

## Problem Statement

Substrate has funded loans from its own balance sheet and already debits the monthly installment by ACH. The buyer has nowhere to see the loan. Mellon only lists applications: equipment, dealer, offer, and a status such as blocked, in review, or funded. A funded buyer cannot see the balance, the next debit, history, or what it would cost to pay the loan off.

## Solution

The sidebar has Dashboard, Active loans, and My applications. Dashboard is the overview: how many loans are active, the combined balance, principal paid, the next debit, progress across the book, and the next debit on each loan. Active loans is the list. My applications keeps the Mellon list. A funded application still opens the loan. The loan page uses the same chrome: wordmark with a rule under it, left account sidebar, hairline cards, quiet status label, support in the sidebar, dark footer.

On the loan the buyer sees:

- the equipment, buyer, and dealer
- outstanding principal
- how much principal is paid versus left, and how many installments are posted versus the term. A returned installment is not counted as posted
- the next installment, and a clear note when that debit was returned and is still owed
- Autopay as it stands: on, bank name, last four digits, collected at signing, not editable
- upcoming installments, with the rest of the schedule available on demand
- history of posted and returned debits
- a payoff quote for a date the buyer picks, labeled as an estimate

The reference frames in [Product Engineer Work Trial](https://www.figma.com/design/n9xGkRb55WCRaRCGEBKht4/Product-Engineer-Work-Trial?node-id=0-1) are the application list only. There is no servicing frame to copy. The loan page is new, in that visual language. My applications keeps that list and adds the other funded rows for this Buyer: Kubota KX080-4 action required, John Deere 350G blocked by the dealer, then the funded Bobcat T76, CAT 259D, and Takeuchi TB240. Each funded row opens its loan.

## User Stories

1. As a buyer, I want to see my applications the way Mellon shows them today, so that servicing does not replace the list I already know.
2. As a buyer, I want each application to show the equipment, my company, the dealer, and the offer amount, so that I can tell my deals apart.
3. As a buyer, I want a blocked application to say what is stuck, so that I know it is waiting on the dealer invoice.
4. As a buyer, I want an action-required application to say the offer is waiting and when it expires, so that I know what is blocking funding.
5. As a buyer, I want to open a blocked or action-required application, so that "See app" does something.
6. As a buyer, I want the funded application's action to say View loan, so that I can tell it is no longer an application in progress.
7. As a buyer, I want View loan to open that machine's loan, so that funding has a next step.
8. As a buyer, I want the loan to name the equipment, my company, and the dealer, so that I know which machine I am looking at.
9. As a buyer, I want to see the outstanding principal, so that I know what I still owe before interest for a payoff.
10. As a buyer, I want to see the next installment's date and amount, so that I know what Autopay will take.
11. As a buyer, I want a returned debit to stay visible and still due, so that I do not think it was collected.
12. As a buyer, I want a returned debit to leave the principal unchanged, so that the balance matches what the bank did.
13. As a buyer, I want to see that Autopay is on and which account it uses, so that I recognize the account I gave at signing.
14. As a buyer, I want no control that edits the bank account or turns Autopay off, so that I cannot stop a debit from this page.
15. As a buyer, I want upcoming installments in order, so that I can see the next few months.
16. As a buyer, I want to reveal the rest of the schedule, so that I am not limited to the first few rows.
17. As a buyer, I want history with posted and returned debits, newest first, so that I can reconcile what hit my account.
18. As a buyer, I want to pick a payoff date and see the quote change, so that I can try a date that is not today.
19. As a buyer, I want the quote to include interest through that date, so that the number is more than the principal when days have passed.
20. As a buyer, I want the quote labeled as an estimate on a 360-day year, so that I do not treat it as a payoff letter.
21. As a buyer, I want a payoff date on the last posted debit to add no extra interest, so that I am not charged twice for that day.
22. As a buyer, I want the support rail on both the list and the loan, so that I can still email, text, or call.
23. As a buyer, I want a short answer to what a returned debit means and what the quote is, so that the page explains itself.
24. As a buyer, I want a way back to Active loans, so that the loan is not a dead end.
25. As a buyer, I want no button that takes a payment, so that this page cannot move money.
26. As a buyer, I want Dashboard, Active loans, and My applications in the sidebar, so that loans and applications are not the same list.
27. As a buyer, I want Dashboard to summarize my book: how many loans, the combined balance, principal paid, the next debit, and progress across all of them, so that I do not have to open the list to see where I stand.
28. As a buyer, I want Active loans to list each funded loan with its balance and next debit, so that I can open the one I mean.
29. As a buyer, I want a paid month marked green, an expected month marked yellow, and a failed month marked red, so that I can scan the schedule.
30. As a buyer, I want several of my own funded loans on Dashboard and Active loans, so that the portal is not a single machine.

## Implementation Decisions

- Frontend only. Applications and this Buyer's funded loans are fixtures. No auth, no API. Loan math stays the tested seam. Buyer paths through the screens are the browser seam, in `.scratch/screen-language/spec.md`.
- Screen modules are arrow functions. Money, dates, and the book summary live beside the domain. Standing, a fact row, an installment list, an application status, a stat, and the action link are shared screen pieces. The book summary only adds figures the loan snapshot already returned. It is not a second tested seam.
- The agreed seam is one module, `projectLoan`. Callers pass the loan, the portal date, and an optional payoff date. They get outstanding principal, interest paid through, upcoming debits (a returned debit that is still owed is first, with `stillDue`), history, and the payoff quote. Tests and the loan page both call this. It catches wrong principal, a return that incorrectly reduces principal, and a quote that ignores the date. It does not catch layout.
- Money is integer cents. A posted installment pays accrued interest first; the remainder reduces principal. Accrued interest is `round(principalCents × annualRateBps × actualDays / 3_600_000)`. Days are actual days from interest-paid-through to the event date. The divisor is a 360-day year (`360 × 10_000`).
- A returned ledger entry does not change principal or interest-paid-through.
- The contractual installment is assumed to cover accrued interest. The fixture does.
- The portal date is fixed at 2026-10-27 so the demo does not drift. The payoff control changes only the quote date.
- This Buyer is Dane Excavation LLC. Three funded loans: 2022 Bobcat T76, $89,500 at 8.90% for 60 months, installment $1,864.00, posted through 2026-10-15, Autopay checking ending 4821; 2021 CAT 259D, $124,500 at 7.90% for 48 months, installment $3,050.00, 36 posted debits from 2023-11-15, checking ending 2290; 2024 Takeuchi TB240, $42,800 at 9.90% for 36 months, installment $1,480.00, four posted debits from 2026-07-20, checking ending 7742. The returned-debit rule is covered by the loan tests, not by these fixtures.
- The Kubota and John Deere rows are applications only. "See app" opens their status sentence. "See actions required" opens the Kubota row. "Start new application" stays on the list as in the reference; origination is not this spec.
- Visual language follows the Mellon frames and is drawn with Tailwind and shadcn. See ADR-0003. Centered SUBSTRATE wordmark, white page, hairline cards, gray and green pills, support card with Abby Sweeney, email `support@joinsubstrate.com`, phone `(276) 465-7864`, dark footer. The loan support heading says the question is about the loan.

## Testing Decisions

- A good test calls `projectLoan` and asserts a hand-computed cent amount. It does not recompute the formula, mock internals, or snapshot CSS.
- The worked example used as the independent check: $10,000.00 at 9.00% , funded 2026-01-01, installment $500.00 posted 2026-02-01 (31 days). Interest is $77.50. Principal becomes $9,577.50. A returned $500.00 on 2026-03-01 leaves that principal. A quote on 2026-03-01 (28 days) adds $67.04 of interest, for a payoff of $9,644.54. The returned date is the next debit and is still due.
- No prior tests exist. UI flows are checked in the browser, not with pixel tests.

## Out of Scope

- Changing the bank account, pausing Autopay, or making a one-time or extra payment.
- A payoff letter, PDF statements, fees, or late charges.
- More than the loans that correspond to funded rows on the Mellon list.
- Origination actions inside the Kubota application. The banner and the row are visible; accepting the offer is not this spec.
- Origination, "Start new application", auth, and a backend.
- Part 1 of the take-home (personal questions).

## Further Notes

Show-your-work notes for the submission live in `docs/work-log.md`. Paste this spec into Notion as the PRD.
