# Quiz and result: 10 questions, choices and numeric answers, score, the misses with why, report a bad question: requirements

T-60 · Feature · the plan Ray approved

## Goal
Quiz and result: 10 questions, choices and numeric answers, score, the misses with why, report a bad question

Goal: a student takes a lesson's quiz, sees the score and every miss with the right answer and why, and can report a bad question. Match design/Quiz.dc.html and QuizResult.dc.html. Reports are saved locally and listed on a hidden page at /#/reports. Best score per lesson saved in progress.

## Done when
Each one is something Ray sees in the app; QA proves it with a screenshot.
1. Opening a lesson's quiz shows السؤال 1 من 10, its four choices, and after tapping one that choice has the teal border and تأكيد is enabled.
2. The numeric question 'احسب lim x→4 (√x + x)' shows a number field instead of choices, and entering 6 counts as correct on the result screen.
3. After the tenth question the result shows the score as n / 10 and each miss with إجابتك in red, الصحيح in green and لماذا.
4. Tapping أبلغ عن خطأ on a miss changes it to تم الإبلاغ, and #/reports then lists that question's text.
5. Retaking a quiz with a lower score keeps the higher best score, and the اختبار mark on the unit list stays filled.

## Out of scope
- content/units/limits-derivatives.json and src/content/schema.ts: no content or schema changes (Ray's note).
- The cards part of the store (mark, due, the cards mark rule) and FlashcardsScreen.
- The disabled unit test button on UnitScreen.
- docs/ and design/ files.
