# Quiz and result: 10 questions, choices and numeric answers, score, the misses with why, report a bad question: design

**Screens**
- `#/quiz/<id>` (`src/QuizScreen.tsx`, `src/QuizScreen.module.css`), matching `design/Quiz.dc.html`. The header has a back link to `#/lesson/<id>` and the title الاختبار. Below it: the row `السؤال n من 10` · lesson title, then a 4px progress bar, the prompt, then either:
  - multiple-choice: one `<button aria-pressed>` per choice, 56px tall; the selected one has a 2px `--accent` border and the tint background;
  - numeric: `<input inputMode="decimal" dir="ltr">`.
  - تأكيد goes to the next question; after the 10th it switches to result mode in the same component, with no route.
- Result, matching `design/QuizResult.dc.html`:
  - `n / 10` (LTR), then أحسنت، راجع الأسئلة or a full-marks line, then ما أخطأت فيه;
  - one hairline card per miss: prompt, `إجابتك:` (error colour), `الصحيح:` (success colour), `لماذا:` (muted), and the button أبلغ عن خطأ, which becomes تم الإبلاغ (disabled) once tapped;
  - أعد الاختبار (remount via key) and رجوع إلى الوحدة (`#/`).
- `#/reports` (`src/ReportsScreen.tsx`): a hidden page with no link to it. It lists the reports newest first (lesson title + prompt), or لا توجد بلاغات.
- Prompts, choices, answers and why all render through the existing `Summary` component (as `FlashcardsScreen` does), so `$…$` uses KaTeX.

**Grading**
- Multiple-choice: the picked choice has `correct: true`.
- Numeric: `Number(input)` equals `Number(answer)`, after mapping Arabic-Indic digits ٠-٩ to 0-9 and ٫ or , to `.`. Pure function `isRight(q, answer)` in `QuizScreen.tsx`, with a Vitest test.

**Data** (`src/progress/store.ts`, key `darsi.v1`)
- `Progress = { cards, quiz?: Record<string, number>, reports?: { lessonId: string; index: number; prompt: string; at: number }[] }`. Old saves without these fields still load.
- `best(p, id, score)` keeps the maximum. `report(p, r)` appends.
- The screens call `save()` as `FlashcardsScreen` does.

**Changed files**
- `src/App.tsx`: the two routes.
- `src/SummaryScreen.tsx`: quiz button becomes `<a href="#/quiz/<id>">`.
- `src/UnitScreen.tsx`: `quiz: p.quiz?.[l.id] !== undefined`.
- `src/progress/store.test.ts`: tests for best and report.
- Colours: `src/index.css` tokens only. If error/success tokens are missing, add them in both light and dark.

## Not in the code yet
Named above but not there when the plan was approved: new files, or check them.
- `src/QuizScreen.tsx`
- `src/QuizScreen.module.css`
- `src/ReportsScreen.tsx`
- `QuizScreen.tsx`
