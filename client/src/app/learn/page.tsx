import type { Metadata } from 'next'

import { LayoutMain } from '@/components/LayoutMain'
import { Header } from '@/components/Header'
import { PageHeading } from '@/components/PageHeading'
import { TypographyH2, TypographyH3, TypographyBlockquote, TypographyInlineCode, TypographyList, TypographyListItem, TypographyP } from '@/components/ui/typography'

export const metadata: Metadata = {
  title: 'Learn | PnP << 83',
  description: 'Meet your match.',
}

export default function Learn() {
  return (

    <LayoutMain justifyStart>

      <Header />

      <div className='grid grid-cols-1 w-full max-w-3xl gap-4 md:gap-6'>

        <div>
          <PageHeading title='Learn' subTitle='Meet your match.' />

          <TypographyH2>A pick-and-place for rapid prototyping</TypographyH2>

          <TypographyBlockquote>
          Welcome to our Part IV Project!
            <br />
            <br />
          We hope that, in time, this page may serve as a one-stop-shop towards the discovery of the operating principles behind, and features comprising, our pick-and-place machine.
            <br />
            <br />
          ~ James and Sam
          </TypographyBlockquote>

          <TypographyH3>System Architecture</TypographyH3>

          <TypographyH3>Global Interface</TypographyH3>
          - Theme toggle (defaults to System, can be forced to light/dark)

          <TypographyH3>Home Page</TypographyH3>
          <TypographyP>
          The home <TypographyInlineCode>/</TypographyInlineCode> page is the launchpad of our user interface.
          From there, you can access:
          </TypographyP>

          <TypographyList>
            <TypographyListItem>
              <TypographyInlineCode>/place</TypographyInlineCode>: Operate the pick-and-place machine.
            </TypographyListItem>
            <TypographyListItem>
              <TypographyInlineCode>/calibrate</TypographyInlineCode>: Tune the machine&apos;s operating parameters to improve performance.
            </TypographyListItem>
            <TypographyListItem>
              <TypographyInlineCode>/settings</TypographyInlineCode>: Configure the system&apos;s interface parameters to reflect deployment changes.
            </TypographyListItem>
            <TypographyListItem>
              <TypographyInlineCode>/learn</TypographyInlineCode>: This page; learn about how to operate and maintain the pick-and-place machine.
            </TypographyListItem>
            <TypographyListItem>
              <TypographyInlineCode>/project</TypographyInlineCode>: Read about the background motivations of this research project.
            </TypographyListItem>
          </TypographyList>

          <TypographyP>
            Note that <TypographyInlineCode>/calibrate</TypographyInlineCode> and <TypographyInlineCode>/settings</TypographyInlineCode> are implemented as &lsquo;hidden&rsquo; pages, in that they are not visible by default.
            This design decision is motivated by an intent that they should be scarcely necessary—under regular circumstances, one should not need to access them.
            On the off-chance that they might become necessary, however, they may be &lsquo;activated&rsquo; by pressing the <TypographyInlineCode>c</TypographyInlineCode> or <TypographyInlineCode>s</TypographyInlineCode> key respectively whilst on the home page—which will cause the respective link to appear.
          </TypographyP>

          <TypographyP>
            The home page additionally implements instant keyboard page navigation using the <TypographyInlineCode>Shift</TypographyInlineCode> modifier key.
            The pages that may be accessed using this feature are:
          </TypographyP>
          <TypographyList>
            <TypographyListItem>
              <TypographyInlineCode>/place</TypographyInlineCode>: By pressing <TypographyInlineCode>Shift</TypographyInlineCode> + <TypographyInlineCode>P</TypographyInlineCode>
            </TypographyListItem>
            <TypographyListItem>
              <TypographyInlineCode>/calibrate</TypographyInlineCode>: By pressing <TypographyInlineCode>Shift</TypographyInlineCode> + <TypographyInlineCode>C</TypographyInlineCode>
            </TypographyListItem>
            <TypographyListItem>
              <TypographyInlineCode>/settings</TypographyInlineCode>: By pressing <TypographyInlineCode>Shift</TypographyInlineCode> + <TypographyInlineCode>S</TypographyInlineCode>
            </TypographyListItem>
            <TypographyListItem>
              <TypographyInlineCode>/learn</TypographyInlineCode>: By pressing <TypographyInlineCode>Shift</TypographyInlineCode> + <TypographyInlineCode>L</TypographyInlineCode>
            </TypographyListItem>
          </TypographyList>
        </div>

      </div>

    </LayoutMain>

  )
}
