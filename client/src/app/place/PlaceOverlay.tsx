import { useRef, useEffect, useState, RefObject } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

import { Size, Position } from './PlaceInterface'

const SOCKET_STATUS_MAP = {
  [ReadyState.CONNECTING]: 'Connecting',
  [ReadyState.OPEN]: 'Open',
  [ReadyState.CLOSING]: 'Closing',
  [ReadyState.CLOSED]: 'Closed',
  [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
} as const

type PlaceOverlayProps = {
  videoRef: RefObject<HTMLVideoElement | null>;
  socketUrl: string;
  circleSize: number;
}

export function PlaceOverlay({ videoRef, socketUrl, circleSize }: PlaceOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  const socket = useWebSocket(socketUrl,
    {
      onOpen: () => console.log('opened'),
      onClose: () => console.log('closed'),
      onMessage: (message) => console.log(message),
      onError: (error) => console.log(error),
      retryOnError: true,
      heartbeat: true,
      // Will attempt to reconnect on all close events, such as server shutting down
      shouldReconnect: (event) => {
        console.log(event)
        return true
      },
      reconnectAttempts: 5,
    }
  )

  const [overlaySize, setOverlaySize] = useState<Size | null>(null)
  // Resize overlay
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

  const [clickPosition, setClickPosition] = useState<Position | null>(null)
  // Handle clicks
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
      console.info(SOCKET_STATUS_MAP[socket.readyState])
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
