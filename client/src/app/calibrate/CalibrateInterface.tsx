'use client'

import { useContext } from 'react'

import { DataContext } from '@/context/DataContextProvider'

import { CalibrateVideo } from './CalibrateVideo'

export type Size = {
  width: number;
  height: number;
}

export type Position = {
  x: number;
  y: number;
}

export default function CalibrateInterface() {
  const { settingsData } = useContext(DataContext)

  return (

    <>

      <CalibrateVideo className='w-screen h-screen' videoUrl={settingsData.urls.whepVideoUrl} socketUrl={settingsData.urls.webSocketUrl} />

    </>

  )
}
