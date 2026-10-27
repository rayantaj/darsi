import { beforeEach, describe, expect, it, vi } from 'vitest'
import { best, due, load, mark, report, save } from './store.ts'

const DAY = 86400000
const now = 1_000_000

describe('best and report', () => {
  it('best keeps the higher score', () => {
    const p = best(best({ cards: {} }, 'a', 8), 'a', 5)
    expect(p.quiz).toEqual({ a: 8 })
    expect(best(p, 'a', 9).quiz).toEqual({ a: 9 })
  })
  it('report appends and keeps the cards', () => {
    const r = { lessonId: 'a', index: 2, prompt: 'q', at: now }
    const p = report(report({ cards: { 'a:0': { box: 2, due: now } } }, r), r)
    expect(p.reports).toHaveLength(2)
    expect(p.cards['a:0'].box).toBe(2)
  })
})

describe('mark', () => {
  it('again puts the card in box 1, due now', () => {
    const p = mark({ cards: { 'a:0': { box: 3, due: now + DAY } } }, 'a:0', false, now)
    expect(p.cards['a:0']).toEqual({ box: 1, due: now })
  })
  it('knew climbs the boxes and stops at 3', () => {
    let p = mark({ cards: {} }, 'a:0', true, now)
    expect(p.cards['a:0']).toEqual({ box: 2, due: now + DAY })
    p = mark(p, 'a:0', true, now)
    expect(p.cards['a:0']).toEqual({ box: 3, due: now + 3 * DAY })
    p = mark(p, 'a:0', true, now)
    expect(p.cards['a:0']).toEqual({ box: 3, due: now + 3 * DAY })
  })
})

describe('due', () => {
  it('lists unseen and due cards, box 1 first', () => {
    const p = {
      cards: {
        'a:0': { box: 3 as const, due: now },
        'a:1': { box: 2 as const, due: now + 1 },
        'a:2': { box: 1 as const, due: now },
      },
    }
    expect(due(p, 'a', 4, now)).toEqual([2, 3, 0])
  })
})

describe('load', () => {
  beforeEach(() => {
    const m = new Map<string, string>()
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => m.get(k) ?? null,
      setItem: (k: string, v: string) => void m.set(k, v),
    })
  })
  it('returns empty progress for bad JSON or nothing', () => {
    expect(load()).toEqual({ cards: {} })
    localStorage.setItem('darsi.v1', '{oops')
    expect(load()).toEqual({ cards: {} })
  })
  it('round-trips a save', () => {
    const p = mark({ cards: {} }, 'a:0', true, now)
    save(p)
    expect(load()).toEqual(p)
  })
})
