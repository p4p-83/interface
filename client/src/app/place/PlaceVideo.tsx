'use client'

import { useRef } from 'react'

import { WebRtcVideo } from '@/components/WebRtcVideo'

import { PlaceOverlay } from './PlaceOverlay'

type PlaceVideoProps = {
	url: string;
}

export function PlaceVideo({ url }: PlaceVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (

    <>

      <div className='flex justify-center items-center w-screen h-screen'>

        <div className='relative flex justify-center items-center w-full h-full'>
          <WebRtcVideo ref={videoRef} url={url} />
        </div>

        <PlaceOverlay videoRef={videoRef} circleSize={10} />

      </div>

    </>

  )
}
