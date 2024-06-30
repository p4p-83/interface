import { type WebSocketHook } from 'react-use-websocket/dist/lib/types'
import * as protobuf from 'protobufjs/minimal'

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

export type Action = {
  [K in ActionType]: {
    actionType: K;
    messageType: pnp.v1.Message.MessageTags | 'INVALID';
    rawPayload: string | Uint8Array;
    silent?: boolean;
  } & (ActionPayloads[K] extends null ? Record<never, never> : { payload: ActionPayloads[K] });
}[ActionType]

export async function processMessage(data: unknown): Promise<Action> {

  try {
    if (!(data instanceof Blob)) {
      throw new Error('Non-Blob data received!')
    }

    const rawPayload = new Uint8Array(await data?.arrayBuffer())
    const decodedMessage = pnp.v1.Message.decode(rawPayload)

    switch (decodedMessage.tag) {

    case pnp.v1.Message.MessageTags.MOVED_DELTAS:
      const deltas = new Int16Array(rawPayload.slice(1).buffer)
      return {
        actionType: 'MOVE_TARGET',
        messageType: decodedMessage.tag,
        rawPayload,
        payload: denormaliseTargetDeltas({
          x: deltas[0],
          y: deltas[1],
        }),
      }

    case pnp.v1.Message.MessageTags.HEARTBEAT:
    case pnp.v1.Message.MessageTags.TARGET_DELTAS:
      return {
        actionType: 'NO_OPERATION',
        messageType: decodedMessage.tag,
        rawPayload,
        silent: true,
      }

    }

  }
  catch (error) {
    if (error instanceof protobuf.util.ProtocolError) {
      // e.instance holds the so far decoded message with missing required fields
      console.warn('Received invalid instance: ', error.instance.toJSON())
    }
    else {
      console.warn('Wire error: ', data)
    }

    return {
      actionType: 'NO_OPERATION',
      messageType: 'INVALID',
      rawPayload: String(data),
    }
  }

}

function sendMessage(webSocket: WebSocketHook, message: pnp.v1.Message) {
  console.info({ message })
  webSocket.sendMessage(pnp.v1.Message.encode(message).finish())
}

export function getHeartbeatMessage(): Uint8Array {
  const message = new pnp.v1.Message({
    tag: pnp.v1.Message.MessageTags.HEARTBEAT,
  })
  return pnp.v1.Message.encode(message).finish()
}

export function sendHeartbeat(webSocket: WebSocketHook) {
  sendMessage(webSocket, new pnp.v1.Message({
    tag: pnp.v1.Message.MessageTags.HEARTBEAT,
  }))
}

function normaliseTargetDeltas(targetDeltas: Position): Position {
  return {
    x: (targetDeltas.x * INT16_CONSTANTS.RANGE),
    y: (targetDeltas.y * INT16_CONSTANTS.RANGE),
  }
}

function denormaliseTargetDeltas(normalisedDeltas: Position): Position {
  return {
    x: (normalisedDeltas.x / INT16_CONSTANTS.RANGE),
    y: (normalisedDeltas.y / INT16_CONSTANTS.RANGE),
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
  const normalisedDeltas = normaliseTargetDeltas({
    x: (targetOffset.x - 0.5),
    y: (targetOffset.y - 0.5),
  })

  normalisedDeltas.x = Math.max(INT16_CONSTANTS.MINIMUM, Math.min(INT16_CONSTANTS.MAXIMUM, Math.floor(normalisedDeltas.x)))
  normalisedDeltas.y = Math.max(INT16_CONSTANTS.MINIMUM, Math.min(INT16_CONSTANTS.MAXIMUM, Math.floor(normalisedDeltas.y)))
  console.info(`Delta normalised to (${normalisedDeltas.x}, ${normalisedDeltas.y})`)

  sendMessage(webSocket, new pnp.v1.Message({
    tag: pnp.v1.Message.MessageTags.TARGET_DELTAS,
    deltas: normalisedDeltas,
  }))
}
