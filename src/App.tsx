import { useEffect, useState } from 'react'
import unitJson from '../content/units/limits-derivatives.json'
import type { Unit } from './content/schema.ts'
import FlashcardsScreen from './FlashcardsScreen.tsx'
import QuizScreen from './QuizScreen.tsx'
import ReportsScreen from './ReportsScreen.tsx'
import SummaryScreen from './SummaryScreen.tsx'
import UnitScreen from './UnitScreen.tsx'
import UnitTestScreen from './UnitTestScreen.tsx'

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
  const q = unit.lessons.find((l) => hash === `#/quiz/${l.id}`)
  if (q?.questions) return <QuizScreen key={q.id} id={q.id} title={q.title} questions={q.questions} />
  if (hash === '#/test' || hash === '#/test/run') return <UnitTestScreen key={hash} unit={unit} run={hash === '#/test/run'} />
  if (hash === '#/reports') return <ReportsScreen titles={Object.fromEntries(unit.lessons.map((l) => [l.id, l.title]))} />
  const i = unit.lessons.findIndex((l) => hash === `#/lesson/${l.id}`)
  const lesson = unit.lessons[i]
  return lesson?.summary ? (
    <SummaryScreen n={i + 1} id={lesson.id} title={lesson.title} md={lesson.summary} />
  ) : (
    <UnitScreen unit={unit} />
  )
}
