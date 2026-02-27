import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { resolve, relative, sep } from 'path'

const CONTENT_DIR = resolve(process.cwd(), 'content')
const OUTPUT_FILE = resolve(process.cwd(), 'public/search-index.json')

function walk(dir) {
  const files = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = resolve(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...walk(full))
      continue
    }
    if (!entry.isFile()) continue
    if (!entry.name.endsWith('.mdx') && !entry.name.endsWith('.md')) continue
    files.push(full)
  }
  return files
}

function pathToUrl(filePath) {
  const rel = relative(CONTENT_DIR, filePath).split(sep).join('/')
  const noExt = rel.replace(/\.(mdx|md)$/i, '')
  if (noExt === 'index') return '/'
  if (noExt.endsWith('/index')) {
    return `/${noExt.slice(0, -6)}`
  }
  return `/${noExt}`
}

function extractTitle(raw, fallback) {
  const match = raw.match(/^#\s+(.+)$/m)
  if (match) return match[1].trim()
  return fallback
}

function cleanupMarkdown(raw) {
  return raw
    .replace(/^---[\s\S]*?---\s*/m, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]+`/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[[^\]]+\]\([^)]*\)/g, '$1')
    .replace(/[#>*_~|-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const docs = walk(CONTENT_DIR).map(filePath => {
  const raw = readFileSync(filePath, 'utf-8')
  const url = pathToUrl(filePath)
  const fallbackTitle = url === '/' ? 'Home' : url.split('/').filter(Boolean).pop().replace(/-/g, ' ')
  const title = extractTitle(raw, fallbackTitle)
  const content = cleanupMarkdown(raw).slice(0, 12000)

  return {
    url,
    title,
    content
  }
})

writeFileSync(
  OUTPUT_FILE,
  JSON.stringify({
    generatedAt: new Date().toISOString(),
    documents: docs
  })
)

console.log(`Search index generated: ${docs.length} documents`)
