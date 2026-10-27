# Decisions

One line each, newest last. Every brief carries them.

- 2026-10-27 · T-58 · Run the checker as `node --import tsx scripts/check-content.ts`, not the tsx CLI: the CLI opens an IPC socket that the sandbox blocks (Check, T-58).
- 2026-10-27 · T-58 · Content can't hold a literal dollar sign: the checker reads every `$…$` pair as a formula, so `\$` is parsed as math (review, T-58).
- 2026-10-27 · T-61 · Lessons may be title-only: summary, cards and questions are optional, so a unit can ship before its lessons are written; title-only lessons show in the list and open nothing.
- 2026-10-27 · T-61 · Routing uses location.hash and Summary.tsx renders only ## headings, '- label: …' rows and paragraphs, so no router or Markdown library is added to the dependency list.
- 2026-10-27 · T-59 · Every content question is re-solved by a second agent that sees only the prompt and choices, so an answer-key error is caught before it ships (Ray, T-59).
- 2026-10-27 · T-59 · Unit-list progress marks stay empty until the progress store (T-60, T-62) exists, so don't treat empty marks as a bug before then (Ray, T-59).
- 2026-10-27 · T-62 · A lesson's بطاقات mark fills only when all ten cards are in box 2 or 3, so one card marked مرة أخرى empties it again (Ray's plan, T-62).
- 2026-10-27 · T-62 · The عرفتها hint says ترجع بعد يوم even from box 2 or 3, where the card returns in 3 days, because the mock says so; change the mock before the text (Tech lead, T-62).
- 2026-10-27 · T-62 · save() swallows storage errors so a full or blocked localStorage keeps the session going, but progress can be lost with no message (Tech lead, T-62).
