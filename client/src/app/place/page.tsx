import type { Metadata } from 'next'

import { DataContextProvider } from '@/context/DataContextProvider'

import PlaceInterface from './PlaceInterface'

export const metadata: Metadata = {
  title: 'Place | PnP << 83',
  description: 'Position with precision.',
}

export default function Place() {
  return (

    <DataContextProvider>
      <PlaceInterface />
    </DataContextProvider>

  )
}
