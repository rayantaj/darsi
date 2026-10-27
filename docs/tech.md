# Darsi: tech

27 Oct 2026 · Tech stage · for the proof of concept in `docs/brief.md`

## Platform

A web app for the phone's browser. Minimum: iOS 17 Safari and current Chrome on Android. Installable to the home screen with a web manifest; no service worker in the POC (nothing to cache but the bundle, and it would hide content updates). Everything runs in the browser: no server, no accounts.

## Stack

- React 18, Vite, TypeScript, like Ray's other web projects (sheetdeck).
- Styling: plain CSS modules with logical properties (`margin-inline-start`, not `margin-left`) so RTL is free. No component library: the POC has five screens and Chakra's RTL story is not worth its weight here.
- Fonts bundled, not fetched: `@fontsource/ibm-plex-sans-arabic` for text; the UI digits are Western, as the math book prints them.
- Math: KaTeX renders formulas from LaTeX strings in the content files. It is the one heavy dependency (about 300 kB with fonts) and the POC can't do without it.
- Tests: Vitest. Lint: ESLint (the Vite template's config).

## Data and storage

- **Content** lives in `content/units/<unit-id>.json`, one file per unit: unit title, lessons, and per lesson a summary (Markdown with `$…$` math), ten flashcards (`front`, `back`) and ten questions (`type` multiple-choice or numeric, `prompt`, `choices` or `answer`, `why`). The unit test draws its twenty questions from these. A Zod schema in `src/content/schema.ts` types it.
- **The checker** `scripts/check-content.ts` (`npm run check:content`) fails the build if a lesson lacks ten cards or ten questions, a multiple-choice question has no single correct choice, a numeric answer isn't a number, any field is empty, or a formula doesn't parse in KaTeX. It is the first line against wrong answers; the second is the report button.
- **Progress** is one JSON object in `localStorage` under `darsi.v1`: per card a Leitner box (1, 2 or 3) and a due date; per quiz the best score and the last answers; per unit test the scores; the reports list. Version in the key so a later shape never reads an old one.
- **Spaced repetition:** Leitner with three boxes. "Again" sends a card to box 1 (due now); "knew it" moves it up one box, due in 1 day from box 2 and 3 days from box 3. A session shows the due cards of the lesson, box 1 first.

## Dependencies

`react`, `react-dom`, `katex`, `zod`, `@fontsource/ibm-plex-sans-arabic`. Dev: `vite`, `typescript`, `vitest`, `eslint`, `tsx`. Nothing else without a line in this file.

## Checks the runner runs

```
npm ci
npm run lint
npm run check:content
npm run build
npm test
```

## Risky paths (always reviewed)

`content/**` (the answers), `src/content/**` (the schema), `src/progress/**` (storage and the Leitner scheduler), `package.json`, `package-lock.json`, `vite.config.ts`, `.github/**`.

## Deploy

GitHub Pages from `main` with the same `pages.yml` workflow sheetdeck uses; Vite `base: '/darsi/'`. The repo is public (Ray's call, 27 Oct 2026: the content is ours and there are no secrets), so Pages is free. The site is `https://rayantaj.github.io/darsi/`.

## RTL and Arabic

`<html lang="ar" dir="rtl">` from the first commit. Logical CSS properties only; icons that point (back, next) flip with direction. Text is Arabic; numbers and formulas are left-to-right islands (`dir="ltr"` on the formula span), which is how the book prints them. No English strings in the UI.

## Rules the code keeps

1. Content is data: nothing about a lesson is written in a component.
2. The checker runs before the build; a content file that fails never ships.
3. Progress is read once at start and written after every action; the app never trusts it to exist.
4. No network calls at runtime.
