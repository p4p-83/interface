#!/bin/bash

set -e

cd src/proto/pnp/v1

rm -f ./*.ts
rm -f ./*.jl

protoc --ts_out=. pnp.proto
julia -e 'using Pkg; Pkg.add("ProtoBuf"); using ProtoBuf; protojl("pnp.proto", ".", "../../")'

mv ../pnp.jl .
sed -i '' 's|v1/||' pnp.jl

# See James' Logbook for full details (30 June)
sed -i '' 's/x.tag != var"Message.Tags".HEARTBEAT && //g' pnp_pb.jl
