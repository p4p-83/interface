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
    if (!videoRef?.current) return

    const videoElement = videoRef.current

    const updateVideoBounds = () => {
      if (videoElement.videoWidth === 0 || videoElement.videoHeight === 0) {
        setOverlaySize(null)
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

      setOverlaySize({
        width: limitingScalarFactor * videoElement.videoWidth,
        height: limitingScalarFactor * videoElement.videoHeight,
      })

      console.log(`Updated overlay to ${limitingScalarFactor * videoElement.videoWidth}x${limitingScalarFactor * videoElement.videoHeight}`)
    }

    window.addEventListener('resize', updateVideoBounds)
    videoElement.addEventListener('loadedmetadata', updateVideoBounds)

    return () => {
      window.removeEventListener('resize', updateVideoBounds)
      videoElement.removeEventListener('loadedmetadata', updateVideoBounds)
    }

  }, [videoRef])

  const [clickPosition, setClickPosition] = useState<Position | null>(null)

  useEffect(() => {
    if (!overlayRef?.current) return

    const handleClick = (event: MouseEvent) => {
      if (!overlaySize) return

      setClickPosition({
        top: event.clientY,
        left: event.clientX,
      })

      const normalisedClick = {
        x: event.offsetX - (overlaySize.width / 2),
        y: event.offsetY - (overlaySize.height / 2),
      }

      console.info(`Clicked at (${event.offsetX}, ${event.offsetY}) -> (${normalisedClick.x}, ${normalisedClick.y})`)
    }

    // Added to the overlay, so the user cannot click out of bounds!
    const overlayElement = overlayRef.current
    overlayElement.addEventListener('click', handleClick)

    return () => {
      overlayElement.removeEventListener('click', handleClick)
    }

  }, [overlayRef, overlaySize])

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

      <div className='relative flex justify-center items-center w-screen h-screen'>
        <WebRtcVideo ref={videoRef} url='http://localhost:8889/facetime/whep' />
      </div>

      <PlaceOverlay videoRef={videoRef} circleSize={10} />

    </>

  )
}