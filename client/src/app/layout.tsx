import type { Metadata } from 'next'
import './globals.css'

import { ubuntu } from '@/styles/fonts'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/context/ThemeProvider'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'PnP << 83',
  description: 'A pick-and-place for rapid prototyping',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn(ubuntu.className, 'bg-background text-foreground')}>

        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >

          <main className='flex min-h-screen flex-col items-center justify-center px-5 has-[header]:py-32'>
            {children}
          </main>

          <Toaster richColors />

        </ThemeProvider>

      </body>
    </html>
  )
}
