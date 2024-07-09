import { Fragment, type HTMLAttributes } from 'react'
import { SymbolIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { TypographyKeyInput } from '@/components/ui/typography'

type LinkCardProps = HTMLAttributes<HTMLAnchorElement> & {
  href: string;
  title: string;
  description: string;
  icon: typeof SymbolIcon;
  keyShortcut?: string[];
  showKeyShortcut?: boolean;
}

export function LinkCard({ className, href, title, description, icon: Icon, keyShortcut, showKeyShortcut }: LinkCardProps) {
  return (
    <Link href={href} className={className}>
      <Card className='group hover:border-primary-accent transition-colors duration-150'>

        <CardHeader className='pb-1 sm:pb-3'>
          <CardTitle className='flex flex-row gap-1 md:gap-2 justify-start items-center text-primary transition-colors duration-150 text-sm sm:text-2xl font-semibold sm:font-bold uppercase'>
            <Icon className='p-0 h-3 sm:h-5 w-3 sm:w-5 shrink-0 stroke-[0.25] sm:stroke-[0.5]' stroke='currentColor' />
            {title}
            {(keyShortcut && showKeyShortcut) && (
              <span className='flex flex-row gap-0.5 ml-auto items-baseline normal-case font-semibold'>
                {keyShortcut.map(key => (
                  <Fragment key={href + key}>
                    <TypographyKeyInput>
                      {key}
                    </TypographyKeyInput>
                    <span className='last:hidden text-base font-medium'>+</span>
                  </Fragment>
                ))}
              </span>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className='group-hover:text-primary-accent transition-colors duration-150 text-xs md:text-lg leading-8'>{description}</p>
        </CardContent>

      </Card>
    </Link>
  )
}