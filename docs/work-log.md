# How this was made

Model: Grok 4.7, in Cursor.

Sources:

- The take-home, [Product Engineer Take-Home](https://substrate-industries.notion.site/Product-Engineer-Take-Home-3e48d8996bf5801ab651c230d5969b5a). Part 2 only. Part 1 is personal and is not in this repo.
- The Mellon frames in [Product Engineer Work Trial](https://www.figma.com/design/n9xGkRb55WCRaRCGEBKht4/Product-Engineer-Work-Trial?node-id=0-1). They show the application list (a "NO STIPS" frame and an action-required frame). They do not show a loan screen.

Skills used: `setup-matt-pocock-skills`, `grilling`, `domain-modeling`, `codebase-design`, `to-spec`, `to-tickets`, `tdd`, `implement`. `research` and `prototype` were not needed for this cut. `code-review` needs a git history to diff against, and this folder is not a repository yet.

What was left out, and why:

- Other buyers' loans on this portal. Dashboard and Active loans show only this Buyer's funded loans. See ADR-0001.
- Paying, changing the bank account, or turning Autopay off. The debit already runs, and this page has no servicing backend. See ADR-0002.
- Substrate's other funded loans. Mellon shows this Buyer's applications only.
- A long digression into ACH return codes and case law. The page says a returned debit is still owed, in plain language.

Where the writing lives:

- Repo map: `README.md`
- Spec / PRD: `.scratch/buyer-servicing/spec.md`
- Language: `GLOSSARY.md`
- Decisions: `docs/adr/`

Run the UI with `npm install` and `npm run dev`.
