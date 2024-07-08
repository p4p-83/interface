import { useEffect, useState } from 'react'

type UseKeyPressesProps = {
	onKeyDown?: (event: KeyboardEvent) => void;
	onKeyUp?: (event: KeyboardEvent) => void;
}

export function useKeyPresses(props?: UseKeyPressesProps) {
  const { onKeyDown, onKeyUp } = props ?? {}

  const [isShiftPressed, setIsShiftPressed] = useState(false)
  const [isOptionPressed, setIsOptionPressed] = useState(false)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      console.info(`Key down for ${event.code} (${event.key})`, event)
      setIsShiftPressed(event.shiftKey)
      setIsOptionPressed(event.altKey)
      onKeyDown?.(event)
    }

    function handleKeyUp(event: KeyboardEvent) {
      console.info(`Key up for ${event.code} (${event.key})`, event)
      setIsShiftPressed(event.shiftKey)
      setIsOptionPressed(event.altKey)
      onKeyUp?.(event)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [onKeyDown, onKeyUp])

  return {
    isShiftPressed,
    isOptionPressed,
  } as const
}