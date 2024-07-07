'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Cross2Icon, Crosshair2Icon, HamburgerMenuIcon } from '@radix-ui/react-icons'

import * as GLOBALS from '@/app/globals'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

function HeaderTitle() {
  return (
    <h2 className='flex flex-row gap-2 justify-start items-center text-xl md:text-2xl md:text-[1.75rem] font-extrabold underline decoration-primary underline-offset-2 decoration-[3px]'>
      <Crosshair2Icon className='p-0 h-4 md:h-5 w-4 md:w-5 shrink-0 stroke-[0.5]' stroke='currentColor' />
      <span>p4p-83/interface</span>
    </h2>
  )
}

export function Header() {
  return (
    <header className='fixed bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 text-card-foreground border-b shadow top-0 left-0 right-0 z-40'>
      <div className='flex items-center justify-between px-6 my-0 mx-auto h-20 sm:h-28 max-w-5xl'>

        <Link href={GLOBALS.PAGES.HOME.path} className='p-2 md:p-4 select-none cursor-pointer m-0 inline-flex items-end'>
          <HeaderTitle />
        </Link>

        <NavigationMain />
        <NavigationMobile />

      </div>
    </header>
  )
}

function NavigationMain() {
  return (
    <nav className='hidden sm:inline-flex flex-row items-center justify-between align-middle gap-x-0.5 lg:gap-x-5'>

      <NavigationItem href={GLOBALS.PAGES.HOME.path} label={GLOBALS.PAGES.HOME.name} />
      <NavigationItem href={GLOBALS.PAGES.PLACE.path} label={GLOBALS.PAGES.PLACE.name} />
      <NavigationItem href={GLOBALS.PAGES.LEARN.path} label={GLOBALS.PAGES.LEARN.name} />
      <NavigationItem href={GLOBALS.PAGES.PROJECT.path} label={GLOBALS.PAGES.PROJECT.name} />

      <div className='pl-2 lg:pl-3'>
        <ThemeToggle />
      </div>

    </nav>
  )
}

export function NavigationMobile() {
  const [open, setOpen] = useState(false)

  return (
    <>

      <Sheet open={open} onOpenChange={setOpen}>
        <div className='sm:hidden inline-flex flex-row gap-4'>
          <ThemeToggle />

          <SheetTrigger asChild>
            <Button variant='outline' size='icon'>
              <HamburgerMenuIcon className='h-[1.2rem] w-[1.2rem]' />
              <span className='sr-only'>Toggle Menu</span>
            </Button>
          </SheetTrigger>
        </div>

        <SheetContent side='left' className='pt-0' noCloseButton>

          <div className='flex items-center justify-between gap-4 h-20'>

            <Link href={GLOBALS.PAGES.HOME.path} className='p-2 md:p-4 grow select-none cursor-pointer m-0 inline-flex items-center'>
              <HeaderTitle />
            </Link>

            <SheetClose asChild>
              <Button variant='outline' size='icon' className='sm:hidden'>
                <Cross2Icon className='h-[1.2rem] w-[1.2rem]' />
                <span className='sr-only'>Close</span>
              </Button>
            </SheetClose>

          </div>

          <Separator />

          <div className='flex flex-col my-6 pl-6 space-y-3'>
            {/* TODO: other links? */}
            {Object.values(GLOBALS.PAGES)
              .filter(page => (page instanceof Object) && ('path' in page))
              .map(page => (
                <NavigationItem key={page.path} href={page.path} label={page.name} />
              ))}
          </div>

        </SheetContent>
      </Sheet>

    </>
  )
}

type NavigationItemProps = {
  href: string;
  label: string;
};

function NavigationItem({ href, label }: NavigationItemProps) {
  const pathname = usePathname()

  let linkStyle = cn(
    'py-2 sm:py-4 px-0 sm:px-2 lg:px-4',
    'transition-colors',
    'font-medium uppercase text-sm sm:text-base',
    'select-none cursor-pointer'
  )
  // Non-active link
  if (pathname !== href) {
    linkStyle = cn(linkStyle, 'text-muted-foreground')
  }
  // Active link
  else {
    linkStyle = cn(linkStyle, 'text-primary-accent')
  }

  // Hover effects
  const hoverStyle = cn('hover:cursor-pointer', 'hover:text-primary-accent')

  return (
    <Link href={href} className={cn(linkStyle, hoverStyle)}>
      {label}
    </Link>
  )
}
