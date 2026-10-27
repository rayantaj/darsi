# Unit test: 20 questions drawn from all lessons, a 30-minute timer, score history: design

**Screens**
- `#/test`: intro per `design/UnitTest.dc.html`: back to `#/` in the header with الوحدة, h1 اختبار الوحدة, unit title muted, three icon rows (20 سؤالاً من الدروس الخمسة, 30 دقيقة, النتيجة تُحفظ على هذا الجهاز), a آخر نتيجة hairline card (`n / 20` in an LTR span, `· <date>` muted) shown only when `tests` is non-empty, then ابدأ (a link styled as the primary button) to `#/test/run` with يبدأ المؤقت عند الضغط under it.
- `#/test/run`: the existing QuizScreen with title اختبار الوحدة, the timer `m:ss` (LTR) in the header and السؤال n من 20; the result screen's back and رجوع إلى الوحدة both go to `#/test`.
- Date: `new Date(at).toLocaleDateString('ar', { day: 'numeric', month: 'long', numberingSystem: 'latn' })` (not 'ar-SA', which gives Hijri).

**Data** (`src/progress/store.ts`, key `darsi.v1`)
- `Progress.tests?: { score: number; at: number }[]`, appended by `addTest(p, score, at)`; the last item is the last score.

**Files**
- New: `src/UnitTestScreen.tsx` (+ `UnitTestScreen.module.css`, `UnitTestScreen.test.ts` for `draw`).
- Changed: `src/progress/store.ts` (+ `store.test.ts`), `src/QuizScreen.tsx` (+ `QuizScreen.module.css` for the timer, `QuizScreen.test.ts` for blank answers), `src/App.tsx` (two routes), `src/UnitScreen.tsx` (button becomes `<a href="#/test">`).

**Contract**
- `draw(lessons, random?) => { q: Question; lessonId: string; index: number }[]` returns 4 per lesson with questions, shuffled (Fisher–Yates with `random`).
- QuizScreen props: `{ id, title, questions, back?, refs?, seconds?, onScore? }`. Timer: `end = Date.now() + seconds*1000`, setInterval 1000 and cleared on unmount; at `end` it fills the missing answers with '' and calls `onScore` once.

## Not in the code yet
Named above but not there when the plan was approved: new files, or check them.
- `src/UnitTestScreen.tsx`
- `UnitTestScreen.module.css`
- `UnitTestScreen.test.ts`
