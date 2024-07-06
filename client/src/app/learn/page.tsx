import type { Metadata } from 'next'

import * as GLOBALS from '@/app/globals'
import { LayoutMain } from '@/components/LayoutMain'
import { Header } from '@/components/Header'
import { PageHeading } from '@/components/PageHeading'
import {
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographyBlockquote,
  TypographyInlineCode,
  TypographyLink,
  TypographyList,
  TypographyListItem,
} from '@/components/ui/typography'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
export const metadata: Metadata = GLOBALS.PAGES.getMetadata(GLOBALS.PAGES.LEARN)

export default function Learn() {
  return (

    <LayoutMain justifyStart>

      <Header />

      <div className='grid grid-cols-1 w-full max-w-3xl gap-4 md:gap-6'>

        <div>
          <PageHeading {...GLOBALS.PAGES.LEARN} />

          <TypographyH2>A pick-and-place for rapid prototyping</TypographyH2>

          <TypographyBlockquote>
            Welcome to our <TypographyLink href={GLOBALS.PAGES.PROJECT.path}>Part IV Project</TypographyLink>!
            <br />
            <br />
            We hope that, in time, this page may serve as a one-stop-shop towards the discovery of the operating principles behind, and features comprising, our pick-and-place machine.
            <br />
            <br />
            ~ <TypographyLink href={GLOBALS.EXTERAL_URLS.PERSON.JAMES}>James Bao</TypographyLink> and <TypographyLink href={GLOBALS.EXTERAL_URLS.PERSON.SAM}>Sam Skinner</TypographyLink>
          </TypographyBlockquote>

          <SystemArchitecture />

          <GlobalInterface />

          <ConstituentPages />

          <TypographyH2>{GLOBALS.PAGES.PLACE.description}</TypographyH2>
          <TypographyBlockquote>
            Mastered the manual?
            Start <TypographyLink href={GLOBALS.PAGES.PLACE.path}>placing</TypographyLink>!
          </TypographyBlockquote>
        </div>

      </div>

    </LayoutMain>

  )
}

function SystemArchitecture() {
  return (
    <>
      <TypographyH3>System Architecture</TypographyH3>
    </>
  )
}

function GlobalInterface() {
  return (
    <>
      <TypographyH3>Global Interface</TypographyH3>
      - Theme toggle (defaults to System, can be forced to light/dark)
    </>
  )
}

function ConstituentPages() {
  if (false) {
    return (
      <>
        <TypographyH3>Constituent Pages</TypographyH3>
        <TypographyH4>{GLOBALS.PAGES.HOME.name} Page</TypographyH4>
        <ConstituentHomePage />
        <TypographyH4>{GLOBALS.PAGES.PLACE.name} Page</TypographyH4>
        <ConstituentPlacePage />
      </>
    )
  }

  return (
    <>
      <TypographyH3>Constituent Pages</TypographyH3>
      <Accordion type='multiple' className='w-full mt-2'>

        <AccordionItem value={GLOBALS.PAGES.HOME.path}>
          <AccordionTrigger>
            <TypographyH4>{GLOBALS.PAGES.HOME.name} Page</TypographyH4>
          </AccordionTrigger>
          <AccordionContent>
            <ConstituentHomePage />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value={GLOBALS.PAGES.PLACE.path}>
          <AccordionTrigger>
            <TypographyH4>{GLOBALS.PAGES.PLACE.name} Page</TypographyH4>
          </AccordionTrigger>
          <AccordionContent>
            <ConstituentPlacePage />
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </>
  )
}

function ConstituentHomePage() {
  return (
    <>
      <TypographyP>
        The home <TypographyInlineCode>{GLOBALS.PAGES.HOME.path}</TypographyInlineCode> page is the launchpad of our user interface.
        From there, you can access:
      </TypographyP>

      <TypographyList>
        <TypographyListItem>
          <TypographyInlineCode>{GLOBALS.PAGES.PLACE.path}</TypographyInlineCode>: Operate the pick-and-place machine.
        </TypographyListItem>
        <TypographyListItem>
          <TypographyInlineCode>{GLOBALS.PAGES.CALIBRATE.path}</TypographyInlineCode>: Tune the machine&apos;s operating parameters to improve performance.
        </TypographyListItem>
        <TypographyListItem>
          <TypographyInlineCode>{GLOBALS.PAGES.SETTINGS.path}</TypographyInlineCode>: Configure the system&apos;s interface parameters to reflect deployment changes.
        </TypographyListItem>
        <TypographyListItem>
          <TypographyInlineCode>{GLOBALS.PAGES.LEARN.path}</TypographyInlineCode>: This page; learn about how to operate and maintain the pick-and-place machine.
        </TypographyListItem>
        <TypographyListItem>
          <TypographyInlineCode>{GLOBALS.PAGES.PROJECT.path}</TypographyInlineCode>: Read about the background motivations of this research project.
        </TypographyListItem>
      </TypographyList>

      <TypographyP>
        Note that <TypographyInlineCode>{GLOBALS.PAGES.CALIBRATE.path}</TypographyInlineCode> and <TypographyInlineCode>{GLOBALS.PAGES.SETTINGS.path}</TypographyInlineCode> are implemented as &lsquo;hidden&rsquo; pages, in that they are not visible by default.
        This design decision is motivated by an intent that they should be scarcely necessary—under regular circumstances, one should not need to access them.
        On the off-chance that they might become necessary, however, they may be &lsquo;activated&rsquo; by pressing the <TypographyInlineCode>c</TypographyInlineCode> or <TypographyInlineCode>s</TypographyInlineCode> key respectively whilst on the home page—which will cause the respective link to appear.
      </TypographyP>

      <TypographyP>
        The home page additionally implements instant keyboard page navigation using the <TypographyInlineCode>Shift</TypographyInlineCode> modifier key.
        The pages that may be accessed using this feature are:
      </TypographyP>
      <TypographyList>
        <TypographyListItem>
          <TypographyInlineCode>{GLOBALS.PAGES.PLACE.path}</TypographyInlineCode>: By pressing <TypographyInlineCode>Shift</TypographyInlineCode> + <TypographyInlineCode>P</TypographyInlineCode>
        </TypographyListItem>
        <TypographyListItem>
          <TypographyInlineCode>{GLOBALS.PAGES.CALIBRATE.path}</TypographyInlineCode>: By pressing <TypographyInlineCode>Shift</TypographyInlineCode> + <TypographyInlineCode>C</TypographyInlineCode>
        </TypographyListItem>
        <TypographyListItem>
          <TypographyInlineCode>{GLOBALS.PAGES.SETTINGS.path}</TypographyInlineCode>: By pressing <TypographyInlineCode>Shift</TypographyInlineCode> + <TypographyInlineCode>S</TypographyInlineCode>
        </TypographyListItem>
        <TypographyListItem>
          <TypographyInlineCode>{GLOBALS.PAGES.LEARN.path}</TypographyInlineCode>: By pressing <TypographyInlineCode>Shift</TypographyInlineCode> + <TypographyInlineCode>L</TypographyInlineCode>
        </TypographyListItem>
      </TypographyList>
    </>
  )
}

function ConstituentPlacePage() {
  return (
    <>
      <TypographyP>
        The <TypographyInlineCode>{GLOBALS.PAGES.PLACE.path}</TypographyInlineCode> page is centrepiece of our project.
      </TypographyP>

      <TypographyP>
        Note that <TypographyInlineCode>{GLOBALS.PAGES.CALIBRATE.path}</TypographyInlineCode> and <TypographyInlineCode>{GLOBALS.PAGES.SETTINGS.path}</TypographyInlineCode> are implemented as &lsquo;hidden&rsquo; pages, in that they are not visible by default.
        This design decision is motivated by an intent that they should be scarcely necessary—under regular circumstances, one should not need to access them.
        On the off-chance that they might become necessary, however, they may be &lsquo;activated&rsquo; by pressing the <TypographyInlineCode>c</TypographyInlineCode> or <TypographyInlineCode>s</TypographyInlineCode> key respectively whilst on the home page—which will cause the respective link to appear.
      </TypographyP>

      <TypographyP>
        The home page additionally implements instant keyboard page navigation using the <TypographyInlineCode>Shift</TypographyInlineCode> modifier key.
        The pages that may be accessed using this feature are:
      </TypographyP>
      <TypographyList>
        <TypographyListItem>
          <TypographyInlineCode>{GLOBALS.PAGES.PLACE.path}</TypographyInlineCode>: By pressing <TypographyInlineCode>Shift</TypographyInlineCode> + <TypographyInlineCode>P</TypographyInlineCode>
        </TypographyListItem>
        <TypographyListItem>
          <TypographyInlineCode>{GLOBALS.PAGES.CALIBRATE.path}</TypographyInlineCode>: By pressing <TypographyInlineCode>Shift</TypographyInlineCode> + <TypographyInlineCode>C</TypographyInlineCode>
        </TypographyListItem>
        <TypographyListItem>
          <TypographyInlineCode>{GLOBALS.PAGES.SETTINGS.path}</TypographyInlineCode>: By pressing <TypographyInlineCode>Shift</TypographyInlineCode> + <TypographyInlineCode>S</TypographyInlineCode>
        </TypographyListItem>
        <TypographyListItem>
          <TypographyInlineCode>{GLOBALS.PAGES.LEARN.path}</TypographyInlineCode>: By pressing <TypographyInlineCode>Shift</TypographyInlineCode> + <TypographyInlineCode>L</TypographyInlineCode>
        </TypographyListItem>
      </TypographyList>
    </>
  )
}
