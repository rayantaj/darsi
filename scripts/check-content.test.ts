import { describe, expect, it } from 'vitest'
import { checkUnit, lessonLine } from './check-content.ts'

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

  it('passes a title-only lesson', () => {
    const lesson = { id: 'l2', title: 'عنوان فقط' }
    const u = { id: 'u1', title: 'الوحدة', lessons: [lesson] }
    expect(checkUnit(u, 'u1.json')).toEqual([])
  })

  it('fails a lesson with nine cards', () => {
    const cards = Array.from({ length: 9 }, () => ({ front: 'س', back: 'ج' }))
    expect(checkUnit(unit({ cards }), 'u1.json')).not.toEqual([])
  })

  it('names the lesson when it has nine questions', () => {
    const errors = checkUnit(unit({ questions: Array.from({ length: 9 }, question) }), 'u1.json')
    expect(errors.join('\n')).toContain('الدرس الأول')
  })

  it('prints a count line per lesson', () => {
    const [full, bare] = [unit().lessons[0], { id: 'l2', title: 'عنوان فقط' }]
    expect(lessonLine(full)).toBe('l1 "الدرس الأول": summary ✓, 10 cards, 10 questions')
    expect(lessonLine(bare)).toBe('l2 "عنوان فقط": summary –, 0 cards, 0 questions')
  })

  it('quotes a formula that does not parse', () => {
    const errors = checkUnit(unit({ summary: '$\\frac{1}{$' }), 'u1.json')
    expect(errors.join('\n')).toContain('\\frac{1}{')
  })
})
