import { describe, expect, it } from 'vitest'
import { isRight } from './QuizScreen.tsx'

type Q = Parameters<typeof isRight>[0]
const mc: Q = { type: 'multiple-choice', prompt: 'p', why: 'w', choices: [{ text: 'a', correct: false }, { text: 'b', correct: true }] }
const numeric: Q = { type: 'numeric', prompt: 'p', why: 'w', answer: '6' }

describe('isRight', () => {
  it('multiple-choice checks the picked choice', () => {
    expect(isRight(mc, 1)).toBe(true)
    expect(isRight(mc, 0)).toBe(false)
  })
  it('numeric accepts 6 in any digits and rejects others', () => {
    expect(isRight(numeric, '6')).toBe(true)
    expect(isRight(numeric, ' ٦ ')).toBe(true)
    expect(isRight(numeric, '6.0')).toBe(true)
    expect(isRight(numeric, '5')).toBe(false)
    expect(isRight(numeric, 'x')).toBe(false)
  })
  it('a blank answer is wrong, even for 0', () => {
    expect(isRight({ ...numeric, answer: '0' }, '')).toBe(false)
    expect(isRight({ ...numeric, answer: '0' }, '  ')).toBe(false)
    expect(isRight(mc, '')).toBe(false)
  })
})
