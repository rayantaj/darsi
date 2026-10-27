import { useEffect, useState } from 'react'
import Summary from './Summary.tsx'
import { best, load, report, save } from './progress/store.ts'
import type { Unit } from './content/schema.ts'
import styles from './QuizScreen.module.css'

type Question = NonNullable<Unit['lessons'][number]['questions']>[number]

const num = (s: string) =>
  Number(s.trim().replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d))).replace(/[٫,]/g, '.'))

// answer: the picked choice index (multiple-choice) or the typed text (numeric)
export function isRight(q: Question, answer: number | string): boolean {
  if (q.type === 'multiple-choice') return q.choices[answer as number]?.correct === true
  if (String(answer).trim() === '') return false
  const a = num(String(answer))
  return !Number.isNaN(a) && a === num(q.answer)
}

const shown = (q: Question, a: number | string) =>
  a === '' ? 'بلا إجابة' : q.type === 'multiple-choice' ? q.choices[a as number].text : String(a)
const correct = (q: Question) => (q.type === 'multiple-choice' ? q.choices.find((c) => c.correct)!.text : q.answer)

type Props = {
  id: string
  title: string
  questions: Question[]
  back?: string
  refs?: { lessonId: string; index: number }[]
  seconds?: number
  onScore?: (score: number) => void
}

export default function QuizScreen({ id, title, questions, back: backHref = `#/lesson/${id}`, refs, seconds, onScore }: Props) {
  const [i, setI] = useState(0)
  const [answers, setAnswers] = useState<(number | string)[]>([])
  const [pick, setPick] = useState<number | string>('')
  const [reported, setReported] = useState<number[]>([])
  const [end, setEnd] = useState(() => Date.now() + (seconds ?? 0) * 1000)
  const [left, setLeft] = useState(seconds ?? 0)
  const done = answers.length === questions.length

  const submit = (all: (number | string)[]) => {
    const score = all.filter((a, k) => isRight(questions[k], a)).length
    if (onScore) onScore(score)
    else save(best(load(), id, score))
    setAnswers(all)
  }

  useEffect(() => {
    if (!seconds || done) return
    const t = setInterval(() => {
      const s = Math.max(0, Math.ceil((end - Date.now()) / 1000))
      setLeft(s)
      if (s === 0) submit([...answers, ...Array<string>(questions.length - answers.length).fill('')])
    }, 1000)
    return () => clearInterval(t)
    // submit only closes over props and the answers listed here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, done, end, answers])

  const back = (
    <a href={backHref} aria-label="رجوع" className={styles.back}>
      <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
        <path d="M12 5l7 7-7 7" />
      </svg>
    </a>
  )

  if (done) {
    const misses = questions.map((q, k) => k).filter((k) => !isRight(questions[k], answers[k]))
    const score = questions.length - misses.length
    return (
      <div className={styles.page}>
        <header className={styles.header}>{back}<span>النتيجة</span></header>
        <p className={styles.meta}>{title} · الاختبار</p>
        <div className={styles.score} dir="ltr">{score} / {questions.length}</div>
        <p>{misses.length === 0 ? 'ممتاز، أجبت عن كل الأسئلة بشكل صحيح' : 'أحسنت، راجع الأسئلة التي أخطأت فيها'}</p>
        {misses.length > 0 && <h2 className={styles.h2}>ما أخطأت فيه</h2>}
        {misses.map((k) => {
          const q = questions[k]
          const sent = reported.includes(k)
          const r = refs?.[k] ?? { lessonId: id, index: k }
          return (
            <section key={k} className={styles.miss}>
              <div className={styles.prompt}><Summary md={q.prompt} /></div>
              <div className={styles.wrong}>إجابتك: <Summary md={shown(q, answers[k])} /></div>
              <div className={styles.right}>الصحيح: <Summary md={correct(q)} /></div>
              <div className={styles.why}>لماذا: <Summary md={q.why} /></div>
              <button
                type="button"
                className={styles.report}
                disabled={sent}
                onClick={() => {
                  save(report(load(), { ...r, prompt: q.prompt, at: Date.now() }))
                  setReported([...reported, k])
                }}
              >
                {sent ?'تم الإبلاغ' : 'أبلغ عن خطأ'}
              </button>
            </section>
          )
        })}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.primary}
            onClick={() => {
              setI(0)
              setAnswers([])
              setPick('')
              setReported([])
              setEnd(Date.now() + (seconds ?? 0) * 1000)
              setLeft(seconds ?? 0)
            }}
          >
            أعد الاختبار
          </button>
          <a href={seconds ? backHref : '#/'} className={styles.secondary}>رجوع إلى الوحدة</a>
        </div>
      </div>
    )
  }

  const q = questions[i]
  const ready = pick !== '' && String(pick).trim() !== ''
  const confirm = () => {
    const next = [...answers, pick]
    if (next.length === questions.length) submit(next)
    else setAnswers(next)
    setI(i + 1)
    setPick('')
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        {back}
        <span>الاختبار</span>
        {seconds && <span className={styles.timer}><bdi dir="ltr">{Math.floor(left / 60)}:{String(left % 60).padStart(2, '0')}</bdi></span>}
      </header>
      <div className={styles.meta}>
        <span>السؤال {i + 1} من {questions.length}</span>
        <span>{title}</span>
      </div>
      <div className={styles.bar}>
        <div className={styles.fill} style={{ inlineSize: `${(i / questions.length) * 100}%` }} />
      </div>
      <div className={styles.prompt}><Summary md={q.prompt} /></div>
      {q.type === 'multiple-choice' ? (
        <div className={styles.choices}>
          {q.choices.map((c, k) => (
            <button
              key={k}
              type="button"
              aria-pressed={pick === k}
              className={pick === k ? styles.choiceOn : styles.choice}
              onClick={() => setPick(k)}
            >
              <Summary md={c.text} />
            </button>
          ))}
        </div>
      ) : (
        <input
          key={i}
          className={styles.input}
          inputMode="decimal"
          dir="ltr"
          aria-label="الإجابة"
          value={String(pick)}
          onChange={(e) => setPick(e.target.value)}
        />
      )}
      <button type="button" className={styles.primary} disabled={!ready} onClick={confirm}>تأكيد</button>
    </div>
  )
}
