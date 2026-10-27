import { useState } from 'react'
import QuizScreen from './QuizScreen.tsx'
import { addTest, load, save } from './progress/store.ts'
import type { Unit } from './content/schema.ts'
import styles from './UnitTestScreen.module.css'

type Lesson = Unit['lessons'][number]
type Question = NonNullable<Lesson['questions']>[number]
type Drawn = { q: Question; lessonId: string; index: number }

const PER_LESSON = 4

// 4 random questions from each lesson with questions, shuffled (Fisher–Yates).
export function draw(lessons: Lesson[], random: () => number = Math.random): Drawn[] {
  const shuffle = <T,>(a: T[]) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }
  return shuffle(
    lessons.flatMap((l) =>
      shuffle((l.questions ?? []).map((q, index) => ({ q, lessonId: l.id, index }))).slice(0, PER_LESSON),
    ),
  )
}

const date = (at: number) => new Date(at).toLocaleDateString('ar', { day: 'numeric', month: 'long', numberingSystem: 'latn' })

function Run({ unit }: { unit: Unit }) {
  const [drawn] = useState(() => draw(unit.lessons))
  return (
    <QuizScreen
      id="unit-test"
      title="اختبار الوحدة"
      questions={drawn.map((d) => d.q)}
      refs={drawn}
      seconds={1800}
      back="#/test"
      onScore={(score) => save(addTest(load(), score, Date.now()))}
    />
  )
}

const icon = (d: React.ReactNode) => (
  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
)

export default function UnitTestScreen({ unit, run }: { unit: Unit; run: boolean }) {
  if (run) return <Run unit={unit} />
  const last = load().tests?.at(-1)
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a href="#/" aria-label="رجوع" className={styles.back}>
          {icon(<><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></>)}
        </a>
        <span>الوحدة</span>
      </header>
      <h1 className={styles.h1}>اختبار الوحدة</h1>
      <p className={styles.sub}>{unit.title}</p>
      <ul className={styles.list}>
        <li>{icon(<><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h10" /></>)}<span>20 سؤالاً من الدروس الخمسة</span></li>
        <li>{icon(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>)}<span>30 دقيقة</span></li>
        <li>{icon(<><rect x="6" y="3" width="12" height="18" rx="2" /><path d="M11 17h2" /></>)}<span>النتيجة تُحفظ على هذا الجهاز</span></li>
      </ul>
      {last && (
        <div className={styles.card}>
          <span className={styles.muted}>آخر نتيجة</span>
          <div className={styles.row}>
            <span dir="ltr" className={styles.score}>{last.score} / 20</span>
            <span className={styles.muted}>· {date(last.at)}</span>
          </div>
        </div>
      )}
      <div className={styles.start}>
        <a href="#/test/run" className={styles.primary}>ابدأ</a>
        <span className={styles.muted}>يبدأ المؤقت عند الضغط</span>
      </div>
    </div>
  )
}
