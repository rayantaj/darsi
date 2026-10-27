# Darsi (درسي): the brief

27 Oct 2026 · Refine stage · a proof of concept

## The idea

Darsi turns a Saudi school textbook into a revision loop a student actually finishes: for every lesson, a one-screen summary, ten flashcards that come back on a spaced schedule, and a ten-question quiz that looks like the teacher's test. The content is ours, written to the book's lesson titles; no page of the book is shown. The proof of concept covers one unit of Grade 12 math (المسارات), Arabic only, on the phone's browser, so Ray can judge whether the loop feels worth paying for before any more books are touched. The research behind it: AgentHQ2 `reports/2026-10-27-student-s-helper-i-16-can-we-legally-tur.md` (go with conditions: own content, written permission before any book text, a lawyer's read before launch).

## Who it's for

Grade 12 students in Saudi Arabia revising for the first-term finals in December, on their phones, in Arabic. In the POC, the student is Ray.

## What's in the first version

A person can:

1. Open the app and see one unit with its lessons, and how far they are in each (Arabic, RTL, light and dark).
2. Read a lesson's summary: one screen, the ideas, the formulas, one worked example.
3. Flip the lesson's ten flashcards and mark each one "knew it" or "again"; the "again" ones come back first next time.
4. Take the lesson's ten-question quiz (multiple choice and short numeric answers), see the score and the right answer with a one-line why for each miss.
5. See a unit test: twenty questions drawn from all the unit's lessons, timed, with a score.
6. Report a wrong answer or a bad question with one tap (saved locally, shown in a list Ray can read).

Content for the POC: one unit written by the agents as a stand-in for the real book, in the shape of a Grade 12 tracks math first-term unit (limits and derivatives: النهايات، الاتصال، الاشتقاق وقواعده، تطبيقات المشتقة), five lessons. Every question has a checked answer. The real book's content replaces it later through the same files.

## What's out

- No accounts, no server, no payments: everything lives in the browser (local storage), one device.
- No book pages, no book text, no scans.
- English, other subjects, other grades, Tahsili and Qudurat prep.
- Teacher or parent views, sharing, notifications.
- Any content pipeline from PDFs: the POC's content is hand-written JSON; the pipeline is the next project if the loop is worth it.

## What done looks like

Ray opens Darsi on his iPhone, works through one unit end to end (summaries, flashcards, quizzes, the unit test) in Arabic without hitting a dead end, and says whether he would pay for this for a child. The flashcard schedule survives closing the browser. Every quiz answer is right (a checker pass over the content, plus the report button for what slips through).

## Language

Arabic only, right to left, Arabic numerals as the book prints them (Western digits in math). English comes after the POC, if at all.

## Stages

Tech: yes, short (stack, storage, the content file shape, checks). Architecture: skipped (a handful of screens; the Tech doc's rules are enough). UI: yes, a canvas with the five screens and their states, RTL, light and dark, before any code.
