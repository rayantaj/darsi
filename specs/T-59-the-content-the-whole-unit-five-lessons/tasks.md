# The content: the whole unit, five lessons, each a summary, 10 flashcards and 10 questions with a why, checked twice: tasks

Built as T-59: https://github.com/rayantaj/darsi/pull/3.

- [x] In scripts/check-content.ts, have the CLI print one line per lesson: `<lesson id> "<title>": summary ✓|–, N cards, N questions`, before the existing total. Add one Vitest case to scripts/check-content.test.ts.
- [x] In content/units/limits-derivatives.json, write the summary, 10 cards and 10 questions for النهايات, الاتصال, قاعدة السلسلة and تطبيقات المشتقة, in our own words. Use the same summary format as المشتقة وقواعدها.
- [x] Add 10 cards and 10 questions to المشتقة وقواعدها and keep its existing summary.
- [x] Mix question types in each lesson. Each multiple-choice question has exactly one correct choice. Numeric answers are plain Western-digit numbers (e.g. `12`, `-0.5`). Every question has a one-line `why`.
- [x] Second pass, by a different agent that sees only the prompts and choices: re-solve every question. Log each one in docs/content-check.md as lesson, question number, re-solved answer, file answer, and agree or fixed. Fix any disagreement in the JSON and mark it as resolved.
- [x] Run npm run check:content until it reports 0 problems and 5 lessons × 10 cards × 10 questions.

## Parts of the work
- Checker prints cards and questions per lesson (web-developer)
- Write five lessons: summary, 10 cards, 10 questions with a why (web-developer)
- Re-solve every question on its own, fix disagreements, write the log (web-developer)
