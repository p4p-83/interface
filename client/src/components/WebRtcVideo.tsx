'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef, type Dispatch, type SetStateAction } from 'react'
import { WebRTCPlayer } from '@eyevinn/webrtc-player'
import { toast } from 'sonner'

import { Progress } from '@/components/ui/progress'
import { ToastIds, DISMISS_BUTTON } from '@/components/ui/sonner'

import { Size } from '@/app/place/PlaceInterface'

const PROGRESS_BAR = {
  INITIAL: 0,
  FINAL: 100,
  // Fixed progresses
  PLAYER_CONSTRUCTED: 2,
  PLAYER_LOADED: 20,
  VIDEO_LOAD_START: 67,
  VIDEO_LOADED_METADATA: 99,
  VIDEO_LOADED_DATA: 100,
  // Interval increments
  INCREMENT: 1,
  INCREMENT_FINAL: 98,
  INCREMENT_INTERVAL_MS: 50,
} as const

type WebRtcVideoProps = {
  url: string;
  setVideoSize?: Dispatch<SetStateAction<Size | null>>;
  setIsVideoStreaming?: Dispatch<SetStateAction<boolean>>;
}

export function WebRtcVideo({ url, setVideoSize, setIsVideoStreaming }: WebRtcVideoProps) {
  const router = useRouter()

  const videoRef = useRef<HTMLVideoElement>(null)
  const intervalRef = useRef<number | null>(null)

  const [loadProgress, setLoadProgress] = useState<number>(PROGRESS_BAR.INITIAL)

  // WebRTCPlayer
  useEffect(() => {
    if (!videoRef?.current) return

    const player = new WebRTCPlayer({
      video: videoRef.current,
      type: 'whep',
      statsTypeFilter: '^inbound-rtp',
      timeoutThreshold: 5000,
      detectTimeout: true,
      mediaConstraints: {
        videoOnly: true,
      },
    })

    setLoadProgress(PROGRESS_BAR.PLAYER_CONSTRUCTED)

    player.load(new URL(url))
      .then(() => setLoadProgress(PROGRESS_BAR.PLAYER_LOADED))

    function handleConnectError() {
      setLoadProgress(PROGRESS_BAR.PLAYER_LOADED)
      if (intervalRef.current) clearInterval(intervalRef.current)

      setIsVideoStreaming?.(false)

      toast.error('Video stream error!', {
        id: ToastIds.VIDEO_ERROR,
        action: {
          label: 'Go home',
          onClick: () => router.push('/'),
        },
        classNames: {
          'actionButton': 'group-[.toast]:!bg-destructive group-[.toast]:!text-destructive-foreground',
        },
        duration: Infinity,
      })
    }

    player.on('initial-connection-failed', handleConnectError)
    player.on('connect-error', handleConnectError)

    player.on('no-media', () => {
      console.log('Media timeout occurred')
      toast.warning('Stream timed out!', {
        id: ToastIds.VIDEO_STATUS,
        cancel: DISMISS_BUTTON,
      })
    })
    player.on('media-recovered', () => {
      console.log('Media recovered')
      toast.success('Stream recovered!', {
        id: ToastIds.VIDEO_STATUS,
        cancel: DISMISS_BUTTON,
      })
    })

    player.on('stats:inbound-rtp', console.log)

    return () => {
      player.unload()
      player.destroy()
    }

  }, [router, videoRef, setIsVideoStreaming, url])

  // Video size
  useEffect(() => {
    if (!videoRef?.current) return
    if (!setVideoSize) return

    const videoElement = videoRef.current

    function updateVideoBounds() {
      if (videoElement.videoWidth === 0 || videoElement.videoHeight === 0) {
        setVideoSize?.(null)
        return
      }

      const scalingFactors = {
        width: videoElement.clientWidth / videoElement.videoWidth,
        height: videoElement.clientHeight / videoElement.videoHeight,
      }

      const limitingScalarFactor = (scalingFactors.width >= scalingFactors.height)
        // Black bars on the sides
        ? scalingFactors.height
        // Black bars on the top/bottom
        : scalingFactors.width

      setVideoSize?.({
        width: limitingScalarFactor * videoElement.videoWidth,
        height: limitingScalarFactor * videoElement.videoHeight,
      })

      console.log(`Updated video size to ${limitingScalarFactor * videoElement.videoWidth}x${limitingScalarFactor * videoElement.videoHeight}`)
    }

    window.addEventListener('resize', updateVideoBounds)
    videoElement.addEventListener('loadedmetadata', updateVideoBounds)

    return () => {
      setVideoSize?.(null)
      window.removeEventListener('resize', updateVideoBounds)
      videoElement.removeEventListener('loadedmetadata', updateVideoBounds)
    }
  }, [videoRef, setVideoSize])

  // Progress bar
  useEffect(() => {
    if (!videoRef?.current) return
    const videoElement = videoRef.current

    const startHandler = () => setLoadProgress(PROGRESS_BAR.VIDEO_LOAD_START)
    const metadataHandler = () => setLoadProgress(PROGRESS_BAR.VIDEO_LOADED_METADATA)
    const dataHandler = () => {
      setLoadProgress(PROGRESS_BAR.VIDEO_LOADED_DATA)
      setIsVideoStreaming?.(true)
    }

    videoElement.addEventListener('loadstart', startHandler)
    videoElement.addEventListener('loadedmetadata', metadataHandler)
    videoElement.addEventListener('loadeddata', dataHandler)

    return () => {
      setIsVideoStreaming?.(false)
      videoElement.removeEventListener('loadstart', startHandler)
      videoElement.removeEventListener('loadedmetadata', metadataHandler)
      videoElement.removeEventListener('loadeddata', dataHandler)
    }
  }, [videoRef, setIsVideoStreaming])

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
      {(loadProgress !== PROGRESS_BAR.FINAL) && (
        <Progress value={loadProgress} className='absolute max-w-[50%]'/>
      )}

      <video ref={videoRef} autoPlay muted playsInline className='object-contain object-center h-full w-full pointer-events-none' />
    </>
  )

}
