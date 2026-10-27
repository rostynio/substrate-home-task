## Agent skills

### Issue tracker

Issues and specs live as markdown files under `.scratch/`. See `docs/agents/issue-tracker.md`.

### Domain docs

Single-context. See `docs/agents/domain.md`.

## Coding

- Name domain concepts with `GLOSSARY.md`. Do not drift to the words listed under `_Avoid_`.
- Money is integer cents. Dates are `YYYY-MM-DD`.
- The loan snapshot is the only tested seam. UI behavior is checked in the browser.
- Screen modules are arrow functions. Formatting and book totals live in `src/utils`. Shared screen pieces live in `src/components`.
- Mellon is the visual reference: white page, hairline cards, quiet status pills, support rail, dark footer. No component library.
