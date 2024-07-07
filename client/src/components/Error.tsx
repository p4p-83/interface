'use client'

import { useRouter } from 'next/navigation'
import { type HTMLAttributes, type ReactNode } from 'react'

import * as GLOBALS from '@/app/globals'
import { Button } from '@/components/ui/button'
import { TypographyP, TypographyH2 } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

type ErrorProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode;
	buttonLabel?: string;
	buttonOnClick?: () => unknown;
}

export function Error({ className, children, buttonLabel = 'Go home', buttonOnClick }: ErrorProps) {
  const router = useRouter()

  buttonOnClick = buttonOnClick ?? (() => router.push(GLOBALS.PAGES.HOME.path))

  return (
    <div className={cn(className, 'flex flex-col justify-center items-center gap-8 w-full sm:w-fit md:max-w-2xl h-fit px-8')}>
      <div className='w-full sm:w-auto sm:min-w-96'>
        <TypographyH2>Bugger!</TypographyH2>
        <TypographyP>
          {children}
        </TypographyP>
      </div>

      <div className='w-full'>
        <Button className='w-full' onClick={buttonOnClick}>
          {buttonLabel}
        </Button>
      </div>
    </div>
  )
}