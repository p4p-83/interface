import { type HTMLAttributes } from 'react'
import { SymbolIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface LinkCardProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  title: string;
  description: string;
  icon: typeof SymbolIcon;
}

export function LinkCard({ className, href, title, description, icon: Icon }: LinkCardProps) {
  return (
    <Link href={href} className={className}>
      <Card className='group hover:border-primary-accent transition-colors duration-150'>

        <CardHeader className='pb-1 sm:pb-3'>
          <CardTitle className='flex flex-row gap-1.5 md:gap-2 justify-start items-center text-primary transition-colors duration-150 text-base sm:text-2xl font-bold uppercase'>
            <Icon className='p-0 h-3 sm:h-5 w-3 sm:w-5 shrink-0' strokeWidth={0.5} stroke='currentColor' />
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className='group-hover:text-primary-accent transition-colors duration-150 text-xs md:text-lg leading-8'>{description}</p>
        </CardContent>

      </Card>
    </Link>
  )
}