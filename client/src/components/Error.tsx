'use client'

import { useRouter } from 'next/navigation'
import { type ComponentProps, type HTMLAttributes, type ReactNode } from 'react'

import * as GLOBALS from '@/app/globals'
import { Button } from '@/components/ui/button'
import { TypographyP, TypographyH2 } from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import { HomeIcon } from '@radix-ui/react-icons'

type ErrorProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  homeButtonVariant?: ComponentProps<typeof Button>['variant'];
  hideHomeButton?: boolean;
  additionalButtons?: {
    key: string;
    label: string | ReactNode;
    variant?: ComponentProps<typeof Button>['variant'];
    size?: ComponentProps<typeof Button>['size'];
    asChild?: boolean;
    onClick?: () => unknown;
  }[];
};

export function Error({
  className,
  children,
  homeButtonVariant = 'default',
  hideHomeButton,
  additionalButtons,
}: ErrorProps) {
  const router = useRouter()

  return (
    <div className={cn(className, 'flex flex-col justify-center items-center gap-8 w-full sm:w-fit md:max-w-2xl h-fit px-8')}>
      <div className='w-full sm:w-auto sm:min-w-96'>
        <TypographyH2>Bugger!</TypographyH2>
        <TypographyP>
          {children}
        </TypographyP>
      </div>

      <div className='flex flex-row gap-4 w-full'>
        {(!hideHomeButton) && (
          <Button
            variant={homeButtonVariant}
            size={(additionalButtons?.length) ? 'icon' : 'default'}
            className='last:flex-grow'
            onClick={() => router.push(GLOBALS.PAGES.HOME.path)}
          >
            {(additionalButtons?.length)
              ? <HomeIcon className='h-[1.2rem] w-[1.2rem]' />
              : <>Go home</>
            }
          </Button>
        )}
        {additionalButtons?.map(button => (
          <Button
            key={button.key}
            variant={button.variant}
            size={button.size}
            className='last:flex-grow'
            onClick={button.onClick}
            asChild={button.asChild}
          >
            {button.label}
          </Button>
        ))}
      </div>
    </div>
  )
}