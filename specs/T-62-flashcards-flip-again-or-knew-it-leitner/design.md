# Flashcards: flip, again or knew it, Leitner boxes with due dates in local storage: design

**Screen** `#/cards/<lessonId>` → `src/FlashcardsScreen.tsx` + `src/FlashcardsScreen.module.css`, per `design/Flashcards.dc.html`:
- Header: back arrow to `#/lesson/<id>`, label البطاقات; lesson title; counter `n / 10` (LTR digits) and an accent progress bar (done / queue length).
- A tall hairline card (radius 16), the whole card a `<button>` that flips on tap: front, with hint اضغط للقلب; back, with hint اضغط للرجوع. The text is rendered with `<Summary md={…} />` so `$…$` uses KaTeX.
- Two 52px buttons: مرة أخرى (ترجع الآن, secondary) and عرفتها (ترجع بعد يوم, primary accent).
- Empty state: no cards due → one muted line and the back link.

**Data** `src/progress/store.ts` (risky path), localStorage key `darsi.v1`:
```ts
type Progress = { cards: Record<string, { box: 1|2|3; due: number }> } // key `${lessonId}:${index}`, due = epoch ms
load(): Progress            // never throws; returns {cards:{}} for missing or bad data; keeps unknown top-level keys
save(p: Progress): void
mark(p, key, knew: boolean, now: number): Progress // again→{1,now}; knew→box=min(box+1,3), due=now+(box===2?1:3)*86400000
due(p, lessonId, count, now): number[] // indexes with no record or due<=now, sorted by box
```
A card with no record counts as box 1, due now.

**Changed:** `src/App.tsx` (the cards route), `src/SummaryScreen.tsx` (البطاقات becomes `<a href="#/cards/<id>">` with the same style; new `id` prop), `src/UnitScreen.tsx` (cards mark from `load()`).
**New test:** `src/progress/store.test.ts`.

## Not in the code yet
Named above but not there when the plan was approved: new files, or check them.
- `src/FlashcardsScreen.tsx`
- `src/FlashcardsScreen.module.css`
- `src/progress/store.ts`
- `src/progress/store.test.ts`
