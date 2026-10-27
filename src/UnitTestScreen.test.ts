import { describe, expect, it } from 'vitest'
import { draw } from './UnitTestScreen.tsx'

const lesson = (id: string, n: number) => ({
  id,
  title: id,
  questions: Array.from({ length: n }, (_, k) => ({ type: 'numeric' as const, prompt: `${id}${k}`, why: 'w', answer: '1' })),
})

describe('draw', () => {
  it('takes 4 per lesson with questions, skips title-only lessons, no repeats', () => {
    let s = 7
    const random = () => ((s = (s * 16807) % 2147483647) / 2147483647)
    const out = draw([lesson('a', 10), lesson('b', 10), { id: 'c', title: 'c' }, lesson('d', 10)], random)
    expect(out).toHaveLength(12)
    for (const id of ['a', 'b', 'd']) expect(out.filter((d) => d.lessonId === id)).toHaveLength(4)
    expect(new Set(out.map((d) => `${d.lessonId}:${d.index}`)).size).toBe(12)
    expect(out.every((d) => d.q.prompt === `${d.lessonId}${d.index}`)).toBe(true)
  })
})
