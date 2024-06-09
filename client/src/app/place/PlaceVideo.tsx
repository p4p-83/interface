'use client'

import { useRef, type HTMLAttributes } from 'react'

import { WebRtcVideo } from '@/components/WebRtcVideo'
import { cn } from '@/lib/utils'

import { PlaceOverlay } from './PlaceOverlay'

interface PlaceVideoProps extends HTMLAttributes<HTMLDivElement> {
	videoUrl: string;
  socketUrl: string;
}

export function PlaceVideo({ className, videoUrl, socketUrl }: PlaceVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div className={cn('flex justify-center items-center', className)}>

      <div className='relative flex justify-center items-center w-full h-full'>
        <WebRtcVideo ref={videoRef} url={videoUrl} />
      </div>

      <PlaceOverlay videoRef={videoRef} socketUrl={socketUrl} circleSize={10} />

    </div>
  )
}
