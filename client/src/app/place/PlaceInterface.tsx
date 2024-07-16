'use client'

import { useContext } from 'react'

import { DataContext } from '@/context/DataContextProvider'

import { PlaceVideo } from './PlaceVideo'

export type Size = {
  width: number;
  height: number;
}

export type Position = {
  x: number;
  y: number;
  weight?: number;
}

export default function PlaceInterface() {
  const { settingsData } = useContext(DataContext)

  return (

    <>

      <PlaceVideo className='w-screen h-screen' videoUrl={settingsData.urls.whepVideoUrl} socketUrl={settingsData.urls.webSocketUrl} />

    </>

  )
}
