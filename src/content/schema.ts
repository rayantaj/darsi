import { z } from 'zod'

const text = z.string().trim().min(1)
const ten = <T extends z.ZodTypeAny>(item: T) => z.array(item).length(10)

const Question = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('multiple-choice'),
    prompt: text,
    choices: z.array(z.object({ text, correct: z.boolean() })).min(2),
    why: text,
  }),
  z.object({
    type: z.literal('numeric'),
    prompt: text,
    answer: text,
    why: text,
  }),
])

const Lesson = z.object({
  id: text,
  title: text,
  summary: text.optional(),
  cards: ten(z.object({ front: text, back: text })).optional(),
  questions: ten(Question).optional(),
})

export const UnitSchema = z.object({
  id: text,
  title: text,
  lessons: z.array(Lesson).min(1),
})

export type Unit = z.infer<typeof UnitSchema>
