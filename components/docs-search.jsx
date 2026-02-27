'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

let indexPromise

async function loadSearchIndex() {
  if (!indexPromise) {
    indexPromise = fetch('/search-index.json', { cache: 'no-store' }).then(async response => {
      if (!response.ok) {
        throw new Error(`Search index request failed (${response.status})`)
      }
      return response.json()
    })
  }

  return indexPromise
}

function normalize(value) {
  return value.toLowerCase().replace(/\s+/g, ' ').trim()
}

function createExcerpt(content, query) {
  const value = content || ''
  if (!value) return ''

  const lower = value.toLowerCase()
  const q = query.toLowerCase()
  const index = lower.indexOf(q)
  const start = index >= 0 ? Math.max(0, index - 70) : 0
  const end = Math.min(value.length, start + 180)
  const prefix = start > 0 ? '... ' : ''
  const suffix = end < value.length ? ' ...' : ''
  return `${prefix}${value.slice(start, end)}${suffix}`
}

function scoreDocument(doc, query, tokens) {
  const title = normalize(doc.title)
  const content = normalize(doc.content)
  const url = normalize(doc.url)

  let score = 0
  if (title === query) score += 240
  if (title.startsWith(query)) score += 120
  if (title.includes(query)) score += 90
  if (url.includes(query)) score += 55
  if (content.includes(query)) score += 26

  let matchedTokens = 0
  for (const token of tokens) {
    const inTitle = title.includes(token)
    const inContent = content.includes(token)
    const inUrl = url.includes(token)
    if (inTitle || inContent || inUrl) {
      matchedTokens += 1
      if (inTitle) score += 24
      if (inUrl) score += 12
      if (inContent) score += 5
    }
  }

  if (matchedTokens < tokens.length) {
    return -1
  }

  return score
}

export function DocsSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const rootRef = useRef(null)
  const inputRef = useRef(null)
  const searchRunRef = useRef(0)

  useEffect(() => {
    function onDocumentClick(event) {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('click', onDocumentClick)
    return () => document.removeEventListener('click', onDocumentClick)
  }, [])

  useEffect(() => {
    function onGlobalKeyDown(event) {
      const active = document.activeElement
      const targetIsInput =
        active instanceof HTMLInputElement ||
        active instanceof HTMLTextAreaElement ||
        active?.isContentEditable

      if (event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey && !targetIsInput) {
        event.preventDefault()
        inputRef.current?.focus()
        setOpen(true)
      }

      const isShortcut =
        (event.metaKey || event.ctrlKey) &&
        !event.shiftKey &&
        !event.altKey &&
        event.key.toLowerCase() === 'k'

      if (isShortcut) {
        event.preventDefault()
        inputRef.current?.focus()
        setOpen(true)
      }
    }

    window.addEventListener('keydown', onGlobalKeyDown)
    return () => window.removeEventListener('keydown', onGlobalKeyDown)
  }, [])

  useEffect(() => {
    const value = query.trim()
    const runId = searchRunRef.current + 1
    searchRunRef.current = runId

    if (value.length < 2) {
      setResults([])
      setError('')
      setLoading(false)
      setActiveIndex(-1)
      return
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true)
        setError('')

        const index = await loadSearchIndex()

        if (searchRunRef.current !== runId) return

        const normalizedQuery = normalize(value)
        const tokens = normalizedQuery.split(' ').filter(Boolean)

        const ranked = (index.documents || [])
          .map(doc => ({
            doc,
            score: scoreDocument(doc, normalizedQuery, tokens)
          }))
          .filter(item => item.score >= 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, 8)

        setResults(ranked.map(({ doc }) => ({
          id: doc.url,
          url: doc.url,
          title: doc.title,
          excerpt: createExcerpt(doc.content, normalizedQuery)
        })))
      } catch (err) {
        if (searchRunRef.current !== runId) return
        setResults([])
        setError(err instanceof Error ? err.message : 'Failed to load search index.')
      } finally {
        if (searchRunRef.current === runId) {
          setLoading(false)
        }
      }
    }, 140)

    return () => clearTimeout(timer)
  }, [query])

  function onKeyDown(event) {
    if (!open || !results.length) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex(prev => (prev + 1) % results.length)
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex(prev => (prev <= 0 ? results.length - 1 : prev - 1))
    }

    if (event.key === 'Enter' && activeIndex >= 0) {
      window.location.href = results[activeIndex].url
    }

    if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div className="docs-search" ref={rootRef}>
      <input
        ref={inputRef}
        type="search"
        className="docs-search-input"
        placeholder="Search documentation..."
        value={query}
        onChange={event => {
          setQuery(event.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        aria-label="Search documentation"
      />

      {open && (query.trim().length > 0 || loading || error) && (
        <div className="docs-search-panel" role="listbox" aria-label="Search results">
          {query.trim().length < 2 && !loading && !error && (
            <div className="docs-search-state">Type at least 2 characters</div>
          )}

          {loading && <div className="docs-search-state">Searching...</div>}

          {!loading && error && <div className="docs-search-state">Search unavailable right now.</div>}

          {!loading && !error && query.trim().length >= 2 && results.length === 0 && (
            <div className="docs-search-state">No results found.</div>
          )}

          {!loading && !error && results.length > 0 && (
            <ul className="docs-search-results">
              {results.map((result, index) => (
                <li key={result.id}>
                  <Link
                    href={result.url}
                    className={`docs-search-result ${index === activeIndex ? 'is-active' : ''}`}
                    onClick={() => setOpen(false)}
                  >
                    <span className="docs-search-title">{result.title}</span>
                    {result.excerpt ? <span className="docs-search-excerpt">{result.excerpt}</span> : null}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
