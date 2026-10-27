# Flashcards: flip, again or knew it, Leitner boxes with due dates in local storage: requirements

T-62 · Feature · the plan Ray approved

## Goal
Flashcards: flip, again or knew it, Leitner boxes with due dates in local storage

Goal: a student flips a lesson's ten cards and marks each; again comes back now, knew it moves up a box (box 2 due in 1 day, box 3 in 3 days); progress survives closing the browser. Match design/Flashcards.dc.html. Storage per docs/tech.md (darsi.v1, src/progress/).

## Done when
Each one is something Ray sees in the app; QA proves it with a screenshot.
1. Opening البطاقات from the summary shows a card's front with 'n / 10'. Tapping it flips to the back (the answer with its formula).
2. Marking a card مرة أخرى brings the same card, with the same n / 10, back later in the same session before the session ends.
3. After finishing all ten cards and reloading the browser, the unit screen shows the lesson's بطاقات mark filled.
4. Reopening the lesson's cards the same day after finishing them shows a no-cards-due message instead of a card.

## Out of scope
- src/content/schema.ts and content/units/*.json: no new 'why' field on cards; the back is shown as it is.
- The quiz button on SummaryScreen and the unit test button stay disabled.
- src/Summary.tsx renderer: reuse it, don't extend it.
- No router, state or storage library: plain localStorage and the hash routing in App.tsx.
