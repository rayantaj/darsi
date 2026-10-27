import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import katex from 'katex'
import { UnitSchema, type Unit } from '../src/content/schema.ts'

type Lesson = Unit['lessons'][number]

const formulaError = (latex: string): string | null => {
  try {
    katex.renderToString(latex, { throwOnError: true })
    return null
  } catch (e) {
    return (e as Error).message
  }
}

function lessonTexts(l: Lesson): string[] {
  return [
    l.summary ?? '',
    ...(l.cards ?? []).flatMap((c) => [c.front, c.back]),
    ...(l.questions ?? []).flatMap((q) =>
      q.type === 'multiple-choice'
        ? [q.prompt, q.why, ...q.choices.map((c) => c.text)]
        : [q.prompt, q.why, q.answer],
    ),
  ]
}

// Messages: `<file> › <lesson id> "<lesson title>": <problem>`, one per problem.
export function checkUnit(json: unknown, file: string): string[] {
  const parsed = UnitSchema.safeParse(json)
  const lessonsRaw = (json as { lessons?: { id?: unknown; title?: unknown }[] } | null)?.lessons
  const where = (i?: number) => {
    const l = i === undefined ? undefined : lessonsRaw?.[i]
    return l ? `${file} › ${l.id} "${l.title}"` : file
  }
  if (!parsed.success) {
    return parsed.error.issues.map((issue) => {
      const i = issue.path[0] === 'lessons' ? Number(issue.path[1]) : undefined
      return `${where(i)}: ${issue.path.join('.')}: ${issue.message}`
    })
  }
  const errors: string[] = []
  parsed.data.lessons.forEach((lesson, i) => {
    const at = where(i)
    ;(lesson.questions ?? []).forEach((q, n) => {
      if (q.type === 'multiple-choice') {
        if (q.choices.filter((c) => c.correct).length !== 1)
          errors.push(`${at}: question ${n + 1} needs exactly one correct choice`)
      } else if (!Number.isFinite(Number(q.answer)))
        errors.push(`${at}: question ${n + 1} answer "${q.answer}" is not a number`)
    })
    for (const t of lessonTexts(lesson))
      for (const [, latex] of t.matchAll(/\$([^$]+)\$/g)) {
        const err = formulaError(latex)
        if (err) errors.push(`${at}: formula "${latex}": ${err}`)
      }
  })
  return errors
}

type Counted = Pick<Lesson, 'id' | 'title' | 'summary'> & { cards?: unknown[]; questions?: unknown[] }
export const lessonLine = (l: Counted): string =>
  `${l.id} "${l.title}": summary ${l.summary ? '✓' : '–'}, ${l.cards?.length ?? 0} cards, ${l.questions?.length ?? 0} questions`

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const dir = 'content/units'
  const files = readdirSync(dir).filter((f) => f.endsWith('.json'))
  const errors = files.flatMap((f) => {
    const path = join(dir, f)
    try {
      const json = JSON.parse(readFileSync(path, 'utf8'))
      const found = checkUnit(json, path)
      if (!found.length) (json as Unit).lessons.forEach((l) => console.log(lessonLine(l)))
      return found
    } catch (e) {
      return [`${path}: ${(e as Error).message}`]
    }
  })
  errors.forEach((e) => console.error(e))
  console.log(`Checked ${files.length} units, ${errors.length} problems.`)
  process.exit(errors.length ? 1 : 0)
}
