'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

let pagefindPromise

async function loadPagefind() {
  if (!pagefindPromise) {
    pagefindPromise = import(
      /* webpackIgnore: true */
      '/_pagefind/pagefind.js'
    ).then(async module => {
      await module.options({ baseUrl: '/' })
      return module
    })
  }

  return pagefindPromise
}

export function DocsSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const rootRef = useRef(null)
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

        const pagefind = await loadPagefind()
        const response = await pagefind.search(value)

        if (searchRunRef.current !== runId) return

        const topResults = response.results.slice(0, 8)
        const hydrated = await Promise.all(topResults.map(item => item.data()))

        if (searchRunRef.current !== runId) return

        setResults(
          hydrated.map(item => ({
            id: item.url,
            url: item.url,
            title: item.meta?.title || item.url,
            excerpt: item.excerpt || ''
          }))
        )
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
                    {result.excerpt ? (
                      <span
                        className="docs-search-excerpt"
                        dangerouslySetInnerHTML={{ __html: result.excerpt }}
                      />
                    ) : null}
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
