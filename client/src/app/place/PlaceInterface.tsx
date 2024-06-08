'use client'

import { useRef, useEffect, useState, RefObject } from 'react'

import { WebRtcVideo } from '@/components/WebRtcVideo'

type Size = {
  width: number;
  height: number;
}

type PlaceOverlayProps = {
  videoRef: RefObject<HTMLVideoElement | null>;
}

function PlaceOverlay({ videoRef }: PlaceOverlayProps) {
  const [overlaySize, setOverlaySize] = useState<Size | null>(null)

  useEffect(() => {

    const updateVideoBounds = () => {
      if (!videoRef?.current) return

      if (videoRef.current.videoWidth === 0 || videoRef.current.videoHeight === 0) {
        setOverlaySize(null)
        return
      }

      const scalingFactors = {
        width: videoRef.current.clientWidth / videoRef.current.videoWidth,
        height: videoRef.current.clientHeight / videoRef.current.videoHeight,
      }

      const limitingScalarFactor = (scalingFactors.width >= scalingFactors.height)
        // Black bars on the sides
        ? scalingFactors.height
        // Black bars on the top/bottom
        : scalingFactors.width

      console.log('Updated overlay!')

      setOverlaySize({
        width: limitingScalarFactor * videoRef.current.videoWidth,
        height: limitingScalarFactor * videoRef.current.videoHeight,
      })
    }

    window.addEventListener('resize', updateVideoBounds)
    videoRef.current?.addEventListener('loadedmetadata', updateVideoBounds)

    return () => {
      window.removeEventListener('resize', updateVideoBounds)
    }

  }, [videoRef, overlaySize])

  return (
    <div className='absolute cursor-crosshair' style={
      {
        width: (overlaySize) ? `${overlaySize.width}px` : '0',
        height: (overlaySize) ? `${overlaySize.height}px` : '0',
      }
    }></div>
  )
}

export default function PlaceInterface() {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (

    <>

      <div className='flex justify-center items-center w-screen h-screen'>
        <WebRtcVideo ref={videoRef} url='http://localhost:8889/facetime/whep' />
      </div>

      <PlaceOverlay videoRef={videoRef} />

    </>

  )
}