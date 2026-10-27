# Setup: Vite, React, TypeScript, RTL shell, fonts, KaTeX, content schema and checker, checks, GitHub Pages: requirements

T-58 · Feature · the plan Ray approved

## Goal
Setup: Vite, React, TypeScript, RTL shell, fonts, KaTeX, content schema and checker, checks, GitHub Pages

Goal: the empty app builds, passes the five checks in docs/tech.md, and deploys to GitHub Pages. Follow docs/tech.md exactly (stack, dependencies, storage key, checker rules, pages.yml like sheetdeck's, base /darsi/). Register nothing new. The design is docs/ui.md and the canvas files in design/.

## Done when
Each one is something Ray sees in the app; QA proves it with a screenshot.
1. On a 390px-wide phone screen, https://rayantaj.github.io/darsi/ shows the title درسي in IBM Plex Sans Arabic, aligned right, with the page direction right to left.
2. A content file in content/units/ with a lesson of nine questions makes `npm run check:content` fail with a message naming that lesson.
3. A content file whose summary holds `$\frac{1}{$` makes `npm run check:content` fail with a message quoting that formula.
4. With no content files, `npm run check:content` prints that it checked 0 units and exits without an error.

## Out of scope
- docs/ and design/: they are the spec, not code
- Dependencies: nothing beyond docs/tech.md's list and what the Vite react-ts template itself brings
- No service worker, router, Markdown renderer or progress storage: later Features own them
