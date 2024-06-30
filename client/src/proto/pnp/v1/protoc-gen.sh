#!/bin/bash

set -e

cd src/proto/pnp/v1

rm -f ./*.js
rm -f ./*.ts

pbjs -t static-module -w commonjs -o ./pnp.js ./pnp.proto
pbts -o pnp.d.ts pnp.js
