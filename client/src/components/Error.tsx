import { type HTMLAttributes, type ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { TypographyP, TypographyMuted, TypographyH2 } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

interface ErrorProps extends HTMLAttributes<HTMLDivElement>{
	children: ReactNode;
	buttonLabel: string;
	buttonOnClick: () => unknown;
}

export function Error({ className, children, buttonLabel, buttonOnClick }: ErrorProps) {
  return (
    <div className={cn('flex flex-col justify-center items-center gap-8 max-w-fit md:max-w-2xl max-h-fit', className)}>
      <div>
        <TypographyH2>Bugger!</TypographyH2>
        <TypographyP>
          <TypographyMuted>
		  	{children}
          </TypographyMuted>
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