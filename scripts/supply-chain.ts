// T-143: supply-chain invariants for the workflow and the lockfile.

const SHA_REF = /^[0-9a-f]{40}$/

// Returns one message per `uses:` line that is not pinned to a full commit SHA.
export function floatingActions(workflow: string): string[] {
  const bad: string[] = []
  for (const line of workflow.split('\n')) {
    const m = line.match(/^\s*-?\s*uses:\s*(\S+)/)
    if (!m) continue
    const ref = m[1].split('@')[1] ?? ''
    if (!SHA_REF.test(ref)) bad.push(m[1])
  }
  return bad
}

// Lowest version that fixes the T-122 findings, per lockfile path.
export const MIN_FIXED: Record<string, string> = {
  'node_modules/vitest': '4.1.12',
  'node_modules/zod': '4.6.7',
  'node_modules/katex': '0.19.1',
  'node_modules/@typescript-eslint/typescript-estree/node_modules/minimatch': '11.0.4',
}

// Packages that must be gone from the lockfile (tinypool came in through vitest 3).
export const MUST_BE_ABSENT = ['node_modules/tinypool']

const parts = (v: string) => v.split('.').map(Number)

export function atLeast(version: string, min: string): boolean {
  const a = parts(version)
  const b = parts(min)
  for (let i = 0; i < 3; i++) {
    if ((a[i] ?? 0) !== (b[i] ?? 0)) return (a[i] ?? 0) > (b[i] ?? 0)
  }
  return true
}

// Returns one message per vulnerable or missing lockfile entry.
export function vulnerableLocks(lockJson: string): string[] {
  const packages = JSON.parse(lockJson).packages as Record<string, { version: string }>
  const bad: string[] = []
  for (const [path, min] of Object.entries(MIN_FIXED)) {
    const entry = packages[path]
    if (!entry) bad.push(`${path}: missing`)
    else if (!atLeast(entry.version, min)) bad.push(`${path}: ${entry.version} < ${min}`)
  }
  for (const path of MUST_BE_ABSENT) {
    if (packages[path]) bad.push(`${path}: still present (${packages[path].version})`)
  }
  return bad
}
