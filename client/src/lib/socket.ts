import { type WebSocketHook } from 'react-use-websocket/dist/lib/types'

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
 * - An optional following stream of payload bytes defined by the tag
 */

type MessagePayloads = {
  ['HEARTBEAT']: null,
  ['TARGET_DELTAS']: Int16Array,
  ['MOVED_DELTAS']: Int16Array,
}
type MessageType = keyof MessagePayloads
type MessageReceivedType = MessageType | 'INVALID'

const MESSAGE_TAGS: Record<MessageType, number> = {
  'HEARTBEAT': 0x00,
  'TARGET_DELTAS': 0x01,
  'MOVED_DELTAS': 0x02,
} as const
type MessageTag = (typeof MESSAGE_TAGS)[MessageType]

export type ActionPayloads = {
  ['NO_OPERATION']: null,
  ['MOVE_TARGET']: Position,
}
type ActionType = keyof ActionPayloads

export type Action = {
  [K in ActionType]: {
    actionType: K;
    messageType: MessageReceivedType;
    rawPayload: string | Uint8Array;
    silent?: boolean;
  } & (ActionPayloads[K] extends null ? Record<never, never> : { payload: ActionPayloads[K] });
}[ActionType]

export async function processMessage(data: unknown): Promise<Action> {

  if (!(data instanceof Blob)) {
    console.warn('Non-Blob data received: ', data)
    return {
      actionType: 'NO_OPERATION',
      messageType: 'INVALID',
      rawPayload: String(data),
    }
  }

  const rawPayload = new Uint8Array(await data.arrayBuffer())
  const messageType = (Object.entries(MESSAGE_TAGS) as [MessageType, MessageTag][])
    .find(
      (value) => rawPayload[0] === value[1]
    )?.[0] ?? 'INVALID'

  switch (messageType) {

  case 'MOVED_DELTAS':
    const deltas = new Int16Array(rawPayload.slice(1).buffer)
    return {
      actionType: 'MOVE_TARGET',
      messageType,
      rawPayload,
      payload: {
        x: deltas[0],
        y: deltas[1],
      },
    }

  case 'HEARTBEAT':
  case 'TARGET_DELTAS':
    return {
      actionType: 'NO_OPERATION',
      messageType,
      rawPayload,
      silent: true,
    }

  case 'INVALID':
    return {
      actionType: 'NO_OPERATION',
      messageType,
      rawPayload,
    }

  }

}

function sendMessage<T extends MessageType>(webSocket: WebSocketHook, type: T, payload: MessagePayloads[T]) {
  let message: Uint8Array

  if (!payload) {
    message = new Uint8Array([MESSAGE_TAGS[type]])
  }
  else {
    message = new Uint8Array(payload.byteLength + 1)
    // Set the message tag
    message[0] = MESSAGE_TAGS[type]
    // Set the message payload
    message.set(new Uint8Array(payload.buffer), 1)
  }

  console.info({ payload, message })
  webSocket.sendMessage(message)
}

export function getHeartbeatMessage(): Uint8Array {
  return new Uint8Array([MESSAGE_TAGS['HEARTBEAT']])
}

export function sendHeartbeat(webSocket: WebSocketHook) {
  sendMessage(webSocket, 'HEARTBEAT', null)
}

export function normaliseOverlayDeltas(overlayDeltas: Position, overlaySize: Size): Position {
  return {
    x: overlayDeltas.x * (INT16_CONSTANTS.RANGE / overlaySize.width),
    y: overlayDeltas.y * (INT16_CONSTANTS.RANGE / overlaySize.height),
  }
}

export function denormaliseOverlayDeltas(normalisedDeltas: Position, overlaySize: Size): Position {
  return {
    x: normalisedDeltas.x * (overlaySize.width / INT16_CONSTANTS.RANGE),
    y: normalisedDeltas.y * (overlaySize.height / INT16_CONSTANTS.RANGE),
  }
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
  const normalisedDeltas = normaliseOverlayDeltas(
    {
      x: (rawTargetPosition.x - (overlaySize.width / 2)),
      y: (rawTargetPosition.y - (overlaySize.height / 2)),
    },
    overlaySize
  )

  normalisedDeltas.x = Math.max(INT16_CONSTANTS.MINIMUM, Math.min(INT16_CONSTANTS.MAXIMUM, Math.floor(normalisedDeltas.x)))
  normalisedDeltas.y = Math.max(INT16_CONSTANTS.MINIMUM, Math.min(INT16_CONSTANTS.MAXIMUM, Math.floor(normalisedDeltas.y)))
  console.info(`Delta normalised to (${normalisedDeltas.x}, ${normalisedDeltas.y})`)

  sendMessage(webSocket, 'TARGET_DELTAS', new Int16Array([normalisedDeltas.x, normalisedDeltas.y]))
}
