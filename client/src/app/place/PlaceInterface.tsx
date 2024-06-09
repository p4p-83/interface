import { PlaceVideo } from './PlaceVideo'

export type Size = {
  width: number;
  height: number;
}

export type Position = {
  x: number;
  y: number;
}

const URLS = {
  WHEP_VIDEO_STREAM: 'http://localhost:8889/facetime/whep',
  WEB_SOCKET: 'ws://0.0.0.0:8080',
}

export default function PlaceInterface() {
  return (

    <>

      <PlaceVideo className='w-screen h-screen' videoUrl={URLS.WHEP_VIDEO_STREAM} socketUrl={URLS.WEB_SOCKET} />

    </>

  )
}
