import Summary from './Summary.tsx'
import { load } from './progress/store.ts'
import styles from './QuizScreen.module.css'

export default function ReportsScreen({ titles }: { titles: Record<string, string> }) {
  const reports = [...(load().reports ?? [])].reverse()
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a href="#/" aria-label="رجوع" className={styles.back}>
          <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </a>
        <span>البلاغات</span>
      </header>
      {reports.length === 0 && <p className={styles.meta}>لا توجد بلاغات</p>}
      {reports.map((r) => (
        <section key={r.at + ':' + r.lessonId + r.index} className={styles.miss}>
          <div className={styles.meta}>{titles[r.lessonId] ?? r.lessonId}</div>
          <Summary md={r.prompt} />
        </section>
      ))}
    </div>
  )
}
