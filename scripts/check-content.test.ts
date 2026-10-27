import { describe, expect, it } from 'vitest'
import { checkUnit } from './check-content.ts'

const question = () => ({
  type: 'numeric',
  prompt: 'كم يساوي 1 + 1؟',
  answer: '2',
  why: 'لأن الجمع.',
})

const unit = (lesson: Record<string, unknown> = {}) => ({
  id: 'u1',
  title: 'الوحدة',
  lessons: [
    {
      id: 'l1',
      title: 'الدرس الأول',
      summary: 'ملخص',
      cards: Array.from({ length: 10 }, () => ({ front: 'س', back: 'ج' })),
      questions: Array.from({ length: 10 }, question),
      ...lesson,
    },
  ],
})

describe('checkUnit', () => {
  it('passes a valid unit', () => {
    expect(checkUnit(unit(), 'u1.json')).toEqual([])
  })

  it('names the lesson when it has nine questions', () => {
    const errors = checkUnit(unit({ questions: Array.from({ length: 9 }, question) }), 'u1.json')
    expect(errors.join('\n')).toContain('الدرس الأول')
  })

  it('quotes a formula that does not parse', () => {
    const errors = checkUnit(unit({ summary: '$\\frac{1}{$' }), 'u1.json')
    expect(errors.join('\n')).toContain('\\frac{1}{')
  })
})
