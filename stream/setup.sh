#!/bin/bash

set -e

mkdir mediamtx
cd mediamtx

# The version here is hard-coded for repeatability
wget https://github.com/bluenviron/mediamtx/releases/download/v1.8.3/mediamtx_v1.8.3_linux_arm64v8.tar.gz
tar -xvzf mediamtx_v1.8.3_linux_arm64v8.tar.gz

cp ../mediamtx.yml .
