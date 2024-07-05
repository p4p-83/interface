'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect, type ReactNode } from 'react'
import { Crosshair2Icon, MixerHorizontalIcon, GearIcon, RocketIcon, IdCardIcon } from '@radix-ui/react-icons'

import * as GLOBALS from '@/app/globals'
import { LinkCard } from '@/components/LinkCard'

export function HomeLinkCards() {
  const router = useRouter()

  const [isKeyCPressed, setIsKeyCPressed] = useState(false)
  const [isKeySPressed, setIsKeySPressed] = useState(false)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      console.info(`Key down for ${event.code} (${event.key})`)

      if (!event.shiftKey) {
        switch (event.code) {
        case 'KeyC':
          setIsKeyCPressed(true)
          break
        case 'KeyS':
          setIsKeySPressed(true)
          break
        }
      }
      else {
        // Immediate Shift-key navigation
        switch (event.code) {
        case 'KeyP':
          router.push(GLOBALS.PAGES.PLACE.path)
          break
        case 'KeyC':
          router.push(GLOBALS.PAGES.CALIBRATE.path)
          break
        case 'KeyS':
          router.push(GLOBALS.PAGES.SETTINGS.path)
          break
        case 'KeyL':
          router.push(GLOBALS.PAGES.LEARN.path)
          break
        }
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
  }, [router])

  let primaryCard: ReactNode
  if (!isKeyCPressed && !isKeySPressed) {
    primaryCard = (
      <LinkCard href={GLOBALS.PAGES.PLACE.path} title={GLOBALS.PAGES.PLACE.name} description={`${GLOBALS.PAGES.PLACE.description}.`} icon={Crosshair2Icon} className='w-full md:col-span-2' />
    )
  }
  else if (isKeyCPressed) {
    primaryCard = (
      <LinkCard href={GLOBALS.PAGES.CALIBRATE.path} title={GLOBALS.PAGES.CALIBRATE.name} description={`${GLOBALS.PAGES.CALIBRATE.description}.`} icon={MixerHorizontalIcon} className='w-full md:col-span-2' />
    )
  }
  else if (isKeySPressed) {
    primaryCard = (
      <LinkCard href={GLOBALS.PAGES.SETTINGS.path} title={GLOBALS.PAGES.SETTINGS.name} description={`${GLOBALS.PAGES.SETTINGS.description}.`} icon={GearIcon} className='w-full md:col-span-2' />
    )
  }

  return (
    <div className='mb-auto md:mb-0 pb-10 grid grid-cols-1 md:grid-cols-2 w-full max-w-3xl gap-4 sm:gap-6 mt-2'>

      {primaryCard}

      <LinkCard href={GLOBALS.PAGES.LEARN.path} title={GLOBALS.PAGES.LEARN.name} description={`${GLOBALS.PAGES.LEARN.description}.`} icon={RocketIcon} className='w-full' />
      <LinkCard href={GLOBALS.PAGES.PROJECT.path} title={GLOBALS.PAGES.PROJECT.name} description={`${GLOBALS.PAGES.PROJECT.description}.`} icon={IdCardIcon} className='w-full' />

    </div>
  )
}
