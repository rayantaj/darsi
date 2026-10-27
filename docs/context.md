# Darsi
Arabic study app (درسي) for a maths book: lessons, flashcards, quizzes and unit tests, built from content files.
The POC runs in the phone browser: no server, no accounts, no network calls at runtime.

Stack: React 18, Vite 6, TypeScript 5.6, Zod 3, KaTeX, Vitest, ESLint 9, tsx. IBM Plex Sans Arabic (400, 700) bundled. Min: iOS 17 Safari, current Chrome on Android.
Deploy: GitHub Pages, https://rayantaj.github.io/darsi/ (Vite base '/darsi/'), from main via .github/workflows/pages.yml.

## Where things live
- docs/brief.md, docs/tech.md, docs/ui.md: the spec. Not code; build tasks don't edit them.
- docs/content-check.md: the second-pass re-solve log for T-59.
- design/: HTML mock-ups (MainEmpty, Summary, Flashcards, Quiz, QuizResult, UnitTest .dc.html) and canvas.json. Spec.
- specs/<task-id-slug>/: requirements, design and tasks for each built Feature:
  - T-58: shell, schema, checker, deploy.
  - T-59: the content, five lessons, second-pass check.
  - T-60: quiz and result, reports page, best score.
  - T-61: unit list, first-run hint, lesson summary, dark mode.
  - T-62: flashcards, Leitner boxes, cards mark.
  - T-63: unit test, 20 drawn questions, 30-minute timer, score history.
- content/units/: one JSON file per unit.
  - limits-derivatives.json (النهايات والاشتقاق): five lessons, each with a summary, 10 cards and 10 questions.
- src/content/schema.ts: Zod UnitSchema. Unit > lessons. A lesson has a title and optional summary, cards (exactly 10) and questions (exactly 10, multiple-choice or numeric).
- src/main.tsx: entry; imports the Plex font.
- src/App.tsx: the shell and hash router. #/lesson/<id> SummaryScreen; #/cards/<id> FlashcardsScreen; #/quiz/<id> QuizScreen (lessons with questions); #/test UnitTestScreen intro; #/test/run UnitTestScreen timed run; #/reports ReportsScreen; anything else UnitScreen. Re-renders on hashchange.
- src/UnitScreen.tsx (+ UnitScreen.module.css): unit list, one card per lesson with ملخص, بطاقات, اختبار marks; first-run hint; unit test button links to #/test. بطاقات from saved cards progress; اختبار filled by a saved quiz best; ملخص stays false.
- src/SummaryScreen.tsx (+ SummaryScreen.module.css): lesson summary, back button to #/; rendered summary; البطاقات links to #/cards/<id>; اختبار links to #/quiz/<id>.
- src/QuizScreen.tsx (+ QuizScreen.module.css, QuizScreen.test.ts): one lesson's ten questions, choices or number field, تأكيد, progress bar; result with n / 10, misses (إجابتك, الصحيح, لماذا, أبلغ عن خطأ), أعد الاختبار, رجوع إلى الوحدة; saves the best. Optional props back, refs, seconds (countdown, submits at 0), onScore; without them it is the lesson quiz.
- src/UnitTestScreen.tsx (+ UnitTestScreen.module.css, UnitTestScreen.test.ts): unit test intro (20 سؤالاً, 30 دقيقة, آخر نتيجة card when a test exists, ابدأ to #/test/run) and the run; draw() takes 4 shuffled questions from each lesson; scores saved with addTest.
- src/ReportsScreen.tsx: hidden page at #/reports listing saved reports (lesson title + question text), or an empty line.
- src/FlashcardsScreen.tsx (+ FlashcardsScreen.module.css): one lesson's ten cards: tap to flip, مرة أخرى and عرفتها, 'n / 10' and progress bar. Queue from due(); ends at #/.
- src/progress/store.ts (+ store.test.ts): load, save, mark (Leitner boxes 1-3), due (box 1 first), best (keeps the higher score), report, addTest. localStorage key 'darsi.v1': {cards: {'<lessonId>:<index>': {box, due}}, quiz: {<lessonId>: best}, reports: [{lessonId, index, prompt, at}], tests: [{score, at}]}. Only through this file.
- src/Summary.tsx (+ Summary.module.css, Summary.test.tsx): small Markdown renderer for ## headings, '- label: …' rule rows and paragraphs; $…$ rendered with KaTeX.
- src/index.css: colour tokens, light and dark by prefers-color-scheme; body 17px/1.6.
- index.html: lang ar, dir rtl.
- scripts/check-content.ts: checkUnit(json, file) returns messages; CLI prints one line per lesson, then total, over content/units.
- scripts/check-content.test.ts: Vitest tests for the checker.
- vite.config.ts: base '/darsi/'.
- .github/workflows/pages.yml: Node 20; check:content, build, then deploy on push to main.
- eslint.config.js, tsconfig.json: lint and TypeScript.
- Not built yet (later Features): service worker, web manifest.

## How it's checked (the runner's)
- npm ci
- npm run lint
- npm run check:content (node --import tsx scripts/check-content.ts): one line per lesson, then the total.
- npm run build (tsc -b && vite build)
- npm test (vitest run)

## Rules
- Content is data: no lesson text in components.
- A lesson with cards or questions needs exactly 10 of each. A title-only lesson (no summary, cards or questions) is valid. A multiple-choice question has exactly one correct choice. A numeric answer parses as a number. Every $…$ formula parses in KaTeX.
- The checker runs before the build, in CI too. A failing content file never ships.
- Logical CSS only. Numbers and formulas are LTR islands.
- CSS modules using src/index.css variables only. No theme toggle; dark mode from prefers-color-scheme.
- Hash routing, no router or Markdown library. Summary.tsx handles only the subset listed above.
- Progress: plain localStorage 'darsi.v1', only through src/progress/store.ts. No state or storage library.
- Dependencies: only the list in docs/tech.md.
- Risky paths, always reviewed: content/**, src/content/**, src/progress/**, package.json, package-lock.json, vite.config.ts, .github/**.

## Known debt
- tsconfig.tsbuildinfo is committed (changed again by T-60, T-62 and T-63). Delete it and add *.tsbuildinfo to .gitignore.
- scripts/check-content.ts:55: a literal \$ is read as a formula delimiter. No escape yet.
- src/index.css: light --surface #f6f7f8 isn't in docs/ui.md. The designer must confirm it.
- Live site not confirmed: https://rayantaj.github.io/darsi/ returned 404 at QA, before the first deploy.
- The nine-question and bad-formula checker cases are covered by Vitest only, not run end to end on a content file.
- src/UnitScreen.tsx: summary mark is hardcoded false; a filled mark is dot colour only, with no text for screen readers; title-only lessons still show a chevron though they open nothing.
- Reports can repeat: a retake clears the reported marks, so one miss can be reported twice; #/reports then lists duplicates. report() doesn't dedupe.
- src/QuizScreen.tsx: the result labels sit on their own line; design/QuizResult.dc.html:36 has them inline.
- src/QuizScreen.tsx:141: {seconds && …} would print a stray 0 if seconds were 0; only 1800 is passed today. Use seconds ? … : null.
- font-weight 500 and 600 aren't bundled (Plex has 400 and 700 only): src/UnitScreen.module.css, src/SummaryScreen.module.css, src/Summary.module.css. Use 400 or 700.
- src/UnitScreen.module.css and src/Summary.tsx: the hint is accent 14px, not muted 15px as in design/MainEmpty.dc.html; the worked example isn't in a hairline card as in design/Summary.dc.html.
- src/FlashcardsScreen.tsx: the title sits above the counter, not on one row as in design/Flashcards.dc.html:25-27.
- src/FlashcardsScreen.tsx: the الوجه / الإجابة label has no aria-live, so VoiceOver may not announce the flip (not checked in QA).
- Not built yet (later Features): service worker, web manifest.
