import { SymbolIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface LinkCardProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  title: string;
  description: string;
  icon: typeof SymbolIcon;
}

export function LinkCard({ className, href, title, description, icon: Icon }: LinkCardProps) {
  return (
    <Link href={href} className={className}>
      <Card className='group hover:border-primary transition-colors duration-150'>

        <CardHeader className='pb-3'>
          <CardTitle className='flex flex-row gap-2 justify-start items-center text-primary transition-colors duration-150 text-2xl font-bold uppercase'>
            <Icon className='p-0 h-5 w-5 shrink-0' strokeWidth={0.5} stroke="currentColor" />
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className='group-hover:text-primary transition-colors duration-150 text-lg leading-8'>{description}</p>
        </CardContent>

      </Card>
    </Link>
  )
}