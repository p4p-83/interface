import { type WebSocketHook } from 'react-use-websocket/dist/lib/types'

import { pnp } from '@/proto/pnp/v1/pnp'
import { type Position } from '@/app/place/PlaceInterface'

const INT16_CONSTANTS = {
  RANGE: 65535,
  MINIMUM: -32768,
  MAXIMUM: 32767,
} as const

export type ActionPayloads = {
  ['NO_OPERATION']: null,
  ['MOVE_TARGET']: Position,
}
type ActionType = keyof ActionPayloads

type ActionWithoutPayload<T extends ActionType> = {
  actionType: T;
  messageType: pnp.v1.Message.Tags;
  rawPayload: string | Uint8Array;
  silent?: boolean;
}
type ActionPayloadIfNotNull<T extends ActionType> = ActionPayloads[T] extends null
  ? Record<never, never>
  : {
    payload: ActionPayloads[T]
  }
export type Action = {
  [T in ActionType]: ActionWithoutPayload<T> & ActionPayloadIfNotNull<T>;
}[ActionType]

export async function processMessage(data: unknown): Promise<Action> {

  try {
    if (!(data instanceof Blob)) {
      throw new Error('Non-Blob data received!')
    }

    const rawPayload = new Uint8Array(await data?.arrayBuffer())
    const decodedMessage = pnp.v1.Message.deserializeBinary(rawPayload)

    switch (decodedMessage.tag) {

    case pnp.v1.Message.Tags.MOVED_DELTAS:
      if (!decodedMessage.has_deltas) {
        console.error('Missing deltas payload: ', decodedMessage)
        throw new Error('Missing deltas payload')
      }

      return {
        actionType: 'MOVE_TARGET',
        messageType: decodedMessage.tag,
        rawPayload,
        payload: denormalisePosition(decodedMessage.deltas),
      }

    case pnp.v1.Message.Tags.HEARTBEAT:
    case pnp.v1.Message.Tags.TARGET_DELTAS:
      return {
        actionType: 'NO_OPERATION',
        messageType: decodedMessage.tag,
        rawPayload,
        silent: true,
      }

    case pnp.v1.Message.Tags.INVALID:
      return {
        actionType: 'NO_OPERATION',
        messageType: decodedMessage.tag,
        rawPayload,
      }

    }

  }
  catch (error) {
    console.warn('Wire error: ', data, error)

    return {
      actionType: 'NO_OPERATION',
      messageType: pnp.v1.Message.Tags.INVALID,
      rawPayload: String(data),
    }
  }

}

function sendMessage(webSocket: WebSocketHook, message: pnp.v1.Message) {
  console.info({ message })
  webSocket.sendMessage(message.serializeBinary())
}

export function getHeartbeatMessage(): Uint8Array {
  return new pnp.v1.Message({
    tag: pnp.v1.Message.Tags.HEARTBEAT,
  })
    .serializeBinary()
}

export function sendHeartbeat(webSocket: WebSocketHook) {
  sendMessage(webSocket, new pnp.v1.Message({
    tag: pnp.v1.Message.Tags.HEARTBEAT,
  }))
}

function normalisePosition(position: Position): Position {
  return {
    x: (position.x * INT16_CONSTANTS.RANGE),
    y: (position.y * INT16_CONSTANTS.RANGE),
  }
}

function denormalisePosition(position: Position): Position {
  return {
    x: (position.x / INT16_CONSTANTS.RANGE),
    y: (position.y / INT16_CONSTANTS.RANGE),
  }
}

/**
 * Send the delta counts between the current position to the target position over the WebSocket.
 *
 * The delta is normalised into an absolute, invariant range.
 *
 * @param webSocket The WebSocket connection.
 * @param targetOffset The raw target position, as a percentage offset from the top left corner of the overlay.
 */
export function sendTargetDeltas(webSocket: WebSocketHook, targetOffset: Position) {
  /*
   * This normalises the delta towards the clicked target to be on an Int16 coordinate space that is:
   * - Centred at (0, 0), defined as the present position of the head (ie no delta)
   * - Most negative at -32,768
   * - Most positive at 32,767
   *
   * This was originally done to ensure that the delta information passed back to the controller via
   * the WebSocket was agnostic of both the client viewport and the streamed video size
   *
   * Now that rawTargetPosition is provided as a percentage offset, this is performed such that integral
   * types are sent across the socket rather than floating point numbers
   *
   * In other words, the burden is left to the controller to map the Int16 delta into real camera pixels
   */
  const normalisedDeltas = normalisePosition({
    x: (targetOffset.x - 0.5),
    y: (targetOffset.y - 0.5),
  })

  normalisedDeltas.x = Math.max(INT16_CONSTANTS.MINIMUM, Math.min(INT16_CONSTANTS.MAXIMUM, Math.floor(normalisedDeltas.x)))
  normalisedDeltas.y = Math.max(INT16_CONSTANTS.MINIMUM, Math.min(INT16_CONSTANTS.MAXIMUM, Math.floor(normalisedDeltas.y)))
  console.info(`Delta normalised to (${normalisedDeltas.x}, ${normalisedDeltas.y})`)

  sendMessage(webSocket, new pnp.v1.Message({
    tag: pnp.v1.Message.Tags.TARGET_DELTAS,
    deltas: new pnp.v1.Message.Deltas(normalisedDeltas),
  }))
}
