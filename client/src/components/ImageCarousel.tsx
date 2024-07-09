'use client'

import Image, { type ImageProps } from 'next/image'
import { useState, useEffect } from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

type ImageCarouselImage = {
  src: ImageProps['src'];
  caption: string;
}

type ImageCarouselProps = {
  images: ImageCarouselImage[];
  className?: string;
  captionClassName?: string;
}

export function ImageCarousel({ images, className, captionClassName }: ImageCarouselProps) {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div>

      <Carousel
        setApi={setApi}
        className={cn('w-full', className)}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {images.map(({ src, caption }) => (
            <CarouselItem key={caption}>
              <Image
                src={src}
                alt={caption}
                placeholder='blur'
                quality={85}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className={cn('py-4 text-center text-xs sm:text-sm text-muted-foreground', captionClassName)}>
        {images[current].caption}
      </div>

    </div>
  )
}
