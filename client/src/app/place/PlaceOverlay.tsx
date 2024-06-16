import { useRef, useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import { toast } from 'sonner'

import * as socket from '@/lib/socket'

import { ToastIds, DISMISS_BUTTON } from '@/components/ui/sonner'

import { Size, Position } from './PlaceInterface'

type PlaceOverlayProps = {
  socketUrl: string;
  overlaySize: Size | null;
  circleSize: number;
  hideOverlay?: boolean;
}

export function PlaceOverlay({ socketUrl, overlaySize, circleSize, hideOverlay = false }: PlaceOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const didUnmount = useRef(false)

  const [overlayTargetPosition, setOverlayTargetPosition] = useState<Position | null>(null)

  // Unmount
  useEffect(() => {
    didUnmount.current = false
    return () => {
      didUnmount.current = true
    }
  }, [])

  // WebSocket
  const webSocket = useWebSocket(socketUrl,
    {

      onOpen: (event) => {
        console.log(event)

        socket.sendHeartbeat(webSocket)

        toast.success('Socket opened!', {
          id: ToastIds.SOCKET_STATUS,
          cancel: DISMISS_BUTTON,
          duration: 1000,
        })
      },

      onClose: (event) => {
        console.log(event)
        toast.info('Socket closed.', {
          id: ToastIds.SOCKET_STATUS,
          cancel: DISMISS_BUTTON,
          duration: 1000,
        })
      },

      onMessage: async (message) => {
        console.log(message)

        const action = await socket.processMessage(message.data)
        console.log({ action })

        switch (action.actionType) {

        case 'MOVE_TARGET':
          if (!overlaySize) break
          const overlayDeltas = socket.denormaliseOverlayDeltas(action.payload, overlaySize)
          setOverlayTargetPosition((previousPosition) => {
            if (!previousPosition) return null
            return {
              x: previousPosition.x - overlayDeltas.x,
              y: previousPosition.y - overlayDeltas.y,
            }
          })
          break

        }

        if (action.silent) return
        toast.message(`Message received (${action.messageType}):`, {
          id: ToastIds.MESSAGE,
          className: 'pointer-events-none',
          description: (
            <pre className='mt-2'>
              <code className='w-[320px] block rounded-md p-4 bg-secondary text-secondary-foreground'>
                {String(action.rawPayload)}
              </code>
              {
                ('payload' in action)
                  ? (
                    <code className='w-[320px] mt-2 block rounded-md p-4 bg-secondary text-secondary-foreground'>
                      {JSON.stringify(action.payload, null, 2)}
                    </code>
                  ) : null
              }
            </pre>
          ),
          duration: 1000,
        })

      },

      onError: (error) => {
        console.error(error)
        toast.error('Socket error!', {
          id: ToastIds.SOCKET_ERROR,
          cancel: DISMISS_BUTTON,
          duration: Infinity,
        })
      },

      retryOnError: true,

      shouldReconnect: (event) => {
        if (didUnmount.current) return false

        console.log('Reconnecting', event)
        toast.loading('Attempting to reconnect...', {
          id: ToastIds.SOCKET_STATUS,
          cancel: DISMISS_BUTTON,
          duration: Infinity,
          important: true,
        })

        return true
      },

      reconnectAttempts: 5,

      onReconnectStop: () => {
        toast.error('Failed to connect to socket!', {
          id: ToastIds.SOCKET_STATUS,
          cancel: DISMISS_BUTTON,
          duration: Infinity,
          important: true,
        })
      },

      heartbeat: {
        /*
         * This is _somewhat_ nasty.
         * This is necessary because HeartbeatOptions is typed to only accept strings,
         * although the implementation is written to completely support binary types too.
         ! The caveat is that returnMessage won't work.
         ! That checks by reference, which won't work for my Uint8Array.
         */
        message: socket.getHeartbeatMessage() as unknown as string,
      },

    }
  )

  // Handle clicks
  useEffect(() => {
    if (!overlayRef?.current) return
    const overlayElement = overlayRef.current

    function handleClick(event: MouseEvent) {
      if (!overlaySize) return

      setOverlayTargetPosition({
        x: event.clientX,
        y: event.clientY,
      })

      const targetPosition: Position = {
        x: event.offsetX,
        y: event.offsetY,
      }
      console.info(`Clicked at (${targetPosition.x}, ${targetPosition.y})`)
      socket.sendTargetDeltas(webSocket, targetPosition, overlaySize)
    }

    // Added to the overlay, so the user cannot click out of bounds!
    overlayElement.addEventListener('mousedown', handleClick)

    return () => {
      overlayElement.removeEventListener('mousedown', handleClick)
    }
  }, [overlaySize, webSocket])

  // Handle keyboard input
  useEffect(() => {
    // TODO: https://arc.net/l/quote/ruztcwya
    if (!overlayRef?.current) return
    const overlayElement = overlayRef.current

    overlayElement.focus()

    function handleKeydown(event: KeyboardEvent) {
      if (!overlaySize) return

      console.info(`Keydown for ${event.code} (${event.key})`)

      setOverlayTargetPosition((previousPosition) => {
        if (!previousPosition) {
          previousPosition = {
            x: (overlayElement.offsetLeft + overlayElement.clientLeft) + (overlaySize.width / 2),
            y: (overlayElement.offsetTop + overlayElement.clientTop) + (overlaySize.height / 2),
          }
        }

        // TODO: make sure cannot exceed overlay bounds
        switch (event.code) {
        case 'KeyS':
        case 'ArrowDown':
          return {
            x: previousPosition.x,
            // TODO: non-literal
            y: previousPosition.y + 50,
          }
        case 'KeyW':
        case 'ArrowUp':
          return {
            x: previousPosition.x,
            y: previousPosition.y - 50,
          }
        case 'KeyA':
        case 'ArrowLeft':
          return {
            x: previousPosition.x - 50,
            y: previousPosition.y,
          }
        case 'KeyD':
        case 'ArrowRight':
          return {
            x: previousPosition.x + 50,
            y: previousPosition.y,
          }

        default:
          return {
            x: previousPosition.x,
            y: previousPosition.y,
          }
        }
      })

      // socket.sendTargetDeltas(webSocket, targetPosition, overlaySize)
    }

    overlayElement.addEventListener('keydown', handleKeydown)

    return () => {
      overlayElement.removeEventListener('keydown', handleKeydown)
    }
  }, [overlaySize])

  // Clear target on resize
  const [lastOverlaySize, setLastOverlaySize] = useState(overlaySize)
  if ((overlaySize?.width !== lastOverlaySize?.width) || (overlaySize?.height !== lastOverlaySize?.height)) {
    setLastOverlaySize(overlaySize)
    setOverlayTargetPosition(null)
  }
  useEffect(() => {
    function clearOverlayTargetPosition() {
      setOverlayTargetPosition(null)
    }
    window.addEventListener('resize', clearOverlayTargetPosition)
    return () => {
      window.removeEventListener('resize', clearOverlayTargetPosition)
    }
  }, [])

  if (hideOverlay || !overlaySize) return

  return (

    <>

      {/* Click circle */}
      {(overlayTargetPosition) && (
        <div
          className='absolute opacity-75 bg-ring outline outline-1 outline-primary-foreground rounded-full pointer-events-none cursor-crosshair'
          style={{
            width: circleSize,
            height: circleSize,
            top: overlayTargetPosition.y - (circleSize / 2),
            left: overlayTargetPosition.x - (circleSize / 2),
          }}
        />
      )}

      {/* Overlay */}
      <div
        ref={overlayRef}
        tabIndex={0}
        className='absolute cursor-crosshair'
        style={{
          width: overlaySize.width,
          height: overlaySize.height,
        }}
      >
        {/* Centre circle */}
        <div
          className='relative opacity-50 bg-secondary outline outline-1 outline-secondary-foreground rounded-full pointer-events-none cursor-crosshair'
          style={{
            width: circleSize,
            height: circleSize,
            top: (overlaySize.height / 2) - (circleSize / 2),
            left: (overlaySize.width / 2) - (circleSize / 2),
          }}
        />
      </div>

    </>
  )
}
