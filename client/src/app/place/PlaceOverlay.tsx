import { useCallback, useRef, useState, useEffect, type MouseEvent, type KeyboardEvent } from 'react'
import useWebSocket from 'react-use-websocket'
import { toast } from 'sonner'

import { ToastIds, DISMISS_BUTTON } from '@/components/ui/sonner'
import { useDidUnmount } from '@/hooks/useDidUnmount'
import * as socket from '@/lib/socket'
import { cn } from '@/lib/utils'

import { Size, Position, MachineState } from './PlaceInterface'

type PlaceOverlayProps = {
  socketUrl: string;
  overlaySize: Size | null;
  circleSize: number;
  hideOverlay?: boolean;
}

enum PlaceStates {
  AWAIT_SOCKET,
  MOVE_TO_COMPONENT,
  PICK_COMPONENT,
  MOVE_TO_PAD,
  PLACE_COMPONENT,
}

export function PlaceOverlay({ socketUrl, overlaySize, circleSize, hideOverlay = false }: PlaceOverlayProps) {
  const dismissStatusOnUnmount = useRef(false)

  const [targetOffset, setTargetOffset] = useState<Position | null>(null)
  const [targetPositionOffsets, setTargetPositionOffsets] = useState<Position[] | null>(null)
  const [currentState, setCurrentState] = useState<PlaceStates>(PlaceStates.AWAIT_SOCKET)
  const [currentMachineState, setCurrentMachineState] = useState<MachineState | null>({
    gantryPosition: { x: 1, y: 2 },
    isHeadDown: true,
    isVacuumEngaged: false,
    isComponentPicked: false,
  })

  const didUnmount = useDidUnmount({
    onUnmount: useCallback(() => {
      if (!dismissStatusOnUnmount.current) return
      toast.dismiss(ToastIds.SOCKET_STATUS)
      dismissStatusOnUnmount.current = false
    }, [dismissStatusOnUnmount]),
  })

  // WebSocket
  const webSocket = useWebSocket(socketUrl,
    {

      onOpen: (event) => {
        console.log('Socket opened: ', event)

        socket.sendHeartbeat(webSocket)

        dismissStatusOnUnmount.current = false
        toast.success('Socket opened!', {
          id: ToastIds.SOCKET_STATUS,
          cancel: DISMISS_BUTTON,
          duration: 1000,
        })

        setCurrentState(PlaceStates.MOVE_TO_COMPONENT)
      },

      onClose: (event) => {
        console.log('Socket closed: ', event)
        dismissStatusOnUnmount.current = false
        toast.info('Socket closed.', {
          id: ToastIds.SOCKET_STATUS,
          cancel: DISMISS_BUTTON,
          duration: 1000,
        })
        setCurrentState(PlaceStates.AWAIT_SOCKET)
      },

      onMessage: async (message) => {
        console.log('Socket message: ', { message })

        const action = await socket.processMessage(message.data)
        console.log('Socket action: ', { action })

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

        case 'UPDATE_STATE':
          setCurrentMachineState(action.payload)
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
        console.error('Socket error: ', error)
        toast.error('Socket error!', {
          id: ToastIds.SOCKET_ERROR,
          cancel: DISMISS_BUTTON,
          duration: 6000,
        })
        setCurrentState(PlaceStates.AWAIT_SOCKET)
      },

      retryOnError: true,

      shouldReconnect: (event) => {
        if (didUnmount.current) return false

        console.log('Socket reconnecting: ', event)
        dismissStatusOnUnmount.current = true
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
        dismissStatusOnUnmount.current = false
        toast.error('Failed to connect to socket!', {
          id: ToastIds.SOCKET_STATUS,
          cancel: DISMISS_BUTTON,
          duration: 6000,
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

  // Display prompt/instruction toasts
  useEffect(() => {
    new Promise((resolve) => setTimeout(resolve, 250))
      .then(() => {
        switch (currentState) {
        case PlaceStates.MOVE_TO_COMPONENT:
        {
          toast.loading('Picking component...', {
            id: ToastIds.PROMPT,
            description: 'Move the camera to a component.',
            duration: Infinity,
            important: true,
            action: {
              label: 'Continue',
              onClick: (event) => {
                event.preventDefault()
                setCurrentState(PlaceStates.PICK_COMPONENT)
              },
            },
          })
          break
        }
        case PlaceStates.PICK_COMPONENT:
        {
          toast.loading('Picking component...', {
            id: ToastIds.PROMPT,
            description: 'Hit space to pick the component.',
            duration: Infinity,
            important: true,
            action: null,
          })
          break
        }
        case PlaceStates.MOVE_TO_PAD:
        {
          toast.loading('Placing component...', {
            id: ToastIds.PROMPT,
            description: 'Move the camera to the target pad.',
            duration: Infinity,
            important: true,
            action: {
              label: 'Continue',
              onClick: (event) => {
                event.preventDefault()
                setCurrentState(PlaceStates.PLACE_COMPONENT)
              },
            },
          })
          break
        }
        case PlaceStates.PLACE_COMPONENT:
        {
          toast.loading('Placing component...', {
            id: ToastIds.PROMPT,
            description: 'Hit space to place the component.',
            duration: Infinity,
            important: true,
            action: null,
          })
          break
        }
        case PlaceStates.AWAIT_SOCKET:
        default:
          break
        }
      })
  }, [currentState])

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

            if (event.code === 'KeyR') {
              socket.sendGantryStep(webSocket, socket.GantryDirection.ZERO)
              setTargetOffset({ x: 0.5, y:0.5 })
              return
            }

            if (event.code === 'KeyV') {
              socket.sendHeadOperation(
                webSocket,
                (currentMachineState?.isVacuumEngaged)
                  ? socket.HeadOperation.DISENGAGE_VACUUM
                  : socket.HeadOperation.ENGAGE_VACUUM
              )
              return
            }

            if (event.code === 'KeyP') {
              socket.sendHeadOperation(
                webSocket,
                (currentMachineState?.isHeadDown)
                  ? socket.HeadOperation.RAISE_HEAD
                  : socket.HeadOperation.LOWER_HEAD
              )
              return
            }

            const unclampedOffset = { ...previousOffset }
            switch (event.code) {
            case 'KeyR':
            case 'KeyS':
            case 'ArrowDown':
            case 'KeyJ':
            // TODO: This must be a internalisable distance.
            // Either have a new setting that configures this for a real um/mm, or have some ability to switch in real time—probably some HUD indicator, and a key like 'u' to switch units (and have a corresponding tag on the protobuf)
              unclampedOffset.y = previousOffset.y + 0.01
              break
            case 'KeyW':
            case 'ArrowUp':
            case 'KeyK':
              unclampedOffset.y = previousOffset.y - 0.01
              break
            case 'KeyA':
            case 'ArrowLeft':
            case 'KeyH':
              unclampedOffset.x = previousOffset.x - 0.01
              break
            case 'KeyD':
            case 'ArrowRight':
            case 'KeyL':
              unclampedOffset.x = previousOffset.x + 0.01
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

            if (event.code === 'Space') {
              switch (currentState) {
              case PlaceStates.PICK_COMPONENT:
                socket.sendHeadOperation(webSocket, socket.HeadOperation.PICK)
                setCurrentState(PlaceStates.MOVE_TO_PAD)
                return
              case PlaceStates.PLACE_COMPONENT:
                socket.sendHeadOperation(webSocket, socket.HeadOperation.PLACE)
                setCurrentState(PlaceStates.MOVE_TO_COMPONENT)
                return
              }
            }

            if (!targetPositionOffsets?.length) return

            const getFlatMapper = (searchAngleDegrees: number, searchArcDegrees: number) => (targetPosition: Position) => {
              const targetDeltas = {
                x: (targetPosition.x - previousOffset.x),
                y: (targetPosition.y - previousOffset.y),
              }

              if ((targetDeltas.x === 0) && (targetDeltas.y === 0)) return []

              let angleDegrees = (-Math.atan2(targetDeltas.y, targetDeltas.x) * 180) / Math.PI
              if (angleDegrees < 0) {
                angleDegrees += 360
              }

              let angleDifferenceDegrees = Math.abs(angleDegrees - searchAngleDegrees)
              angleDifferenceDegrees = Math.min((360 - angleDifferenceDegrees), angleDifferenceDegrees)

              // console.info(JSON.stringify({
              //   ...targetPosition,
              //   radius: Math.hypot(targetDeltas.x, targetDeltas.y),
              //   angle: angleDegrees,
              //   searchAngle: searchAngleDegrees,
              //   searchArc: (searchArcDegrees / 2),
              //   difference: angleDifferenceDegrees,
              //   flattened: angleDifferenceDegrees > (searchArcDegrees / 2),
              // }, null, 2))

              if (angleDifferenceDegrees > (searchArcDegrees / 2)) return []

              return [{
                ...targetPosition,
                radius: Math.hypot(targetDeltas.x, targetDeltas.y),
                angleDegrees,
                angleDifferenceDegrees,
              }]
            }

            const getSortFunction = (searchAngleDegrees: number, searchArcDegrees: number) => (position: Position & {
              radius: number,
              angleDegrees: number,
              angleDifferenceDegrees: number,
            }) => {
              const angleDeviationRatio = position.angleDifferenceDegrees / (searchArcDegrees / 2)

              // console.log(JSON.stringify({
              //   ...position,
              //   sD: searchAngleDegrees,
              //   devR: angleDeviationRatio,
              //   res: (position.radius * angleDeviationRatio),
              // }, null, 2))

              // * See James' Logbook for 3 July!
              return (position.radius * (angleDeviationRatio + 1.5))
            }

            let searchAngleDegrees: number
            switch (event.code) {
            case 'KeyS':
            case 'ArrowDown':
            case 'KeyJ':
              searchAngleDegrees = 270
              break
            case 'KeyW':
            case 'ArrowUp':
            case 'KeyK':
              searchAngleDegrees = 90
              break
            case 'KeyA':
            case 'ArrowLeft':
            case 'KeyH':
              searchAngleDegrees = 180
              break
            case 'KeyD':
            case 'ArrowRight':
            case 'KeyL':
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
            // A higher-order getter function is used here for TypeScript to statically ensure all code paths assign searchAngleDegrees
            const flatMapper = getFlatMapper(searchAngleDegrees, 90)
            const sortFunction = getSortFunction(searchAngleDegrees, 90)

            const nearestTargetOffset = targetPositionOffsets
              .flatMap(flatMapper)
              .toSorted((a, b) => sortFunction(a) - sortFunction(b))
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

        {/* State display */}
        <div
          className={cn(
            'absolute z-50 inset-x-1/2 -ml-48 w-96 top-0',
            'bg-card/95 backdrop-blur-lg supports-[backdrop-filter]:bg-secondary/60 text-secondary-foreground shadow-sm',
            'rounded-b-lg',
            'px-8 py-4 text-center',
            'font-bold uppercase text-sm',
            'select-none cursor-pointer pointer-events-none',
          )}
        >
          {{
            [PlaceStates.AWAIT_SOCKET]: 'Awaiting socket connection',
            [PlaceStates.MOVE_TO_COMPONENT]: 'Move to component',
            [PlaceStates.PICK_COMPONENT]: 'Pick component',
            [PlaceStates.MOVE_TO_PAD]: 'Move to pad',
            [PlaceStates.PLACE_COMPONENT]: 'Place component',
          }[currentState]}
        </div>

        {/* Machine state display */}
        {(currentMachineState) && (
          <div
            className={cn(
              'absolute z-50 inset-x-1/2 -ml-40 w-80 bottom-0',
              'bg-card/95 backdrop-blur-lg supports-[backdrop-filter]:bg-secondary/60 text-secondary-foreground shadow-sm',
              'rounded-t-lg',
              'px-6 py-2 text-center',
              'font-bold uppercase text-xs',
              'select-none cursor-pointer pointer-events-none',
            )}
          >
            Head {(currentMachineState.isHeadDown) ? 'down' : 'up'}
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            Vacuum {(currentMachineState.isVacuumEngaged) ? 'on' : 'off'}
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            {(currentMachineState.isComponentPicked) ? 'Picked' : 'Not picked'}
          </div>
        )}

        {/* Target circle */}
        {(targetOffset) && (
          <div
            className='absolute z-50 bg-ring/75 outline outline-1 outline-primary-foreground rounded-full pointer-events-none cursor-crosshair'
            style={{
              width: circleSize,
              height: circleSize,
              top: (targetOffset.y * overlaySize.height) - (circleSize / 2),
              left: (targetOffset.x * overlaySize.width) - (circleSize / 2),
            }}
          />
        )}

        {/* Target positions */}
        {(targetPositionOffsets?.length) && targetPositionOffsets.map(position => (
          <div
            key={`${position.x},${position.y}`}
            className='absolute z-0 bg-accent-foreground/25 outline outline-1 outline-accent rounded-none cursor-pointer'
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
          className='relative bg-secondary/50 outline outline-1 outline-secondary-foreground rounded-full pointer-events-none cursor-crosshair'
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
