import type { Metadata } from 'next'

import * as GLOBALS from '@/app/globals'
import { LayoutMain } from '@/components/LayoutMain'
import { Header } from '@/components/Header'
import { PageHeading } from '@/components/PageHeading'

import { DataContextProvider } from '@/context/DataContextProvider'

import { SettingsForm } from './SettingsForm'

export const metadata: Metadata = GLOBALS.PAGES.getMetadata(GLOBALS.PAGES.SETTINGS)

export default function Settings() {
  return (

    <LayoutMain>

      <Header />

      <PageHeading {...GLOBALS.PAGES.SETTINGS} />

      <div className='mt-12 grid grid-cols-1 w-full max-w-3xl gap-4 md:gap-6'>
        <DataContextProvider>
          <SettingsForm />
        </DataContextProvider>
      </div>

    </LayoutMain>

  )
}
