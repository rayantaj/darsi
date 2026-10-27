# Decisions

One line each, newest last. Every brief carries them.

- 2026-10-27 · T-58 · Run the checker as `node --import tsx scripts/check-content.ts`, not the tsx CLI: the CLI opens an IPC socket that the sandbox blocks (Check, T-58).
- 2026-10-27 · T-58 · Content can't hold a literal dollar sign: the checker reads every `$…$` pair as a formula, so `\$` is parsed as math (review, T-58).
- 2026-10-27 · T-61 · Lessons may be title-only: summary, cards and questions are optional, so a unit can ship before its lessons are written; title-only lessons show in the list and open nothing.
- 2026-10-27 · T-61 · Routing uses location.hash and Summary.tsx renders only ## headings, '- label: …' rows and paragraphs, so no router or Markdown library is added to the dependency list.
