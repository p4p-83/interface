import { type WebSocketHook } from 'react-use-websocket/dist/lib/types'

import { type Size, type Position } from '@/app/place/PlaceInterface'

const INT16_CONSTANTS = {
  RANGE: 65535,
  MINIMUM: -32768,
  MAXIMUM: 32767,
} as const

export function processMessage() { null }

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

  webSocket.sendMessage(new Int16Array([normalisedDelta.x, normalisedDelta.y]))
}
