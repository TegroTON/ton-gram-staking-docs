# Contributing

Thanks for helping improve the Tegro staking docs. This repo is **documentation + integration
examples** — there is no smart-contract source here.

## What we welcome

- Fixes to inaccuracies, typos, broken links.
- Clearer explanations, better examples, additional language examples.
- New runnable examples in `examples/` (keep them minimal and dependency-light).
- Translations.

## Ground rules

- **Accuracy first.** Contract addresses, code hashes, fees and numbers must match on-chain reality.
  When in doubt, verify on a TON explorer ([Tonviewer](https://tonviewer.com)).
- **Public-safe only.** Do not add smart-contract source, exploit details, internal infrastructure,
  secrets, or details of how yield is generated.
- **Plain Markdown.** Keep pages plain Markdown so AI tools and `llms.txt` consumers can read them.
  If you add a page, add it to [`llms.txt`](llms.txt).
- **Examples must run.** Keep snippets copy-paste-runnable and note required packages.

## How to propose a change

1. Fork and create a branch.
2. Make your change; check links and that examples still run.
3. Open a pull request with a clear description of *what* and *why*.

## Reporting problems

- Doc errors or questions → open an issue.
- **Security issues** → do **not** open a public issue; follow [SECURITY.md](SECURITY.md).
