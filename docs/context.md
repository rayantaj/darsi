# Darsi
Arabic study app (درسي) for a maths book: lessons, flashcards, quizzes and unit tests, built from content files.
The POC runs in the phone browser: no server, no accounts, no network calls at runtime.
Stack: React 18, Vite 6, TypeScript 5.6, Zod 3, KaTeX, Vitest, ESLint 9, tsx. IBM Plex Sans Arabic (400, 700) bundled. Minimum: iOS 17 Safari, current Chrome on Android.
Deploy: GitHub Pages, https://rayantaj.github.io/darsi/ (Vite base '/darsi/'), from main via .github/workflows/pages.yml.

## Where things live
- docs/brief.md, docs/tech.md, docs/ui.md: the spec. Not code; build tasks don't edit them.
- design/: HTML mock-ups of the screens and canvas.json. Spec.
- specs/<task-id-slug>/: requirements, design and tasks for each built Feature.
  - specs/T-58-setup-vite-react-typescript-rtl-shell-fo/: shell, schema, checker, deploy.
  - specs/T-61-unit-and-summary-screens-the-unit-list-w/: unit list, first-run hint, lesson summary, dark mode.
- content/units/: one JSON file per unit. limits-derivatives.json (النهايات والاشتقاق): five lessons; only المشتقة وقواعدها has a summary, the other four are title-only.
- src/content/schema.ts: Zod UnitSchema. Unit > lessons. A lesson has a title and optional summary, cards (exactly 10) and questions (exactly 10, multiple-choice or numeric).
- src/main.tsx: entry; imports the Plex font.
- src/App.tsx: the shell and hash router. #/lesson/<id> shows SummaryScreen, anything else UnitScreen. Re-renders on hashchange.
- src/UnitScreen.tsx (+ UnitScreen.module.css): unit list, one card per lesson with ملخص, بطاقات, اختبار marks; first-run hint; disabled unit test button.
- src/SummaryScreen.tsx (+ SummaryScreen.module.css): lesson summary with back button to #/, rendered summary, disabled cards and test buttons.
- src/Summary.tsx (+ Summary.module.css, Summary.test.tsx): small Markdown renderer for ## headings, '- label: …' rule rows and paragraphs; $…$ rendered with KaTeX.
- src/index.css: colour tokens, light and dark by prefers-color-scheme; body 17px/1.6.
- index.html: lang ar, dir rtl.
- scripts/check-content.ts: checkUnit(json, file) returns messages; the CLI runs it over content/units.
- scripts/check-content.test.ts: Vitest tests for the checker.
- vite.config.ts: base '/darsi/'.
- .github/workflows/pages.yml: Node 20; check:content, build, then deploy to Pages on push to main.
- eslint.config.js, tsconfig.json: lint and TypeScript.
- Not built yet (later Features): service worker, progress storage (src/progress/), web manifest.

## Checks (the runner's)
- npm ci
- npm run lint
- npm run check:content (node --import tsx scripts/check-content.ts)
- npm run build (tsc -b && vite build)
- npm test (vitest run)

## Rules
- Content is data: no lesson text in components.
- A lesson with cards or questions needs exactly 10 of each. A title-only lesson (no summary, cards or questions) is valid. A multiple-choice question has exactly one correct choice. A numeric answer parses as a number. Every $…$ formula parses in KaTeX.
- The checker runs before the build, in CI too. A failing content file never ships.
- Logical CSS only (margin-inline-start, not margin-left). Numbers and formulas are LTR islands.
- Styles: CSS modules using src/index.css variables only. No theme toggle; dark mode comes from prefers-color-scheme.
- Routing and Markdown: hash routing, no router or Markdown library. Summary.tsx handles only the subset listed above.
- Dependencies: only the list in docs/tech.md. Nothing else without a line there.
- Risky paths, always reviewed: content/**, src/content/**, src/progress/**, package.json, package-lock.json, vite.config.ts, .github/**.

## Known debt
- tsconfig.tsbuildinfo is committed. Delete it and add *.tsbuildinfo to .gitignore.
- scripts/check-content.ts:55: a literal \$ is read as a formula delimiter. No escape yet.
- src/index.css: light --surface #f6f7f8 isn't in docs/ui.md. The designer must confirm it.
- Live site not confirmed: https://rayantaj.github.io/darsi/ returned 404 at QA, before the first deploy.
- The nine-question and bad-formula checker cases are covered by Vitest only. Not run end to end on a content file.
- src/UnitScreen.tsx: a mark's filled state is dot colour only, with no text for screen readers; title-only lessons still show a chevron though they open nothing.
- src/UnitScreen.module.css: font-weight 500 and 600 aren't bundled (Plex has 400 and 700 only). Use 400 or 700.
- src/UnitScreen.module.css and src/Summary.tsx: the hint is accent 14px, not muted 15px as in design/MainEmpty.dc.html; the worked example isn't in a hairline card as in design/Summary.dc.html.

## Decisions
- 2026-10-27 · T-58 · Run the checker as `node --import tsx scripts/check-content.ts`, not the tsx CLI: the CLI opens an IPC socket that the sandbox blocks (Check, T-58).
- 2026-10-27 · T-58 · Content can't hold a literal dollar sign: the checker reads every `$…$` pair as a formula, so `\$` is parsed as math (review, T-58).
