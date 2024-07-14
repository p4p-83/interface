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
import { TypographySmall, TypographyMuted } from '@/components//ui/typography'
import { cn } from '@/lib/utils'

type ImageCarouselImage = {
  image: ImageProps['src'] | { light: ImageProps['src']; dark: ImageProps['src']; };
  noBlur?: boolean;
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
          {images.map(({ image, noBlur = false, caption }) => (
            <CarouselItem key={caption}>
              {((image instanceof Object) && ('light' in image))
                ? (
                  <>
                    <Image
                      src={image.light}
                      alt={caption}
                      className='block dark:hidden'
                      placeholder={(noBlur) ? 'empty' : 'blur'}
                      quality={85}
                    />
                    <Image
                      src={image.dark}
                      alt={caption}
                      className='hidden dark:block'
                      placeholder={(noBlur) ? 'empty' : 'blur'}
                      quality={85}
                    />
                  </>
                )
                : (
                  <Image
                    src={image}
                    alt={caption}
                    placeholder={(noBlur) ? 'empty' : 'blur'}
                    quality={85}
                  />
                )
              }
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className={cn('flex flex-row mt-2.5 lg:mt-4 -mb-1 lg:mb-0 justify-between items-center gap-2', captionClassName)}>
          <CarouselPrevious className='shrink-0' />

          <span className={cn('text-center text-pretty grow leading-none')}>
            <TypographySmall>
              <TypographyMuted>
                {images[current].captionElement ?? images[current].caption}
              </TypographyMuted>
            </TypographySmall>
          </span>

          <CarouselNext className='shrink-0' />
        </div>

      </Carousel>

    </div>
  )
}
