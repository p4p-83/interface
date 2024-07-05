import type { Metadata } from 'next'

import { ThemeToggle } from '@/components/ThemeToggle'
import { PageHeading } from '@/components/PageHeading'

export const metadata: Metadata = {
  title: 'Settings | PnP << 83',
  description: 'Set your stage.',
}

export default function Settings() {
  return (

    <>

      <div className='absolute top-6 right-6'>
        <ThemeToggle />
      </div>

      <PageHeading title='Settings' subTitle='Set your stage.' />

    </>

  )
}
