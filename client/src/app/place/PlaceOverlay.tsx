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
  const didUnmount = useRef(false)

  const [targetOffset, setTargetOffset] = useState<Position | null>(null)
  const [targetPositionOffsets, setTargetPositionOffsets] = useState<Position[] | null>([
    {
      'x': 0.09790188448920424,
      'y': 0.9416189822232395,
    },
    {
      'x': 0.24185549706263829,
      'y': 0.9050278477149615,
    },
    {
      'x': 0.8876020447089341,
      'y': 0.8755168993667506,
    },
    {
      'x': 0.7434653238727398,
      'y': 0.4303349355306325,
    },
    {
      'x': 0.1125810635538262,
      'y': 0.5462272068360418,
    },
    {
      'x': 0.15208667124437322,
      'y': 0.37766079194323643,
    },
    {
      'x': 0.5499656672007325,
      'y': 0.5133745326924544,
    },
    {
      'x': 0.925963225757229,
      'y': 0.7672541390096895,
    },
    {
      'x': 0.5512626840619517,
      'y': 0.558434424353399,
    },
    {
      'x': 0.4457770656900893,
      'y': 0.7488212405584802,
    },
    {
      'x': 0.9060502021820401,
      'y': 0.03494316014343481,
    },
    {
      'x': 0.7314259555962462,
      'y': 0.05574120698863203,
    },
    {
      'x': 0.5562523842221714,
      'y': 0.3819943541618982,
    },
    {
      'x': 0.30038910505836575,
      'y': 0.5775082017242694,
    },
    {
      'x': 0.4777904936293584,
      'y': 0.43222705424582286,
    },
    {
      'x': 0.30475318532082096,
      'y': 0.2430304417486839,
    },
    {
      'x': 0.1262073701075761,
      'y': 0.24333562218661783,
    },
    {
      'x': 0.12397955291065843,
      'y': 0.3066453040360113,
    },
    {
      'x': 0.7494621194781415,
      'y': 0.028595407034409093,
    },
    {
      'x': 0.7555809872587167,
      'y': 0.5491416800183109,
    },
    {
      'x': 0.8394750896467537,
      'y': 0.684290836957351,
    },
    {
      'x': 0.03205920500495918,
      'y': 0.861326009002823,
    },
    {
      'x': 0.8349889372091249,
      'y': 0.7737087052719921,
    },
    {
      'x': 0.5819943541618983,
      'y': 0.4532539864194705,
    },
  ])

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
        console.log({ message })

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

        case 'DRAW_TARGETS':
          setTargetPositionOffsets(action.payload)
          break

        case 'NO_OPERATION':
          break

        }

        if (action.silent) return

        toast.message(`Message received (${action.messageType}):`, {
          id: ToastIds.MESSAGE,
          description: (
            <pre className='mt-2'>
              <code className='w-[320px] block rounded-md p-4 bg-secondary text-secondary-foreground text-wrap'>
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

          console.info(`Key down for ${event.code} (${event.key}) [${event.shiftKey}]`)

          /*
           * Direction will jump to the nearest target in the specified direction
           * Shift+Direction will cause the gantry to step a fixed distance in the specified direction
           */

          const previousOffset = targetOffset ?? { x:0.5, y:0.5 }

          if (event.shiftKey) {

            const unclampedOffset = { ...previousOffset }
            switch (event.code) {
            case 'KeyS':
            case 'ArrowDown':
            case 'KeyJ':
              // TODO: non-literal
              unclampedOffset.y = previousOffset.y + 0.05
              socket.sendGantryStep(webSocket, socket.GantryDirection.TOWARDS_Y_MIN)
              break
            case 'KeyW':
            case 'ArrowUp':
            case 'KeyK':
              unclampedOffset.y = previousOffset.y - 0.05
              socket.sendGantryStep(webSocket, socket.GantryDirection.TOWARDS_Y_MAX)
              break
            case 'KeyA':
            case 'ArrowLeft':
            case 'KeyH':
              unclampedOffset.x = previousOffset.x - 0.05
              socket.sendGantryStep(webSocket, socket.GantryDirection.TOWARDS_X_MAX)
              break
            case 'KeyD':
            case 'ArrowRight':
            case 'KeyL':
              unclampedOffset.x = previousOffset.x + 0.05
              socket.sendGantryStep(webSocket, socket.GantryDirection.TOWARDS_X_MAX)
              break
            case 'KeyR':
              unclampedOffset.x = 0.5
              unclampedOffset.y = 0.5
              socket.sendGantryStep(webSocket, socket.GantryDirection.ZERO)
              break
            default:
              return
            }

            const clampedOffset = {
              x: Math.max(0, Math.min(1, unclampedOffset.x)),
              y: Math.max(0, Math.min(1, unclampedOffset.y)),
            }

            if ((clampedOffset.x === 0.5) && (clampedOffset.y === 0.5)) {
              console.log('Setting null')
              setTargetOffset(null)
            }
            else {
              setTargetOffset(clampedOffset)
              socket.sendTargetDeltas(webSocket, clampedOffset)
            }

          }
          else {

            if (!targetPositionOffsets?.length) return

            const getSortingFunction = (searchAngleDegrees: number) => (targetPosition: Position) => {
              const targetDeltas = {
                x: (targetPosition.x - previousOffset.x),
                y: (targetPosition.y - previousOffset.y),
              }
              const radius = Math.hypot(targetDeltas.x, targetDeltas.y)
              let angleRadians = -Math.atan2(targetDeltas.y, targetDeltas.x)
              if (angleRadians < 0) {
                angleRadians += 2 * Math.PI
              }

              const angleFactor = ((angleRadians - (searchAngleDegrees * Math.PI / 180)) ** 2) + 1

              // console.log({
              //   x: targetDeltas.x,
              //   radius,
              //   angle: angleRadians * 180 / Math.PI,
              //   angleFactor,
              //   searchAngle: searchAngleDegrees,
              //   result: radius * angleFactor,
              // })

              return (radius * angleFactor)
            }

            let filterPredicate: (value: Position) => boolean
            let searchAngleDegrees: number
            switch (event.code) {
            case 'KeyS':
            case 'ArrowDown':
            case 'KeyJ':
              filterPredicate = (value) => value.y > previousOffset.y
              searchAngleDegrees = 270
              break
            case 'KeyW':
            case 'ArrowUp':
            case 'KeyK':
              filterPredicate = (value) => value.y < previousOffset.y
              searchAngleDegrees = 90
              break
            case 'KeyA':
            case 'ArrowLeft':
            case 'KeyH':
              filterPredicate = (value) => value.x < previousOffset.x
              searchAngleDegrees = 180
              break
            case 'KeyD':
            case 'ArrowRight':
            case 'KeyL':
              filterPredicate = (value) => value.x > previousOffset.x
              searchAngleDegrees = 0
              break
            case 'KeyR':
              setTargetOffset(null)
              return
            case 'Space':
              targetOffset && socket.sendTargetDeltas(webSocket, targetOffset)
              return
            default:
              return
            }

            // Find nearest target
            // This is done like this for TypeScript to ensure all paths assign searchAngleDegrees
            const sortingFunction = getSortingFunction(searchAngleDegrees)

            const nearestTargetOffset = targetPositionOffsets
              .filter(filterPredicate)
              .toSorted((a, b) => sortingFunction(a) - sortingFunction(b))
              [0]

            if (!nearestTargetOffset) {
              console.info('No target found')
              return
            }

            // Go there
            console.info('Found: ', nearestTargetOffset)
            setTargetOffset(nearestTargetOffset)

          }
        }}
      >

        {/* Target circle */}
        {(targetOffset) && (
          <div
            className='absolute z-50 opacity-75 bg-ring outline outline-1 outline-primary-foreground rounded-full pointer-events-none cursor-crosshair'
            style={{
              width: circleSize,
              height: circleSize,
              top: (targetOffset.y * overlaySize.height) - (circleSize / 2),
              left: (targetOffset.x * overlaySize.width) - (circleSize / 2),
            }}
          />
        )}

        {/* Target positions */}
        {(targetPositionOffsets?.length) && targetPositionOffsets.map((position, index) => (
          <div
            key={index}
            className='absolute z-0 opacity-25 bg-accent-foreground outline outline-1 outline-accent rounded-none cursor-pointer'
            onMouseDown={(event: MouseEvent) => {
              console.info(`Clicked target at position (${position.x}, ${position.y})`)
              event.stopPropagation()
              setTargetOffset(position)
              socket.sendTargetDeltas(webSocket, position)
            }}
            style={{
              width: circleSize,
              height: circleSize,
              top: (position.y * overlaySize.height) - (circleSize / 2),
              left: (position.x * overlaySize.width) - (circleSize / 2),
            }}
          />
        ))}

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
