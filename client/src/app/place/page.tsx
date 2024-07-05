import type { Metadata } from 'next'

import { LayoutMain } from '@/components/LayoutMain'
import { DataContextProvider } from '@/context/DataContextProvider'

import PlaceInterface from './PlaceInterface'

export const metadata: Metadata = {
  title: 'Place | PnP << 83',
  description: 'Position with precision.',
}

export default function Place() {
  return (

    <LayoutMain>

      <DataContextProvider>
        <PlaceInterface />
      </DataContextProvider>

    </LayoutMain>

  )
}
