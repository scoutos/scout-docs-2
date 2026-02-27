import { existsSync, readFileSync } from 'fs'
import { resolve } from 'path'

const base = resolve(process.cwd(), 'out/_pagefind')
const required = [
  'pagefind.js',
  'pagefind-entry.json',
  'wasm.en.pagefind'
]

const missing = required.filter(name => !existsSync(resolve(base, name)))

if (missing.length > 0) {
  console.error('Missing required Pagefind assets:', missing.join(', '))
  process.exit(1)
}

const entryPath = resolve(base, 'pagefind-entry.json')

try {
  const parsed = JSON.parse(readFileSync(entryPath, 'utf-8'))
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Invalid pagefind-entry.json content')
  }
} catch (error) {
  console.error('Invalid pagefind-entry.json:', error instanceof Error ? error.message : String(error))
  process.exit(1)
}

console.log('Pagefind index assets verified')
