import { useCallback, useRef, useState, useEffect, type MouseEvent, type KeyboardEvent } from 'react'
import useWebSocket from 'react-use-websocket'
import { toast } from 'sonner'

import { ToastIds, DISMISS_BUTTON } from '@/components/ui/sonner'
import { useDidUnmount } from '@/hooks/useDidUnmount'
import * as socket from '@/lib/socket'
import { cn } from '@/lib/utils'

import { Size, Position } from './CalibrateInterface'

type CalibrateOverlayProps = {
  socketUrl: string;
  overlaySize: Size | null;
  circleSize: number;
  hideOverlay?: boolean;
}

enum CalibrationStates {
  AWAIT_SOCKET = 0,
  MANUALLY_ALIGN_GRID = 1,
  CLICK_TARGET = 2,
  CLICK_REAL = 3,
}

export function CalibrateOverlay({ socketUrl, overlaySize, circleSize, hideOverlay = false }: CalibrateOverlayProps) {
  const dismissStatusOnUnmount = useRef(false)

  const [targetOffset, setTargetOffset] = useState<Position | null>(null)
  const [currentState, setCurrentState] = useState<CalibrationStates>(CalibrationStates.AWAIT_SOCKET)

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

        setCurrentState(CalibrationStates.MANUALLY_ALIGN_GRID)
      },

      onClose: (event) => {
        console.log('Socket closed: ', event)
        dismissStatusOnUnmount.current = false
        toast.info('Socket closed.', {
          id: ToastIds.SOCKET_STATUS,
          cancel: DISMISS_BUTTON,
          duration: 1000,
        })
        setCurrentState(CalibrationStates.AWAIT_SOCKET)
      },

      onMessage: async (message) => {
        console.log('Socket message: ', { message })

        const action = await socket.processMessage(message.data)
        console.log('Socket action: ', { action })

        switch (action.actionType) {

        case 'MOVE_TARGET':
          return
          // setTargetOffset((previousOffset) => {
          //   if (!previousOffset) return null
          //   return {
          //     x: previousOffset.x - action.payload.x,
          //     y: previousOffset.y - action.payload.y,
          //   }
          // })
          // break

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
        setCurrentState(CalibrationStates.AWAIT_SOCKET)
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

  // Display calibration prompt/instruction toasts
  useEffect(() => {
    new Promise((resolve) => setTimeout(resolve, 250))
      .then(() => {
        switch (currentState) {
        case CalibrationStates.MANUALLY_ALIGN_GRID:
        {
          toast.loading('Calibrating gantry...', {
            id: ToastIds.CALIBRATION,
            description: 'Align the corner of a grid square directly beneath the camera.',
            duration: Infinity,
            important: true,
            action: {
              label: 'Continue',
              onClick: (event) => {
                event.preventDefault()
                setCurrentState(CalibrationStates.CLICK_TARGET)
              },
            },
          })
          break
        }
        case CalibrationStates.CLICK_TARGET:
        {
          toast.loading('Calibrating gantry...', {
            id: ToastIds.CALIBRATION,
            description: 'Click on a target point.',
            duration: Infinity,
            important: true,
            action: null,
          })
          break
        }
        case CalibrationStates.CLICK_REAL:
        {
          toast.loading('Calibrating gantry...', {
            id: ToastIds.CALIBRATION,
            description: 'Click on the new position of that same target point.',
            duration: Infinity,
            important: true,
            action: null,
          })
          break
        }
        case CalibrationStates.AWAIT_SOCKET:
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

          console.info(`Clicked at (${offset.x}, ${offset.y})`)
          switch (currentState) {
          case CalibrationStates.MANUALLY_ALIGN_GRID:
            socket.sendTargetDeltas(webSocket, offset)
            break

          case CalibrationStates.CLICK_TARGET:
            setTargetOffset(offset)
            socket.sendTargetDeltas(webSocket, offset)
            toast.dismiss(ToastIds.CALIBRATION)
            setCurrentState(CalibrationStates.CLICK_REAL)
            break

          case CalibrationStates.CLICK_REAL:
            if (!targetOffset) {
              toast.dismiss(ToastIds.CALIBRATION)
              setCurrentState(CalibrationStates.MANUALLY_ALIGN_GRID)
              break
            }
            socket.sendCalibrationDeltas(webSocket, targetOffset, offset)
            setTargetOffset(null)
            toast.dismiss(ToastIds.CALIBRATION)
            setCurrentState(CalibrationStates.MANUALLY_ALIGN_GRID)
            break

          default:
            break
          }
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

            if (currentState !== CalibrationStates.MANUALLY_ALIGN_GRID) {
              console.log(`Returning as state is ${currentState}`)
              return
            }

            if (event.code === 'KeyR') {
              socket.sendGantryStep(webSocket, socket.GantryDirection.ZERO)
              setTargetOffset({ x: 0.5, y:0.5 })
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
          else if (event.code === 'Space') {
            switch (currentState) {
            case CalibrationStates.MANUALLY_ALIGN_GRID:
              setCurrentState(CalibrationStates.CLICK_TARGET)
              break
            case CalibrationStates.CLICK_TARGET:
              setCurrentState(CalibrationStates.CLICK_REAL)
              break
            case CalibrationStates.CLICK_REAL:
              setCurrentState(CalibrationStates.MANUALLY_ALIGN_GRID)
              break
            }
          }
        }}
      >

        {/* State display */}
        {(
          <div
            className={cn(
              'absolute z-50 inset-x-1/2 -ml-48 w-96 top-0',
              'bg-card/95 backdrop-blur-md supports-[backdrop-filter]:bg-secondary/60 text-secondary-foreground shadow-sm',
              'ring-2 ring-ring/25 rounded-b-lg',
              'px-8 py-4 text-center',
              'font-bold uppercase text-sm',
              'select-none cursor-pointer pointer-events-none',
            )}
          >
            {{
              [CalibrationStates.AWAIT_SOCKET]: 'Awaiting socket connection',
              [CalibrationStates.MANUALLY_ALIGN_GRID]: 'Align camera with grid',
              [CalibrationStates.CLICK_TARGET]: 'Click on a target point',
              [CalibrationStates.CLICK_REAL]: 'Click on previous target point',
            }[currentState]}
          </div>
        )}

        {/* Target circle */}
        {(targetOffset) && (
          <div
            className='absolute z-40 bg-ring/75 outline outline-1 outline-primary-foreground rounded-full pointer-events-none cursor-crosshair'
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
