/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.pnp = (function() {

    /**
     * Namespace pnp.
     * @exports pnp
     * @namespace
     */
    var pnp = {};

    pnp.v1 = (function() {

        /**
         * Namespace v1.
         * @memberof pnp
         * @namespace
         */
        var v1 = {};

        v1.Message = (function() {

            /**
             * Properties of a Message.
             * @memberof pnp.v1
             * @interface IMessage
             * @property {pnp.v1.Message.MessageTags|null} [tag] Message tag
             * @property {pnp.v1.Message.IDeltas|null} [deltas] Message deltas
             */

            /**
             * Constructs a new Message.
             * @memberof pnp.v1
             * @classdesc Represents a Message.
             * @implements IMessage
             * @constructor
             * @param {pnp.v1.IMessage=} [properties] Properties to set
             */
            function Message(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Message tag.
             * @member {pnp.v1.Message.MessageTags} tag
             * @memberof pnp.v1.Message
             * @instance
             */
            Message.prototype.tag = 0;

            /**
             * Message deltas.
             * @member {pnp.v1.Message.IDeltas|null|undefined} deltas
             * @memberof pnp.v1.Message
             * @instance
             */
            Message.prototype.deltas = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * Message _deltas.
             * @member {"deltas"|undefined} _deltas
             * @memberof pnp.v1.Message
             * @instance
             */
            Object.defineProperty(Message.prototype, "_deltas", {
                get: $util.oneOfGetter($oneOfFields = ["deltas"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new Message instance using the specified properties.
             * @function create
             * @memberof pnp.v1.Message
             * @static
             * @param {pnp.v1.IMessage=} [properties] Properties to set
             * @returns {pnp.v1.Message} Message instance
             */
            Message.create = function create(properties) {
                return new Message(properties);
            };

            /**
             * Encodes the specified Message message. Does not implicitly {@link pnp.v1.Message.verify|verify} messages.
             * @function encode
             * @memberof pnp.v1.Message
             * @static
             * @param {pnp.v1.IMessage} message Message message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Message.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.tag != null && Object.hasOwnProperty.call(message, "tag"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.tag);
                if (message.deltas != null && Object.hasOwnProperty.call(message, "deltas"))
                    $root.pnp.v1.Message.Deltas.encode(message.deltas, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Message message, length delimited. Does not implicitly {@link pnp.v1.Message.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pnp.v1.Message
             * @static
             * @param {pnp.v1.IMessage} message Message message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Message.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Message message from the specified reader or buffer.
             * @function decode
             * @memberof pnp.v1.Message
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pnp.v1.Message} Message
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Message.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pnp.v1.Message();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.tag = reader.int32();
                            break;
                        }
                    case 2: {
                            message.deltas = $root.pnp.v1.Message.Deltas.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Message message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pnp.v1.Message
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pnp.v1.Message} Message
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Message.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Message message.
             * @function verify
             * @memberof pnp.v1.Message
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Message.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.tag != null && message.hasOwnProperty("tag"))
                    switch (message.tag) {
                    default:
                        return "tag: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                    }
                if (message.deltas != null && message.hasOwnProperty("deltas")) {
                    properties._deltas = 1;
                    {
                        var error = $root.pnp.v1.Message.Deltas.verify(message.deltas);
                        if (error)
                            return "deltas." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Message message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pnp.v1.Message
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pnp.v1.Message} Message
             */
            Message.fromObject = function fromObject(object) {
                if (object instanceof $root.pnp.v1.Message)
                    return object;
                var message = new $root.pnp.v1.Message();
                switch (object.tag) {
                default:
                    if (typeof object.tag === "number") {
                        message.tag = object.tag;
                        break;
                    }
                    break;
                case "HEARTBEAT":
                case 0:
                    message.tag = 0;
                    break;
                case "TARGET_DELTAS":
                case 1:
                    message.tag = 1;
                    break;
                case "MOVED_DELTAS":
                case 2:
                    message.tag = 2;
                    break;
                }
                if (object.deltas != null) {
                    if (typeof object.deltas !== "object")
                        throw TypeError(".pnp.v1.Message.deltas: object expected");
                    message.deltas = $root.pnp.v1.Message.Deltas.fromObject(object.deltas);
                }
                return message;
            };

            /**
             * Creates a plain object from a Message message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pnp.v1.Message
             * @static
             * @param {pnp.v1.Message} message Message
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Message.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.tag = options.enums === String ? "HEARTBEAT" : 0;
                if (message.tag != null && message.hasOwnProperty("tag"))
                    object.tag = options.enums === String ? $root.pnp.v1.Message.MessageTags[message.tag] === undefined ? message.tag : $root.pnp.v1.Message.MessageTags[message.tag] : message.tag;
                if (message.deltas != null && message.hasOwnProperty("deltas")) {
                    object.deltas = $root.pnp.v1.Message.Deltas.toObject(message.deltas, options);
                    if (options.oneofs)
                        object._deltas = "deltas";
                }
                return object;
            };

            /**
             * Converts this Message to JSON.
             * @function toJSON
             * @memberof pnp.v1.Message
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Message.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Message
             * @function getTypeUrl
             * @memberof pnp.v1.Message
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Message.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/pnp.v1.Message";
            };

            Message.Deltas = (function() {

                /**
                 * Properties of a Deltas.
                 * @memberof pnp.v1.Message
                 * @interface IDeltas
                 * @property {number|null} [x] Deltas x
                 * @property {number|null} [y] Deltas y
                 */

                /**
                 * Constructs a new Deltas.
                 * @memberof pnp.v1.Message
                 * @classdesc Represents a Deltas.
                 * @implements IDeltas
                 * @constructor
                 * @param {pnp.v1.Message.IDeltas=} [properties] Properties to set
                 */
                function Deltas(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Deltas x.
                 * @member {number} x
                 * @memberof pnp.v1.Message.Deltas
                 * @instance
                 */
                Deltas.prototype.x = 0;

                /**
                 * Deltas y.
                 * @member {number} y
                 * @memberof pnp.v1.Message.Deltas
                 * @instance
                 */
                Deltas.prototype.y = 0;

                /**
                 * Creates a new Deltas instance using the specified properties.
                 * @function create
                 * @memberof pnp.v1.Message.Deltas
                 * @static
                 * @param {pnp.v1.Message.IDeltas=} [properties] Properties to set
                 * @returns {pnp.v1.Message.Deltas} Deltas instance
                 */
                Deltas.create = function create(properties) {
                    return new Deltas(properties);
                };

                /**
                 * Encodes the specified Deltas message. Does not implicitly {@link pnp.v1.Message.Deltas.verify|verify} messages.
                 * @function encode
                 * @memberof pnp.v1.Message.Deltas
                 * @static
                 * @param {pnp.v1.Message.IDeltas} message Deltas message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Deltas.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                        writer.uint32(/* id 1, wireType 0 =*/8).sint32(message.x);
                    if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                        writer.uint32(/* id 2, wireType 0 =*/16).sint32(message.y);
                    return writer;
                };

                /**
                 * Encodes the specified Deltas message, length delimited. Does not implicitly {@link pnp.v1.Message.Deltas.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof pnp.v1.Message.Deltas
                 * @static
                 * @param {pnp.v1.Message.IDeltas} message Deltas message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Deltas.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Deltas message from the specified reader or buffer.
                 * @function decode
                 * @memberof pnp.v1.Message.Deltas
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {pnp.v1.Message.Deltas} Deltas
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Deltas.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pnp.v1.Message.Deltas();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.x = reader.sint32();
                                break;
                            }
                        case 2: {
                                message.y = reader.sint32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Deltas message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof pnp.v1.Message.Deltas
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {pnp.v1.Message.Deltas} Deltas
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Deltas.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Deltas message.
                 * @function verify
                 * @memberof pnp.v1.Message.Deltas
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Deltas.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.x != null && message.hasOwnProperty("x"))
                        if (!$util.isInteger(message.x))
                            return "x: integer expected";
                    if (message.y != null && message.hasOwnProperty("y"))
                        if (!$util.isInteger(message.y))
                            return "y: integer expected";
                    return null;
                };

                /**
                 * Creates a Deltas message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof pnp.v1.Message.Deltas
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {pnp.v1.Message.Deltas} Deltas
                 */
                Deltas.fromObject = function fromObject(object) {
                    if (object instanceof $root.pnp.v1.Message.Deltas)
                        return object;
                    var message = new $root.pnp.v1.Message.Deltas();
                    if (object.x != null)
                        message.x = object.x | 0;
                    if (object.y != null)
                        message.y = object.y | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a Deltas message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof pnp.v1.Message.Deltas
                 * @static
                 * @param {pnp.v1.Message.Deltas} message Deltas
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Deltas.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.x = 0;
                        object.y = 0;
                    }
                    if (message.x != null && message.hasOwnProperty("x"))
                        object.x = message.x;
                    if (message.y != null && message.hasOwnProperty("y"))
                        object.y = message.y;
                    return object;
                };

                /**
                 * Converts this Deltas to JSON.
                 * @function toJSON
                 * @memberof pnp.v1.Message.Deltas
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Deltas.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for Deltas
                 * @function getTypeUrl
                 * @memberof pnp.v1.Message.Deltas
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                Deltas.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/pnp.v1.Message.Deltas";
                };

                return Deltas;
            })();

            /**
             * MessageTags enum.
             * @name pnp.v1.Message.MessageTags
             * @enum {number}
             * @property {number} HEARTBEAT=0 HEARTBEAT value
             * @property {number} TARGET_DELTAS=1 TARGET_DELTAS value
             * @property {number} MOVED_DELTAS=2 MOVED_DELTAS value
             */
            Message.MessageTags = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "HEARTBEAT"] = 0;
                values[valuesById[1] = "TARGET_DELTAS"] = 1;
                values[valuesById[2] = "MOVED_DELTAS"] = 2;
                return values;
            })();

            return Message;
        })();

        return v1;
    })();

    return pnp;
})();

module.exports = $root;
