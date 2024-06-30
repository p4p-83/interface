#!/bin/bash

set -e

cd src/proto/pnp/v1

rm -f ./*.ts
rm -f ./*.jl

protoc --ts_out=. pnp.proto
julia -e 'using Pkg; Pkg.add("ProtoBuf"); using ProtoBuf; protojl("pnp.proto", ".", "../../")'

# unroll nested folders
mv ../pnp.jl .
sed -i '' 's|v1/||' pnp.jl
