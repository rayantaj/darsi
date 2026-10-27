const KEY = 'darsi.v1'
const DAY = 86400000

export type Box = 1 | 2 | 3
export type Progress = { cards: Record<string, { box: Box; due: number }> }

export function load(): Progress {
  try {
    const p = JSON.parse(localStorage.getItem(KEY) ?? '')
    if (p && typeof p === 'object' && p.cards && typeof p.cards === 'object') return p
  } catch {
    // missing or broken: start empty
  }
  return { cards: {} }
}

export function save(p: Progress): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(p))
  } catch {
    // quota or blocked storage: keep the session going
  }
}

export function mark(p: Progress, key: string, knew: boolean, now: number): Progress {
  const box = p.cards[key]?.box ?? 1
  const next: Box = knew ? (Math.min(box + 1, 3) as Box) : 1
  const due = knew ? now + (next === 2 ? 1 : 3) * DAY : now
  return { ...p, cards: { ...p.cards, [key]: { box: next, due } } }
}

export function due(p: Progress, lessonId: string, count: number, now: number): number[] {
  const box = (i: number) => p.cards[`${lessonId}:${i}`]?.box ?? 1
  return Array.from({ length: count }, (_, i) => i)
    .filter((i) => {
      const c = p.cards[`${lessonId}:${i}`]
      return !c || c.due <= now
    })
    .sort((a, b) => box(a) - box(b) || a - b)
}
