# Unit test: 20 questions drawn from all lessons, a 30-minute timer, score history: requirements

T-63 · Feature · the plan Ray approved

## Goal
Unit test: 20 questions drawn from all lessons, a 30-minute timer, score history

Goal: a student takes a timed test over the unit and sees the score and the history. Match design/UnitTest.dc.html; questions drawn evenly from the five lessons (4 each), shuffled; timer counts down from 30:00 and submits at zero; scores with dates saved in progress.

## Done when
Each one is something Ray sees in the app; QA proves it with a screenshot.
1. The unit test intro at #/test shows 20 سؤالاً, 30 دقيقة and a آخر نتيجة card with 'n / 20' and the date of the last attempt.
2. During the test the header shows a timer counting down from 30:00 and the counter reads السؤال n من 20.
3. After submitting the 20th answer the result screen shows the score out of 20, and back on the intro the آخر نتيجة card shows that new score with today's date.
4. On a first visit with no attempts, the intro shows no آخر نتيجة card and ابدأ still starts the test.
5. When the timer reaches 0:00 the test submits by itself and the result screen counts unanswered questions as wrong.

## Out of scope
- content/units/limits-derivatives.json: no content changes.
- The lesson quiz's behaviour at #/quiz/<id>: its best() save, back link and reports stay the same.
- The darsi.v1 key and the existing cards, quiz and reports fields.
- docs/context.md, docs/decisions.md and docs/*.md spec files.
