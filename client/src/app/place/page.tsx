import type { Metadata } from 'next'

import * as GLOBALS from '@/app/globals'
import { LayoutMain } from '@/components/LayoutMain'
import { DataContextProvider } from '@/context/DataContextProvider'

import PlaceInterface from './PlaceInterface'

export const metadata: Metadata = GLOBALS.PAGES.getMetadata(GLOBALS.PAGES.PLACE)

export default function Place() {
  return (

    <LayoutMain>

      <DataContextProvider>
        <PlaceInterface />
      </DataContextProvider>

    </LayoutMain>

  )
}
