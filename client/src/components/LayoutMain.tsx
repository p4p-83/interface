import { type ReactNode } from 'react'

import { cn } from '@/lib/utils'

type LayoutMainProps = {
  children: ReactNode;
  justifyStart?: boolean;
}

export function LayoutMain({ children, justifyStart = false }: LayoutMainProps) {
  return (

    <main className={cn(
      'flex min-h-screen flex-col items-center px-6',
      (justifyStart) ? 'justify-start has-[header]:py-28 sm:has-[header]:py-40' : 'justify-center has-[header]:py-32',
    )}>
      {children}
    </main>

  )
}