# Flashcards: flip, again or knew it, Leitner boxes with due dates in local storage: tasks

T-62 · in progress.

- [ ] Add src/progress/store.ts: load() reads localStorage 'darsi.v1' and returns {cards:{}} if it's missing or broken; save(p) writes the whole object back; mark(p, key, knew, now) applies the Leitner rule; due(p, lessonId, n, now) returns the due card indexes, box 1 first.
- [ ] Add src/progress/store.test.ts for mark (again→box 1 due now; knew from 1→box 2 +1 day, from 2→box 3 +3 days, from 3 stays at 3 +3 days), due ordering, and load() on bad JSON.
- [ ] Add src/FlashcardsScreen.tsx (+ .module.css) to match design/Flashcards.dc.html: back to #/lesson/<id>, lesson title, counter 'n / 10' and progress bar, a tall card that flips on tap (front, then back, rendered with <Summary md>), and buttons مرة أخرى and عرفتها.
- [ ] Session logic in the screen: the queue starts as due(); again moves the current card to the end of the queue; knew it removes it; save after every action. When the queue empties, set location.hash = '#/'. If nothing is due at the start, show a one-line message and the back link.
- [ ] App.tsx: route #/cards/<id> to FlashcardsScreen for lessons that have cards. SummaryScreen: make the البطاقات button a link to #/cards/<id> (pass the id in).
- [ ] UnitScreen.tsx: replace the empty marks() stub. Fill the cards mark from load() when all of the lesson's cards are in box 2 or 3. Summary and quiz marks stay false.

## Parts of the work
- Progress store + Leitner rule + test (web-developer)
- Flashcards screen and session queue (web-developer)
- Route, summary link, unit cards mark (web-developer)
