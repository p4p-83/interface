import { Error } from '@/components/Error'
import { Header } from '@/components/Header'
import { LayoutMain } from '@/components/LayoutMain'
import { TypographyLarge, TypographyMuted } from '@/components/ui/typography'

export default function NotFound() {
  return (
    <LayoutMain>

      <Header />

      <Error>
        <TypographyLarge>404.</TypographyLarge>
        <br />
        <TypographyMuted>This page could not be found.</TypographyMuted>
      </Error>

    </LayoutMain>
  )
}