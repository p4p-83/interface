# `interface`

> [!NOTE]
> Refer to [`p4p.jamesnzl.xyz/learn`](https://p4p.jamesnzl.xyz/learn) for full details.

This repository contains the user interface for our pick-and-place machine.

At present, it also contains the setup scripts to produce the [MediaMTX](https://github.com/bluenviron/mediamtx) real-time media server used to stream real-time video from the Raspberry Pi's camera(s).

The video is read from the sensor by `rpicam-vid`, before being piped to `ffmpeg`, which streams it to MediaMTX using RTSP.

The stream can then be accessed on a client using RTSP through a player such as VLC or IINA with
```sh
vlc rtsp://<raspberry.pi.ip.address>:8554/hq
# or
vlc rtsp://<raspberry.pi.ip.address>:8554/cm3
# or
iina rtsp://<raspberry.pi.ip.address>:8554/hq
# or
iina rtsp://<raspberry.pi.ip.address>:8554/cm3
```
or through WebRTC directly in a web browser at
```
http://<raspberry-pi-ip-address>:8889/hq
http://<raspberry-pi-ip-address>:8889/cm3
```

> [!warning]
> The RTSP latency is _bad_.  
> The WebRTC latency is 👌.

## Usage

Firstly, clone this repository. Set up [SSH Agent Forwarding](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/using-ssh-agent-forwarding) on the Raspberry Pi if needed.

### Video Real-Time Streaming

```sh
# TODO: configure HTTPS forward proxy
cd interface/streaming
bash setup.sh
bash run.sh

# note that run.sh will call setup.sh first if needed
```

### Client Interface

```sh
cd interface/client-prototype
npm ci
npm run build
# Open index.html in a browser
```

```sh
git submodule update --init
cd interface/client
npm ci
npm run dev
```

## Interfaces

### WebRTC

- WebRTC is used for the real-time low-latency video streaming from MediaMTX on the Raspberry Pi to the web interface.
- [`WebRtcVideo`](./client/src/components/WebRtcVideo.tsx) is a React component created using the [`Eyevinn/webrtc-player`](https://github.com/Eyevinn/webrtc-player) package to receive the WHEP stream and display it in a `<video>` tag.

### WebSocket

- A WebSocket is used for the real-time low-latency full-duplex data channel between the Raspberry Pi and the web interface.
- [`socket.ts`](./client/src/lib/socket.ts) implements the API for this data channel.
- [`socket.jl`](./stream/socket.jl) implements server-side listener.

#### Protocol Buffers

- [Protocol buffers](https://protobuf.dev/overview/) are used for data exchange.
- See [`p4p-83/protobufs`](https://github.com/p4p-83/protobufs) for the `.proto` definition(s).
<!-- - [`pnp.proto`](./client/src/proto/pnp/v1/pnp.proto) defines the serialisation, and `npm run protoc` will re-generate the TypeScript and Julia bindings. -->
