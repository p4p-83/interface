'use client'

import Image, { type ImageProps } from 'next/image'
import { useState, useEffect, type ReactNode } from 'react'

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
  light: ImageProps['src'];
  dark: ImageProps['src'];
  caption: string;
  captionElement?: ReactNode;
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
          {images.map(({ light, dark, caption }) => (
            <CarouselItem key={caption}>
              <Image
                src={light}
                alt={caption}
                className='block dark:hidden'
                placeholder='blur'
                quality={85}
              />
              <Image
                src={dark}
                alt={caption}
                className='hidden dark:block'
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
        {images[current].captionElement ?? images[current].caption}
      </div>

    </div>
  )
}
