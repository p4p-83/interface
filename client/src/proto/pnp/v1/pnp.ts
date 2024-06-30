/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 5.27.1
 * source: pnp.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as pb_1 from "google-protobuf";
export namespace pnp.v1 {
    export class Message extends pb_1.Message {
        #one_of_decls: number[][] = [[2]];
        constructor(data?: any[] | ({
            tag?: Message.MessageTags;
        } & (({
            deltas?: Message.Deltas;
        })))) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("tag" in data && data.tag != undefined) {
                    this.tag = data.tag;
                }
                if ("deltas" in data && data.deltas != undefined) {
                    this.deltas = data.deltas;
                }
            }
        }
        get tag() {
            return pb_1.Message.getFieldWithDefault(this, 1, Message.MessageTags.HEARTBEAT) as Message.MessageTags;
        }
        set tag(value: Message.MessageTags) {
            pb_1.Message.setField(this, 1, value);
        }
        get deltas() {
            return pb_1.Message.getWrapperField(this, Message.Deltas, 2) as Message.Deltas;
        }
        set deltas(value: Message.Deltas) {
            pb_1.Message.setOneofWrapperField(this, 2, this.#one_of_decls[0], value);
        }
        get has_deltas() {
            return pb_1.Message.getField(this, 2) != null;
        }
        get _deltas() {
            const cases: {
                [index: number]: "none" | "deltas";
            } = {
                0: "none",
                2: "deltas"
            };
            return cases[pb_1.Message.computeOneofCase(this, [2])];
        }
        static fromObject(data: {
            tag?: Message.MessageTags;
            deltas?: ReturnType<typeof Message.Deltas.prototype.toObject>;
        }): Message {
            const message = new Message({});
            if (data.tag != null) {
                message.tag = data.tag;
            }
            if (data.deltas != null) {
                message.deltas = Message.Deltas.fromObject(data.deltas);
            }
            return message;
        }
        toObject() {
            const data: {
                tag?: Message.MessageTags;
                deltas?: ReturnType<typeof Message.Deltas.prototype.toObject>;
            } = {};
            if (this.tag != null) {
                data.tag = this.tag;
            }
            if (this.deltas != null) {
                data.deltas = this.deltas.toObject();
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.tag != Message.MessageTags.HEARTBEAT)
                writer.writeEnum(1, this.tag);
            if (this.has_deltas)
                writer.writeMessage(2, this.deltas, () => this.deltas.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Message {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Message();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.tag = reader.readEnum();
                        break;
                    case 2:
                        reader.readMessage(message.deltas, () => message.deltas = Message.Deltas.deserialize(reader));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): Message {
            return Message.deserialize(bytes);
        }
    }
    export namespace Message {
        export enum MessageTags {
            HEARTBEAT = 0,
            TARGET_DELTAS = 1,
            MOVED_DELTAS = 2
        }
        export class Deltas extends pb_1.Message {
            #one_of_decls: number[][] = [];
            constructor(data?: any[] | {
                x?: number;
                y?: number;
            }) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("x" in data && data.x != undefined) {
                        this.x = data.x;
                    }
                    if ("y" in data && data.y != undefined) {
                        this.y = data.y;
                    }
                }
            }
            get x() {
                return pb_1.Message.getFieldWithDefault(this, 1, 0) as number;
            }
            set x(value: number) {
                pb_1.Message.setField(this, 1, value);
            }
            get y() {
                return pb_1.Message.getFieldWithDefault(this, 2, 0) as number;
            }
            set y(value: number) {
                pb_1.Message.setField(this, 2, value);
            }
            static fromObject(data: {
                x?: number;
                y?: number;
            }): Deltas {
                const message = new Deltas({});
                if (data.x != null) {
                    message.x = data.x;
                }
                if (data.y != null) {
                    message.y = data.y;
                }
                return message;
            }
            toObject() {
                const data: {
                    x?: number;
                    y?: number;
                } = {};
                if (this.x != null) {
                    data.x = this.x;
                }
                if (this.y != null) {
                    data.y = this.y;
                }
                return data;
            }
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
                const writer = w || new pb_1.BinaryWriter();
                if (this.x != 0)
                    writer.writeSint32(1, this.x);
                if (this.y != 0)
                    writer.writeSint32(2, this.y);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Deltas {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Deltas();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.x = reader.readSint32();
                            break;
                        case 2:
                            message.y = reader.readSint32();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary(): Uint8Array {
                return this.serialize();
            }
            static deserializeBinary(bytes: Uint8Array): Deltas {
                return Deltas.deserialize(bytes);
            }
        }
    }
}
