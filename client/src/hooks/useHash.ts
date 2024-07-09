'use client'

import { useState, useEffect, useCallback } from 'react'

function getHash() {
  return (typeof window !== 'undefined')
    ? decodeURIComponent(window.location.hash)
    : ''
}

export function useHash() {
  const [hash, setHash] = useState(getHash())
  const [isClient, setIsClient] = useState(false)

  const hashChangeHandler = useCallback(() => setHash(getHash()), [setHash])

  useEffect(() => {
    setIsClient(true)
    hashChangeHandler()
    window.addEventListener('hashchange', hashChangeHandler)
    return () => {
      window.removeEventListener('hashchange', hashChangeHandler)
    }
  }, [hashChangeHandler])

  return (isClient)
    ? hash
    : ''
}