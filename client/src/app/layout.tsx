import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Placr | p4p-83',
  description: 'A pick-and-place for rapid prototyping',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className=''>
      <body className={cn(inter.className, 'flex min-h-screen flex-col items-center justify-center')}>

        {/* <main className='flex min-h-screen flex-col items-center justify-center has-[h1:first-child]:justify-start py-36 pb-24 px-5'> */}
        {children}
        {/* </main> */}

      </body>
    </html>
  )
}
