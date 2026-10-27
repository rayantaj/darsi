import { renderToStaticMarkup } from 'react-dom/server'
import { expect, it } from 'vitest'
import Summary from './Summary.tsx'

it('renders $x^n$ as KaTeX and a ## line as a heading', () => {
  const html = renderToStaticMarkup(<Summary md={'## الفكرة\n\nقيمة $x^n$'} />)
  expect(html).toContain('class="katex"')
  expect(html).toMatch(/<h2[^>]*>الفكرة<\/h2>/)
})
