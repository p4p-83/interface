import { useRef, useCallback, useEffect, useState, type MouseEvent, type KeyboardEvent } from 'react'
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

  const [targetOffset, setTargetOffset] = useState<Position | null>(null)

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
          setTargetOffset((previousOffset) => {
            if (!previousOffset) return null
            return {
              x: previousOffset.x - action.payload.x,
              y: previousOffset.y - action.payload.y,
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

  // Auto-focus overlay
  const overlayRef = useCallback((overlayElement: HTMLDivElement) => {
    if (overlayElement) overlayElement.focus()
  }, [])

  if (hideOverlay || !overlaySize) return

  return (

    <>

      {/* Overlay */}
      <div
        ref={overlayRef}
        tabIndex={0}
        className='absolute cursor-crosshair focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1'
        style={{
          width: overlaySize.width,
          height: overlaySize.height,
        }}

        onMouseDown={(event: MouseEvent) => {
          const offset: Position = {
            x: (event.nativeEvent.offsetX / overlaySize.width),
            y: (event.nativeEvent.offsetY / overlaySize.height),
          }
          setTargetOffset(offset)

          console.info(`Clicked at (${offset.x}, ${offset.y})`)
          socket.sendTargetDeltas(webSocket, offset)
        }}

        // TODO: https://arc.net/l/quote/ruztcwya
        onKeyDown={(event: KeyboardEvent) => {
          if (!overlaySize) return

          console.info(`Key down for ${event.code} (${event.key})`)

          setTargetOffset((previousOffset) => {
            if (!previousOffset) {
              previousOffset = {
                x: 0.5,
                y: 0.5,
              }
            }

            const unclampedOffset = { ...previousOffset }
            switch (event.code) {

            case 'KeyS':
            case 'ArrowDown':
            case 'KeyJ':
              // TODO: non-literal
              unclampedOffset.y = previousOffset.y + 0.05
              break

            case 'KeyW':
            case 'ArrowUp':
            case 'KeyK':
              unclampedOffset.y = previousOffset.y - 0.05
              break

            case 'KeyA':
            case 'ArrowLeft':
            case 'KeyH':
              unclampedOffset.x = previousOffset.x - 0.05
              break

            case 'KeyD':
            case 'ArrowRight':
            case 'KeyL':
              unclampedOffset.x = previousOffset.x + 0.05
              break

            case 'KeyR':
              unclampedOffset.x = 0.5
              unclampedOffset.y = 0.5
              break

            }

            const clampedOffset = {
              x: Math.max(0, Math.min(1, unclampedOffset.x)),
              y: Math.max(0, Math.min(1, unclampedOffset.y)),
            }

            if ((clampedOffset.x === 0.5) && (clampedOffset.y === 0.5)) {
              console.log('Returning null')
              return null
            }

            return clampedOffset
          })

          // socket.sendTargetDeltas(webSocket, targetOffset)
        }}
      >

        {/* Target circle */}
        {(targetOffset) && (
          <div
            className='absolute opacity-75 bg-ring outline outline-1 outline-primary-foreground rounded-full pointer-events-none cursor-crosshair'
            style={{
              width: circleSize,
              height: circleSize,
              top: (targetOffset.y * overlaySize.height) - (circleSize / 2),
              left: (targetOffset.x * overlaySize.width) - (circleSize / 2),
            }}
          />
        )}

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
