'use client'

import { useState, useEffect, type ReactNode } from 'react'
import { Crosshair2Icon, MixerHorizontalIcon, GearIcon, RocketIcon, IdCardIcon } from '@radix-ui/react-icons'

import { LinkCard } from '@/components/LinkCard'

export function HomeLinkCards() {
  'use client'
  const [isKeyCPressed, setIsKeyCPressed] = useState(false)
  const [isKeySPressed, setIsKeySPressed] = useState(false)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      console.info(`Key down for ${event.code} (${event.key})`)

      switch (event.code) {

      case 'KeyC':
        setIsKeyCPressed(true)
        break

      case 'KeyS':
        setIsKeySPressed(true)
        break

      }
    }

    function handleKeyUp(event: KeyboardEvent) {
      console.info(`Key up for ${event.code} (${event.key})`)

      switch (event.code) {

      case 'KeyC':
        setIsKeyCPressed(false)
        break

      case 'KeyS':
        setIsKeySPressed(false)
        break

      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  let primaryCard: ReactNode
  if (!isKeyCPressed && !isKeySPressed) {
    primaryCard = (
      <LinkCard href='/place' title='Place' description='Position with precision.' icon={Crosshair2Icon} className='w-full md:col-span-2' />
    )
  }
  else if (isKeyCPressed) {
    primaryCard = (
      <LinkCard href='/calibrate' title='Calibrate' description='Measure twice, place once.' icon={MixerHorizontalIcon} className='w-full md:col-span-2' />
    )
  }
  else if (isKeySPressed) {
    primaryCard = (
      <LinkCard href='/settings' title='Settings' description='Set your stage.' icon={GearIcon} className='w-full md:col-span-2' />
    )
  }

  return (
    <div className='mb-auto md:mb-0 pb-10 grid grid-cols-1 md:grid-cols-2 w-full max-w-3xl gap-4 sm:gap-6 mt-2'>

      {primaryCard}

      <LinkCard href='/learn' title='Learn' description='Meet your match.' icon={RocketIcon} className='w-full' />
      <LinkCard href='/project' title='Project' description='Explore the lore.' icon={IdCardIcon} className='w-full' />

    </div>
  )
}
