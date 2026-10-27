# Darsi
Arabic study app (درسي) for a maths book: lessons, flashcards, quizzes and unit tests, built from content files. The POC runs in the phone browser: no server, no accounts, no network calls at runtime.
Stack: React 18, Vite 6, TypeScript 5.6, Zod 3, KaTeX, Vitest, ESLint 9, tsx. IBM Plex Sans Arabic (400, 700) bundled. Minimum: iOS 17 Safari, current Chrome on Android.
Deploy: GitHub Pages, https://rayantaj.github.io/darsi/ (Vite base '/darsi/'), from main via .github/workflows/pages.yml.

## Where things live
- docs/brief.md, docs/tech.md, docs/ui.md: the spec. Not code; build tasks don't edit them.
- design/: HTML mock-ups of the screens and canvas.json. Spec.
- specs/<task-id-slug>/: requirements, design and tasks for each built Feature.
  - specs/T-58-setup-vite-react-typescript-rtl-shell-fo/: shell, schema, checker, deploy.
- content/units/: one JSON file per unit. Empty; only .gitkeep.
- src/content/schema.ts: Zod UnitSchema. Unit > lessons > cards (exactly 10) and questions (exactly 10, multiple-choice or numeric).
- src/main.tsx: entry; imports the Plex font.
- src/App.tsx: the shell, showing درسي.
- src/index.css: colour tokens, light and dark by prefers-color-scheme; body 17px/1.6.
- index.html: lang ar, dir rtl.
- scripts/check-content.ts: checkUnit(json, file) returns messages; the CLI runs it over content/units.
- scripts/check-content.test.ts: Vitest tests for the checker.
- vite.config.ts: base '/darsi/'.
- .github/workflows/pages.yml: Node 20; check:content, build, then deploy to Pages on push to main.
- eslint.config.js, tsconfig.json: lint and TypeScript.
- Not built yet (later Features): service worker, router, Markdown renderer, progress storage (src/progress/), web manifest.

## Checks (the runner's)
- npm ci
- npm run lint
- npm run check:content (node --import tsx scripts/check-content.ts)
- npm run build (tsc -b && vite build)
- npm test (vitest run)

## Rules
- Content is data: no lesson text in components.
- A lesson needs exactly 10 cards and 10 questions. A multiple-choice question has exactly one correct choice. A numeric answer parses as a number. Every $…$ formula parses in KaTeX.
- The checker runs before the build, in CI too. A failing content file never ships.
- Logical CSS only (margin-inline-start, not margin-left). Numbers and formulas are LTR islands.
- Dependencies: only the list in docs/tech.md. Nothing else without a line there.
- Risky paths, always reviewed: content/**, src/content/**, src/progress/**, package.json, package-lock.json, vite.config.ts, .github/**.

## Known debt
- tsconfig.tsbuildinfo is committed. Delete it and add *.tsbuildinfo to .gitignore.
- scripts/check-content.ts:55: a literal \$ is read as a formula delimiter. No escape yet.
- src/index.css: light --surface #f6f7f8 isn't in docs/ui.md. The designer must confirm it.
- Live site not confirmed: https://rayantaj.github.io/darsi/ returned 404 at QA, before the first deploy.
- The nine-question and bad-formula checker cases are covered by Vitest only. Not run end to end on a content file.
