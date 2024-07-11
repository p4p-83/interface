'use client'

import { useEffect, useState, useRef, type Dispatch, type SetStateAction } from 'react'
import { WebRTCPlayer } from '@eyevinn/webrtc-player'
import { toast } from 'sonner'

import { Progress } from '@/components/ui/progress'
import { ToastIds, DISMISS_BUTTON } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'

import { Size } from '@/app/place/PlaceInterface'

type ProgressBarState = {
  current: number;
  growthStop: number;
}

const PROGRESS_BAR = {
  INITIAL: 0,
  FINAL: 100,
  // Fixed progresses
  PLAYER_CONSTRUCTED: 2,
  PLAYER_LOADED: 15,
  VIDEO_LOAD_START: 30,
  VIDEO_LOADED_METADATA: 85,
  VIDEO_LOADED_DATA: 99.99,
  // Interval increments
  // ? https://www.desmos.com/calculator/4pelacztnu
  getIncrement: (n: number) => (50 / (n + 100)),
  INCREMENT_INTERVAL_MS: 25,
  // Delay before hiding
  LOADED_DELAY_MS: 325,
} as const

type WebRtcVideoProps = {
  url: string;
  setVideoSize?: Dispatch<SetStateAction<Size | null>>;
  setIsVideoStreaming?: Dispatch<SetStateAction<boolean>>;
  setHasVideoErrored?: Dispatch<SetStateAction<boolean>>;
};

export function WebRtcVideo({ url, setVideoSize, setIsVideoStreaming, setHasVideoErrored }: WebRtcVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const errorRef = useRef(false)
  const intervalRef = useRef<number | null>(null)
  const intervalNRef = useRef(1)

  // TODO: Pull into own component?
  const [loadProgress, setLoadProgress] = useState<ProgressBarState>({
    current: PROGRESS_BAR.INITIAL,
    growthStop: PROGRESS_BAR.INITIAL,
  })

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

    setLoadProgress({
      current: PROGRESS_BAR.PLAYER_CONSTRUCTED,
      growthStop: PROGRESS_BAR.PLAYER_LOADED,
    })

    player.load(new URL(url))
      .then(() => setLoadProgress({
        current: PROGRESS_BAR.PLAYER_LOADED,
        growthStop: PROGRESS_BAR.VIDEO_LOAD_START,
      }))

    function handleConnectError(error?: unknown) {
      console.error('Connect error: ', error)

      setLoadProgress({
        current: PROGRESS_BAR.PLAYER_LOADED,
        growthStop: PROGRESS_BAR.PLAYER_LOADED,
      });
      (intervalRef.current) && clearInterval(intervalRef.current)

      setIsVideoStreaming?.(false)
      setHasVideoErrored?.(true)

      if (errorRef.current) return
      toast.error('Video stream error!', {
        id: ToastIds.VIDEO_ERROR,
        cancel: DISMISS_BUTTON,
        duration: 6000,
      })
      errorRef.current = true
    }

    // Notify error if host is unreachable
    fetch(url.replace('/whep', ''), {
      method: 'GET',
      priority: 'low',
    })
      .then(response => {
        if (response.ok) {
          console.log('Host is reachable', response)
        }
        else {
          console.log('Host is not reachable', response)
        }
      })
      .catch(handleConnectError)

    player.on('peer-connection-failed', handleConnectError)
    player.on('initial-connection-failed', handleConnectError)
    player.on('connect-error', handleConnectError)

    player.on('no-media', () => {
      console.log('Media timeout occurred')
      setIsVideoStreaming?.(false)
      toast.warning('Stream timed out!', {
        id: ToastIds.VIDEO_STATUS,
        cancel: DISMISS_BUTTON,
      })
    })
    player.on('media-recovered', () => {
      console.log('Media recovered')
      setIsVideoStreaming?.(true)
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

  }, [videoRef, setIsVideoStreaming, setHasVideoErrored, url])

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

    const handleStart = () => {
      setLoadProgress({
        current: PROGRESS_BAR.VIDEO_LOAD_START,
        growthStop: PROGRESS_BAR.VIDEO_LOADED_METADATA,
      })
    }
    const handleMetadata = () => {
      setLoadProgress({
        current: PROGRESS_BAR.VIDEO_LOADED_METADATA,
        growthStop: PROGRESS_BAR.VIDEO_LOADED_DATA,
      })
    }
    const handleData = async () => {
      setLoadProgress({
        current: PROGRESS_BAR.VIDEO_LOADED_DATA,
        growthStop: PROGRESS_BAR.VIDEO_LOADED_DATA,
      })

      await new Promise((resolve) => setTimeout(resolve, PROGRESS_BAR.LOADED_DELAY_MS))
      setLoadProgress({
        current: PROGRESS_BAR.FINAL,
        growthStop: PROGRESS_BAR.FINAL,
      })
      setIsVideoStreaming?.(true)
    }

    videoElement.addEventListener('loadstart', handleStart)
    videoElement.addEventListener('loadedmetadata', handleMetadata)
    videoElement.addEventListener('loadeddata', handleData)

    return () => {
      setIsVideoStreaming?.(false)
      videoElement.removeEventListener('loadstart', handleStart)
      videoElement.removeEventListener('loadedmetadata', handleMetadata)
      videoElement.removeEventListener('loadeddata', handleData)
    }
  }, [videoRef, setIsVideoStreaming])

  // Growing progress bar
  useEffect(() => {
    intervalNRef.current = 1

    intervalRef.current = window.setInterval(() => {
      setLoadProgress((previousProgress) => {
        const incremented = (previousProgress.current + PROGRESS_BAR.getIncrement(intervalNRef.current++))

        if (incremented >= previousProgress.growthStop) {
          (intervalRef.current) && clearInterval(intervalRef.current)
          return previousProgress
        }

        return {
          current: incremented,
          growthStop: previousProgress.growthStop,
        }
      })
    }, PROGRESS_BAR.INCREMENT_INTERVAL_MS)

    return () => {
      (intervalRef.current) && clearInterval(intervalRef.current)
    }
  }, [loadProgress.growthStop])

  return (
    <>
      {(loadProgress.current !== PROGRESS_BAR.FINAL) && (
        <Progress value={loadProgress.current} className='absolute max-w-[50%]' />
      )}

      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className={cn(
          'object-contain object-center h-full w-full pointer-events-none',
          (loadProgress.current !== PROGRESS_BAR.FINAL) && 'invisible'
        )}
      />
    </>
  )

}
