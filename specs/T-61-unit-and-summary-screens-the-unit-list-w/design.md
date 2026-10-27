# Unit and summary screens: the unit list with progress marks, the first-run state, the lesson summary with formulas, light and dark: design

**Screens**
- Unit (`#/`, `src/UnitScreen.tsx`): header درسي; unit title (28/700); 'الفصل الأول · 5 دروس' (muted); the hint line only when no mark is filled; five lesson cards (hairline, radius 16, padding 20) with the title, three marks (dot + label: ملخص، بطاقات، اختبار) and a chevron pointing toward the inline end; a 52px secondary button 'اختبار الوحدة · 20 سؤالاً' (disabled until the unit test feature).
- Summary (`#/lesson/<id>`, `src/SummaryScreen.tsx`): back button at the start edge, 'الدرس n', the lesson title, then the rendered summary; bottom: البطاقات · 10 and الاختبار · 10 أسئلة buttons, disabled for now, above a 34px safe area.

**Data**
- `src/content/schema.ts`: Lesson's `summary`, `cards` and `questions` become `.optional()`; when present the rules don't change (ten each, non-empty).
- `content/units/limits-derivatives.json`: the unit, five lessons, only `derivative-rules` (المشتقة وقواعدها) with a `summary`.
- Summary Markdown, the only syntax supported: `## heading`, `- label: text with $latex$` (a rule row), plain paragraphs separated by blank lines.
- Progress marks: `marks(lessonId) => {summary, cards, quiz}: boolean`, all false for now (no store yet); the hint shows when every mark is false.

**Files**
- Changed: `src/content/schema.ts`, `scripts/check-content.ts`, `scripts/check-content.test.ts`, `src/App.tsx`.
- New: `content/units/limits-derivatives.json`, `src/UnitScreen.tsx`, `src/SummaryScreen.tsx`, `src/Summary.tsx`, `src/Summary.test.ts(x)`, and `*.module.css` beside each screen.
- Math: `katex.renderToString(latex, {throwOnError: false})` in `<span dir="ltr">`; `katex/dist/katex.min.css` imported once.

## Not in the code yet
Named above but not there when the plan was approved: new files, or check them.
- `src/UnitScreen.tsx`
- `src/SummaryScreen.tsx`
- `content/units/limits-derivatives.json`
- `src/Summary.tsx`
- `katex/dist/katex.min.css`
