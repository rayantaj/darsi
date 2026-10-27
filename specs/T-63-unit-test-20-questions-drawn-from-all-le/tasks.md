# Unit test: 20 questions drawn from all lessons, a 30-minute timer, score history: tasks

T-63 · in progress.

- [ ] Store: add `tests?: {score: number; at: number}[]` to Progress and `addTest(p, score, at)` that appends, with a store test.
- [ ] Draw: export `draw(lessons, random = Math.random)` from src/UnitTestScreen.tsx that takes 4 random questions from each lesson with questions, shuffles them, and keeps each one's {lessonId, index}. Add a test for the counts with a fixed random.
- [ ] isRight: return false for an empty or blank answer so an unanswered numeric question can't match '0'. Add a test case.
- [ ] QuizScreen: add optional props `back` (default `#/lesson/<id>`), `refs` (lessonId and index per question, for reports), `seconds` (countdown) and `onScore` (default: the current best() save). With `seconds`, show m:ss in the header, tick every second, and at zero submit with unanswered questions as 
- [ ] UnitTestScreen: the intro per the mock (title, unit title, 20 سؤالاً, 30 دقيقة, saved-on-device line, last-score card 'n / 20 · date' only when a test exists, ابدأ link to #/test/run). With `run`, it draws once in useState and renders QuizScreen with seconds=1800, back='#/test', refs and onScore=sav
- [ ] Routes: App renders UnitTestScreen for #/test and #/test/run. UnitScreen's disabled unit-test button becomes a link to #/test.

## Parts of the work
- Add tests history and addTest to the progress store (web-developer)
- draw(): 4 random questions per lesson, shuffled (web-developer)
- QuizScreen timer, back, refs, onScore; blank answer is wrong (web-developer)
- UnitTestScreen intro and run, routes, unit-list link (web-developer)
