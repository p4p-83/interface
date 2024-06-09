'use client'

import { useEffect, useState, forwardRef } from 'react'
import { WebRTCPlayer } from '@eyevinn/webrtc-player'

import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

type WebRtcVideoProps = {
  url: string;
}

const WebRtcVideo = forwardRef<HTMLVideoElement, WebRtcVideoProps>(
  function WebRtcVideo({ url }, ref) {
    const [loadProgress, setLoadProgress] = useState(0)

    useEffect(() => {
      // This is nasty, but oh well. https://stackoverflow.com/a/65877297
      if (typeof ref === 'function' || !ref?.current) return

      const player = new WebRTCPlayer({
        video: ref.current,
        type: 'whep',
        statsTypeFilter: '^candidate-*|^inbound-rtp',
        timeoutThreshold: 5000,
        mediaConstraints: {
          videoOnly: true,
        },
      })

      setLoadProgress(2)

      player.load(new URL(url)).then(() => {
        setLoadProgress(60)
      })

      player.on('no-media', () => {
        console.log('media timeout occurred')
      })
      player.on('media-recovered', () => {
        console.log('media recovered')
      })

      // Subscribe for RTC stats: `stats:${RTCStatsType}`
      // TODO: Can this be used for other things
      player.on('stats:inbound-rtp', (report) => {
        if (report.kind === 'video') {
          console.log(report)
        }
      })

      return () => {
        player.unload()
        player.destroy()
      }

    }, [ref, url])

    useEffect(() => {
      // This is nasty, but oh well. https://stackoverflow.com/a/65877297
      if (typeof ref === 'function' || !ref?.current) return

      const generateUpdateProgressHandler = (value: number) => {
        return () => {
          console.log(value)
          setLoadProgress(value)
        }
      }

      const startHandler = generateUpdateProgressHandler(97)
      const metadataHandler = generateUpdateProgressHandler(99)
      const dataHandler = generateUpdateProgressHandler(100)

      const videoElement = ref.current
      videoElement.addEventListener('loadstart', startHandler)
      videoElement.addEventListener('loadedmetadata', metadataHandler)
      videoElement.addEventListener('loadeddata', dataHandler)

      return () => {
        videoElement.removeEventListener('loadstart', startHandler)
        videoElement.removeEventListener('loadedmetadata', metadataHandler)
        videoElement.removeEventListener('loadeddata', dataHandler)
      }
    }, [ref])

    return (
      <>
        <Progress value={loadProgress} className={cn(
          'absolute max-w-[50%]',
          (loadProgress === 100) ? 'hidden' : '',
        )}
        />

        <video ref={ref} autoPlay muted playsInline className='object-contain object-center h-full w-full pointer-events-none' />
      </>
    )

  }
)

export { WebRtcVideo }