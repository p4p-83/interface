import { Error } from '@/components/Error'
import { TypographyLarge, TypographyMuted } from '@/components/ui/typography'

export default function NotFound() {
  return (
    <Error>
      <TypographyLarge>404.</TypographyLarge>
      <br />
      <TypographyMuted>This page could not be found.</TypographyMuted>
    </Error>
  )
}