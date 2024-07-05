import type { Metadata } from 'next'

import { Header } from '@/components/Header'
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

      <Header />

      <PageHeading title='Settings' subTitle='Set your stage.' />

      <div className='mt-12 grid grid-cols-1 w-full max-w-3xl gap-4 md:gap-6'>
        <DataContextProvider>
          <SettingsForm />
        </DataContextProvider>
      </div>

    </>

  )
}
