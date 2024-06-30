import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace pnp. */
export namespace pnp {

    /** Namespace v1. */
    namespace v1 {

        /** Properties of a Message. */
        interface IMessage {

            /** Message tag */
            tag?: (pnp.v1.Message.MessageTags|null);

            /** Message deltas */
            deltas?: (pnp.v1.Message.IDeltas|null);
        }

        /** Represents a Message. */
        class Message implements IMessage {

            /**
             * Constructs a new Message.
             * @param [properties] Properties to set
             */
            constructor(properties?: pnp.v1.IMessage);

            /** Message tag. */
            public tag: pnp.v1.Message.MessageTags;

            /** Message deltas. */
            public deltas?: (pnp.v1.Message.IDeltas|null);

            /** Message _deltas. */
            public _deltas?: "deltas";

            /**
             * Creates a new Message instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Message instance
             */
            public static create(properties?: pnp.v1.IMessage): pnp.v1.Message;

            /**
             * Encodes the specified Message message. Does not implicitly {@link pnp.v1.Message.verify|verify} messages.
             * @param message Message message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: pnp.v1.IMessage, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Message message, length delimited. Does not implicitly {@link pnp.v1.Message.verify|verify} messages.
             * @param message Message message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: pnp.v1.IMessage, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Message message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Message
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pnp.v1.Message;

            /**
             * Decodes a Message message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Message
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pnp.v1.Message;

            /**
             * Verifies a Message message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Message message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Message
             */
            public static fromObject(object: { [k: string]: any }): pnp.v1.Message;

            /**
             * Creates a plain object from a Message message. Also converts values to other types if specified.
             * @param message Message
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: pnp.v1.Message, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Message to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Message
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace Message {

            /** Properties of a Deltas. */
            interface IDeltas {

                /** Deltas x */
                x?: (number|null);

                /** Deltas y */
                y?: (number|null);
            }

            /** Represents a Deltas. */
            class Deltas implements IDeltas {

                /**
                 * Constructs a new Deltas.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: pnp.v1.Message.IDeltas);

                /** Deltas x. */
                public x: number;

                /** Deltas y. */
                public y: number;

                /**
                 * Creates a new Deltas instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Deltas instance
                 */
                public static create(properties?: pnp.v1.Message.IDeltas): pnp.v1.Message.Deltas;

                /**
                 * Encodes the specified Deltas message. Does not implicitly {@link pnp.v1.Message.Deltas.verify|verify} messages.
                 * @param message Deltas message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: pnp.v1.Message.IDeltas, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Deltas message, length delimited. Does not implicitly {@link pnp.v1.Message.Deltas.verify|verify} messages.
                 * @param message Deltas message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: pnp.v1.Message.IDeltas, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Deltas message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Deltas
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pnp.v1.Message.Deltas;

                /**
                 * Decodes a Deltas message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Deltas
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pnp.v1.Message.Deltas;

                /**
                 * Verifies a Deltas message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Deltas message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Deltas
                 */
                public static fromObject(object: { [k: string]: any }): pnp.v1.Message.Deltas;

                /**
                 * Creates a plain object from a Deltas message. Also converts values to other types if specified.
                 * @param message Deltas
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: pnp.v1.Message.Deltas, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Deltas to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for Deltas
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** MessageTags enum. */
            enum MessageTags {
                HEARTBEAT = 0,
                TARGET_DELTAS = 1,
                MOVED_DELTAS = 2
            }
        }
    }
}
