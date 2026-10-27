# Unit and summary screens: the unit list with progress marks, the first-run state, the lesson summary with formulas, light and dark: tasks

T-61 · in progress.

- [ ] Schema: make lesson `summary`, `cards` and `questions` optional (title-only lessons); in `checkUnit`/`lessonTexts`, default missing ones to empty; add a checker test that a title-only lesson passes and a 9-card lesson still fails.
- [ ] Content: add `content/units/limits-derivatives.json` (id `limits-derivatives`, title النهايات والاشتقاق, five lessons: النهايات، الاتصال، المشتقة وقواعدها، قاعدة السلسلة، تطبيقات المشتقة); only المشتقة وقواعدها gets a `summary` in Markdown: `## الفكرة`, `## القواعد` as `- label: $latex$` lines, `## 
- [ ] Unit screen `src/UnitScreen.tsx`: header درسي, unit title, 'الفصل الأول · 5 دروس', the hint 'ابدأ بالدرس الأول: ملخص، ثم بطاقات، ثم اختبار.' when no mark is filled, one card per lesson with three marks (ملخص، بطاقات، اختبار) plus a chevron, and a disabled secondary 'اختبار الوحدة · 20 سؤالاً' button
- [ ] Summary renderer `src/Summary.tsx`: split the Markdown into `##` headings, `- label: …` rule rows and paragraphs; render each `$…$` with `katex.renderToString` inside a `<span dir="ltr">`; import `katex/dist/katex.min.css`; add one unit test that `$x^n$` becomes KaTeX markup and a `##` line becomes 
- [ ] Summary screen `src/SummaryScreen.tsx`: back button at the start edge to `#/`, 'الدرس n' and the title, the rendered summary in hairline cards, and at the bottom two disabled buttons (البطاقات · 10, الاختبار · 10 أسئلة).
- [ ] `src/App.tsx`: import the unit JSON, read `location.hash` (re-render on `hashchange`), show SummaryScreen for `#/lesson/<id>` and UnitScreen otherwise. Styles go in CSS modules using the `src/index.css` variables only, so dark mode comes free.

## Parts of the work
- Optional lesson fields + limits-derivatives.json (web-developer)
- Unit screen with marks, hint, unit test button (web-developer)
- Summary renderer + summary screen with KaTeX (web-developer)
- Hash routing in App (web-developer)
