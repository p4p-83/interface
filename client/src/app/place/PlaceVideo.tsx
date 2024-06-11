'use client'

import { useState, type HTMLAttributes } from 'react'

import { WebRtcVideo } from '@/components/WebRtcVideo'
import { cn } from '@/lib/utils'

import { Size } from './PlaceInterface'
import { PlaceOverlay } from './PlaceOverlay'

interface PlaceVideoProps extends HTMLAttributes<HTMLDivElement> {
	videoUrl: string;
  socketUrl: string;
}

export function PlaceVideo({ className, videoUrl, socketUrl }: PlaceVideoProps) {
  const [videoSize, setVideoSize] = useState<Size | null>(null)
  const [isVideoStreaming, setIsVideoStreaming] = useState(false)

  return (
    <div className={cn('flex justify-center items-center', className)}>

      <div className='relative flex justify-center items-center w-full h-full'>
        <WebRtcVideo url={videoUrl} setVideoSize={setVideoSize} setIsVideoStreaming={setIsVideoStreaming} />
      </div>

      <PlaceOverlay socketUrl={socketUrl} overlaySize={videoSize} circleSize={10} hideOverlay={!isVideoStreaming} />

    </div>
  )
}
