'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Crosshair2Icon, MixerHorizontalIcon, GearIcon, RocketIcon, IdCardIcon } from '@radix-ui/react-icons'

import * as GLOBALS from '@/app/globals'
import { performShiftKeyNavigation } from '@/components/Header'
import { LinkCard } from '@/components/LinkCard'
import { cn } from '@/lib/utils'
import { useKeyPresses } from '@/hooks/useKeyPresses'

export function HomeLinkCards() {
  const router = useRouter()

  const [isCalibrateRevealed, setIsCalibrateRevealed] = useState(false)
  const [isSettingsRevealed, setIsSettingsRevealed] = useState(false)

  const { isShiftPressed, isOptionPressed } = useKeyPresses({
    onKeyDown: (event) => {
      if (!event.shiftKey) {
        switch (event.code) {
        case GLOBALS.PAGES.getShortcutKeyCode(GLOBALS.PAGES.CALIBRATE):
          setIsCalibrateRevealed(true)
          break
        case GLOBALS.PAGES.getShortcutKeyCode(GLOBALS.PAGES.SETTINGS):
          setIsSettingsRevealed(true)
          break
        }
      }
      else {
        performShiftKeyNavigation(router, event)
      }
    },
    onKeyUp: (event) => {
      switch (event.code) {
      case GLOBALS.PAGES.getShortcutKeyCode(GLOBALS.PAGES.CALIBRATE):
        setIsCalibrateRevealed(false)
        break
      case GLOBALS.PAGES.getShortcutKeyCode(GLOBALS.PAGES.SETTINGS):
        setIsSettingsRevealed(false)
        break
      }
    },
  })

  const hiddenCardsShown = (isOptionPressed)
    ? 2
    : Number(isCalibrateRevealed) + Number(isSettingsRevealed)

  const showKeyShortcut = (isShiftPressed || isOptionPressed)

  return (
    <div className='mb-20 sm:mb-10 grid grid-cols-1 md:grid-cols-2 w-full max-w-3xl gap-6 mt-2'>

      <PageLinkCard
        page={GLOBALS.PAGES.PLACE}
        icon={Crosshair2Icon}
        showKeyShortcut={showKeyShortcut}
        className={
          (hiddenCardsShown & 1)
            ? 'md:col-span-1'
            : 'md:col-span-2'
        }
      />

      {(isCalibrateRevealed || isOptionPressed) && <PageLinkCard page={GLOBALS.PAGES.CALIBRATE} icon={MixerHorizontalIcon} showKeyShortcut={showKeyShortcut} />}
      {(isSettingsRevealed || isOptionPressed) && <PageLinkCard page={GLOBALS.PAGES.SETTINGS} icon={GearIcon} showKeyShortcut={showKeyShortcut} />}

      <PageLinkCard page={GLOBALS.PAGES.LEARN} icon={RocketIcon} showKeyShortcut={showKeyShortcut} />
      <PageLinkCard page={GLOBALS.PAGES.PROJECT} icon={IdCardIcon} showKeyShortcut={showKeyShortcut} />

    </div>
  )
}

type PageLinkCardProps = Pick<React.ComponentProps<typeof LinkCard>, 'icon' | 'showKeyShortcut' | 'className'> & {
  page: GLOBALS.Page;
}

function PageLinkCard({ page, icon, showKeyShortcut, className }: PageLinkCardProps) {
  return (
    <LinkCard href={page.path} title={page.name} description={page.description + '.'} icon={icon} keyShortcut={['Shift', page.shortcutKey]} showKeyShortcut={showKeyShortcut} className={cn('w-full', className)} />
  )
}
