import type { Metadata } from 'next'
import { ReactNode } from 'react'

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
  TypographyH5,
} from '@/components/ui/typography'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ThemeToggleIcon } from '@/components/ThemeToggle'

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

          <ApplicationInterface />

          <ConstituentPages />

          <SystemArchitecture />

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

      <TypographyP>
        Our pick-and-place system comprises a number distinct components, or modules—each of which serves a unique role towards the successful implementation of our machine.
        These components are:
      </TypographyP>

      <TypographyList>
        <TypographyListItem>p4p-83/gantry: The stateless, low-level machine control of our stepper motors, vacuum nozzle, and limit switches.</TypographyListItem>
        <TypographyListItem>p4p-83/vision: The machine vision that makes our machine intelligent.</TypographyListItem>
        <TypographyListItem>p4p-83/controller: The heart of our system, serving as the command & control that conducts the orchestra.</TypographyListItem>
        <TypographyListItem>p4p-83/interface: This web application; the user interface of our pick-and-place machine.</TypographyListItem>
      </TypographyList>

      <TypographyP>
        The gantry, vision, and controller each run on a Raspberry Pi 5.
        The interface web application is served by the Raspberry Pi to a client browser, which may be the operator's own device; a University computer; or a web browser running on the same Raspberry Pi.
      </TypographyP>

      <TypographyP>
        In this section, we outline these components; the role they each play; some technical implementation details that pertain; and the interactions between them.
        The overarching focus is on these system behaviours and interactions—as such, many of the following headings necessarily cross component boundaries.
      </TypographyP>

      <TypographyH4>Gantry Control</TypographyH4>
      <TypographyBlockquote>
        A work in progress!
      </TypographyBlockquote>

      <TypographyH4>Machine Vision</TypographyH4>
      <TypographyBlockquote>
        A work in progress!
      </TypographyBlockquote>

      <TypographyH4>Video Streaming</TypographyH4>
      <TypographyP>
        {/* TODO: */}
        - Why?
        For the user to operate a real-time pick-and-place, they necessarily require a real-time video feed.
        This video feed is streamed from the p4p-83/controller to this p4p-83/interface, where it is displayed to the operator.
      </TypographyP>

      <TypographyP>
        A MediaMTX real-time media server is used to stream the real-time video feed from the Raspberry Pi&apos;s camera(s) to this web application over the WebRTC protocol.
        The video stream is first read from the sensor with the rpicam-vid CLI application built atop libcamera that is distributed as part of Raspberry Pi OS, before being piped through stdin in YUV 4:2:0 to ffmpeg to encode it into H.264 and stream it to MediaMTX via RTSP.
      </TypographyP>

      <TypographyP>
        Once the H.264 video is streamed into MediaMTX, it is then read via WebRTC by this client interface, where the WHEP stream is displayed through an HTML &lt;video&gt; tag on /place.
      </TypographyP>

      <TypographyH4>Message Passing</TypographyH4>
      <TypographyP>
        As with any system that comprises of distinct components, our distinct components must communicate.
      </TypographyP>

      <TypographyP>
        Protocol Buffers are used to serialise and format the data payloads being exchanged between each component.
        Protocol Buffers are a language- and platform-agnostic binary serialisation mechanism for structured data, like JSON or XML, but &lsquo;smaller, faster, and simpler&rsquo;.
        Our .proto language definition files are contained within p4p-83/proto, which is included as a git submodule in our individual component repositories.
        The p4p-83/proto repository additionally contains a script to recompile target language bindings when changes are made.
      </TypographyP>

      <TypographyH5>p4p-83/controller to p4p-83/gantry</TypographyH5>


      <TypographyH5>p4p-83/controller to p4p-83/interface</TypographyH5>
      <TypographyP>
        A WebSocket connection is established over TCP and HTTP between the controller and this interface web application for a real-time, low-latency, full-duplex data channel, which is used to exchange information and instructions.
      </TypographyP>

      <TypographyP>
        Numeric data, such as the `TARGET_DELTAS` between the present gantry position and the operator's desired target, is normalised into an absolute, invariant range of [0, 65535].
        This normalisation ensures that the units are independent of run-time variables—the client viewport, or streamed video dimensions, for instance.
        This range was chosen to be the representation range of an unsigned 16-bit integer for performance.
        By using this range, we can leverage protocol buffer varints https://protobuf.dev/programming-guides/encoding/#varints, which would not be possible had we chosen a `float` or `double` in the range of [0, 1].
      </TypographyP>

      <TypographyH4>User Interface</TypographyH4>
      <TypographyP>
        {/* TODO: refer to software CV */}
        {/* TODO: document languages */}
      - Next.js and React, TypeScript
      - Tailwind
      - shadcn/ui with Radix
      - zod
      </TypographyP>

      <TypographyH5>Data Context</TypographyH5>
      - A React context is created to distribute... see PR description.
        - Backed by `window.localStorage` as stringified JSON.

      <TypographyH5>Form Validation</TypographyH5>
      - Zod is used for the declaration of form schemas and field validation on the settings page.

    </>
  )
}

function ApplicationInterface() {
  return (
    <>
      <TypographyH3>Application Interface</TypographyH3>

      <TypographyH4>Light/Dark Theme</TypographyH4>
      <TypographyP>
        This web application implements a global light and dark theme that is by default responsive to the browser/system preferences.
        You may change this at any time by using the <TypographyInlineCode><ThemeToggleIcon className='align-text-bottom' /></TypographyInlineCode> toggle at the top right-hand corner of the viewport.
      </TypographyP>

    </>
  )
}

function ConstituentPages() {
  type PageAccordionItemProps = {
    children: ReactNode;
    page: GLOBALS.Page;
  }

  function PageAccordionItem({ children, page }: PageAccordionItemProps) {
    return (
      <AccordionItem value={page.path}>
        <AccordionTrigger>
          <span className='flex flex-row gap-2 justify-between items-center w-full pr-2'>
            <TypographyH4>{page.name} Page</TypographyH4>
            <TypographyInlineCode>{page.path}</TypographyInlineCode>
          </span>
        </AccordionTrigger>
        <AccordionContent className='text-base'>
          {children}
        </AccordionContent>
      </AccordionItem>
    )
  }

  return (
    <>
      <TypographyH3>Constituent Pages</TypographyH3>
      <Accordion type='multiple' className='w-full mt-2'>

        <PageAccordionItem page={GLOBALS.PAGES.HOME}>
          <ConstituentHomePage />
        </PageAccordionItem>

        <PageAccordionItem page={GLOBALS.PAGES.PLACE}>
          <ConstituentPlacePage />
        </PageAccordionItem>

        {/* <PageAccordionItem page={GLOBALS.PAGES.CALIBRATE}>
          <ConstituentCalibratePage />
        </PageAccordionItem>

        <PageAccordionItem page={GLOBALS.PAGES.SETTINGS}>
          <ConstituentSettingsPage />
        </PageAccordionItem> */}

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
