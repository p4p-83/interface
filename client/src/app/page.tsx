import type { Metadata } from 'next'

import { Crosshair2Icon } from '@radix-ui/react-icons'

import { Badge } from '@/components/ui/badge'
import { LinkCard } from '@/components/LinkCard'
import { ThemeToggle } from '@/components/ThemeToggle'

export const metadata: Metadata = {
  title: 'Placr | p4p-83',
  description: 'A pick-and-place for rapid prototyping',
}

export default function Home() {
  return (

    <>

      <div className='absolute top-6 right-6'>
        <ThemeToggle />
      </div>

      <h1 className='mb-16 text-6xl text-center font-extrabold underline decoration-primary'>
        A pick-and-place<br />
        for rapid prototyping
      </h1>

      <Badge variant='secondary' className='mb-16 text-lg'>
        <code className='p-2'>
          Part IV Project &lt;&lt; 83
        </code>
      </Badge>

      <div className='grid grid-cols-1 md:grid-cols-2 w-full max-w-3xl gap-6 md:gap-8 mt-2'>
        <LinkCard
          href='/place'
          title='Place'
          description='Place your components.'
          icon={Crosshair2Icon}
          className='w-full md:col-span-2'
        />
      </div>

    </>

  )
}
