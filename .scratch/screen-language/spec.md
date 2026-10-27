Status: ready-for-agent

# Screen language

Decisions below settle how Mellon is drawn and which buyer paths are checked in the browser. Terms follow `GLOSSARY.md`. ADR-0001, ADR-0002, and ADR-0003 hold. Loan math is unchanged.

## Problem Statement

The buyer can already see Dashboard, Active loans, My applications, and a Loan. Those screens are drawn with one hand-written stylesheet. The same card, pill, and button are copied in that sheet, and nothing checks that a buyer can still move through them after a visual change. A person opening the repo also has to wonder why a current React screen ignores Tailwind and shadcn.

## Solution

The screens keep the Mellon frame and the same words, and they are built with Tailwind and shadcn. A buyer can still open Dashboard, Active loans, and My applications, open a funded application as that loan, open a blocked application and read why it is stuck, and change the payoff date. On the last posted debit the quote adds no interest. On the portal date it adds interest and says the number is an estimate, not a payoff letter.

## User Stories

1. As a buyer, I want Dashboard, Active loans, and My applications in the sidebar, so that I can move between them.
2. As a buyer, I want Dashboard to name my funded loans, so that I can see the book without opening each one.
3. As a buyer, I want Active loans to list each funded loan, so that I can open the one I mean.
4. As a buyer, I want View loan on a funded application to open that loan, so that funding still has a next step.
5. As a buyer, I want See app on a blocked application to tell me what is stuck, so that I know it is waiting on the dealer invoice.
6. As a buyer, I want the loan to show a payoff quote for the portal date, so that I can see interest has accrued since the last posted debit.
7. As a buyer, I want the quote labeled as an estimate, not a payoff letter, so that I do not treat it as a letter.
8. As a buyer, I want a payoff date on the last posted debit to add no extra interest, so that I am not charged twice for that day.
9. As a buyer, I want a posted month marked paid and an upcoming month marked expected, so that I can tell the schedule apart.
10. As a buyer, I want no button that takes a payment, so that this page still cannot move money.
11. As a buyer, I want the same white page, hairline cards, quiet status pills, support rail, and dark footer, so that servicing still looks like Mellon.

## Implementation Decisions

- Tailwind is the styling language. shadcn supplies the button, card, badge, input, and label. Layout that is only Mellon (the wordmark, the support rail, the progress rings, the dark footer) stays local and uses the same tokens.
- The visual frame does not become the default shadcn theme. Ink, hairline, muted text, and the paid, expected, and returned colors stay the Mellon ones.
- Icons in the sidebar and the support rail come from the same icon set shadcn uses. The Substrate mark stays the four-square wordmark.
- The hand-written stylesheet goes away in the same change as the screens. Tailwind's reset and that sheet cannot both own headings and buttons, so they are not left side by side.
- Loan math, fixtures, and the portal date stay as they are. A returned debit is still not in the Dane fixtures. The red month stays covered by the loan tests.
- Money stays integer cents. Dates stay `YYYY-MM-DD`.

## Testing Decisions

Two seams, and no third.

- `projectLoan` stays the loan-math seam. A good test there calls it and asserts a hand-computed cent amount. It does not recompute the formula. It catches a wrong principal, a return that reduces principal, and a quote that ignores the date. It misses navigation and layout.
- Playwright is the buyer-path seam. A good test drives the running screens and asserts words the buyer can see: a destination, a funded row opening that loan, a blocked row explaining the invoice, Paid and Expected on the schedule, and the payoff note changing from accrued interest to no additional interest when the date is the last posted debit. The expected strings are the ones already specified, not a cent amount recomputed in the test. It misses pixel match to the Figma frames, the red returned month, and the cent math.

The buyer-path tests are written against the current screens before the stylesheet is replaced, so the visual change has a witness.

## Out of Scope

- Changing loan math, fixtures, or the portal date.
- A returned debit on the Dane loans.
- Pixel snapshots, a visual regression tool, or a test per component.
- Auth, a backend, payments, or editing Autopay.
- shadcn's dashboard shell, dark mode, or a second theme.

## Further Notes

ADR-0003 records why the hand-written sheet was retired. The v1 product behavior is still `.scratch/buyer-servicing/spec.md`.
