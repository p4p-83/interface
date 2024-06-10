import { useRef, useEffect, useState, useCallback, RefObject } from 'react'
import useWebSocket from 'react-use-websocket'
import { toast } from 'sonner'

import { dismissButton } from '@/components/ui/sonner'

import { Size, Position } from './PlaceInterface'

type PlaceOverlayProps = {
  videoRef: RefObject<HTMLVideoElement | null>;
  socketUrl: string;
  circleSize: number;
}

export function PlaceOverlay({ videoRef, socketUrl, circleSize }: PlaceOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const didUnmount = useRef(false)

  const [overlaySize, setOverlaySize] = useState<Size | null>(null)
  const [clickPosition, setClickPosition] = useState<Position | null>(null)

  const TOAST_IDS = {
    STATUS: 0,
    MESSAGE: 1,
    ERROR: 2,
  } as const

  // Unmount
  useEffect(() => {
    console.log('Mounted')
    didUnmount.current = false
    return () => {
      console.log('Unmounted')
      didUnmount.current = true
    }
  }, [])

  // Socket
  const socket = useWebSocket(socketUrl,
    {

      onOpen: (event) => {
        console.log(event)
        toast.success('Socket opened!', {
          id: TOAST_IDS.STATUS,
          cancel: dismissButton,
          duration: 1000,
        })
      },

      onClose: (event) => {
        console.log(event)
        toast.info('Socket closed.', {
          id: TOAST_IDS.STATUS,
          cancel: dismissButton,
          duration: 1000,
        })
      },

      onMessage: async (message) => {
        console.log(message)

        const data = (message.data instanceof Blob)
          ? new Int16Array(await message.data.arrayBuffer())
          : message.data

        // if (data === 'ok') {
        //   setClickPosition(null)
        // }

        toast.message('Message received:', {
          id: TOAST_IDS.MESSAGE,
          description: (
            <pre className='mt-2 w-[320px] rounded-md bg-secondary text-secondary-foreground p-4'>
              <code className='text-secondary-foreground'>{
                JSON.stringify(data, null, 2)
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
          cancel: dismissButton,
          duration: Infinity,
        })
      },

      retryOnError: true,

      shouldReconnect: (event) => {
        if (didUnmount.current) return false

        console.log('Reconnecting', event)
        toast.loading('Attempting to reconnect...', {
          id: TOAST_IDS.STATUS,
          cancel: dismissButton,
          duration: Infinity,
          important: true,
        })

        return true
      },

      reconnectAttempts: 5,

      onReconnectStop: () => {
        toast.error('Failed to connect to socket!', {
          id: TOAST_IDS.STATUS,
          cancel: dismissButton,
          duration: Infinity,
          important: true,
        })
      },

      heartbeat: true,

    }
  )

  // Click delta messaging
  const sendClickDelta = useCallback(
    (eventPosition: Position) => {
      if (!overlaySize) return

      const INT16_CONSTANTS = {
        RANGE: 65535,
        MINIMUM: -32768,
        MAXIMUM: 32767,
      }

      /*
       * This normalises the delta -> the clicked target to be on a Int16 coordinate space that is
       * - Centred at (0, 0), which should reflect the present position of the head
       * - Maximally negative at -32,768
       * - Maximally positive at 32,767
       *
       * This is done to ensure that the delta information passed back to the controller via
       * the WebSocket is agnostic of both the client viewport and the streamed video size
       * In other words, the burden is left to the controller to map the Int16 delta into real camera pixels
      */
      const normalisedDelta = {
        x: Math.floor((eventPosition.y - (overlaySize.width / 2)) * (INT16_CONSTANTS.RANGE / overlaySize.width)),
        y: Math.floor((eventPosition.x - (overlaySize.height / 2)) * (INT16_CONSTANTS.RANGE / overlaySize.height)),
      }

      normalisedDelta.x = Math.max(INT16_CONSTANTS.MINIMUM, Math.min(INT16_CONSTANTS.MAXIMUM, normalisedDelta.x))
      normalisedDelta.y = Math.max(INT16_CONSTANTS.MINIMUM, Math.min(INT16_CONSTANTS.MAXIMUM, normalisedDelta.y))

      console.info(`Clicked at (${eventPosition.y}, ${eventPosition.x}) -> (${normalisedDelta.x}, ${normalisedDelta.y})`)
      socket.sendMessage(new Int16Array([normalisedDelta.x, normalisedDelta.y]))
    },
    [socket, overlaySize]
  )

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

  // Handle clicks
  useEffect(() => {
    if (!overlayRef?.current) return

    const overlayElement = overlayRef.current

    const handleClick = (event: MouseEvent) => {
      setClickPosition({
        x: event.clientY,
        y: event.clientX,
      })

      sendClickDelta({
        x: event.offsetY,
        y: event.offsetX,
      })
    }

    // Added to the overlay, so the user cannot click out of bounds!
    overlayElement.addEventListener('mousedown', handleClick)

    return () => {
      overlayElement.removeEventListener('mousedown', handleClick)
    }

  }, [overlayRef, sendClickDelta])

  // Clear clicks on resize
  useEffect(() => {
    if (!videoRef?.current) return
    const videoElement = videoRef.current

    const clearClickPosition = () => setClickPosition(null)

    window.addEventListener('resize', clearClickPosition)
    videoElement.addEventListener('loadedmetadata', clearClickPosition)

    return () => {
      window.removeEventListener('resize', clearClickPosition)
      videoElement.removeEventListener('loadedmetadata', clearClickPosition)
    }

  }, [videoRef])

  return (

    <>

      {/* Click circle */}
      <div className='absolute opacity-75 bg-ring outline outline-1 outline-primary-foreground rounded-full pointer-events-none cursor-crosshair hidden' style={
        {
          width: `${circleSize}px`,
          height: `${circleSize}px`,
          top: (clickPosition) ? `${clickPosition.x - (circleSize / 2)}px` : '0',
          left: (clickPosition) ? `${clickPosition.y - (circleSize / 2)}px` : '0',
          display: (clickPosition) ? 'block' : 'none',
        }
      }/>

      {/* Overlay */}
      <div ref={overlayRef} className='absolute cursor-crosshair' style={
        {
          width: (overlaySize) ? `${overlaySize.width}px` : '0',
          height: (overlaySize) ? `${overlaySize.height}px` : '0',
        }
      }>

        {/* Centre circle */}
        <div className='relative opacity-50 bg-secondary outline outline-1 outline-secondary-foreground rounded-full pointer-events-none cursor-crosshair hidden' style={
          {
            width: `${circleSize}px`,
            height: `${circleSize}px`,
            top: (overlaySize) ? `${(overlaySize.height / 2) - (circleSize / 2)}px` : '0',
            left: (overlaySize) ? `${(overlaySize.width / 2) - (circleSize / 2)}px` : '0',
            display: (overlaySize) ? 'block' : 'none',
          }
        }/>

      </div>

    </>

  )
}
