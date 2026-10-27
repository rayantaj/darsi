import { useState } from 'react'
import Summary from './Summary.tsx'
import { due, load, mark, save } from './progress/store.ts'
import type { Unit } from './content/schema.ts'
import styles from './FlashcardsScreen.module.css'

type Cards = NonNullable<Unit['lessons'][number]['cards']>

export default function FlashcardsScreen({ id, title, cards }: { id: string; title: string; cards: Cards }) {
  const [queue, setQueue] = useState(() => due(load(), id, cards.length, Date.now()))
  const [total] = useState(queue.length)
  const [flipped, setFlipped] = useState(false)

  const back = (
    <a href={`#/lesson/${id}`} aria-label="رجوع" className={styles.back}>
      <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
        <path d="M12 5l7 7-7 7" />
      </svg>
    </a>
  )

  if (total === 0) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>{back}<span>البطاقات</span></header>
        <p className={styles.empty}>لا توجد بطاقات مستحقة اليوم.</p>
      </div>
    )
  }

  const i = queue[0]
  const answer = (knew: boolean) => {
    save(mark(load(), `${id}:${i}`, knew, Date.now()))
    const rest = queue.slice(1)
    if (!knew) rest.push(i)
    setFlipped(false)
    if (rest.length === 0) location.hash = '#/'
    setQueue(rest)
  }
  if (i === undefined) return null

  return (
    <div className={styles.page}>
      <header className={styles.header}>{back}<span>البطاقات</span></header>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.counter} dir="ltr">{i + 1} / {cards.length}</div>
      <div className={styles.bar}>
        <div className={styles.fill} style={{ inlineSize: `${((total - queue.length) / total) * 100}%` }} />
      </div>
      <button type="button" className={styles.card} onClick={() => setFlipped(!flipped)}>
        <span className={styles.side}>{flipped ? 'الإجابة' : 'الوجه'}</span>
        <Summary md={flipped ? cards[i].back : cards[i].front} />
        <span className={styles.flipHint}>{flipped ? 'اضغط للرجوع' : 'اضغط للقلب'}</span>
      </button>
      <div className={styles.actions}>
        <div className={styles.action}>
          <button type="button" className={styles.again} onClick={() => answer(false)}>مرة أخرى</button>
          <span className={styles.hint}>ترجع الآن</span>
        </div>
        <div className={styles.action}>
          <button type="button" className={styles.knew} onClick={() => answer(true)}>عرفتها</button>
          <span className={styles.hint}>ترجع بعد يوم</span>
        </div>
      </div>
    </div>
  )
}
