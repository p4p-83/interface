import { useEffect, useState } from 'react'

type UseKeyPressesProps = {
	onKeyDown?: (event: KeyboardEvent) => void;
	onKeyUp?: (event: KeyboardEvent) => void;
  includeInputElements?: boolean;
}

export function useKeyPresses(props?: UseKeyPressesProps) {
  const { onKeyDown, onKeyUp, includeInputElements } = props ?? {}

  const [isShiftPressed, setIsShiftPressed] = useState(false)
  const [isOptionPressed, setIsOptionPressed] = useState(false)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!includeInputElements && isInputEvent(event)) {
        console.info(`Ignored input key down for ${event.code} (${event.key})`, event)
        return
      }

      console.info(`Key down for ${event.code} (${event.key})`, event)
      setIsShiftPressed(event.shiftKey)
      setIsOptionPressed(event.altKey)
      onKeyDown?.(event)
    }

    function handleKeyUp(event: KeyboardEvent) {
      if (!includeInputElements && isInputEvent(event)) {
        console.info(`Ignored input key up for ${event.code} (${event.key})`, event)
        return
      }

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
  }, [onKeyDown, onKeyUp, includeInputElements])

  return {
    isShiftPressed,
    isOptionPressed,
  } as const
}

const INPUT_TAGS = ['input', 'textarea']
function isInputEvent(event: KeyboardEvent) {
  return (
    (event.target instanceof Element) && INPUT_TAGS.includes(event.target.tagName.toLowerCase())
  )
}