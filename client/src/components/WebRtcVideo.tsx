'use client'

import { useEffect, useState, useRef, forwardRef } from 'react'
import { WebRTCPlayer } from '@eyevinn/webrtc-player'
import { toast } from 'sonner'

import { Progress } from '@/components/ui/progress'
import { dismissButton } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'

const PROGRESS_BAR = {
  INITIAL: 0,
  FINAL: 100,
  // Fixed progresses
  PLAYER_CONSTRUCTED: 2,
  PLAYER_LOADED: 25,
  VIDEO_LOAD_START: 87,
  VIDEO_LOADED_METADATA: 99,
  VIDEO_LOADED_DATA: 100,
  // Interval increments
  INCREMENT: 1,
  INCREMENT_FINAL: 98,
  INCREMENT_INTERVAL_MS: 50,
} as const

type WebRtcVideoProps = {
  url: string;
}

const WebRtcVideo = forwardRef<HTMLVideoElement, WebRtcVideoProps>(
  function WebRtcVideo({ url }, ref) {
    const [loadProgress, setLoadProgress] = useState<number>(PROGRESS_BAR.INITIAL)
    const intervalRef = useRef<number | null>(null)

    // WebRTCPlayer
    useEffect(() => {
      // This is nasty, but oh well. https://stackoverflow.com/a/65877297
      if (typeof ref === 'function' || !ref?.current) return

      const player = new WebRTCPlayer({
        video: ref.current,
        type: 'whep',
        // statsTypeFilter: '^candidate-*|^inbound-rtp',
        timeoutThreshold: 5000,
        mediaConstraints: {
          videoOnly: true,
        },
      })

      setLoadProgress(PROGRESS_BAR.PLAYER_CONSTRUCTED)

      player.load(new URL(url)).then(() => {
        setLoadProgress(PROGRESS_BAR.PLAYER_LOADED)
      })

      player.on('no-media', () => {
        console.log('Media timeout occurred')
        toast.warning('Stream timed out!', {
          cancel: dismissButton,
        })
      })
      player.on('media-recovered', () => {
        console.log('Media recovered')
        toast.success('Stream recovered!', {
          cancel: dismissButton,
        })
      })

      return () => {
        player.unload()
        player.destroy()
      }

    }, [ref, url])

    // Progress bar
    useEffect(() => {
      // This is nasty, but oh well. https://stackoverflow.com/a/65877297
      if (typeof ref === 'function' || !ref?.current) return

      const startHandler = () => setLoadProgress(PROGRESS_BAR.VIDEO_LOAD_START)
      const metadataHandler = () => setLoadProgress(PROGRESS_BAR.VIDEO_LOADED_METADATA)
      const dataHandler = () => setLoadProgress(PROGRESS_BAR.VIDEO_LOADED_DATA)

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

    // Growing progress bar
    useEffect(() => {
      intervalRef.current = window.setInterval(() => {
        setLoadProgress((previousProgress) => {
          const incremented = (previousProgress + PROGRESS_BAR.INCREMENT)
          if (incremented <= PROGRESS_BAR.INCREMENT_FINAL) {
            return incremented
          }

          if (intervalRef.current) clearInterval(intervalRef.current)
          return previousProgress
        })
      }, PROGRESS_BAR.INCREMENT_INTERVAL_MS)

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }, [])

    return (
      <>
        <Progress value={loadProgress} className={cn(
          'absolute max-w-[50%]',
          (loadProgress === PROGRESS_BAR.FINAL) ? 'hidden' : '',
        )}
        />

        <video ref={ref} autoPlay muted playsInline className='object-contain object-center h-full w-full pointer-events-none' />
      </>
    )

  }
)

export { WebRtcVideo }