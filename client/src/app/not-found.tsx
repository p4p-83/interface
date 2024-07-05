import { Error } from '@/components/Error'
import { LayoutMain } from '@/components/LayoutMain'
import { TypographyLarge, TypographyMuted } from '@/components/ui/typography'

export default function NotFound() {
  return (
    <LayoutMain>
      <Error>
        <TypographyLarge>404.</TypographyLarge>
        <br />
        <TypographyMuted>This page could not be found.</TypographyMuted>
      </Error>
    </LayoutMain>
  )
}