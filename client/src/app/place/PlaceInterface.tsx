import { PlaceVideo } from './PlaceVideo'

export type Size = {
  width: number;
  height: number;
}

export type Position = {
  top: number;
  left: number;
}

const WHEP_URL = 'http://localhost:8889/facetime/whep'

export default function PlaceInterface() {
  return (

    <>

      <PlaceVideo className='w-screen h-screen' url={WHEP_URL} />

    </>

  )
}
