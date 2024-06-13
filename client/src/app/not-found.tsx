'use client'

import { useRouter } from 'next/navigation'

import { Error } from '@/components/Error'
import { TypographyLarge, TypographyMuted } from '@/components/ui/typography'

export default function NotFound() {
  const router = useRouter()

  return (
    <Error buttonLabel='Go home' buttonOnClick={() => router.push('/')} >
      <TypographyLarge>404.</TypographyLarge>
      <br />
      <TypographyMuted>This page could not be found.</TypographyMuted>
    </Error>
  )
}