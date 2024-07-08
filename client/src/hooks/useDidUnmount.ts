import { useEffect, useRef } from 'react'

type UseDidUnmountProps = {
  onUnmount?: () => void;
}

export function useDidUnmount(props?: UseDidUnmountProps) {
  const { onUnmount } = props ?? {}

  const didUnmount = useRef(false)

  useEffect(() => {
    didUnmount.current = false
    return () => {
      didUnmount.current = true
      onUnmount?.()
    }
  }, [onUnmount])

  return didUnmount
}