import type { Metadata } from 'next'
import './globals.css'

import * as GLOBALS from '@/app/globals'
import { ubuntu } from '@/styles/fonts'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/context/ThemeProvider'
import { cn } from '@/lib/utils'

export const metadata: Metadata = GLOBALS.PAGES.getMetadata(GLOBALS.PAGES.HOME)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn(ubuntu.className, 'bg-background text-foreground scroll-smooth')}>

        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >

          {children}

          <Toaster richColors />

        </ThemeProvider>

      </body>
    </html>
  )
}
