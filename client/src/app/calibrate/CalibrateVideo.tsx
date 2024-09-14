'use client'

import Link from 'next/link'
import { useState, type HTMLAttributes } from 'react'
// import { GearIcon } from '@radix-ui/react-icons'

import * as GLOBALS from '@/app/globals'
// import { FRAGMENT_IDS as LEARN_FRAGMENT_IDS } from '@/app/learn/fragments'
import { WebRtcVideo } from '@/components/WebRtcVideo'
import { Header } from '@/components/Header'
import { Error } from '@/components/Error'
import { TypographyInlineCode, TypographyMuted } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

import { Size } from './CalibrateInterface'
import { CalibrateOverlay } from './CalibrateOverlay'

type CalibrateVideoProps = HTMLAttributes<HTMLDivElement> & {
  videoUrl: string;
  socketUrl: string;
};

export function CalibrateVideo({ className, videoUrl, socketUrl }: CalibrateVideoProps) {
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
              label: (
                <Link href={GLOBALS.PAGES.SETTINGS.path}>Go to settings</Link>
              ),
              asChild: true,
            },
            // {
            //   key: 'viewDemo',
            //   label: (
            //     <Link href={GLOBALS.PAGES.LEARN.path + '#' + LEARN_FRAGMENT_IDS.PLACE_DEMO}>View a demo</Link>
            //   ),
            //   asChild: true,
            // },
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
        <CalibrateOverlay socketUrl={socketUrl} overlaySize={videoSize} circleSize={10} />
      )}

    </div>
  )
}
