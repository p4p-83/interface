'use client'

import { useRef, useEffect } from 'react'
import { WebRTCPlayer } from '@eyevinn/webrtc-player'

type WebRtcVideoProps = {
  url: string;
}

export function WebRtcVideo({ url }: WebRtcVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current) return

    const player = new WebRTCPlayer({
      video: videoRef.current,
      type: 'whep',
      statsTypeFilter: '^candidate-*|^inbound-rtp',
    })

    player.load(new URL(url)).then(() => {
      player.unmute()
    })

    player.on('no-media', () => {
      console.log('media timeout occurred')
    })
    player.on('media-recovered', () => {
      console.log('media recovered')
    })

    // Subscribe for RTC stats: `stats:${RTCStatsType}`
    // TODO: Can this be used for other things?
    player.on('stats:inbound-rtp', (report) => {
      if (report.kind === 'video') {
        console.log(report)
      }
    })
  }, [url])

  return (
    <video ref={videoRef} autoPlay muted playsInline className='absolute top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none' />
  )
}