import type { Metadata } from 'next'
import { type ReactNode } from 'react'
import { ThickArrowUpIcon } from '@radix-ui/react-icons'

import * as GLOBALS from '@/app/globals'
import { LayoutMain } from '@/components/LayoutMain'
import { Header } from '@/components/Header'
import { PageHeading } from '@/components/PageHeading'
import { ThemeToggleIcon } from '@/components/ThemeToggle'
import { Badge } from '@/components/ui/badge'
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
  TypographyTable,
  TypographyTableHead,
  TypographyTableBody,
  TypographyTableRow,
  TypographyTableHeaderCell,
  TypographyTableDataCell,
} from '@/components/ui/typography'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export const metadata: Metadata = GLOBALS.PAGES.getMetadata(GLOBALS.PAGES.LEARN)

export const FRAGMENT_IDS = {
  DATA_NORMALISATION: 'normalisation',
  NEAREST_TARGET: 'nearest-target',
} as const

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
            The intent for this page is to serve as a one-stop-shop towards understanding the operating principles and features of our pick-and-place machine.
            <br />
            <br />
            Whether you&apos;re looking to hone your skills—or simply after an in-depth look at our system—we do hope that you&apos;ll find this page to hit just the right spot.
            <br />
            <br />
            ~ <TypographyLink href={GLOBALS.JAMES}>James Bao</TypographyLink> and <TypographyLink href={GLOBALS.SAM}>Sam Skinner</TypographyLink>
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

function ApplicationInterface() {
  return (
    <>

      <TypographyH3>Application Interface</TypographyH3>
      <Accordion type='multiple' className='w-full mt-2'>

        <AccordionItem value='theme'>
          <AccordionTrigger>
            <span className='flex flex-row gap-2 justify-between items-center w-full pr-2'>
              <TypographyH4>Light/Dark Theme</TypographyH4>
              <TypographyInlineCode><ThemeToggleIcon className='align-text-bottom' /></TypographyInlineCode>
            </span>
          </AccordionTrigger>
          <AccordionContent className='text-base'>
            <TypographyP>
              This web application implements a global light and dark theme that is responsive to browser preferences by default.
              You may change this at any time by using the <TypographyInlineCode><ThemeToggleIcon className='align-text-bottom' /></TypographyInlineCode> toggle at the top right-hand corner of the viewport.
            </TypographyP>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='keyboardNavigation'>
          <AccordionTrigger>
            <span className='flex flex-row gap-2 justify-between items-center w-full pr-2'>
              <TypographyH4>Keyboard Navigation</TypographyH4>
              <TypographyInlineCode><ThickArrowUpIcon className='align-text-bottom' /></TypographyInlineCode>
            </span>
          </AccordionTrigger>
          <AccordionContent className='text-base'>
            <TypographyP>
              Instant page navigation via the keyboard is implemented on the home page, and all pages that feature the site header element.
              These pages are:
            </TypographyP>

            <TypographyList>
              <TypographyListItem>
                <GLOBALS.InlineCode.Pages.Home />,
              </TypographyListItem>
              <TypographyListItem>
                <GLOBALS.InlineCode.Pages.Calibrate />,
              </TypographyListItem>
              <TypographyListItem>
                <GLOBALS.InlineCode.Pages.Settings />,
              </TypographyListItem>
              <TypographyListItem>
                <GLOBALS.InlineCode.Pages.Learn />, and
              </TypographyListItem>
              <TypographyListItem>
                <GLOBALS.InlineCode.Pages.Project />.
              </TypographyListItem>
            </TypographyList>

            <TypographyP>
              This keyboard navigation scheme is accessed via the <TypographyInlineCode>Shift</TypographyInlineCode> modifier key.
              The pages that may be accessed using this scheme are:
            </TypographyP>
            <TypographyList>
              <TypographyListItem>
                <GLOBALS.InlineCode.Pages.Home />: By pressing <TypographyInlineCode>Shift</TypographyInlineCode>+<TypographyInlineCode>{GLOBALS.PAGES.HOME.shortcutKey}</TypographyInlineCode>.
              </TypographyListItem>
              <TypographyListItem>
                <GLOBALS.InlineCode.Pages.Place />: By pressing <TypographyInlineCode>Shift</TypographyInlineCode>+<TypographyInlineCode>{GLOBALS.PAGES.PLACE.shortcutKey}</TypographyInlineCode>.
              </TypographyListItem>
              <TypographyListItem>
                <GLOBALS.InlineCode.Pages.Calibrate />: By pressing <TypographyInlineCode>Shift</TypographyInlineCode>+<TypographyInlineCode>{GLOBALS.PAGES.CALIBRATE.shortcutKey}</TypographyInlineCode>.
              </TypographyListItem>
              <TypographyListItem>
                <GLOBALS.InlineCode.Pages.Settings />: By pressing <TypographyInlineCode>Shift</TypographyInlineCode>+<TypographyInlineCode>{GLOBALS.PAGES.SETTINGS.shortcutKey}</TypographyInlineCode>.
              </TypographyListItem>
              <TypographyListItem>
                <GLOBALS.InlineCode.Pages.Learn />: By pressing <TypographyInlineCode>Shift</TypographyInlineCode>+<TypographyInlineCode>{GLOBALS.PAGES.LEARN.shortcutKey}</TypographyInlineCode>.
              </TypographyListItem>
              <TypographyListItem>
                <GLOBALS.InlineCode.Pages.Project />: By pressing <TypographyInlineCode>Shift</TypographyInlineCode>+<TypographyInlineCode>{GLOBALS.PAGES.PROJECT.shortcutKey}</TypographyInlineCode>.
              </TypographyListItem>
            </TypographyList>
          </AccordionContent>
        </AccordionItem>

      </Accordion>

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

        <PageAccordionItem page={GLOBALS.PAGES.CALIBRATE}>
          <TypographyBlockquote>
            A work in progress!
          </TypographyBlockquote>
        </PageAccordionItem>

        <PageAccordionItem page={GLOBALS.PAGES.SETTINGS}>
          {/* TODO: */}
          <TypographyBlockquote>
            A work in progress!
          </TypographyBlockquote>
        </PageAccordionItem>

      </Accordion>
    </>
  )
}

function ConstituentHomePage() {
  return (
    <>
      <TypographyP>
        The home <GLOBALS.InlineCode.Pages.Home /> page is the launchpad of our user interface.
        From there, you can access:
      </TypographyP>

      <TypographyList>
        <TypographyListItem>
          <GLOBALS.InlineCode.Pages.Place />: Operate the pick-and-place machine.
        </TypographyListItem>
        <TypographyListItem>
          <GLOBALS.InlineCode.Pages.Calibrate />: Tune the machine&apos;s operating parameters to improve performance.
        </TypographyListItem>
        <TypographyListItem>
          <GLOBALS.InlineCode.Pages.Settings />: Configure the system&apos;s interface parameters to reflect deployment changes.
        </TypographyListItem>
        <TypographyListItem>
          <GLOBALS.InlineCode.Pages.Learn />: This page; learn about how to operate and maintain the pick-and-place machine.
        </TypographyListItem>
        <TypographyListItem>
          <GLOBALS.InlineCode.Pages.Project />: Read about the background motivations of this research project.
        </TypographyListItem>
      </TypographyList>

      <TypographyP>
        Note that <GLOBALS.InlineCode.Pages.Calibrate /> and <GLOBALS.InlineCode.Pages.Settings /> are implemented as &lsquo;hidden&rsquo; pages, in that they are not visible by default.
        This design decision is motivated by an intent that they should be scarcely necessary—under regular circumstances, one should not need to access them.
        On the off-chance that they might become necessary, however, they may be revealed by pressing:
      </TypographyP>

      <TypographyList>
        <TypographyListItem><TypographyInlineCode>⌥</TypographyInlineCode> on macOS, or</TypographyListItem>
        <TypographyListItem><TypographyInlineCode>Alt</TypographyInlineCode> on Windows/Linux.</TypographyListItem>
      </TypographyList>

      <TypographyP>
        Alternatively, pressing the <TypographyInlineCode>{GLOBALS.PAGES.CALIBRATE.shortcutKey.toLowerCase()}</TypographyInlineCode> and/or <TypographyInlineCode>{GLOBALS.PAGES.SETTINGS.shortcutKey.toLowerCase()}</TypographyInlineCode> key(s) will selectively reveal the <GLOBALS.InlineCode.Pages.Calibrate /> and/or <GLOBALS.InlineCode.Pages.Settings /> links respectively.
        This is particularly useful in cases where the <TypographyInlineCode>⌥</TypographyInlineCode>/<TypographyInlineCode>Alt</TypographyInlineCode> modifier key holds special meaning to the browser.
      </TypographyP>
    </>
  )
}

// TODO: update images
import placeProgressImage from './place-progress.png'
import placeErrorImage from './place-error.png'
import placeSocketImage from './place-socket.png'
function ConstituentPlacePage() {
  return (
    <>
      <TypographyP>
        The <GLOBALS.InlineCode.Pages.Place /> page is the centrepiece of our interface.
      </TypographyP>

      <TypographyP>
        It comprises of a full screen feed of the real-time WebRTC video stream received from the <GLOBALS.InlineCode.GitHub.Controller />, below an overlay that implements the interactive user interface and heads-up display.
      </TypographyP>

      <TypographyH5>Page Lifecycle</TypographyH5>
      <TypographyList ordered>
        <TypographyListItem>
        Upon navigating to <GLOBALS.InlineCode.Pages.Place />, the the operator is first shown a dynamic progress bar whilst this <GLOBALS.InlineCode.GitHub.Interface /> establishes a WebRTC connection to the <GLOBALS.InlineCode.GitHub.Controller />&apos;s WHEP stream address as configured on <GLOBALS.InlineCode.Pages.Settings />.
        </TypographyListItem>

        <TypographyListItem>
        If the connection fails, an error page is displayed with a button to navigate home.
        </TypographyListItem>

        <TypographyListItem>
        If instead the connection succeeds, this <GLOBALS.InlineCode.GitHub.Interface /> subsequently establishes a WebSocket connection to the <GLOBALS.InlineCode.GitHub.Controller />&apos;s WebSocket address, also configurable via <GLOBALS.InlineCode.Pages.Settings />.
        Provided that this too succeeds, the heads-up display is then rendered and overlaid atop the video stream.
        </TypographyListItem>
      </TypographyList>

      <Carousel className='w-full' opts={{
        loop: true,
      }}>
        <CarouselContent>
          <CarouselItem>
            <TypographyImage
              src={placeProgressImage}
              alt='/place page progress bar'
            />
          </CarouselItem>
          <CarouselItem>
            <TypographyImage
              src={placeErrorImage}
              alt='/place video error'
            />
          </CarouselItem>
          <CarouselItem>
            <TypographyImage
              src={placeSocketImage}
              alt='/place connected WebSocket'
            />
          </CarouselItem>
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <TypographyH5>Heads-Up Display</TypographyH5>
      <TypographyP>
        <TypographyMuted>
          The heads-up display is far-from-final.
          This heading documents its implementation at present.
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
        The target markers are grey squares drawn atop any centroids of interest that are identified by the <GLOBALS.InlineCode.GitHub.Vision />, which are transmitted to this <GLOBALS.InlineCode.GitHub.Interface /> via the <GLOBALS.InlineCode.GitHub.Controller />.
      </TypographyP>

      <TypographyH5>User Input</TypographyH5>
      <TypographyP>
        The <GLOBALS.InlineCode.Pages.Place /> interface has been designed for speed, intuition, and brevity.
        To fulfil these goals, a range of input schemes has been implemented—each tailored for a unique need:
      </TypographyP>

      <TypographyList>
        <TypographyListItem>mouse clicks,</TypographyListItem>
        <TypographyListItem>directional key presses, and</TypographyListItem>
        <TypographyListItem><TypographyInlineCode>Shift</TypographyInlineCode>-modified directional key presses.</TypographyListItem>
      </TypographyList>

      <TypographyP>
        The simplest input is a mouse click at any point atop the video feed.
        The clicked pixel coordinates are processed into pixel deltas <TypographyInlineCode>(Δx, Δy)</TypographyInlineCode> with respect to the centre of the video feed, used as an analogy for the current head position; <TypographyLink toFragmentId href={FRAGMENT_IDS.DATA_NORMALISATION}>normalised</TypographyLink>; and sent to the <GLOBALS.InlineCode.GitHub.Controller />, which ultimately translates the <GLOBALS.InlineCode.GitHub.Gantry />.
        If the operator clicks within the bounds of a target marker, it is the delta position of that target&apos;s centroid that is transmitted to the <GLOBALS.InlineCode.GitHub.Controller />.
      </TypographyP>

      <TypographyP>
        More advanced—but more efficient—operator inputs may be made via key presses, captured and handled by the overlay.
        The primary key input scheme uses directional keys without modifiers, where valid directional keys are:
      </TypographyP>

      <TypographyList>
        <TypographyListItem>Up: <TypographyInlineCode>w</TypographyInlineCode>, <TypographyInlineCode>k</TypographyInlineCode>, <TypographyInlineCode>↑</TypographyInlineCode>.</TypographyListItem>
        <TypographyListItem>Down: <TypographyInlineCode>s</TypographyInlineCode>, <TypographyInlineCode>j</TypographyInlineCode>, <TypographyInlineCode>↓</TypographyInlineCode>.</TypographyListItem>
        <TypographyListItem>Left: <TypographyInlineCode>a</TypographyInlineCode>, <TypographyInlineCode>h</TypographyInlineCode>, <TypographyInlineCode>←</TypographyInlineCode>.</TypographyListItem>
        <TypographyListItem>Right: <TypographyInlineCode>d</TypographyInlineCode>, <TypographyInlineCode>l</TypographyInlineCode>, <TypographyInlineCode>→</TypographyInlineCode>.</TypographyListItem>
      </TypographyList>

      <TypographyP>
        These directional keys—inspired by video games and <TypographyLink href={GLOBALS.VI}><TypographyInlineCode>vi</TypographyInlineCode></TypographyLink>—will select the &lsquo;best fit&rsquo; target marker in the specified direction, as determined by our <TypographyLink toFragmentId href={FRAGMENT_IDS.NEAREST_TARGET}>weighted nearest-target algorithm</TypographyLink>.
        This selected target marker is indicated by the temporary target indicator, which becomes the zero-reference for subsequent directional key presses.
        This allows the operator to input a series of directional keys to quickly pounce to a desired target, all without lifting their fingers from the keyboard—a design directly inspired by <TypographyInlineCode>vi</TypographyInlineCode>-based text editors.
        Once a target marker is pounced to, two additional keys become valid:
      </TypographyP>

      {/* TODO: document 3 July images */}

      <TypographyList ordered>
        <TypographyListItem>Reset indicated target: <TypographyInlineCode>r</TypographyInlineCode>.</TypographyListItem>
        <TypographyListItem>Commit indicated target: <TypographyInlineCode>␣</TypographyInlineCode> (space).</TypographyListItem>
      </TypographyList>

      <TypographyP>
        These will reset the indicated target to <TypographyInlineCode>(0, 0)</TypographyInlineCode> at the centre of the video feed, or transmit the deltas for the indicated target to the <GLOBALS.InlineCode.GitHub.Controller />.
      </TypographyP>

      <TypographyP>
        Despite the hope that:
      </TypographyP>

      <TypographyList ordered>
        <TypographyListItem>the <GLOBALS.InlineCode.GitHub.Vision /> perfectly identifies all target markers of interest,</TypographyListItem>
        <TypographyListItem>those target marker centroids are transmitted in real-time via the <GLOBALS.InlineCode.GitHub.Controller /> to this <GLOBALS.InlineCode.GitHub.Interface />,</TypographyListItem>
        <TypographyListItem>the weighted nearest-target algorithm is indeed intuitive and fit-for-purpose,</TypographyListItem>
        <TypographyListItem>the <GLOBALS.InlineCode.GitHub.Controller /> correctly translates the <GLOBALS.InlineCode.GitHub.Gantry /> to the selected target marker position, and</TypographyListItem>
        <TypographyListItem>the <GLOBALS.InlineCode.GitHub.Controller /> and <GLOBALS.InlineCode.GitHub.Gantry /> correctly places the component using the vacuum nozzle,</TypographyListItem>
      </TypographyList>

      <TypographyP>
        we realise that a manual override mechanism is likely to be necessary.
        To this end, a secondary input scheme is implemented using the <TypographyInlineCode>Shift</TypographyInlineCode> modifier key, where a combination of <TypographyInlineCode>Shift</TypographyInlineCode> with the same directional inputs will always produce a fixed step in that direction—provided that a gantry limit is not exceeded.
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
          <TypographyListItem><TypographyInlineCode>1</TypographyInlineCode>, <TypographyInlineCode>2</TypographyInlineCode>, <TypographyInlineCode>3</TypographyInlineCode>, <TypographyInlineCode>4</TypographyInlineCode>, etc. to pounce to hard-coded parts bins, and/or programmable saved positions.</TypographyListItem>
        </TypographyList>
      </TypographyMuted>

      <TypographyH5>Navigation</TypographyH5>
      <TypographyP>
        To return to the home page, the operator should use their browser&apos; native navigation mechanism(s):
      </TypographyP>

      <TypographyList>
        <TypographyListItem>Swipe with two fingers to the right with the trackpad, if applicable;</TypographyListItem>
        <TypographyListItem><TypographyInlineCode>⌘</TypographyInlineCode>+<TypographyInlineCode>[</TypographyInlineCode> on macOS, or <TypographyInlineCode>Alt</TypographyInlineCode>+<TypographyInlineCode>←</TypographyInlineCode> on Windows or Linux; or</TypographyListItem>
        <TypographyListItem>Use the browser&apos;s &lsquo;go back&rsquo; navigation button.</TypographyListItem>
      </TypographyList>
    </>
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

      <TypographyTable>

        <TypographyTableHead>
          <TypographyTableRow>
            <TypographyTableHeaderCell>Component</TypographyTableHeaderCell>
            <TypographyTableHeaderCell>Technologies</TypographyTableHeaderCell>
            <TypographyTableHeaderCell>Description</TypographyTableHeaderCell>
          </TypographyTableRow>
        </TypographyTableHead>

        <TypographyTableBody>
          <TypographyTableRow>
            <TypographyTableDataCell><GLOBALS.Links.GitHub.Gantry /></TypographyTableDataCell>
            <TypographyTableDataCell>
              <span className='*:m-0.5'>
                <Badge variant='outline'>C++</Badge>
                <Badge variant='outline'>Protobufs</Badge>
              </span>
            </TypographyTableDataCell>
            <TypographyTableDataCell>
              The stateless, low-level machine control of our stepper motors, vacuum nozzle, and limit switches.
            </TypographyTableDataCell>
          </TypographyTableRow>

          <TypographyTableRow>
            <TypographyTableDataCell><GLOBALS.Links.GitHub.Vision /></TypographyTableDataCell>
            <TypographyTableDataCell>
              <span className='*:m-0.5'>
                <Badge variant='outline'>C++</Badge>
                <Badge variant='outline'>Julia</Badge>
                <Badge variant='outline'>libcamera</Badge>
                <Badge variant='outline'>OpenCV</Badge>
                <Badge variant='outline'>ffmpeg</Badge>
              </span>
            </TypographyTableDataCell>
            <TypographyTableDataCell>
              The machine vision that makes our machine intelligent.
            </TypographyTableDataCell>
          </TypographyTableRow>

          <TypographyTableRow>
            <TypographyTableDataCell><GLOBALS.Links.GitHub.Controller /></TypographyTableDataCell>
            <TypographyTableDataCell>
              <span className='*:m-0.5'>
                <Badge variant='outline'>C++</Badge>
                <Badge variant='outline'>Julia</Badge>
                <Badge variant='outline'>Protobufs</Badge>
                <Badge variant='outline'>WebRTC</Badge>
                <Badge variant='outline'>WebSockets</Badge>
              </span>
            </TypographyTableDataCell>
            <TypographyTableDataCell>
              The heart of our system, serving as the command & control that conducts the orchestra.
            </TypographyTableDataCell>
          </TypographyTableRow>

          <TypographyTableRow>
            <TypographyTableDataCell><GLOBALS.Links.GitHub.Interface /></TypographyTableDataCell>
            <TypographyTableDataCell>
              <span className='*:m-0.5'>
                <Badge variant='outline'>TypeScript</Badge>
                <Badge variant='outline'>Next.js</Badge>
                <Badge variant='outline'>React</Badge>
                <Badge variant='outline'>Tailwind CSS</Badge>
                <Badge variant='outline'>shadcn/ui</Badge>
                <Badge variant='outline'>zod</Badge>
                <Badge variant='outline'>Protobufs</Badge>
              </span>
            </TypographyTableDataCell>
            <TypographyTableDataCell>
              This web application; the user interface of our pick-and-place machine.
            </TypographyTableDataCell>
          </TypographyTableRow>
        </TypographyTableBody>

      </TypographyTable>

      <TypographyP>
        The <GLOBALS.InlineCode.GitHub.Gantry />, <GLOBALS.InlineCode.GitHub.Vision />, and <GLOBALS.InlineCode.GitHub.Controller /> each run on a single <TypographyLink href={GLOBALS.RASPBERRY_PI_5}>Raspberry Pi 5</TypographyLink>.
        This <GLOBALS.InlineCode.GitHub.Interface /> web application is served by the Raspberry Pi to a client browser, which may be the operator&apos;s own device; a University computer; or a web browser running on the same Raspberry Pi.
      </TypographyP>

      <TypographyP>
        In this section, we outline these components, the role they each play, some technical implementation details that pertain, and the interactions between them.
        The overarching focus is on these system behaviours and interactions—consequently, many of the following headings necessarily cross component boundaries.
      </TypographyP>

      <Accordion type='multiple' className='w-full mt-2'>
        <AccordionItem value='gantryControl'>
          <AccordionTrigger><TypographyH4>Gantry Control</TypographyH4></AccordionTrigger>
          <AccordionContent>
            <TypographyBlockquote>
              A work in progress!
            </TypographyBlockquote>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='machineVision'>
          <AccordionTrigger><TypographyH4>Machine Vision</TypographyH4></AccordionTrigger>
          <AccordionContent>
            <TypographyBlockquote>
              A work in progress!
            </TypographyBlockquote>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='videoStreaming'>
          <AccordionTrigger><TypographyH4>Video Streaming</TypographyH4></AccordionTrigger>
          <AccordionContent>
            <TypographyP>
              Any operator of a real-time pick-and-place necessarily requires a real-time video feed.
              This video feed is streamed from the <GLOBALS.InlineCode.GitHub.Controller /> to this <GLOBALS.InlineCode.GitHub.Interface />, where it is displayed to the operator.
            </TypographyP>

            <TypographyP>
              A <TypographyLink href={GLOBALS.MEDIA_MTX}>MediaMTX</TypographyLink> real-time media server is used to stream the real-time video feed from the Raspberry Pi&apos;s camera(s) to this web application over the <TypographyLink href={GLOBALS.WEB_RTC}>WebRTC</TypographyLink> protocol.
              The video stream is first read from the sensor with the <TypographyLink href={GLOBALS.RPI_CAM_VID}><TypographyInlineCode>rpicam-vid</TypographyInlineCode></TypographyLink> CLI application (built atop <TypographyLink href={GLOBALS.LIB_CAMERA}><TypographyInlineCode>libcamera</TypographyInlineCode></TypographyLink>) that is distributed as part of <TypographyLink href={GLOBALS.RASPBERRY_PI_OS}>Raspberry Pi OS</TypographyLink>, before being piped through <TypographyInlineCode>stdin</TypographyInlineCode> to <TypographyLink href={GLOBALS.FFMPEG}><TypographyInlineCode>ffmpeg</TypographyInlineCode></TypographyLink>.
              It is then transcoded by <TypographyInlineCode>ffmpeg</TypographyInlineCode> from its raw <TypographyLink href={GLOBALS.YUV_420}><TypographyInlineCode>YUV 4:2:0</TypographyInlineCode></TypographyLink> format into <TypographyLink href={GLOBALS.H_264}><TypographyInlineCode>H.264</TypographyInlineCode></TypographyLink>, and streamed to MediaMTX via <TypographyLink href={GLOBALS.RTSP}>RTSP</TypographyLink>.
            </TypographyP>

            <TypographyP>
              Once the <TypographyInlineCode>H.264</TypographyInlineCode> video is streamed into MediaMTX, it is then read via WebRTC by this <GLOBALS.InlineCode.GitHub.Interface /> client, where the <TypographyLink href={GLOBALS.WHEP}>WHEP</TypographyLink> stream is displayed through an HTML <TypographyInlineCode>&lt;video&gt;</TypographyInlineCode> tag on <GLOBALS.InlineCode.Pages.Place />.
            </TypographyP>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='messagePassing'>
          <AccordionTrigger><TypographyH4>Message Passing</TypographyH4></AccordionTrigger>
          <AccordionContent>
            <TypographyP>
              As with any system that comprises of distinct components, our distinct components must communicate.
            </TypographyP>

            <TypographyP>
              <TypographyLink href={GLOBALS.PROTOCOL_BUFFERS.HOME}>Protocol Buffers </TypographyLink>are used to serialise and format the data payloads being exchanged between each component.
              &lsquo;Protobufs&rsquo; are a language- and platform-agnostic binary serialisation mechanism for structured data, like JSON or XML, but <TypographyLink href={GLOBALS.PROTOCOL_BUFFERS.SMALLER_FASTER_SIMPLER}>&lsquo;smaller, faster, and simpler&rsquo;</TypographyLink>.
              Our <TypographyInlineCode>.proto</TypographyInlineCode> language definition files are contained within <GLOBALS.Links.GitHub.Proto />, itself included as a <TypographyInlineCode>git</TypographyInlineCode> <TypographyLink href={GLOBALS.GIT_SUBMODULES}>submodule </TypographyLink>in our component repositories.
              The <GLOBALS.InlineCode.GitHub.Proto /> repository also contains a shell script to recompile target language bindings when changes are made.
            </TypographyP>

            <TypographyH5>Controller to Gantry</TypographyH5>
            {/* TODO: */}
            <TypographyP>
              <TypographyMuted>
                This is yet to be properly implemented, but is likely to be a serial port exchanging messages serialised in a protocol buffer.
                At present, this is a serial port at <TypographyInlineCode>115200</TypographyInlineCode> baud exchanging <TypographyLink href='https://en.wikipedia.org/wiki/G-code'>G-code</TypographyLink>.
              </TypographyMuted>
            </TypographyP>

            <TypographyH5>Controller to Interface</TypographyH5>
            <TypographyP>
              A <TypographyLink href={GLOBALS.WEB_SOCKET}>WebSocket</TypographyLink> connection is established over TCP and HTTP between the <GLOBALS.InlineCode.GitHub.Controller /> and this <GLOBALS.InlineCode.GitHub.Interface /> web application for a real-time, low-latency, full-duplex data channel, which is used to exchange information and instructions.
            </TypographyP>

            {/* TODO: the anchor doesn't work within this accordion... */}
            <TypographyP>
              Numeric data, such as the <TypographyInlineCode>TARGET_DELTAS</TypographyInlineCode> between the present gantry position and the operator&apos;s desired target, is <span id={FRAGMENT_IDS.DATA_NORMALISATION}>normalised into an absolute, invariant range of <TypographyInlineCode>[0, 65535]</TypographyInlineCode>.
                This normalisation ensures that the exchanged units are independent of run-time variables—the client viewport, or streamed video dimensions, for instance</span>.
              The representation range of a <TypographyInlineCode>16-bit</TypographyInlineCode> integer was chosen for performance—by using this range, we can leverage the efficiency of protocol buffer <TypographyLink href={GLOBALS.PROTOCOL_BUFFERS.VARINTS}>varints</TypographyLink>, which is not possible with a <TypographyInlineCode>float</TypographyInlineCode> or <TypographyInlineCode>double</TypographyInlineCode> in the range of <TypographyInlineCode>[0, 1]</TypographyInlineCode>.
            </TypographyP>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='userInterface'>
          <AccordionTrigger><TypographyH4>User Interface</TypographyH4></AccordionTrigger>
          <AccordionContent>
            <TypographyBlockquote>
              A work in progress!
            </TypographyBlockquote>

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

            <TypographyH5 id={FRAGMENT_IDS.NEAREST_TARGET}>Nearest-Target Algorithm</TypographyH5>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </>
  )
}
