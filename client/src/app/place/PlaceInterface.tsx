'use client'

import { useRef, useEffect, useState, RefObject } from 'react'

import { WebRtcVideo } from '@/components/WebRtcVideo'

type Size = {
  width: number;
  height: number;
}

type Position = {
  top: number;
  left: number;
}

type PlaceOverlayProps = {
  videoRef: RefObject<HTMLVideoElement | null>;
  circleSize: number
}

function PlaceOverlay({ videoRef, circleSize }: PlaceOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

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

  const [clickPosition, setClickPosition] = useState<Position | null>(null)

  useEffect(() => {
    if (!overlayRef?.current) return

    const handleClick = (event: MouseEvent) => {
      console.info(`Clicked at (${event.clientX}, ${event.clientY})`)

      setClickPosition({
        top: event.clientY,
        left: event.clientX,
      })
    }

    // Added to the overlay, so the user cannot click out of bounds!
    overlayRef.current.addEventListener('click', handleClick)

  }, [overlayRef])

  return (

    <>

      {/* Click circle */}
      <div className='absolute bg-primary rounded-full pointer-events-none cursor-crosshair hidden' style={
        {
          width: `${circleSize}px`,
          height: `${circleSize}px`,
          top: (clickPosition) ? `${clickPosition.top - (circleSize / 2)}px` : '0',
          left: (clickPosition) ? `${clickPosition.left - (circleSize / 2)}px` : '0',
          display: (clickPosition) ? 'block' : 'none',
        }
      }
      />

      {/* Overlay */}
      <div ref={overlayRef} className='absolute cursor-crosshair' style={
        {
          width: (overlaySize) ? `${overlaySize.width}px` : '0',
          height: (overlaySize) ? `${overlaySize.height}px` : '0',
        }
      }
      />

    </>

  )
}

export default function PlaceInterface() {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (

    <>

      <div className='flex justify-center items-center w-screen h-screen'>
        <WebRtcVideo ref={videoRef} url='http://localhost:8889/facetime/whep' />
      </div>

      <PlaceOverlay videoRef={videoRef} circleSize={10} />

    </>

  )
}