# `interface`

> [!NOTE]
> Refer to [`p4p.jamesnzl.xyz/learn`](https://p4p.jamesnzl.xyz/learn) for full details.

This repository contains the user interface for our pick-and-place machine.

## Usage

Firstly, clone this repository. Set up [SSH Agent Forwarding](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/using-ssh-agent-forwarding) on the Raspberry Pi if needed.

### Bare-Bones Prototype

```sh
cd interface/client-prototype
npm ci
npm run build
# Open index.html in a browser
```

### Main Application

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

#### Protocol Buffers

- [Protocol buffers](https://protobuf.dev/overview/) are used for data exchange.
- See [`p4p-83/protobufs`](https://github.com/p4p-83/protobufs) for the `.proto` definition(s).
<!-- - [`pnp.proto`](./client/src/proto/pnp/v1/pnp.proto) defines the serialisation, and `npm run protoc` will re-generate the TypeScript and Julia bindings. -->
