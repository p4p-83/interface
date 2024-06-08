'use client'

import { useEffect, forwardRef } from 'react'
import { WebRTCPlayer } from '@eyevinn/webrtc-player'

type WebRtcVideoProps = {
  url: string;
}

const WebRtcVideo = forwardRef<HTMLVideoElement, WebRtcVideoProps>(
  function WebRtcVideo({ url }, ref) {

    useEffect(() => {
      // This is nasty, but oh well. https://stackoverflow.com/a/65877297
      if (typeof ref === 'function' || !ref?.current) return

      const player = new WebRTCPlayer({
        video: ref.current,
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

    return (
      <video ref={ref} autoPlay muted playsInline className='object-contain object-center h-full w-full pointer-events-none' />
    )

  }
)

export { WebRtcVideo }