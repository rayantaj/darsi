import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { floatingActions, vulnerableLocks } from './supply-chain.ts'

const read = (p: string) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8')

// The workflow as it was on main before T-143.
const originalWorkflow = `
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
      - uses: actions/deploy-pages@v4
`

// The vulnerable lock entries from main before T-143.
const originalLock = JSON.stringify({
  packages: {
    'node_modules/vitest': { version: '3.2.7' },
    'node_modules/tinypool': { version: '1.1.1' },
    'node_modules/zod': { version: '3.25.76' },
    'node_modules/katex': { version: '0.16.47' },
    'node_modules/@typescript-eslint/typescript-estree/node_modules/minimatch': {
      version: '10.2.6',
    },
  },
})

describe('Actions pinning', () => {
  it('rejects the original floating references', () => {
    expect(floatingActions(originalWorkflow)).toHaveLength(5)
  })

  it('accepts the real workflow', () => {
    expect(floatingActions(read('.github/workflows/pages.yml'))).toEqual([])
  })
})

describe('dependency advisories', () => {
  it('rejects the original lockfile entries', () => {
    expect(vulnerableLocks(originalLock)).toHaveLength(5)
  })

  it('accepts the real lockfile', () => {
    expect(vulnerableLocks(read('package-lock.json'))).toEqual([])
  })
})
