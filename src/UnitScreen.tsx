import type { Unit } from './content/schema.ts'
import styles from './UnitScreen.module.css'

// No progress store yet: every mark is empty.
const marks = () => ({ summary: false, cards: false, quiz: false })

const labels = [
  ['summary', 'ملخص'],
  ['cards', 'بطاقات'],
  ['quiz', 'اختبار'],
] as const

export default function UnitScreen({ unit }: { unit: Unit }) {
  const all = unit.lessons.map(marks)
  const started = all.some((m) => m.summary || m.cards || m.quiz)
  return (
    <div className={styles.page}>
      <header className={styles.header}>درسي</header>
      <h1>{unit.title}</h1>
      <p className={styles.sub}>الفصل الأول · {unit.lessons.length} دروس</p>
      {!started && <p className={styles.hint}>ابدأ بالدرس الأول: ملخص، ثم بطاقات، ثم اختبار.</p>}
      <div className={styles.list}>
        {unit.lessons.map((l, i) => {
          const body = (
            <>
              <div className={styles.text}>
                <div className={styles.title}>
                  <span className={styles.num}>{i + 1}</span>
                  <span>{l.title}</span>
                </div>
                <div className={styles.marks}>
                  {labels.map(([key, label]) => (
                    <span key={key} className={styles.mark}>
                      <span className={all[i][key] ? styles.dotOn : styles.dot} />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.chevron}>
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </>
          )
          // Title-only lessons are listed but open nothing.
          return l.summary ? (
            <a key={l.id} href={`#/lesson/${l.id}`} className={styles.card}>{body}</a>
          ) : (
            <div key={l.id} className={styles.card}>{body}</div>
          )
        })}
      </div>
      <button type="button" disabled className={styles.unitTest}>اختبار الوحدة · 20 سؤالاً</button>
    </div>
  )
}
