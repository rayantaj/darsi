# Quiz and result: 10 questions, choices and numeric answers, score, the misses with why, report a bad question: tasks

Built as T-60.

- [x] In src/progress/store.ts add optional quiz: Record<lessonId, best> and reports: {lessonId, index, prompt, at}[] to Progress, plus best(p, id, score) and report(p, r) helpers, with store tests.
- [x] Add src/QuizScreen.tsx (+ module.css): question n of 10 with a progress bar, choice buttons (teal border when selected) or a number field, and تأكيد, which is disabled until there is an answer.
- [x] In the same screen, after question 10 show the result: score / 10, the line, and one card per miss with إجابتك, الصحيح, لماذا and أبلغ عن خطأ, then أعد الاختبار and رجوع إلى الوحدة; save the best score.
- [x] Add src/ReportsScreen.tsx listing saved reports (lesson title + question text), or an empty line when there are none.
- [x] In src/App.tsx route #/quiz/<id> to QuizScreen for lessons with questions and #/reports to ReportsScreen; turn the disabled quiz button in SummaryScreen into a link to #/quiz/<id>.
- [x] In UnitScreen, fill the اختبار mark when the lesson has a saved best score.

## Parts of the work
- Best score and reports in store.ts + tests (web-developer)
- QuizScreen: questions, grading, result, report button (web-developer)
- ReportsScreen at #/reports (web-developer)
- Routes, Summary quiz link, unit quiz mark (web-developer)
