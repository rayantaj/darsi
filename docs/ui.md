# Darsi: UI

27 Oct 2026 · UI stage · the canvas: https://claude.ai/artifact/AGxNxRWdrNQmYo6Kq9sSNJ (private; phone 390×844, Arabic, RTL)

## Screens

- **Unit** (`Main`): the unit's title and its five lessons, each with three progress marks (summary, cards, quiz) and a chevron; a secondary button to the unit test. State: first run (`MainEmpty`), no marks filled and a one-line hint.
- **Summary** (`Summary`): one lesson on one scrolling screen: the idea, the rules as label plus formula, one worked example with a line of why; at the bottom two buttons, cards and quiz. State: dark (`SummaryDark`).
- **Flashcards** (`Flashcards`): counter and progress bar, one tall card that flips on tap (front, then back with a one-line why), two buttons: again (comes back now) and knew it (comes back in a day).
- **Quiz** (`Quiz`): question n of 10, the prompt, four full-width choices, one selected, confirm. Result (`QuizResult`): the score, the misses as cards with your answer, the right one and why, a report button on each, retake or back.
- **Unit test** (`UnitTest`): what it is (20 questions, 30 minutes, saved on this device), the last score, start.

## Rules for the developer

- `<html lang="ar" dir="rtl">`; logical CSS properties only; icons that point are mirrored; the back button sits at the start edge (right).
- Colours: ground `#FFFFFF`, ink `#15181C`, muted `#5B6470`, hairline `#E3E6EA`, accent `#0F766E` (primary button, progress, selection), wrong `#B42318`, right `#067647`. Dark: ground `#111417`, surface `#1A1E23`, ink `#F2F4F6`, muted `#A3ADB8`, hairline `#2A3038`, accent `#2DD4BF`. Follows the system's light or dark setting; no toggle.
- Type: IBM Plex Sans Arabic, body 17px/1.6, titles 28px/700, labels 14px; Western digits. Formulas are left-to-right islands (`dir="ltr"`) rendered by KaTeX; the canvas shows them as Unicode stand-ins.
- Components: cards with a 1px hairline, radius 16, padding 20, no shadows; buttons 52px tall, radius 14, primary full width in accent; tap targets 44px or more; a 34px safe area at the bottom.
- No fake status bar, no onboarding, no settings, no English strings.
