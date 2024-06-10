import { type WebSocketHook } from 'react-use-websocket/dist/lib/types'
import { ReadyState } from 'react-use-websocket'

import { type Size, type Position } from '@/app/place/PlaceInterface'

const INT16_CONSTANTS = {
  RANGE: 65535,
  MINIMUM: -32768,
  MAXIMUM: 32767,
} as const

/*
 * A message looks like:
 * - A `Uint8` byte stream
 * - A leading 'tag'/'type' byte
 * - A following stream of payload bytes defined by the tag
 */

const MESSAGE_TAGS = {
  ['PING']: 0x00,
  ['TARGET_DELTAS']: 0x01,
} as const

type MessageType = keyof (typeof MESSAGE_TAGS)
type MessageTag = (typeof MESSAGE_TAGS)[MessageType]

export function processMessage() { null }

function sendMessage(webSocket: WebSocketHook, type: MessageType, payload: ArrayBufferView) {
  if (webSocket.readyState !== ReadyState.OPEN) return

  const message = new Uint8Array(payload.byteLength + 1)
  // Set the message tag
  message[0] = MESSAGE_TAGS[type]
  // Set the message payload
  message.set(new Uint8Array(payload.buffer), 1)

  console.info({ payload, message })
  webSocket.sendMessage(message)
}

/**
 * Send the delta counts between the current position to the target position over the WebSocket.
 *
 * The delta is normalised into an absolute, invariant range.
 *
 * @param webSocket The WebSocket connection.
 * @param rawTargetPosition The raw target position, in the coordinate space of the overlay in the client viewport.
 * @param overlaySize The size of the overlay in the client viewport.
 */
export function sendTargetDeltas(webSocket: WebSocketHook, rawTargetPosition: Position, overlaySize: Size) {
  /*
   * This normalises the delta towards the clicked target to be on an Int16 coordinate space that is:
   * - Centred at (0, 0), defined as the present position of the head (ie no delta)
   * - Most negative at -32,768
   * - Most positive at 32,767
   *
   * This is done to ensure that the delta information passed back to the controller via
   * the WebSocket is agnostic of both the client viewport and the streamed video size
   * In other words, the burden is left to the controller to map the Int16 delta into real camera pixels
   */
  const normalisedDelta = {
    // ( targetPosition[OverlayUnits] - overlayCentre[OverlayUnits] ) * ( [Int16Units] / [OverlayUnits] )
    x: Math.floor((rawTargetPosition.x - (overlaySize.width / 2)) * (INT16_CONSTANTS.RANGE / overlaySize.width)),
    y: Math.floor((rawTargetPosition.y - (overlaySize.height / 2)) * (INT16_CONSTANTS.RANGE / overlaySize.height)),
  }

  normalisedDelta.x = Math.max(INT16_CONSTANTS.MINIMUM, Math.min(INT16_CONSTANTS.MAXIMUM, normalisedDelta.x))
  normalisedDelta.y = Math.max(INT16_CONSTANTS.MINIMUM, Math.min(INT16_CONSTANTS.MAXIMUM, normalisedDelta.y))
  console.info(`Delta normalised to (${normalisedDelta.x}, ${normalisedDelta.y})`)

  sendMessage(webSocket, 'TARGET_DELTAS', new Int16Array([normalisedDelta.x, normalisedDelta.y]))
}
