'use client'

import { useRouter } from 'next/navigation'
import { useState, type HTMLAttributes } from 'react'

import { WebRtcVideo } from '@/components/WebRtcVideo'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { Size } from './PlaceInterface'
import { PlaceOverlay } from './PlaceOverlay'
import { TypographyP, TypographyInlineCode, TypographyMuted, TypographyH2 } from '@/components/ui/typography'

interface PlaceVideoProps extends HTMLAttributes<HTMLDivElement> {
	videoUrl: string;
  socketUrl: string;
}

export function PlaceVideo({ className, videoUrl, socketUrl }: PlaceVideoProps) {
  const router = useRouter()

  const [videoSize, setVideoSize] = useState<Size | null>(null)
  const [isVideoStreaming, setIsVideoStreaming] = useState(false)
  const [hasVideoErrored, setHasVideoErrored] = useState(false)

  if (hasVideoErrored) {
    return (
      <div className={cn('flex flex-col justify-center items-center gap-8 max-w-fit max-h-fit', className)}>
        <div>
          <TypographyH2>Bugger!</TypographyH2>
          <TypographyP>
            <TypographyMuted>
              Failed to stream video from <TypographyInlineCode>{videoUrl}</TypographyInlineCode>.
            </TypographyMuted>
          </TypographyP>
        </div>

        <div className='w-full'>
          <Button className='w-full' onClick={() => router.push('/')}>
            Go home
          </Button>
        </div>
      </div>
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
