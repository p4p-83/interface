import { useRef, useEffect, useState, RefObject } from 'react'
import useWebSocket from 'react-use-websocket'
import { toast } from 'sonner'

import { Size, Position } from './PlaceInterface'

type PlaceOverlayProps = {
  videoRef: RefObject<HTMLVideoElement | null>;
  socketUrl: string;
  circleSize: number;
}

export function PlaceOverlay({ videoRef, socketUrl, circleSize }: PlaceOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  const TOAST_IDS = {
    STATUS: 0,
    MESSAGE: 1,
    ERROR: 2,
  } as const

  // Unmount
  const didUnmount = useRef(false)
  useEffect(() => {
    console.log('Mounted')
    didUnmount.current = false
    return () => {
      console.log('Unmounted')
      didUnmount.current = true
    }
  }, [])

  const socket = useWebSocket(socketUrl, {
    onOpen: (event) => {
      console.log(event)
      toast.success('Socket opened!', {
        id: TOAST_IDS.STATUS,
        cancel: {
          label: 'Dismiss',
          onClick: () => null,
        },
        duration: 1000,
      })
    },
    onClose: (event) => {
      console.log(event)
      toast.info('Socket closed.', {
        id: TOAST_IDS.STATUS,
        cancel: {
          label: 'Dismiss',
          onClick: () => null,
        },
        duration: 1000,
      })
    },
    onMessage: (message) => {
      console.log(message)
      toast.message('Message received:', {
        id: TOAST_IDS.MESSAGE,
        description: (
          <pre className='mt-2 w-[320px] rounded-md bg-secondary text-secondary-foreground p-4'>
            <code className='text-secondary-foreground'>{
              JSON.stringify(message.data, null, 2)
            }</code>
          </pre>
        ),
        duration: 1000,
      })
    },
    onError: (error) => {
      console.error(error),
      toast.error('Socket error!', {
        id: TOAST_IDS.ERROR,
        cancel: {
          label: 'Dismiss',
          onClick: () => null,
        },
        duration: Infinity,
      })
    },
    retryOnError: true,
    shouldReconnect: (event) => {
      if (didUnmount.current) return false

      console.log('Reconnecting', event)
      toast.loading('Attempting to reconnect...', {
        id: TOAST_IDS.STATUS,
        cancel: {
          label: 'Dismiss',
          onClick: () => null,
        },
        duration: Infinity,
        important: true,
      })

      return true
    },
    reconnectAttempts: 5,
    onReconnectStop: () => {
      toast.error('Failed to connect to socket!', {
        id: TOAST_IDS.STATUS,
        cancel: {
          label: 'Dismiss',
          onClick: () => null,
        },
        duration: Infinity,
      })
    },
    heartbeat: true,
  })

  // Resize overlay
  const [overlaySize, setOverlaySize] = useState<Size | null>(null)
  useEffect(() => {
    if (!videoRef?.current) return

    const videoElement = videoRef.current

    const updateVideoBounds = () => {
      if (videoElement.videoWidth === 0 || videoElement.videoHeight === 0) {
        setOverlaySize(null)
        return
      }

      const scalingFactors = {
        width: videoElement.clientWidth / videoElement.videoWidth,
        height: videoElement.clientHeight / videoElement.videoHeight,
      }

      const limitingScalarFactor = (scalingFactors.width >= scalingFactors.height)
        // Black bars on the sides
        ? scalingFactors.height
        // Black bars on the top/bottom
        : scalingFactors.width

      setOverlaySize({
        width: limitingScalarFactor * videoElement.videoWidth,
        height: limitingScalarFactor * videoElement.videoHeight,
      })

      console.log(`Updated overlay to ${limitingScalarFactor * videoElement.videoWidth}x${limitingScalarFactor * videoElement.videoHeight}`)
    }

    window.addEventListener('resize', updateVideoBounds)
    videoElement.addEventListener('loadedmetadata', updateVideoBounds)

    return () => {
      window.removeEventListener('resize', updateVideoBounds)
      videoElement.removeEventListener('loadedmetadata', updateVideoBounds)
    }

  }, [videoRef])

  // Handle clicks
  const [clickPosition, setClickPosition] = useState<Position | null>(null)
  useEffect(() => {
    if (!overlayRef?.current) return

    const handleClick = (event: MouseEvent) => {
      if (!overlaySize) return

      setClickPosition({
        top: event.clientY,
        left: event.clientX,
      })

      const normalisedClick = {
        x: event.offsetX - (overlaySize.width / 2),
        y: event.offsetY - (overlaySize.height / 2),
      }

      console.info(`Clicked at (${event.offsetX}, ${event.offsetY}) -> (${normalisedClick.x}, ${normalisedClick.y})`)
      socket.sendMessage(`${normalisedClick.x},${normalisedClick.y}`)
    }

    // TODO: click position responsive to resize too?
    // or just assume that no resize while gantry is moving?
    // also—same video feed will give different coordinates depending on client size...

    // Added to the overlay, so the user cannot click out of bounds!
    const overlayElement = overlayRef.current
    overlayElement.addEventListener('click', handleClick)

    return () => {
      overlayElement.removeEventListener('click', handleClick)
    }

  }, [overlayRef, overlaySize, socket])

  return (

    <>

      {/* Click circle */}
      <div className='absolute opacity-75 bg-ring outline outline-1 outline-primary-foreground rounded-full pointer-events-none cursor-crosshair hidden' style={
        {
          width: `${circleSize}px`,
          height: `${circleSize}px`,
          top: (clickPosition) ? `${clickPosition.top - (circleSize / 2)}px` : '0',
          left: (clickPosition) ? `${clickPosition.left - (circleSize / 2)}px` : '0',
          display: (clickPosition) ? 'block' : 'none',
        }
      }
      />

      {/* Overlay */}
      <div ref={overlayRef} className='absolute cursor-crosshair' style={
        {
          width: (overlaySize) ? `${overlaySize.width}px` : '0',
          height: (overlaySize) ? `${overlaySize.height}px` : '0',
        }
      }
      />

    </>

  )
}
