import type { Metadata } from 'next'

import PlaceInterface from './PlaceInterface'

export const metadata: Metadata = {
  title: 'Place | PnP << 83',
  description: 'Position with precision.',
}

export default function Place() {
  return (

    <PlaceInterface />

  )
}
