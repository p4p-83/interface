import type { Metadata } from 'next'
import { ReactNode } from 'react'

import * as GLOBALS from '@/app/globals'
import { LayoutMain } from '@/components/LayoutMain'
import { Header } from '@/components/Header'
import { PageHeading } from '@/components/PageHeading'
import { ThemeToggleIcon } from '@/components/ThemeToggle'
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
  TypographyImage,
  TypographyMuted,
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
        Our pick-and-place system comprises a number of distinct components, or modules—each of which serves a unique role towards the successful function of our machine.
        These components are:
      </TypographyP>

      <TypographyList>

        <TypographyListItem>
          <TypographyLink href={GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.GANTRY.URL}>
            <TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.GANTRY.NAME}</TypographyInlineCode>
          </TypographyLink>
          : The stateless, low-level machine control of our stepper motors, vacuum nozzle, and limit switches.
        </TypographyListItem>

        <TypographyListItem>
          <TypographyLink href={GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.VISION.URL}>
            <TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.VISION.NAME}</TypographyInlineCode>
          </TypographyLink>
          : The machine vision that makes our machine intelligent.
        </TypographyListItem>

        <TypographyListItem>
          <TypographyLink href={GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.CONTROLLER.URL}>
            <TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.CONTROLLER.NAME}</TypographyInlineCode>
          </TypographyLink>
          : The heart of our system, serving as the command & control that conducts the orchestra.
        </TypographyListItem>

        <TypographyListItem>
          <TypographyLink href={GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.INTERFACE.URL}>
            <TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.INTERFACE.NAME}</TypographyInlineCode>
          </TypographyLink>
          : This web application; the user interface of our pick-and-place machine.
        </TypographyListItem>

      </TypographyList>

      <TypographyP>
        The <TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.GANTRY.NAME}</TypographyInlineCode>, <TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.VISION.NAME}</TypographyInlineCode>, and <TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.CONTROLLER.NAME}</TypographyInlineCode> each run on a single Raspberry Pi 5.
        This <TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.INTERFACE.NAME}</TypographyInlineCode> web application is served by the Raspberry Pi to a client browser, which may be the operator's own device; a University computer; or a web browser running on the same Raspberry Pi.
      </TypographyP>

      <TypographyP>
        In this section, we outline these components, the role they each play, some technical implementation details that pertain, and the interactions between them.
        The overarching focus is on these system behaviours and interactions—consequently, many of the following headings necessarily cross component boundaries.
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
        This video feed is streamed from the <TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.CONTROLLER.NAME}</TypographyInlineCode> to this <TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.INTERFACE.NAME}</TypographyInlineCode>, where it is displayed to the operator.
      </TypographyP>

      <TypographyP>
        A MediaMTX real-time media server is used to stream the real-time video feed from the Raspberry Pi&apos;s camera(s) to this web application over the WebRTC protocol.
        The video stream is first read from the sensor with the rpicam-vid CLI application built atop libcamera that is distributed as part of Raspberry Pi OS, before being piped through stdin in YUV 4:2:0 to ffmpeg to encode it into H.264 and stream it to MediaMTX via RTSP.
      </TypographyP>

      <TypographyP>
        Once the H.264 video is streamed into MediaMTX, it is then read via WebRTC by this client <TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.INTERFACE.NAME}</TypographyInlineCode>, where the WHEP stream is displayed through an HTML &lt;video&gt; tag on /place.
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

      <TypographyH5><TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.CONTROLLER.NAME}</TypographyInlineCode> to <TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.GANTRY.NAME}</TypographyInlineCode></TypographyH5>


      <TypographyH5><TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.CONTROLLER.NAME}</TypographyInlineCode> to <TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.INTERFACE.NAME}</TypographyInlineCode></TypographyH5>
      <TypographyP>
        A WebSocket connection is established over TCP and HTTP between the <TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.CONTROLLER.NAME}</TypographyInlineCode> and this <TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.INTERFACE.NAME}</TypographyInlineCode> web application for a real-time, low-latency, full-duplex data channel, which is used to exchange information and instructions.
      </TypographyP>

      <TypographyP id='normalisation'>
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
        - App Router
        - Tailwind
        - shadcn/ui with Radix
        - sonner
        - zod
      </TypographyP>

      <TypographyH5>Data Context</TypographyH5>
      - A React context is created to distribute... see PR description.
      - Backed by `window.localStorage` as stringified JSON.

      <TypographyH5>Form Validation</TypographyH5>
      - Zod is used for the declaration of form schemas and field validation on the settings page.

      <TypographyH5 id='nearest-target'>Nearest-Target Algorithm</TypographyH5>

    </>
  )
}

function ApplicationInterface() {
  return (
    <>
      <TypographyH3>Application Interface</TypographyH3>

      <TypographyH4>Light/Dark Theme</TypographyH4>
      <TypographyP>
        This web application implements a global light and dark theme that is responsive to browser preferences by default.
        You may change this at any time by using the <TypographyInlineCode><ThemeToggleIcon className='align-text-bottom' /></TypographyInlineCode> toggle at the top right-hand corner of the viewport.
      </TypographyP>

    </>
  )
}

function ConstituentPages() {
  type PageAccordionItemProps = {
    children: ReactNode;
    page: GLOBALS.Page;
  };

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
        {/* TODO: option modifier */}
        Note that <TypographyInlineCode>{GLOBALS.PAGES.CALIBRATE.path}</TypographyInlineCode> and <TypographyInlineCode>{GLOBALS.PAGES.SETTINGS.path}</TypographyInlineCode> are implemented as &lsquo;hidden&rsquo; pages, in that they are not visible by default.
        This design decision is motivated by an intent that they should be scarcely necessary—under regular circumstances, one should not need to access them.
        On the off-chance that they might become necessary, however, they may be &lsquo;activated&rsquo; by pressing the <TypographyInlineCode>c</TypographyInlineCode> or <TypographyInlineCode>s</TypographyInlineCode> key respectively whilst on the home page—which will cause the respective link to appear.
      </TypographyP>

      <TypographyH5>Keyboard Navigation</TypographyH5>
      <TypographyP>
        The home page additionally implements instant keyboard page navigation using the <TypographyInlineCode>Shift</TypographyInlineCode> modifier key.
        The pages that may be accessed using this feature are:
      </TypographyP>
      <TypographyList>
        <TypographyListItem>
          <TypographyInlineCode>{GLOBALS.PAGES.PLACE.path}</TypographyInlineCode>: By pressing <TypographyInlineCode>Shift</TypographyInlineCode>+<TypographyInlineCode>P</TypographyInlineCode>
        </TypographyListItem>
        <TypographyListItem>
          <TypographyInlineCode>{GLOBALS.PAGES.CALIBRATE.path}</TypographyInlineCode>: By pressing <TypographyInlineCode>Shift</TypographyInlineCode>+<TypographyInlineCode>C</TypographyInlineCode>
        </TypographyListItem>
        <TypographyListItem>
          <TypographyInlineCode>{GLOBALS.PAGES.SETTINGS.path}</TypographyInlineCode>: By pressing <TypographyInlineCode>Shift</TypographyInlineCode>+<TypographyInlineCode>S</TypographyInlineCode>
        </TypographyListItem>
        <TypographyListItem>
          <TypographyInlineCode>{GLOBALS.PAGES.LEARN.path}</TypographyInlineCode>: By pressing <TypographyInlineCode>Shift</TypographyInlineCode>+<TypographyInlineCode>L</TypographyInlineCode>
        </TypographyListItem>
      </TypographyList>
    </>
  )
}

import placeProgressImage from './place-progress.png'
import placeErrorImage from './place-error.png'
import placeSocketImage from './place-socket.png'
function ConstituentPlacePage() {
  return (
    <>
      <TypographyP>
        The <TypographyInlineCode>{GLOBALS.PAGES.PLACE.path}</TypographyInlineCode> page is the centrepiece of our interface.
      </TypographyP>

      <TypographyP>
        It comprises of a full screen feed of the real-time WebRTC video stream received from the <TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.CONTROLLER.NAME}</TypographyInlineCode>, below an overlay that implements the interactive user interface and heads-up display.
      </TypographyP>

      <TypographyH5>Page Lifecycle</TypographyH5>
      <TypographyP>
        Upon navigating to /place, the the operator is first shown a dynamic progress bar whilst this <TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.INTERFACE.NAME}</TypographyInlineCode> establishes a WebRTC connection to the <TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.CONTROLLER.NAME}</TypographyInlineCode> WHEP stream address configured on /settings.
      </TypographyP>

      <TypographyImage
        src={placeProgressImage}
        alt='/place page progress bar'
      />

      <TypographyP>
        If the connection fails, an error page is displayed with a button to navigate home.
      </TypographyP>

      <TypographyImage
        src={placeErrorImage}
        alt='/place video error'
      />

      <TypographyP>
        If instead the connection succeeds, this <TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.INTERFACE.NAME}</TypographyInlineCode> subsequently establishes a WebSocket connection to the <TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.CONTROLLER.NAME}</TypographyInlineCode> WebSocket address, also configurable via /settings.
        Provided that this too succeeds, the heads-up display is then rendered and overlaid atop the video stream.
      </TypographyP>

      <TypographyImage
        src={placeSocketImage}
        alt='/place connected WebSocket'
      />

      <TypographyH5>Heads-Up Display</TypographyH5>
      <TypographyP>
        <TypographyMuted>
          The heads-up display is far-from-final.
          This heading documents its present state.
        </TypographyMuted>
      </TypographyP>

      <TypographyP>
        The heads-up display consists of visual elements overlaid atop the video feed.
        There are four kinds of elements:
      </TypographyP>

      <TypographyList ordered>
        <TypographyListItem>A cursor crosshair,</TypographyListItem>
        <TypographyListItem>A centre indicator,</TypographyListItem>
        <TypographyListItem>A target indicator, and</TypographyListItem>
        <TypographyListItem>Target markers.</TypographyListItem>
      </TypographyList>

      <TypographyP>
        The centre indicator is a fixed grey circle rendered at the centre of the video feed, and indicates the current position of the pick-and-place head.
        This indicator never moves.
      </TypographyP>

      <TypographyP>
        The target indicator is a temporary purple circle that indicates the uncommitted target position for the gantry to next translate to, if one exists.
      </TypographyP>

      <TypographyP>
        The target markers are grey squares drawn atop centroids of interest that are identified by the <TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.VISION.NAME}</TypographyInlineCode>, which are transmitted to this <TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.INTERFACE.NAME}</TypographyInlineCode> via the <TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.CONTROLLER.NAME}</TypographyInlineCode>.
      </TypographyP>

      <TypographyH5>User Input</TypographyH5>
      <TypographyP>
        The /place interface has been designed for speed, intuition, and brevity.
        To fulfil these goals, a range of input schemes has been implemented—each tailored for a unique need:
      </TypographyP>

      <TypographyList>
        <TypographyListItem>mouse clicks,</TypographyListItem>
        <TypographyListItem>directional key presses, and</TypographyListItem>
        <TypographyListItem><TypographyInlineCode>Shift</TypographyInlineCode> + directional key presses.</TypographyListItem>
      </TypographyList>

      <TypographyP>
        The simplest input is a mouse click at any point atop the video feed.
        The clicked pixel coordinates are processed into pixel deltas <TypographyInlineCode>(Δx, Δy)</TypographyInlineCode> with respect to the centre of the video feed, used as an analogy for the current head position; <TypographyLink href='#normalisation'>normalised</TypographyLink>; and sent to the <TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.CONTROLLER.NAME}</TypographyInlineCode>, which ultimately translates the <TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.GANTRY.NAME}</TypographyInlineCode>.
        If the operator clicks within the bounds of a target marker, it is the delta position of that target&apos;s centroid that is transmitted to the <TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.CONTROLLER.NAME}</TypographyInlineCode>.
      </TypographyP>

      <TypographyP>
        More advanced—but more efficient—operator inputs may be made via key presses, captured and handled by the overlay.
        The primary key input scheme uses directional keys without modifiers, where directional keys are:
      </TypographyP>

      <TypographyList>
        <TypographyListItem>Up: <TypographyInlineCode>w</TypographyInlineCode>, <TypographyInlineCode>k</TypographyInlineCode>, <TypographyInlineCode>↑</TypographyInlineCode>.</TypographyListItem>
        <TypographyListItem>Down: <TypographyInlineCode>s</TypographyInlineCode>, <TypographyInlineCode>j</TypographyInlineCode>, <TypographyInlineCode>↓</TypographyInlineCode>.</TypographyListItem>
        <TypographyListItem>Left: <TypographyInlineCode>a</TypographyInlineCode>, <TypographyInlineCode>h</TypographyInlineCode>, <TypographyInlineCode>←</TypographyInlineCode>.</TypographyListItem>
        <TypographyListItem>Right: <TypographyInlineCode>d</TypographyInlineCode>, <TypographyInlineCode>l</TypographyInlineCode>, <TypographyInlineCode>→</TypographyInlineCode>.</TypographyListItem>
      </TypographyList>

      <TypographyP>
        These directional keys—inspired by video games and <TypographyInlineCode>vi</TypographyInlineCode>—will select the &lsquo;best fit&rsquo; target marker in the specified direction, as determined by our <TypographyLink href='#nearest-target'>weighted nearest-target algorithm</TypographyLink>.
        This selected target marker is indicated by the temporary target indicator, which becomes the zero-reference for subsequent directional key presses.
        This allows the operator to input a series of directional keys to quickly pounce to a desired target, all without lifting their fingers from the keyboard—a design directly inspired by <TypographyInlineCode>vi</TypographyInlineCode>-type editors.
        Once a target marker is pounced to, two additional keys become valid:
        {/* TODO: what is the wording people use to justify vim? */}
      </TypographyP>

      {/* TODO: document 3 July images */}

      <TypographyList ordered>
        <TypographyListItem>Reset indicated target: <TypographyInlineCode>r</TypographyInlineCode>.</TypographyListItem>
        <TypographyListItem>Commit indicated target: <TypographyInlineCode>␣</TypographyInlineCode> (space).</TypographyListItem>
      </TypographyList>

      <TypographyP>
        These will reset the indicated target to <TypographyInlineCode>(0, 0)</TypographyInlineCode>, or transmit the deltas for the indicated target to the <TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.CONTROLLER.NAME}</TypographyInlineCode>.
      </TypographyP>

      <TypographyP>
        Despite the hope that:
      </TypographyP>

      <TypographyList ordered>
        <TypographyListItem>the <TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.VISION.NAME}</TypographyInlineCode> perfectly identifies all target markers of interest,</TypographyListItem>
        <TypographyListItem>those target marker positions are transmitted in real-time via the <TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.CONTROLLER.NAME}</TypographyInlineCode> to this <TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.INTERFACE.NAME}</TypographyInlineCode>,</TypographyListItem>
        <TypographyListItem>the weighted nearest-target algorithm is indeed intuitive and fit-for-purpose,</TypographyListItem>
        <TypographyListItem>the <TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.CONTROLLER.NAME}</TypographyInlineCode> correctly translates the <TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.GANTRY.NAME}</TypographyInlineCode> to the selected target marker position, and</TypographyListItem>
        <TypographyListItem>the <TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.CONTROLLER.NAME}</TypographyInlineCode> and <TypographyInlineCode>{GLOBALS.EXTERAL_URLS.PROJECT.GITHUB.GANTRY.NAME}</TypographyInlineCode> correctly places the component using the vacuum nozzle,</TypographyListItem>
      </TypographyList>

      <TypographyP>
        we realise that a manual override mechanism is likely to be necessary.
        To this end, a secondary input scheme is implemented using the <TypographyInlineCode>Shift</TypographyInlineCode> modifier key, where <TypographyInlineCode>Shift</TypographyInlineCode> + the same directional inputs will always produce a fixed step in that direction provided a gantry limit is not exceeded.
        <TypographyMuted>
          {' '}The fixed step is currently an &lsquo;arbitrary&rsquo; delta corresponding to 1% of the video feed.
          This will eventually be configurable to a value in metric distance units.
        </TypographyMuted>
      </TypographyP>

      <TypographyP>
        <TypographyMuted>
          {/* TODO: read through Logbook / Discord messages for all of these good ideas */}
          Other ideas that are yet to be implemented include:
        </TypographyMuted>
      </TypographyP>

      <TypographyMuted>
        <TypographyList>
          <TypographyListItem>1, 2, 3, 4, etc. for parts bins or programmable saved positions</TypographyListItem>
        </TypographyList>
      </TypographyMuted>

      <TypographyH5>Navigation</TypographyH5>
      <TypographyP>
        To return to the home page, the operator should use their browser&apos; native navigation mechanism(s):
      </TypographyP>

      <TypographyList>
        <TypographyListItem>Swipe with two fingers trackpad to the right, if applicable;</TypographyListItem>
        <TypographyListItem><TypographyInlineCode>⌘</TypographyInlineCode>+<TypographyInlineCode>[</TypographyInlineCode> on macOS, or <TypographyInlineCode>Alt</TypographyInlineCode>+<TypographyInlineCode>←</TypographyInlineCode> on Windows or Linux; or</TypographyListItem>
        <TypographyListItem>Use the browser&apos;s &lsquo;go back&rsquo; navigation button.</TypographyListItem>
      </TypographyList>
    </>
  )
}
