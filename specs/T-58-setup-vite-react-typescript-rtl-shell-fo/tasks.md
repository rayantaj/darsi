# Setup: Vite, React, TypeScript, RTL shell, fonts, KaTeX, content schema and checker, checks, GitHub Pages: tasks

T-58 · in progress.

- [ ] Scaffold with the Vite react-ts template at the repo root, trim the demo, set `base: '/darsi/'` in `vite.config.ts`, add scripts `check:content` (tsx scripts/check-content.ts) and `test` (vitest run), and add deps exactly as in docs/tech.md.
- [ ] Shell: `index.html` with `<html lang="ar" dir="rtl">`, viewport meta and Arabic title; `src/main.tsx` imports `@fontsource/ibm-plex-sans-arabic` (400, 700); `src/App.tsx` shows the title درسي; `src/index.css` holds the docs/ui.md colour tokens, light and dark via prefers-color-scheme, body 17px/1.6,
- [ ] Write the Zod schema in `src/content/schema.ts`: Unit {id, title, lessons[]}, Lesson {id, title, summary, cards: {front, back}[] of exactly 10, questions of exactly 10}, Question is a discriminated union on type: multiple-choice {prompt, choices[{text, correct}], why} or numeric {prompt, answer, why
- [ ] Write the checker in `scripts/check-content.ts`: export `checkUnit(json, file): string[]`. It runs the schema, maps Zod issues to messages naming the unit file and the lesson id and title, checks one correct choice per multiple-choice question, checks a numeric answer parses as a number, and passes 
- [ ] Test in `scripts/check-content.test.ts` (Vitest): a valid unit passes; a lesson with nine questions gives an error containing the lesson's title; a formula like `\frac{1}{` gives an error containing that formula. Build the fixtures inline from one valid unit factory.
- [ ] Deploy: `.github/workflows/pages.yml` on push to main runs Node 20 and `npm ci && npm run check:content && npm run build`, then actions/configure-pages, upload-pages-artifact (dist) and deploy-pages, with permissions pages:write and id-token:write. Mirror sheetdeck's file if it differs.

## Parts of the work
- Vite react-ts scaffold, base /darsi/, scripts, deps (web-developer)
- RTL Arabic shell with Plex font and colour tokens (web-developer)
- Zod content schema (web-developer)
- Content checker with KaTeX parse (web-developer)
- Checker tests: nine questions, bad formula, valid unit (web-developer)
- GitHub Pages workflow (web-developer)
