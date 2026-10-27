# Unit and summary screens: the unit list with progress marks, the first-run state, the lesson summary with formulas, light and dark: requirements

T-61 · Feature · the plan Ray approved

## Goal
Unit and summary screens: the unit list with progress marks, the first-run state, the lesson summary with formulas, light and dark

Goal: a student opens the unit, sees its five lessons and their progress, and reads a lesson's summary with rendered formulas. Match design/Main.dc.html, MainEmpty, Summary and SummaryDark on the canvas (docs/ui.md). One sample lesson (المشتقة وقواعدها) in content/units/limits-derivatives.json with its summary; the other lessons as titles only for now. Dark follows prefers-color-scheme.

## Done when
Each one is something Ray sees in the app; QA proves it with a screenshot.
1. On a 390 px wide screen the unit screen shows النهايات والاشتقاق with its five lessons, each with three marks (ملخص، بطاقات، اختبار), and an اختبار الوحدة button, all in Arabic right to left.
2. On first run (empty localStorage) none of the fifteen marks is filled and the hint 'ابدأ بالدرس الأول: ملخص، ثم بطاقات، ثم اختبار.' shows under the unit title.
3. Tapping المشتقة وقواعدها opens its summary, showing the idea, the rules with KaTeX-rendered formulas such as d/dx xⁿ = n·xⁿ⁻¹, and the worked example.
4. With the system in dark mode the same summary shows on the dark ground (#111417) with teal (#2DD4BF) accents and readable formulas.
5. A lesson with only a title (e.g. النهايات) shows in the list but opens nothing.

## Out of scope
- The colour variables and the dark media query in `src/index.css`: use them, don't add a theme toggle.
- `localStorage` / `src/progress/**`: no progress store in this feature.
- `package.json` dependencies: no router or Markdown library; hash routing and the small renderer are enough.
- `.github/workflows/pages.yml` and `vite.config.ts` (base `/darsi/`).
