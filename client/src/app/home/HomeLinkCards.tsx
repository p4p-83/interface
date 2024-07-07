'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Crosshair2Icon, MixerHorizontalIcon, GearIcon, RocketIcon, IdCardIcon } from '@radix-ui/react-icons'

import * as GLOBALS from '@/app/globals'
import { LinkCard } from '@/components/LinkCard'
import { cn } from '@/lib/utils'

export function HomeLinkCards() {
  const router = useRouter()

  const [isKeyCPressed, setIsKeyCPressed] = useState(false)
  const [isKeySPressed, setIsKeySPressed] = useState(false)
  const [isKeyShiftPressed, setIsKeyShiftPressed] = useState(false)
  const [isKeyOptionPressed, setIsKeyOptionPressed] = useState(false)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      console.info(`Key down for ${event.code} (${event.key})`)

      setIsKeyShiftPressed(event.shiftKey)
      setIsKeyOptionPressed(event.altKey)

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
        case 'KeyL':
          router.push(GLOBALS.PAGES.PROJECT.path)
          break
        }
      }
    }

    function handleKeyUp(event: KeyboardEvent) {
      console.info(`Key up for ${event.code} (${event.key})`)

      setIsKeyShiftPressed(event.shiftKey)
      setIsKeyOptionPressed(event.altKey)

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

  const hiddenCardsShown = (isKeyOptionPressed)
    ? 2
    : Number(isKeyCPressed) + Number(isKeySPressed)

  const showKeyShortcut = (isKeyShiftPressed || isKeyOptionPressed)

  return (
    <div className='mb-20 sm:mb-10 grid grid-cols-1 md:grid-cols-2 w-full max-w-3xl gap-6 mt-2'>

      <PageLinkCard
        page={GLOBALS.PAGES.PLACE}
        icon={Crosshair2Icon}
        keyShortcut={['Shift', 'P']}
        showKeyShortcut={showKeyShortcut}
        className={
          (hiddenCardsShown & 1)
            ? 'md:col-span-1'
            : 'md:col-span-2'
        }
      />

      {(isKeyCPressed || isKeyOptionPressed) && <PageLinkCard page={GLOBALS.PAGES.CALIBRATE} icon={MixerHorizontalIcon} keyShortcut={['Shift', 'C']} showKeyShortcut={showKeyShortcut} />}
      {(isKeySPressed || isKeyOptionPressed) && <PageLinkCard page={GLOBALS.PAGES.SETTINGS} icon={GearIcon} keyShortcut={['Shift', 'S']} showKeyShortcut={showKeyShortcut} />}

      <PageLinkCard page={GLOBALS.PAGES.LEARN} icon={RocketIcon} keyShortcut={['Shift', 'L']} showKeyShortcut={showKeyShortcut} />
      <PageLinkCard page={GLOBALS.PAGES.PROJECT} icon={IdCardIcon} keyShortcut={['Shift', 'J']} showKeyShortcut={showKeyShortcut} />

    </div>
  )
}

type PageLinkCardProps = Pick<React.ComponentProps<typeof LinkCard>, 'icon' | 'keyShortcut' | 'showKeyShortcut' | 'className'> & {
  page: GLOBALS.Page;
}

function PageLinkCard({ page, icon, keyShortcut, showKeyShortcut, className }: PageLinkCardProps) {
  return (
    <LinkCard href={page.path} title={page.name} description={page.description + '.'} icon={icon} keyShortcut={keyShortcut} showKeyShortcut={showKeyShortcut} className={cn('w-full', className)} />
  )
}
