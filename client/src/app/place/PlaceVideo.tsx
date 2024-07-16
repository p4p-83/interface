'use client'

import Link from 'next/link'
import { useState, type HTMLAttributes } from 'react'
import { GearIcon } from '@radix-ui/react-icons'

import * as GLOBALS from '@/app/globals'
import { FRAGMENT_IDS as LEARN_FRAGMENT_IDS } from '@/app/learn/fragments'
import { WebRtcVideo } from '@/components/WebRtcVideo'
import { Header } from '@/components/Header'
import { Error } from '@/components/Error'
import { TypographyInlineCode, TypographyMuted } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

import { Size } from './PlaceInterface'
import { PlaceOverlay } from './PlaceOverlay'

type PlaceVideoProps = HTMLAttributes<HTMLDivElement> & {
  videoUrl: string;
  socketUrl: string;
};

export function PlaceVideo({ className, videoUrl, socketUrl }: PlaceVideoProps) {
  const [videoSize, setVideoSize] = useState<Size | null>(null)
  const [isVideoStreaming, setIsVideoStreaming] = useState(false)
  const [hasVideoErrored, setHasVideoErrored] = useState(false)

  if (hasVideoErrored) {
    return (
      <>
        <Header />
        <Error
          className={className}
          homeButtonVariant='outline'
          additionalButtons={[
            {
              key: 'configureSettings',
              size: 'icon',
              variant: 'outline',
              label: (
                <Link href={GLOBALS.PAGES.SETTINGS.path}><GearIcon className='h-[1.2rem] w-[1.2rem]' /></Link>
              ),
              asChild: true,
            },
            {
              key: 'viewDemo',
              label: (
                <Link href={GLOBALS.PAGES.LEARN.path + '#' + LEARN_FRAGMENT_IDS.PLACE_DEMO}>View a demo</Link>
              ),
              asChild: true,
            },
          ]}
        >
          <TypographyMuted>
            Failed to stream video from <TypographyInlineCode>{videoUrl}</TypographyInlineCode>.
          </TypographyMuted>
        </Error>
      </>
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
        <PlaceOverlay socketUrl={socketUrl} overlaySize={videoSize} circleSize={17.5} />
      )}

    </div>
  )
}
