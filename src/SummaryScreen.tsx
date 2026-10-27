import Summary from './Summary.tsx'
import styles from './SummaryScreen.module.css'

export default function SummaryScreen({ n, title, md }: { n: number; title: string; md: string }) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a href="#/" aria-label="رجوع" className={styles.back}>
          <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </a>
        <span>الدرس {n}</span>
      </header>
      <h1 className={styles.title}>{title}</h1>
      <Summary md={md} />
      <div className={styles.actions}>
        <button type="button" disabled className={styles.primary}>البطاقات · 10</button>
        <button type="button" disabled className={styles.secondary}>الاختبار · 10 أسئلة</button>
      </div>
    </div>
  )
}
