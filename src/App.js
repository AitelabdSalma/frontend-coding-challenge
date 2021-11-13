import React, { useState, useRef, useCallback, useEffect } from 'react'
import useRepositorySearch from './useRepositorySearch'

export default function App() {
  const [pageNumber, setPageNumber] = useState(1)

  const {
    repositories,
    hasMore,
    loading,
    error
  } = useRepositorySearch(pageNumber)

  const observer = useRef()
  const lastRepositoryElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  useEffect(() => {
    setPageNumber(1)
  }, [])

  return (
    <>
      {repositories.map((repository, index) => {
        if (repositories.length === index + 1) {
          return <div ref={lastRepositoryElementRef} key={repository}>{repository}</div>
        } else {
          return <div key={repository}>{repository}</div>
        }
      })}
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </>
  )
}

