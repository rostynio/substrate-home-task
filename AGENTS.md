## Agent skills

### Issue tracker

Issues and specs live as markdown files under `.scratch/`. See `docs/agents/issue-tracker.md`.

### Domain docs

Single-context. See `docs/agents/domain.md`.

## Coding

- Name domain concepts with `GLOSSARY.md`. Do not drift to the words listed under `_Avoid_`.
- Money is integer cents. Dates are `YYYY-MM-DD`.
- `projectLoan` is the loan-math seam. It returns the loan snapshot. Book totals only add those figures. Playwright is the buyer-path seam: destinations, opening a loan, and the payoff note. It does not recompute cent amounts.
- Screens in `src/pages` are arrow functions. Formatting and book totals live in `src/utils`. Shared screen pieces live in `src/components`. shadcn pieces live beside them.
- Tailwind and shadcn draw the screens. Mellon is the visual frame: white page, hairline cards, quiet status pills, support rail, dark footer. On a schedule, a posted month is green, an expected month is yellow, and a returned month is red. See ADR-0003.
