# Autogenerated using ProtoBuf.jl v1.0.15 on 2024-07-01T00:43:23.894
# original file: /Users/james/Developer/uoa/p4/p4p/interface/client/src/proto/pnp/v1/pnp.proto (proto3 syntax)

import ProtoBuf as PB
using ProtoBuf: OneOf
using ProtoBuf.EnumX: @enumx

export var"Message.Deltas", var"Message.Tags", Message

struct var"Message.Deltas"
    x::Int32
    y::Int32
end
PB.default_values(::Type{var"Message.Deltas"}) = (;x = zero(Int32), y = zero(Int32))
PB.field_numbers(::Type{var"Message.Deltas"}) = (;x = 1, y = 2)

function PB.decode(d::PB.AbstractProtoDecoder, ::Type{<:var"Message.Deltas"})
    x = zero(Int32)
    y = zero(Int32)
    while !PB.message_done(d)
        field_number, wire_type = PB.decode_tag(d)
        if field_number == 1
            x = PB.decode(d, Int32, Val{:zigzag})
        elseif field_number == 2
            y = PB.decode(d, Int32, Val{:zigzag})
        else
            PB.skip(d, wire_type)
        end
    end
    return var"Message.Deltas"(x, y)
end

function PB.encode(e::PB.AbstractProtoEncoder, x::var"Message.Deltas")
    initpos = position(e.io)
    x.x != zero(Int32) && PB.encode(e, 1, x.x, Val{:zigzag})
    x.y != zero(Int32) && PB.encode(e, 2, x.y, Val{:zigzag})
    return position(e.io) - initpos
end
function PB._encoded_size(x::var"Message.Deltas")
    encoded_size = 0
    x.x != zero(Int32) && (encoded_size += PB._encoded_size(x.x, 1, Val{:zigzag}))
    x.y != zero(Int32) && (encoded_size += PB._encoded_size(x.y, 2, Val{:zigzag}))
    return encoded_size
end

@enumx var"Message.Tags" HEARTBEAT=0 TARGET_DELTAS=1 MOVED_DELTAS=2

struct Message
    tag::var"Message.Tags".T
    payload::Union{Nothing,OneOf{var"Message.Deltas"}}
end
PB.oneof_field_types(::Type{Message}) = (;
    payload = (;deltas=var"Message.Deltas"),
)
PB.default_values(::Type{Message}) = (;tag = var"Message.Tags".HEARTBEAT, deltas = nothing)
PB.field_numbers(::Type{Message}) = (;tag = 1, deltas = 2)

function PB.decode(d::PB.AbstractProtoDecoder, ::Type{<:Message})
    tag = var"Message.Tags".HEARTBEAT
    payload = nothing
    while !PB.message_done(d)
        field_number, wire_type = PB.decode_tag(d)
        if field_number == 1
            tag = PB.decode(d, var"Message.Tags".T)
        elseif field_number == 2
            payload = OneOf(:deltas, PB.decode(d, Ref{var"Message.Deltas"}))
        else
            PB.skip(d, wire_type)
        end
    end
    return Message(tag, payload)
end

function PB.encode(e::PB.AbstractProtoEncoder, x::Message)
    initpos = position(e.io)
    PB.encode(e, 1, x.tag)
    if isnothing(x.payload);
    elseif x.payload.name === :deltas
        PB.encode(e, 2, x.payload[]::var"Message.Deltas")
    end
    return position(e.io) - initpos
end
function PB._encoded_size(x::Message)
    encoded_size = 0
    (encoded_size += PB._encoded_size(x.tag, 1))
    if isnothing(x.payload);
    elseif x.payload.name === :deltas
        encoded_size += PB._encoded_size(x.payload[]::var"Message.Deltas", 2)
    end
    return encoded_size
end
