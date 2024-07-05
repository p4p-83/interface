import type { Metadata } from 'next'

import { ThemeToggle } from '@/components/ThemeToggle'
import { PageHeading } from '@/components/PageHeading'

import { DataContextProvider } from '@/context/DataContextProvider'

import { SettingsForm } from './SettingsForm'

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

      <div className='mt-12 grid grid-cols-1 w-full max-w-3xl gap-4 md:gap-6'>
        <DataContextProvider>
          <SettingsForm />
        </DataContextProvider>
      </div>

    </>

  )
}
