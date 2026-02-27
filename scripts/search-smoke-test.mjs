const baseUrl = (process.argv[2] || 'https://scout-docs.onhyper.io').replace(/\/$/, '')
const query = (process.argv[3] || 'quick start').toLowerCase().trim()

if (!query) {
  console.error('Query must not be empty')
  process.exit(1)
}

const indexUrl = `${baseUrl}/search-index.json`
const response = await fetch(indexUrl, { cache: 'no-store' })

if (!response.ok) {
  console.error(`Search index fetch failed: ${response.status} ${response.statusText}`)
  process.exit(1)
}

const payload = await response.json()
const docs = Array.isArray(payload.documents) ? payload.documents : []

if (docs.length === 0) {
  console.error('Search index contains no documents')
  process.exit(1)
}

const tokens = query.split(/\s+/).filter(Boolean)

const matches = docs.filter(doc => {
  const title = String(doc.title || '').toLowerCase()
  const content = String(doc.content || '').toLowerCase()
  const url = String(doc.url || '').toLowerCase()
  return tokens.every(token => title.includes(token) || content.includes(token) || url.includes(token))
})

if (matches.length === 0) {
  console.error(`No documents matched query: "${query}"`)
  process.exit(1)
}

console.log(`Search smoke test passed: ${matches.length} matches for "${query}" at ${baseUrl}`)
