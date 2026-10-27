# Setup: Vite, React, TypeScript, RTL shell, fonts, KaTeX, content schema and checker, checks, GitHub Pages: design

**Screen:** one page, the app shell. It shows the heading درسي (28px/700) on the ground colour and follows the system's light or dark setting. Nothing else yet.

**Files:**
- `package.json`, `package-lock.json`, `vite.config.ts` (`base: '/darsi/'`), `tsconfig*.json`, `eslint.config.js` (all from the Vite react-ts template)
- `index.html`: `<html lang="ar" dir="rtl">`, `<title>درسي</title>`
- `src/main.tsx`: imports the font (weights 400 and 700) and `src/index.css`
- `src/App.tsx`: `<main><h1>درسي</h1></main>`
- `src/index.css`: CSS variables `--ground --surface --ink --muted --hairline --accent --wrong --right`, a dark set under `prefers-color-scheme: dark`, `font-family: 'IBM Plex Sans Arabic', system-ui, sans-serif`
- `src/content/schema.ts`: exports `UnitSchema` and `type Unit = z.infer<typeof UnitSchema>`
- `scripts/check-content.ts`: exports `checkUnit(json: unknown, file: string): string[]`; the CLI runs only when the file is run directly
- `scripts/check-content.test.ts`
- `content/units/.gitkeep`
- `.github/workflows/pages.yml`

**Content shape (`content/units/<unit-id>.json`):**
`{ id, title, lessons: [{ id, title, summary, cards: [{front, back}] x10, questions: [{type:'multiple-choice', prompt, choices:[{text, correct:boolean}], why} | {type:'numeric', prompt, answer:string, why}] x10 }] }`

**Checker messages:** one line per problem, `<file> › <lesson id> "<lesson title>": <problem>`. Formula problems read `formula "<latex>": <katex error>`. Exit 1 if there are any.

Math is found as `$…$` spans in summary, front, back, prompt, choice text, answer and why.

## Not in the code yet
Named above but not there when the plan was approved: new files, or check them.
- `package.json`
- `package-lock.json`
- `vite.config.ts`
- `eslint.config.js`
- `index.html`
- `src/main.tsx`
- `src/index.css`
- `src/App.tsx`
- `src/content/schema.ts`
- `scripts/check-content.ts`
- `scripts/check-content.test.ts`
- `.github/workflows/pages.yml`
