# The content: the whole unit, five lessons, each a summary, 10 flashcards and 10 questions with a why, checked twice: requirements

T-59 · Feature · the plan Ray approved

## Goal
The content: the whole unit, five lessons, each a summary, 10 flashcards and 10 questions with a why, checked twice

Goal: real revision content for النهايات والاشتقاق (الفصل الأول، الصف الثالث الثانوي، مسارات): النهايات، الاتصال، المشتقة وقواعدها، قاعدة السلسلة، تطبيقات المشتقة. Written by us to the lesson titles; no book text. Every question has one right answer and a one-line why; numeric answers are numbers. After writing, a second pass re-solves every question independently and fixes any disagreement. The checker must pass.

## Done when
Each one is something Ray sees in the app; QA proves it with a screenshot.
1. The unit screen shows all five lessons with all three marks (ملخص، بطاقات، اختبار) filled.
2. Opening تطبيقات المشتقة (lesson 5) shows its rendered summary with headings, rule rows and KaTeX formulas, and no raw `$` or `##`.
3. The npm run check:content terminal lists every lesson with a summary, 10 cards and 10 questions, and ends with 0 problems.
4. docs/content-check.md has 50 rows, one per question, each with a re-solved answer, and none left open.

## Out of scope
- src/content/schema.ts: no schema change, exactly 10 cards and 10 questions as it is.
- src/UnitScreen.tsx, src/SummaryScreen.tsx, src/Summary.tsx: no quiz or flashcard UI here (T-60, T-62).
- checkUnit's validation rules and message format in scripts/check-content.ts.
- docs/context.md, docs/decisions.md, docs/brief.md, docs/tech.md, docs/ui.md.
- package.json: no new dependencies.
