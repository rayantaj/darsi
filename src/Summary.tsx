import katex from 'katex'
import 'katex/dist/katex.min.css'
import styles from './Summary.module.css'

// Text with $latex$ pairs; each formula is an LTR island.
function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split(/\$([^$]+)\$/).map((part, i) =>
        i % 2 ? (
          <span
            key={i}
            dir="ltr"
            dangerouslySetInnerHTML={{ __html: katex.renderToString(part, { throwOnError: false }) }}
          />
        ) : (
          part
        ),
      )}
    </>
  )
}

// Supports only `## heading`, `- label: text` rows and paragraphs split by blank lines.
export default function Summary({ md }: { md: string }) {
  const out: JSX.Element[] = []
  let rules: string[] = []
  const flush = () => {
    if (!rules.length) return
    const rows = rules
    out.push(
      <div key={out.length} className={styles.card}>
        {rows.map((r, i) => {
          const at = r.indexOf(':')
          return (
            <div key={i} className={styles.rule}>
              <span className={styles.label}>{r.slice(0, at)}</span>
              <span className={styles.formula}>
                <Inline text={r.slice(at + 1).trim()} />
              </span>
            </div>
          )
        })}
      </div>,
    )
    rules = []
  }
  for (const line of md.split('\n').map((l) => l.trim())) {
    if (line.startsWith('- ') && line.includes(':')) rules.push(line.slice(2))
    else {
      flush()
      if (line.startsWith('## '))
        out.push(<h2 key={out.length} className={styles.h2}>{line.slice(3)}</h2>)
      else if (line)
        out.push(<p key={out.length} className={styles.p}><Inline text={line} /></p>)
    }
  }
  flush()
  return <div className={styles.summary}>{out}</div>
}
