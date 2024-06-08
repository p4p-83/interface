import type { Metadata } from 'next'

import { WebRtcVideo } from '@/components/WebRtcVideo'

export const metadata: Metadata = {
  title: 'Place | PnP << 83',
  description: 'Create a new file upload request',
}

export default function Place() {
  return (

    <>

      <WebRtcVideo url='http://localhost:8889/facetime/whep' />

    </>

  )
}
