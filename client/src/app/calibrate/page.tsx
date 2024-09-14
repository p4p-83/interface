import type { Metadata } from 'next'

import * as GLOBALS from '@/app/globals'
import { LayoutMain } from '@/components/LayoutMain'
import { DataContextProvider } from '@/context/DataContextProvider'

import CalibrateInterface from './CalibrateInterface'

export const metadata: Metadata = GLOBALS.PAGES.getMetadata(GLOBALS.PAGES.CALIBRATE)

export default function Place() {
  return (

    <LayoutMain>

      <DataContextProvider>
        <CalibrateInterface />
      </DataContextProvider>

    </LayoutMain>

  )
}
