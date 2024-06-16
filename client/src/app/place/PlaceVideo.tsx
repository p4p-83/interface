'use client'

import { useState, type HTMLAttributes } from 'react'

import { WebRtcVideo } from '@/components/WebRtcVideo'
import { Error } from '@/components/Error'
import { TypographyInlineCode, TypographyMuted } from '@/components/ui/typography'
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
  const [hasVideoErrored, setHasVideoErrored] = useState(false)

  if (hasVideoErrored) {
    return (
      <Error className={className}>
        <TypographyMuted>
          Failed to stream video from <TypographyInlineCode>{videoUrl}</TypographyInlineCode>.
        </TypographyMuted>
      </Error>
    )
  }

  return (
    <div className={cn('flex justify-center items-center', className)}>

      <div className='relative flex justify-center items-center w-full h-full'>
        <WebRtcVideo
          url={videoUrl}
          setVideoSize={setVideoSize}
          setIsVideoStreaming={setIsVideoStreaming}
          setHasVideoErrored={setHasVideoErrored}
        />
      </div>

      {(isVideoStreaming) && (
        <PlaceOverlay socketUrl={socketUrl} overlaySize={videoSize} circleSize={10} />
      )}

    </div>
  )
}
