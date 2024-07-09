import type { Metadata } from 'next'
import { type ReactNode } from 'react'
import { ThickArrowUpIcon } from '@radix-ui/react-icons'

import * as GLOBALS from '@/app/globals'
import { LayoutMain } from '@/components/LayoutMain'
import { Header } from '@/components/Header'
import { PageHeading } from '@/components/PageHeading'
import { ThemeToggleIcon } from '@/components/ThemeToggle'
import { ImageCarousel } from '@/components/ImageCarousel'
import { Badge } from '@/components/ui/badge'
import {
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographyBlockquote,
  TypographyInlineCode,
  TypographyKeyInput,
  TypographyLink,
  TypographyList,
  TypographyListItem,
  TypographyH5,
  TypographyMuted,
  TypographyTable,
  TypographyTableHead,
  TypographyTableBody,
  TypographyTableRow,
  TypographyTableHeaderCell,
  TypographyTableDataCell,
  TypographyImage,
  TypographyVideo,
} from '@/components/ui/typography'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'

import { FRAGMENT_IDS } from './fragments'

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
            <span>Welcome to our <TypographyLink href={GLOBALS.PAGES.PROJECT.path}>Part IV Project</TypographyLink>!</span>
            <br />
            <br />
            <span>The intent for this page is to serve as a one-stop-shop towards understanding the operating principles and features of our pick-and-place machine.</span>
            <br />
            <br />
            <span>Whether you&apos;re looking to hone your skills—or simply after an in-depth look at our system—we do hope that you&apos;ll find this page to hit just the right spot.</span>
            <br />
            <br />
            <Separator className='w-1/12 h-0.5' />
            <br />
            <TypographyLink href={GLOBALS.JAMES}>James Bao</TypographyLink> and <TypographyLink href={GLOBALS.SAM}>Sam Skinner</TypographyLink>,
            <br />
            <span className='leading-10'>
              <TypographyLink href={GLOBALS.UNIVERSITY.ECSE}>Electrical and Computer Engineering</TypographyLink> @ <TypographyLink href={GLOBALS.UNIVERSITY.HOME}>The University of Auckland</TypographyLink>.
            </span>
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
              <TypographyKeyInput><ThemeToggleIcon className='align-text-bottom' /></TypographyKeyInput>
            </span>
          </AccordionTrigger>
          <AccordionContent className='text-base'>
            <TypographyP>
              This application implements a global &lsquo;light&rsquo; and &lsquo;dark&rsquo; theme—matching the browser&apos;s appearance preferences by default.
              You may change this at any time via the <TypographyKeyInput><ThemeToggleIcon className='align-text-bottom' /></TypographyKeyInput> toggle at the top right-hand corner of the viewport.
            </TypographyP>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='keyboardNavigation'>
          <AccordionTrigger>
            <span className='flex flex-row gap-2 justify-between items-center w-full pr-2'>
              <TypographyH4>Keyboard Navigation</TypographyH4>
              <TypographyKeyInput><ThickArrowUpIcon className='align-text-bottom' /></TypographyKeyInput>
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
              This keyboard navigation scheme is accessed via the <TypographyKeyInput>Shift</TypographyKeyInput> modifier key.
              The pages that may be accessed via this scheme are:
            </TypographyP>
            <TypographyList>
              <TypographyListItem>
                <GLOBALS.InlineCode.Pages.Home />: By pressing <TypographyKeyInput>Shift</TypographyKeyInput>+<TypographyKeyInput>{GLOBALS.PAGES.HOME.shortcutKey}</TypographyKeyInput>.
              </TypographyListItem>
              <TypographyListItem>
                <GLOBALS.InlineCode.Pages.Place />: By pressing <TypographyKeyInput>Shift</TypographyKeyInput>+<TypographyKeyInput>{GLOBALS.PAGES.PLACE.shortcutKey}</TypographyKeyInput>.
              </TypographyListItem>
              <TypographyListItem>
                <GLOBALS.InlineCode.Pages.Calibrate />: By pressing <TypographyKeyInput>Shift</TypographyKeyInput>+<TypographyKeyInput>{GLOBALS.PAGES.CALIBRATE.shortcutKey}</TypographyKeyInput>.
              </TypographyListItem>
              <TypographyListItem>
                <GLOBALS.InlineCode.Pages.Settings />: By pressing <TypographyKeyInput>Shift</TypographyKeyInput>+<TypographyKeyInput>{GLOBALS.PAGES.SETTINGS.shortcutKey}</TypographyKeyInput>.
              </TypographyListItem>
              <TypographyListItem>
                <GLOBALS.InlineCode.Pages.Learn />: By pressing <TypographyKeyInput>Shift</TypographyKeyInput>+<TypographyKeyInput>{GLOBALS.PAGES.LEARN.shortcutKey}</TypographyKeyInput>.
              </TypographyListItem>
              <TypographyListItem>
                <GLOBALS.InlineCode.Pages.Project />: By pressing <TypographyKeyInput>Shift</TypographyKeyInput>+<TypographyKeyInput>{GLOBALS.PAGES.PROJECT.shortcutKey}</TypographyKeyInput>.
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
      <Accordion type='multiple' className='w-full mt-2' fragmentIdsMap={{
        [FRAGMENT_IDS.VIM_PLUGINS]: GLOBALS.PAGES.PLACE.path,
        [FRAGMENT_IDS.PLACE_DEMO]: GLOBALS.PAGES.PLACE.path,
      }}>

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
          <ConstituentSettingsPage />
        </PageAccordionItem>

      </Accordion>
    </>
  )
}

import lightHome from './lightHome.png'
import lightHomeCalibrate from './lightHomeCalibrate.png'
import lightHomeShift from './lightHomeShift.png'
import darkHome from './darkHome.png'
import darkHomeCalibrate from './darkHomeCalibrate.png'
import darkHomeShift from './darkHomeShift.png'
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
          <GLOBALS.InlineCode.Pages.Calibrate />: Tune the machine&apos;s operating parameters to improve run-time performance.
        </TypographyListItem>
        <TypographyListItem>
          <GLOBALS.InlineCode.Pages.Settings />: Configure the system&apos;s environment variables to reflect deployment changes.
        </TypographyListItem>
        <TypographyListItem>
          <GLOBALS.InlineCode.Pages.Learn />: This page; learn about the operation and maintenance of the machine.
        </TypographyListItem>
        <TypographyListItem>
          <GLOBALS.InlineCode.Pages.Project />: Discover the background and motivations behind this research project.
        </TypographyListItem>
      </TypographyList>

      <TypographyH5>Hidden Pages</TypographyH5>
      <TypographyP>
        Note that <GLOBALS.InlineCode.Pages.Calibrate /> and <GLOBALS.InlineCode.Pages.Settings /> are implemented as &lsquo;hidden&rsquo; pages, in that they are not visible by default.
        This design decision is motivated by an intent that they should be scarcely necessary—under normal circumstances, one should not need to access them.
        On the off-chance that they might become necessary, however, they may be revealed by pressing:
      </TypographyP>

      <TypographyList>
        <TypographyListItem><TypographyKeyInput>⌥</TypographyKeyInput> on macOS, or</TypographyListItem>
        <TypographyListItem><TypographyKeyInput>Alt</TypographyKeyInput> on Windows/Linux.</TypographyListItem>
      </TypographyList>

      <TypographyP>
        Alternatively, pressing the <TypographyKeyInput>{GLOBALS.PAGES.CALIBRATE.shortcutKey.toLowerCase()}</TypographyKeyInput> and/or <TypographyKeyInput>{GLOBALS.PAGES.SETTINGS.shortcutKey.toLowerCase()}</TypographyKeyInput> key(s) will selectively reveal the <GLOBALS.InlineCode.Pages.Calibrate /> and/or <GLOBALS.InlineCode.Pages.Settings /> links respectively.
        This is particularly useful in cases where the <TypographyKeyInput>⌥</TypographyKeyInput>/<TypographyKeyInput>Alt</TypographyKeyInput> modifier key changes the browser&apos;s default click behaviour.
      </TypographyP>

      <ImageCarousel
        images={[
          { light: lightHome, dark: darkHome, caption: `${GLOBALS.PAGES.HOME.name} page` },
          {
            light: lightHomeCalibrate,
            dark: darkHomeCalibrate,
            caption: `${GLOBALS.PAGES.HOME.name} page with ${GLOBALS.PAGES.CALIBRATE.path} link revealed`,
            captionElement: (
              <>{GLOBALS.PAGES.HOME.name} page with <GLOBALS.InlineCode.Pages.Calibrate /> link revealed</>
            ),
          },
          {
            light: lightHomeShift,
            dark: darkHomeShift,
            caption: `${GLOBALS.PAGES.HOME.name} page with Shift modifier pressed`,
            captionElement: (
              <>{GLOBALS.PAGES.HOME.name} page with <TypographyKeyInput>Shift</TypographyKeyInput> modifier pressed</>
            ),
          },
        ]}
        className='mt-6'
      />

    </>
  )
}

import lightPlaceProgress from './lightPlaceProgress.png'
import lightPlaceError from './lightPlaceError.png'
import lightPlaceSocketOpened from './lightPlaceSocketOpened.png'
import lightPlaceHud from './lightPlaceHud.png'
import darkPlaceProgress from './darkPlaceProgress.png'
import darkPlaceError from './darkPlaceError.png'
import darkPlaceSocketOpened from './darkPlaceSocketOpened.png'
import darkPlaceHud from './darkPlaceHud.png'
function ConstituentPlacePage() {
  return (
    <>
      <TypographyP>
        The <GLOBALS.InlineCode.Pages.Place /> page is the centrepiece of our interface.
      </TypographyP>

      <TypographyP>
        It comprises of a full screen feed of the real-time video stream received from the <GLOBALS.InlineCode.GitHub.Controller />, below an overlay that implements the interactive user interface and heads-up display.
      </TypographyP>

      <div id={FRAGMENT_IDS.PLACE_DEMO}>
        <TypographyVideo
          video={{
            light: './lightPlaceDemo.mp4',
            dark: './darkPlaceDemo.mp4',
          }}
          loop
          caption={`A full demonstration of the ${GLOBALS.PAGES.PLACE.path} page`}
          captionElement={
            <>A full demonstration of the <GLOBALS.InlineCode.Pages.Place /> page</>
          }
          captionClassName='pb-0'
        />
      </div>

      <TypographyH5>Page Lifecycle</TypographyH5>
      <TypographyList ordered>
        <TypographyListItem>
          Upon navigating to <GLOBALS.InlineCode.Pages.Place />, the the operator is first shown a dynamic progress bar whilst this <GLOBALS.InlineCode.GitHub.Interface /> establishes a WebRTC connection to the <GLOBALS.InlineCode.GitHub.Controller />&apos;s WHEP stream address as configured on <GLOBALS.InlineCode.Pages.Settings />.
        </TypographyListItem>

        <TypographyListItem>
          If the connection fails, an error page is displayed with a button to navigate home.
        </TypographyListItem>

        <TypographyListItem>
          If the connection succeeds, this <GLOBALS.InlineCode.GitHub.Interface /> subsequently establishes a WebSocket connection to the <GLOBALS.InlineCode.GitHub.Controller />&apos;s WebSocket address, also configurable via <GLOBALS.InlineCode.Pages.Settings />.
          Provided that this too succeeds, the heads-up display is then rendered and overlaid atop the video stream.
        </TypographyListItem>
      </TypographyList>

      <ImageCarousel
        images={[
          { light: lightPlaceProgress, dark: darkPlaceProgress, caption: 'Progress bar whilst video stream loads' },
          { light: lightPlaceError, dark: darkPlaceError, caption: 'Video stream error' },
          { light: lightPlaceSocketOpened, dark: darkPlaceSocketOpened, caption: 'Successful WebSocket connection with overlaid heads-up display' },
          { light: lightPlaceHud, dark: darkPlaceHud, caption: 'Heads-up display with purple target indicator' },
        ]}
        captionClassName='pb-0'
      />

      <TypographyH5>Heads-Up Display</TypographyH5>
      <TypographyP>
        <TypographyMuted>
          The heads-up display is far-from-final.
          This heading documents its implementation at present.
        </TypographyMuted>
      </TypographyP>

      <TypographyP>
        The heads-up display consists of visual elements overlaid atop the video feed.
        Presently, there are four kinds of elements:
      </TypographyP>

      <TypographyList ordered>
        <TypographyListItem>a cursor crosshair,</TypographyListItem>
        <TypographyListItem>a centre indicator,</TypographyListItem>
        <TypographyListItem>a target indicator, and</TypographyListItem>
        <TypographyListItem>target markers.</TypographyListItem>
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
        These act as &lsquo;pounce&rsquo; targets that may be jumped to efficiently, heavily inspired by the likes of <span id={FRAGMENT_IDS.VIM_PLUGINS}>
          <TypographyLink href={GLOBALS.VIM.EASY_MOTION}><TypographyInlineCode>vim-easymotion</TypographyInlineCode></TypographyLink>, <TypographyLink href={GLOBALS.VIM.HOP}><TypographyInlineCode>hop.nvim</TypographyInlineCode></TypographyLink>, and <TypographyLink href={GLOBALS.VIM.POUNCE}><TypographyInlineCode>pounce.nvim</TypographyInlineCode></TypographyLink>
        </span>—which James personally uses.
      </TypographyP>

      <TypographyH5>User Input</TypographyH5>
      <TypographyP>
        The <GLOBALS.InlineCode.Pages.Place /> interface has been designed for speed, intuition, and brevity.
        To fulfil these goals, a range of input schemes has been implemented, each tailored for a unique need:
      </TypographyP>

      <TypographyList>
        <TypographyListItem>mouse clicks,</TypographyListItem>
        <TypographyListItem>directional key presses, and</TypographyListItem>
        <TypographyListItem><TypographyKeyInput>Shift</TypographyKeyInput>-modified directional key presses.</TypographyListItem>
      </TypographyList>

      <TypographyP>
        The simplest form of input is a mouse click at any point atop the video feed.
        The clicked pixel coordinates are processed into pixel deltas <TypographyInlineCode>(Δx, Δy)</TypographyInlineCode> with respect to the centre of the video feed, used as an analogy for the current head position; <TypographyLink toFragmentId href={FRAGMENT_IDS.DATA_NORMALISATION}>normalised</TypographyLink>; and sent to the <GLOBALS.InlineCode.GitHub.Controller />, which ultimately translates the <GLOBALS.InlineCode.GitHub.Gantry />.
        If the operator clicks inside the bounds of a target marker, it is the delta position of that target&apos;s centroid that is transmitted to the <GLOBALS.InlineCode.GitHub.Controller />.
      </TypographyP>

      <TypographyP>
        More advanced—but more efficient—operator inputs may be made via keyboard key presses, which are captured and handled by the overlay.
        The primary key input scheme uses directional keys without modifiers, where these valid directional keys are:
      </TypographyP>

      <TypographyTable>
        <TypographyTableHead>

          <TypographyTableRow>
            <TypographyTableHeaderCell>Direction</TypographyTableHeaderCell>
            <TypographyTableHeaderCell>Directional Keys</TypographyTableHeaderCell>
          </TypographyTableRow>

        </TypographyTableHead>
        <TypographyTableBody>

          <TypographyTableRow>
            <TypographyTableDataCell>Up</TypographyTableDataCell>
            <TypographyTableDataCell>
              <TypographyKeyInput>w</TypographyKeyInput>, <TypographyKeyInput>k</TypographyKeyInput>, <TypographyKeyInput>↑</TypographyKeyInput>
            </TypographyTableDataCell>
          </TypographyTableRow>

          <TypographyTableRow>
            <TypographyTableDataCell>Down</TypographyTableDataCell>
            <TypographyTableDataCell>
              <TypographyKeyInput>s</TypographyKeyInput>, <TypographyKeyInput>j</TypographyKeyInput>, <TypographyKeyInput>↓</TypographyKeyInput>
            </TypographyTableDataCell>
          </TypographyTableRow>

          <TypographyTableRow>
            <TypographyTableDataCell>Left</TypographyTableDataCell>
            <TypographyTableDataCell>
              <TypographyKeyInput>a</TypographyKeyInput>, <TypographyKeyInput>h</TypographyKeyInput>, <TypographyKeyInput>←</TypographyKeyInput>
            </TypographyTableDataCell>
          </TypographyTableRow>

          <TypographyTableRow>
            <TypographyTableDataCell>Right</TypographyTableDataCell>
            <TypographyTableDataCell>
              <TypographyKeyInput>d</TypographyKeyInput>, <TypographyKeyInput>l</TypographyKeyInput>, <TypographyKeyInput>→</TypographyKeyInput>
            </TypographyTableDataCell>
          </TypographyTableRow>

        </TypographyTableBody>
      </TypographyTable>

      <TypographyP>
        {/* TODO: document 3 July images */}
        These directional keys—inspired by video games and <TypographyLink href={GLOBALS.VIM.VI}><TypographyInlineCode>vi</TypographyInlineCode></TypographyLink>-based text editors—will select the &lsquo;best fit&rsquo; target marker in the specified direction as determined by our <TypographyLink toFragmentId href={FRAGMENT_IDS.NEAREST_TARGET}>weighted nearest-target algorithm</TypographyLink>.
        This selected target marker is indicated to the operator by the temporary target indicator, which becomes the zero-reference for any subsequent directional key presses.
        This permits the operator to perform a series of directional key inputs to efficiently pounce to a desired target, all without lifting their fingers from the keyboard—another design inspired by <TypographyInlineCode>vi</TypographyInlineCode>-based text editors and the <TypographyLink href={FRAGMENT_IDS.VIM_PLUGINS} toFragmentId>aforementioned</TypographyLink> (<TypographyInlineCode>n</TypographyInlineCode>)<TypographyInlineCode>vim</TypographyInlineCode> plugins.
      </TypographyP>

      <TypographyP>
        Once the temporary target indicator is present, two additional actions may be performed:
      </TypographyP>

      <TypographyTable>
        <TypographyTableHead>

          <TypographyTableRow>
            <TypographyTableHeaderCell>Action</TypographyTableHeaderCell>
            <TypographyTableHeaderCell>Key(s)</TypographyTableHeaderCell>
            <TypographyTableHeaderCell>Description</TypographyTableHeaderCell>
          </TypographyTableRow>

        </TypographyTableHead>
        <TypographyTableBody>

          <TypographyTableRow>
            <TypographyTableDataCell>Reset indicated target</TypographyTableDataCell>
            <TypographyTableDataCell>
              <TypographyKeyInput>r</TypographyKeyInput>
            </TypographyTableDataCell>
            <TypographyTableDataCell>
              Reset the indicated target to <TypographyInlineCode>(0, 0)</TypographyInlineCode> and remove the target indicator from the heads-up display.
            </TypographyTableDataCell>
          </TypographyTableRow>

          <TypographyTableRow>
            <TypographyTableDataCell>Commit indicated target</TypographyTableDataCell>
            <TypographyTableDataCell>
              <TypographyKeyInput>␣</TypographyKeyInput> (space)
            </TypographyTableDataCell>
            <TypographyTableDataCell>
              Transmit the deltas for the indicated target to the <GLOBALS.InlineCode.GitHub.Controller />.
            </TypographyTableDataCell>
          </TypographyTableRow>

        </TypographyTableBody>
      </TypographyTable>

      <TypographyP>
        The primary key input scheme of unmodified directional keys described above instantiates the &lsquo;light computer assistance&rsquo; of our machine, which has been designed to improve the accessibility, productivity, and health of the human operator.
        Though we certainly hope that this primary input method is intuitive, functional, and reliable, we do recognise that the optimal performance of our system has many dependent variables—some of which are not within our direct influence or control.
        Consequently, this input scheme necessitates a number of assumptions, including that:
      </TypographyP>

      <TypographyList ordered>
        <TypographyListItem>the <GLOBALS.InlineCode.GitHub.Vision /> reliably identifies all target markers, and their centroids, without false positives;</TypographyListItem>
        <TypographyListItem>those target marker centroids and accompanying video feed are transmitted in real-time via the <GLOBALS.InlineCode.GitHub.Controller /> to this <GLOBALS.InlineCode.GitHub.Interface />;</TypographyListItem>
        <TypographyListItem>the weighted nearest-target algorithm is indeed intuitive, fit-for-purpose, <em className='italic'>correct</em>, and that all target markers are reachable;</TypographyListItem>
        <TypographyListItem>the loop delay and round-trip latency of the system is sufficiently low that the system is stable, reactive, and real-time;</TypographyListItem>
        <TypographyListItem>the <GLOBALS.InlineCode.GitHub.Controller /> repeatably translates the <GLOBALS.InlineCode.GitHub.Gantry /> to the correct position; and</TypographyListItem>
        <TypographyListItem>the <GLOBALS.InlineCode.GitHub.Controller /> and <GLOBALS.InlineCode.GitHub.Gantry /> repeatably places the component with the vacuum nozzle at the correct position.</TypographyListItem>
      </TypographyList>

      <TypographyP>
        Acknowledging these necessary assumptions for machine operation with the primary control scheme, we realise that a fallback, &lsquo;manual&rsquo; override control mechanism is likely to be beneficial.
        To this end, a secondary input scheme is implemented using the <TypographyKeyInput>Shift</TypographyKeyInput> modifier key, where the combination of <TypographyKeyInput>Shift</TypographyKeyInput> with the same directional inputs will produce a fixed step in the nominated direction—provided that a gantry limit is not exceeded.
        <TypographyMuted>
          {' '}The fixed step is currently an &lsquo;arbitrary&rsquo; delta corresponding to 1% of the video feed.
          This will eventually be configurable to a value in metric distance units.
        </TypographyMuted>
      </TypographyP>

      <TypographyP>
        <TypographyMuted>
          {/* TODO: read through Logbook / Discord messages for all of these good ideas */}
          Some other ideas that are being considered for implementation include:
        </TypographyMuted>
      </TypographyP>

      <TypographyMuted>
        <TypographyList>
          <TypographyListItem><TypographyKeyInput>1</TypographyKeyInput>, <TypographyKeyInput>2</TypographyKeyInput>, <TypographyKeyInput>3</TypographyKeyInput>, <TypographyKeyInput>4</TypographyKeyInput>, etc. to pounce to hard-coded parts bins, and/or programmable saved positions.</TypographyListItem>
        </TypographyList>
      </TypographyMuted>

      <TypographyH5>Navigation</TypographyH5>
      <TypographyP>
        To return to the home page, the operator should use their browser&apos;s native navigation mechanism(s):
      </TypographyP>

      <TypographyList>
        <TypographyListItem>swipe with two fingers to the right with the trackpad, if applicable;</TypographyListItem>
        <TypographyListItem><TypographyKeyInput>⌘</TypographyKeyInput>+<TypographyKeyInput>[</TypographyKeyInput> on macOS, or <TypographyKeyInput>Alt</TypographyKeyInput>+<TypographyKeyInput>←</TypographyKeyInput> on Windows or Linux; or</TypographyListItem>
        <TypographyListItem>use the browser&apos;s &lsquo;Go back&rsquo; navigation button.</TypographyListItem>
      </TypographyList>
    </>
  )
}

import lightSettings from './lightSettings.png'
import darkSettings from './darkSettings.png'
function ConstituentSettingsPage() {
  return (
    <TypographyImage
      image={{
        light: lightSettings,
        dark: darkSettings,
      }}
      caption={`${GLOBALS.PAGES.SETTINGS.name} page`}
    />
  )
}

function SystemArchitecture() {
  return (
    <>
      <TypographyH3>System Architecture</TypographyH3>

      <TypographyP>
        Our pick-and-place machine comprises of four distinct components, or modules—each of which serves an important role towards the successful function of our system.
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
              The machine vision that makes our pick-and-place intelligent.
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
              The command & control that conducts the entire orchestra.
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
              This web application; the user interface to be used by the operator.
            </TypographyTableDataCell>
          </TypographyTableRow>
        </TypographyTableBody>

      </TypographyTable>

      <TypographyP>
        The <GLOBALS.InlineCode.GitHub.Gantry />, <GLOBALS.InlineCode.GitHub.Vision />, and <GLOBALS.InlineCode.GitHub.Controller /> each run on a single <TypographyLink href={GLOBALS.RASPBERRY_PI_5}>Raspberry Pi 5</TypographyLink>.
        {/* TODO: */}
        {' '}<TypographyMuted>This is definitely subject to change.</TypographyMuted>{' '}
        This <GLOBALS.InlineCode.GitHub.Interface /> web application is served by that same Raspberry Pi to a client browser, which could be the operator&apos;s own device; a University computer; or a web browser running on the same Raspberry Pi.
      </TypographyP>

      <TypographyP>
        In this section, we outline these components, the role(s) that they each play, some technical details that pertain, and the interactions between them.
        The overarching focus is on these system behaviours and interactions—consequently, many of the following headings necessarily cross component boundaries.
      </TypographyP>

      <Accordion type='multiple' className='w-full mt-2' fragmentIdsMap={{
        [FRAGMENT_IDS.DATA_NORMALISATION]: 'messagePassing',
        [FRAGMENT_IDS.NEAREST_TARGET]: 'userInterface',
      }}>
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
              A <TypographyLink href={GLOBALS.MEDIA_MTX}>MediaMTX</TypographyLink> real-time media server is used to stream real-time video from the Raspberry Pi&apos;s camera(s) to this web application over the <TypographyLink href={GLOBALS.WEB_RTC}>WebRTC</TypographyLink> protocol.
              The video stream is first read from the camera sensor with the <TypographyLink href={GLOBALS.RPI_CAM_VID}><TypographyInlineCode>rpicam-vid</TypographyInlineCode></TypographyLink> command-line binary (built atop <TypographyLink href={GLOBALS.LIB_CAMERA}><TypographyInlineCode>libcamera</TypographyInlineCode></TypographyLink>) that is distributed as part of <TypographyLink href={GLOBALS.RASPBERRY_PI_OS}>Raspberry Pi OS</TypographyLink>.
              It is then piped through <TypographyInlineCode>stdin</TypographyInlineCode> to <TypographyLink href={GLOBALS.FFMPEG}><TypographyInlineCode>ffmpeg</TypographyInlineCode></TypographyLink>, which transcodes the video from its raw <TypographyLink href={GLOBALS.YUV_420}><TypographyInlineCode>YUV 4:2:0</TypographyInlineCode></TypographyLink> format into <TypographyLink href={GLOBALS.H_264}><TypographyInlineCode>H.264</TypographyInlineCode></TypographyLink>, and streams it to MediaMTX via <TypographyLink href={GLOBALS.RTSP}>RTSP</TypographyLink>.
            </TypographyP>

            <TypographyP>
              Once the <TypographyInlineCode>H.264</TypographyInlineCode> video is streamed into MediaMTX, it can then be read from the server via any of its supported protocols and variants.
              This <GLOBALS.InlineCode.GitHub.Interface /> client reads the stream via the <TypographyLink href={GLOBALS.WHEP}>WHEP</TypographyLink> variant of the WebRTC protocol, and displays it through an HTML <TypographyInlineCode>&lt;video&gt;</TypographyInlineCode> tag on <GLOBALS.InlineCode.Pages.Place />.
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
              <TypographyLink href={GLOBALS.PROTOCOL_BUFFERS.HOME}>Protocol Buffers</TypographyLink> are used to serialise and format the data payloads exchanged between each component.
              &lsquo;Protobufs&rsquo; are a language- and platform-agnostic binary serialisation mechanism for structured data, like JSON or XML, but <TypographyLink href={GLOBALS.PROTOCOL_BUFFERS.SMALLER_FASTER_SIMPLER}>&lsquo;smaller, faster, and simpler&rsquo;</TypographyLink>.
            </TypographyP>

            <TypographyP>
              Our <TypographyInlineCode>.proto</TypographyInlineCode> language definition files are contained within the <GLOBALS.Links.GitHub.Proto /> repository, itself included as a <TypographyInlineCode>git</TypographyInlineCode> <TypographyLink href={GLOBALS.GIT_SUBMODULES}>submodule </TypographyLink>in our component repositories.
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
              A <TypographyLink href={GLOBALS.WEB_SOCKET}>WebSocket</TypographyLink> connection is established over TCP and HTTP between the <GLOBALS.InlineCode.GitHub.Controller /> and this <GLOBALS.InlineCode.GitHub.Interface /> web application.
              This provides a real-time, low-latency, full-duplex data channel, which is used to exchange information and instructions.
            </TypographyP>

            <TypographyP>
              Numeric data, such as the <TypographyInlineCode>TARGET_DELTAS</TypographyInlineCode> between the present head position and the operator&apos;s desired target, is <span id={FRAGMENT_IDS.DATA_NORMALISATION}>normalised into an absolute, invariant range of <TypographyInlineCode>[0, 65535]</TypographyInlineCode>.
                This normalisation ensures that the exchanged units are independent of run-time variables—the client viewport, or streamed video dimensions, for instance</span>.
              The representation range of a <TypographyInlineCode>16-bit</TypographyInlineCode> integer was chosen for performance—by using this range, we can leverage the efficiency and other benefits of protocol buffer <TypographyLink href={GLOBALS.PROTOCOL_BUFFERS.VARINTS}>varints</TypographyLink>, which would not be possible if we exchanged a <TypographyInlineCode>float</TypographyInlineCode> or <TypographyInlineCode>double</TypographyInlineCode> in the range of <TypographyInlineCode>[0, 1]</TypographyInlineCode>.
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
