import { useEffect, useState } from 'react'
import unitJson from '../content/units/limits-derivatives.json'
import type { Unit } from './content/schema.ts'
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
  const i = unit.lessons.findIndex((l) => hash === `#/lesson/${l.id}`)
  const lesson = unit.lessons[i]
  return lesson?.summary ? (
    <SummaryScreen n={i + 1} title={lesson.title} md={lesson.summary} />
  ) : (
    <UnitScreen unit={unit} />
  )
}
