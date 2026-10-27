import { useEffect, useState } from 'react'
import unitJson from '../content/units/limits-derivatives.json'
import type { Unit } from './content/schema.ts'
import FlashcardsScreen from './FlashcardsScreen.tsx'
import SummaryScreen from './SummaryScreen.tsx'
import UnitScreen from './UnitScreen.tsx'

const unit = unitJson as Unit

export default function App() {
  const [hash, setHash] = useState(location.hash)
  useEffect(() => {
    const on = () => setHash(location.hash)
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  const c = unit.lessons.find((l) => hash === `#/cards/${l.id}`)
  if (c?.cards) return <FlashcardsScreen key={c.id} id={c.id} title={c.title} cards={c.cards} />
  const i = unit.lessons.findIndex((l) => hash === `#/lesson/${l.id}`)
  const lesson = unit.lessons[i]
  return lesson?.summary ? (
    <SummaryScreen n={i + 1} id={lesson.id} title={lesson.title} md={lesson.summary} />
  ) : (
    <UnitScreen unit={unit} />
  )
}
