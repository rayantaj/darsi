# The content: the whole unit, five lessons, each a summary, 10 flashcards and 10 questions with a why, checked twice: design

**No new screens.** Existing `src/UnitScreen.tsx` and `src/SummaryScreen.tsx` show the content as it is.

**Data:** no schema change. `content/units/limits-derivatives.json` keeps its five lesson ids (`limits`, `continuity`, `derivative-rules`, `chain-rule`, `derivative-applications`). Each lesson gets:
- `summary`: Markdown in the subset `src/Summary.tsx` renders (`## الفكرة`, `## القواعد` with `- label: $…$` rows, `## مثال محلول` paragraphs). No other Markdown.
- `cards`: 10 × `{front, back}`, a concept or rule on the front and the answer or formula on the back.
- `questions`: 10, a mix of `multiple-choice` (`choices` with exactly one `correct: true`) and `numeric` (`answer` is a string that `Number()` parses), each with a one-line `why`.

**Text rules:** formulas only inside `$…$` and they must parse in KaTeX. No literal dollar sign (the checker reads `\$` as a formula). No book text.

**Files:**
- `content/units/limits-derivatives.json`: the content.
- `scripts/check-content.ts`: the CLI prints a per-lesson count line (summary yes/no, card count, question count), then the existing `Checked N units, M problems.` `checkUnit` stays as it is.
- `scripts/check-content.test.ts`: one case for the count line (extract a small `lessonCounts(unit)` helper if that makes it testable).
- `docs/content-check.md` (new): a table with lesson, question number, re-solved answer, file answer, and status (agree / fixed: <what changed>). It ends with `Open disagreements: 0`.

## Not in the code yet
Named above but not there when the plan was approved: new files, or check them.
- `docs/content-check.md`
