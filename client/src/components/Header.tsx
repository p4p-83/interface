'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Crosshair2Icon } from '@radix-ui/react-icons'

import * as GLOBALS from '@/app/globals'
import { ThemeToggle } from '@/components/ThemeToggle'
import { cn } from '@/lib/utils'

export const Header = () => {
  return (
    <header className='fixed bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 text-card-foreground border-b shadow top-0 left-0 right-0 z-40'>
      <div className='flex items-center justify-between px-6 my-0 mx-auto h-28 max-w-5xl'>

        <Link href={GLOBALS.PAGES.HOME.path} className='p-2 md:p-4 select-none cursor-pointer m-0 inline-flex items-end'>
          <h1 className='flex flex-row gap-2 justify-start items-center text-xl md:text-2xl md:text-[1.75rem] font-extrabold underline decoration-primary'>
            <Crosshair2Icon className='p-0 h-4 md:h-5 w-4 md:w-5 shrink-0' strokeWidth={0.5} stroke='currentColor' />
            <span className='block sm:hidden'>{GLOBALS.PAGES.TITLE_SUFFIX}</span>
            <span className='hidden sm:block'>A rapid pick-and-place</span>
          </h1>
        </Link>

        <nav className='inline-flex flex-row items-center justify-between align-middle gap-x-0.5 lg:gap-x-5'>

          <NavItem hideWhenSmall href={GLOBALS.PAGES.HOME.path} label={GLOBALS.PAGES.HOME.name} />
          <NavItem href={GLOBALS.PAGES.PLACE.path} label={GLOBALS.PAGES.PLACE.name} />
          <NavItem href={GLOBALS.PAGES.LEARN.path} label={GLOBALS.PAGES.LEARN.name} />
          <NavItem href={GLOBALS.PAGES.PROJECT.path} label={GLOBALS.PAGES.PROJECT.name} />

          <div className='pl-2 lg:pl-3'>
            <ThemeToggle />
          </div>

        </nav>

      </div>
    </header>
  )
}

export type NavItemProps = {
  hideWhenSmall?: boolean;
  href: string;
  label: string;
};

export const NavItem = ({ href, label, hideWhenSmall }: NavItemProps) => {
  const pathname = usePathname()

  let linkStyle = cn(
    'py-4 px-2 lg:px-4',
    'transition-colors',
    'font-medium uppercase text-sm md:text-base',
    'select-none cursor-pointer'
  )
  // Non-active link
  if (pathname !== href) {
    linkStyle = cn(linkStyle, 'text-muted-foreground')
  }
  // Active link
  else {
    linkStyle = cn(linkStyle, 'text-primary')
  }

  // Hover effects
  const hoverStyle = cn('hover:cursor-pointer', 'hover:text-primary/90')

  if (hideWhenSmall) {
    linkStyle = cn(linkStyle, 'hidden md:block')
  }

  return (
    <Link href={href} className={cn(linkStyle, hoverStyle)}>
      {label}
    </Link>
  )
}
