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
  TypographyItalics,
  TypographyInlineMaths,
  TypographyBlockMaths,
} from '@/components/ui/typography'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'

import { FRAGMENT_IDS } from './fragments'
import { STATIC_IMAGES } from './static-images'

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
            <span>Whether you&apos;re looking to hone your skills—or simply after an in-depth look at our machine—we do hope that you&apos;ll find this page to hit just the right spot.</span>
            <br />
            <br />
            <Separator className='w-1/12 h-0.5' />
            <br />
            <TypographyLink href={GLOBALS.JAMES}>James Bao</TypographyLink> and <TypographyLink href={GLOBALS.SAM}>Sam Skinner</TypographyLink>,
            <br />
            <span className='my-2 inline-block'>
              <TypographyLink href={GLOBALS.UNIVERSITY.ECSE}>Electrical and Computer Engineering</TypographyLink> @ <TypographyLink href={GLOBALS.UNIVERSITY.HOME}>The University of Auckland</TypographyLink>.
            </span>
          </TypographyBlockquote>

          <ApplicationInterface />

          <ConstituentPages />

          <MachineArchitecture />

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
        [FRAGMENT_IDS.HIDDEN_PAGES]: GLOBALS.PAGES.HOME.path,
        [FRAGMENT_IDS.VIM_PLUGINS]: GLOBALS.PAGES.PLACE.path,
        [FRAGMENT_IDS.PLACE_DEMO]: GLOBALS.PAGES.PLACE.path,
        [FRAGMENT_IDS.NEAREST_TARGET_REACHABLE]: GLOBALS.PAGES.PLACE.path,
      }}>

        <PageAccordionItem page={GLOBALS.PAGES.HOME}>
          <ConstituentHomePage />
        </PageAccordionItem>

        <PageAccordionItem page={GLOBALS.PAGES.PLACE}>
          <ConstituentPlacePage />
        </PageAccordionItem>

        <PageAccordionItem page={GLOBALS.PAGES.CALIBRATE}>
          <ConstituentCalibratePage />
        </PageAccordionItem>

        <PageAccordionItem page={GLOBALS.PAGES.SETTINGS}>
          <ConstituentSettingsPage />
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

      <TypographyH5 id={FRAGMENT_IDS.HIDDEN_PAGES}>Hidden Pages</TypographyH5>
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
          { image: STATIC_IMAGES.HOME.PAGE, caption: `${GLOBALS.PAGES.HOME.name} page` },
          {
            image: STATIC_IMAGES.HOME.CALIBRATE,
            caption: `${GLOBALS.PAGES.HOME.name} page with ${GLOBALS.PAGES.CALIBRATE.path} link revealed`,
            captionElement: (
              <>{GLOBALS.PAGES.HOME.name} page with <GLOBALS.InlineCode.Pages.Calibrate /> link revealed</>
            ),
          },
          {
            image: STATIC_IMAGES.HOME.SHIFT,
            caption: `${GLOBALS.PAGES.HOME.name} page with Shift modifier pressed`,
            captionElement: (
              <>{GLOBALS.PAGES.HOME.name} page with <TypographyKeyInput>Shift</TypographyKeyInput> modifier pressed</>
            ),
          },
        ]}
        className='mt-6'
        captionClassName='mb-4 lg:mb-4'
      />

    </>
  )
}

function ConstituentPlacePage() {
  // TODO: update images
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
          { image: STATIC_IMAGES.PLACE.PROGRESS, caption: 'Progress bar whilst video stream loads' },
          { image: STATIC_IMAGES.PLACE.ERROR, caption: 'Video stream error' },
          { image: STATIC_IMAGES.PLACE.SOCKET, caption: 'Successful WebSocket connection with overlaid heads-up display' },
          { image: STATIC_IMAGES.PLACE.HUD, caption: 'Heads-up display with purple target indicator' },
        ]}
      />

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
        The clicked pixel coordinates are processed into pixel deltas <TypographyInlineMaths>(\Delta x, \Delta y)</TypographyInlineMaths> with respect to the centre of the video feed, used as an analogy for the current head position; <TypographyLink toFragmentId href={FRAGMENT_IDS.DATA_NORMALISATION}>normalised</TypographyLink>; and sent to the <GLOBALS.InlineCode.GitHub.Controller />, which ultimately translates the <GLOBALS.InlineCode.GitHub.Gantry />.
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
              Reset the indicated target to <TypographyInlineMaths>(0, 0)</TypographyInlineMaths> and remove the target indicator from the heads-up display.
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
        Though we certainly hope that this primary input method is intuitive, functional, and reliable, we do recognise that the optimal performance of our machine has many dependent variables—some of which are not within our direct influence or control.
        Consequently, this input scheme necessitates a number of assumptions, including that:
      </TypographyP>

      <TypographyList ordered>
        <TypographyListItem>the <GLOBALS.InlineCode.GitHub.Vision /> reliably identifies all target markers, and their centroids, without false positives;</TypographyListItem>
        <TypographyListItem>those target marker centroids and accompanying video feed are transmitted in real-time via the <GLOBALS.InlineCode.GitHub.Controller /> to this <GLOBALS.InlineCode.GitHub.Interface />;</TypographyListItem>
        <TypographyListItem>the weighted nearest-target algorithm is indeed intuitive, fit-for-purpose, <span id={FRAGMENT_IDS.NEAREST_TARGET_REACHABLE}><TypographyItalics>correct</TypographyItalics>, and that all target markers are reachable</span>;</TypographyListItem>
        <TypographyListItem>the loop delay and round-trip latency of the machine is sufficiently low that the machine is stable, reactive, and real-time;</TypographyListItem>
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
          Some other ideas that are being considered/on the roadmap for implementation include:
        </TypographyMuted>
      </TypographyP>

      <TypographyMuted>
        <TypographyList>
          <TypographyListItem><TypographyKeyInput>1</TypographyKeyInput>, <TypographyKeyInput>2</TypographyKeyInput>, <TypographyKeyInput>3</TypographyKeyInput>, <TypographyKeyInput>4</TypographyKeyInput>, etc. to pounce to hard-coded parts bins, and/or programmable saved positions.</TypographyListItem>
          <TypographyListItem>another modifier key to rotate the search angles from <TypographyInlineMaths>{String.raw`\theta_\text{s} \in \{0, \frac{\pi}{2}, \pi, \frac{3\pi}{2}\}`}</TypographyInlineMaths> to <TypographyInlineMaths>{String.raw`\theta_\text{s} \in \{\frac{\pi}{4}, \frac{3\pi}{4}, \frac{5\pi}{4}, \frac{7\pi}{4}\}`}</TypographyInlineMaths>.</TypographyListItem>

          <TypographyListItem>displaying the search sectors through guide lines in the heads-up display.</TypographyListItem>
          <TypographyListItem>ability to change the fixed step distance on-the-fly.</TypographyListItem>
          <TypographyListItem>ability to break the targets into topological grid squares, and/or the ability to long jump and skip over a number of intermediate targets.</TypographyListItem>
          <TypographyListItem>ability to change the <TypographyLink toFragmentId href={FRAGMENT_IDS.NEAREST_TARGET}>nearest-target damping value</TypographyLink> through the heads-up display.</TypographyListItem>
          <TypographyListItem>scroll wheel zooms the video feed.</TypographyListItem>
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

function ConstituentCalibratePage() {
  return (
    <>
      <TypographyP>
        Note that this page is implemented as a <TypographyLink toFragmentId href={FRAGMENT_IDS.HIDDEN_PAGES}>hidden page</TypographyLink>.
      </TypographyP>

      <TypographyP>
        The <GLOBALS.InlineCode.Pages.Calibrate /> page allows the operator to fine-tune the calibration factors used by the <GLOBALS.InlineCode.GitHub.Controller /> and improve placement accuracy.
      </TypographyP>

      <TypographyP>
        The key principle of the prototype machine&apos;s calibration is that all conversions and corrections pertaining to the physical mechanics are performed by the <GLOBALS.InlineCode.GitHub.Controller />.
        The Julia machine controller behaves as a translation layer, or adapter, between the operator inputs to this <GLOBALS.InlineCode.GitHub.Interface /> and the physical <GLOBALS.InlineCode.GitHub.Gantry /> or vacuum head.
      </TypographyP>

      <TypographyP>
        The user interface is decoupled from any knowledge of the physical layer, and is only for responsible accepting user input in viewport coordinates then <TypographyLink toFragmentId href={FRAGMENT_IDS.DATA_NORMALISATION}>normalising</TypographyLink> this to the machine&apos;s standard coordinate space.
        It is the machine controller that is responsible for translating the normalised numeric data from the user interface into the real-distance units for the gantry.
      </TypographyP>

      <TypographyP>
          Calibration is performed using our <GLOBALS.Links.GitHub.TestBoard />, which features distinct and variably-spaced fiducial markings.
          These fiducials are intentionally designed differently to standard PCB fiducials, as the standard circular pads do not clearly present a single defined point at which to click.
      </TypographyP>

      <ImageCarousel
        images={[
          { image: STATIC_IMAGES.CALIBRATE.TOP, caption: 'Top side of the test board with fiducial markings' },
          { image: STATIC_IMAGES.CALIBRATE.BOTTOM, caption: 'Bottom side of te test board with fiducials and test circuit' },
        ]}
        className='mt-6'
      />

      <TypographyP>
        Finally, these test boards implement an operational amplifier oscillator circuit that flashes an array of LEDs when excited by a 9 V battery.
        This is a simple circuit that comprises of an SO-8 SMT integrated circuit, a number of 0805 passive SMT components, and some SMT LEDs, allowing for basic benchmarking of the developed prototype.
      </TypographyP>

      <TypographyImage
        image={STATIC_IMAGES.CALIBRATE.SCHEMATIC}
        caption={'Schematic for our test boards'}
      />

      <TypographyP>
        The final implementation of the calibration routine is thus:
      </TypographyP>

      <TypographyList ordered>
        <TypographyListItem>Place a calibration board onto the workbed. The board does not need to be aligned with the axes, nor does the nozzle need to be moved directly atop a fiducial.</TypographyListItem>
        <TypographyListItem>Click on a diagonal calibration fiducial. The interface transmits a <TypographyInlineCode>TARGET_DELTAS</TypographyInlineCode> message to the controller.</TypographyListItem>
        <TypographyListItem>The machine controller receives the <TypographyInlineCode>TARGET_DELTAS</TypographyInlineCode> message and translates the gantry by the specified number of deltas, based on its current <TypographyInlineMaths>x</TypographyInlineMaths> and <TypographyInlineMaths>y</TypographyInlineMaths> calibrations.</TypographyListItem>
        <TypographyListItem>Click on the new viewport coordinate of the previously-clicked calibration fiducial, or hit space if it is exactly correct beneath the nozzle. The interface transmits a <TypographyInlineCode>CALIBRATE_DELTAS</TypographyInlineCode> message to the controller.</TypographyListItem>
        <TypographyListItem>The machine controller uses the <TypographyInlineCode>CALIBRATE_DELTAS</TypographyInlineCode> payload to re-compute its scalar factors as per the equation below.</TypographyListItem>
        <TypographyListItem>Repeat until satisfied with machine calibration.</TypographyListItem>
      </TypographyList>

      <TypographyP>
        The <TypographyInlineCode>CALIBRATE_DELTAS</TypographyInlineCode> payload contains the previously-transmitted target deltas <TypographyInlineMaths>{String.raw`\Delta_\text{t}`}</TypographyInlineMaths>, in addition to the deltas <TypographyInlineMaths>{String.raw`\Delta_\text{r}`}</TypographyInlineMaths> of the point to which the fiducial actually travelled.
        These two deltas are used by the machine controller to re-compute its conversion factors <TypographyInlineMaths>{String.raw`(c_\text{x}, c_\text{y})`}</TypographyInlineMaths> through the equation below.
      </TypographyP>

      <TypographyP>
        The travelled deltas <TypographyInlineMaths>d</TypographyInlineMaths> is computed trivially as
        <TypographyBlockMaths>{String.raw`
          \begin{equation*}
            d = \Delta_\text{t} - \Delta_\text{r}
          \end{equation*}
        `}</TypographyBlockMaths>
        It is noticed that translation in the wrong direction produces a negative <TypographyInlineMaths>d</TypographyInlineMaths>.
        This behaviour is desirable, as the calibration factor <TypographyInlineMaths>c</TypographyInlineMaths> is the scalar factor used to convert the <TypographyInlineCode>Int16</TypographyInlineCode> delta into the mm value given to the <GLOBALS.InlineCode.GitHub.Gantry /> where
        <TypographyBlockMaths>{ String.raw`
          \begin{equation*}
            \text{gantry translation distance (\texttt{mm})} = c\times \Delta_\text{t}
          \end{equation*}
        `}</TypographyBlockMaths>
        This behaviour produces a calibration routine that is capable of correcting incorrect translation direction.

        Once the travelled deltas <TypographyInlineMaths>d</TypographyInlineMaths> is known, the machine controller can compute the amount by which its previous calibration factor must be scaled to correct any over- or undershoot.
        This corrective factor is computed as
        <TypographyBlockMaths>{String.raw`
          \begin{align*}
            \text{corrective factor} & = d / \Delta_\text{t}                                   \\
                                     & = (\Delta_\text{t} - \Delta_\text{r}) / \Delta_\text{t} \\
          \end{align*}
        `}</TypographyBlockMaths>
        such that the corrected calibration <TypographyInlineMaths>c&apos;</TypographyInlineMaths> is computed by
        <TypographyBlockMaths>{String.raw`
          \begin{equation*}
            c' = c \times ((\Delta_\text{t} - \Delta_\text{r}) / \Delta_\text{t})
          \end{equation*}
        `}</TypographyBlockMaths>
      </TypographyP>

      <TypographyP>
        This calibration routine allows the operator to accurately calibrate the machine controller to resolve any changes in physical mechanical machine parameters without requiring changes to machine source code, ensuring precise and repeatable component placement.
      </TypographyP>

    </>
  )
}

function ConstituentSettingsPage() {
  return (
    <>
      <TypographyP>
        Note that this page is implemented as a <TypographyLink toFragmentId href={FRAGMENT_IDS.HIDDEN_PAGES}>hidden page</TypographyLink>.
      </TypographyP>

      <TypographyP>
        The <GLOBALS.InlineCode.Pages.Settings /> page provides the ability for the operator to (re-)configure system environment variables once machine modules are deployed, without requiring the modification of any source code.
      </TypographyP>

      <TypographyP>
        At present, these &lsquo;environment variables&rsquo; are:
      </TypographyP>

      <TypographyList ordered>
        <TypographyListItem>the WebRTC WHEP video stream address for the <GLOBALS.InlineCode.GitHub.Controller />, and</TypographyListItem>
        <TypographyListItem>the WebSocket data channel address for the <GLOBALS.InlineCode.GitHub.Controller />.</TypographyListItem>
      </TypographyList>

      <TypographyP>
        The configured data is <TypographyLink toFragmentId href={FRAGMENT_IDS.DATA_CONTEXT}>stored locally in the operator&apos;s browser</TypographyLink> such that it is persisted across sessions.
        All operator input is <TypographyLink toFragmentId href={FRAGMENT_IDS.VALIDATION}>validated</TypographyLink> before it is saved, minimising the potential for data entry error.
      </TypographyP>

      <TypographyImage
        image={STATIC_IMAGES.SETTINGS.PAGE}
        caption={`${GLOBALS.PAGES.SETTINGS.name} page`}
        captionClassName='pb-4'
      />
    </>
  )
}

function MachineArchitecture() {
  return (
    <>
      <TypographyH3>Machine Architecture</TypographyH3>

      <TypographyH4>Open- and Closed-Loop Control</TypographyH4>
      <TypographyP>
        We will first define the objective, and what is meant by &lsquo;an open-loop machine designed with provisions for closed-loop active assistance&rsquo;.
      </TypographyP>

      <TypographyP>
        The proposed real-time pick-and-place machine is modelled as a control systems block diagram as shown below.
        The operator&apos;s input is received by the machine through the input device, which is treated initially as a black box.
        This input is fed through the user interface to be interpreted, resulting in a movement of the <TypographyInlineMaths>x</TypographyInlineMaths>-<TypographyInlineMaths>y</TypographyInlineMaths> machine gantry and the mounted vacuum head.
        This represents the open-loop control path of the machine.
      </TypographyP>

      <TypographyImage
        image={STATIC_IMAGES.ARCHITECTURE.BLOCK_DIAGRAM}
        caption={'The prototype machine block diagram'}
      />

      <TypographyP>
        It is proposed that computer vision (CV) &lsquo;feedback&rsquo; can be introduced to this open-loop control path to achieve enhanced machine performance.
        This CV would provide active alignment assistance to the human operator, offloading the burden of fine positioning to the machine.
        In such an operating profile, the operator would be solely responsible for rough position identification.
        Once component leads have been roughly associated with its corresponding component pads, active alignment assistance would correct any rotational error and perform final &lsquo;wicking&rsquo; of the component into place.
      </TypographyP>

      <TypographyH4>Machine Modules</TypographyH4>
      <TypographyP>
        To achieve the desired closed-loop feedback, a mechanical system that provides two real-time video feeds is devised.
        One real-time video feed captures the PCB&apos;s pads, and another captures the picked component&apos;s leads.
        This real-time video is fed to a CV algorithm to identify the gantry translations and head rotations required to achieve wicking.
      </TypographyP>

      <TypographyP>
        The experimental prototype comprises of three primary software modules and three supplementary electromechanical components, as diagrammed below.
        The machine software comprises of the machine controller, the user interface, and the CV routines.
      </TypographyP>

      <TypographyImage
        image={STATIC_IMAGES.ARCHITECTURE.DIAGRAM}
        caption={'The prototype machine architecture'}
      />

      <TypographyTable>

        <TypographyTableHead>
          <TypographyTableRow>
            <TypographyTableHeaderCell>Module</TypographyTableHeaderCell>
            <TypographyTableHeaderCell>Technologies</TypographyTableHeaderCell>
            <TypographyTableHeaderCell>Description</TypographyTableHeaderCell>
          </TypographyTableRow>
        </TypographyTableHead>

        <TypographyTableBody>
          <TypographyTableRow>
            <TypographyTableDataCell><GLOBALS.Links.GitHub.Gantry /></TypographyTableDataCell>
            <TypographyTableDataCell>
              <span className='*:m-0.5'>
                <Badge variant='outline'>C</Badge>
                <Badge variant='outline'>C++</Badge>
                <Badge variant='outline'>G-code</Badge>
              </span>
            </TypographyTableDataCell>
            <TypographyTableDataCell>
              The low-level machine control of our <TypographyInlineMaths>x</TypographyInlineMaths>-<TypographyInlineMaths>y</TypographyInlineMaths> stepper motors and limit switches.
            </TypographyTableDataCell>
          </TypographyTableRow>

          <TypographyTableRow>
            <TypographyTableDataCell><GLOBALS.Links.GitHub.Vision /></TypographyTableDataCell>
            <TypographyTableDataCell>
              <span className='*:m-0.5'>
                <Badge variant='outline'>C++</Badge>
                <Badge variant='outline'>Julia</Badge>
                <Badge variant='outline'>libcamera</Badge>
                <Badge variant='outline'>ffmpeg</Badge>
                <Badge variant='outline'>WebRTC</Badge>
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
                <Badge variant='outline'>Zod</Badge>
                <Badge variant='outline'>Protobufs</Badge>
              </span>
            </TypographyTableDataCell>
            <TypographyTableDataCell>
              This web application; displays the real-time video feeds to the human operator, and receives & interprets their inputs.
            </TypographyTableDataCell>
          </TypographyTableRow>
        </TypographyTableBody>

      </TypographyTable>

      <TypographyP>
        A single 4 GB <TypographyLink href={GLOBALS.RASPBERRY_PI_5}>Raspberry Pi 5</TypographyLink> is used to run all three software modules, though the user interface may be served to any client browser that is networked to the Raspberry Pi.
        The user interface may also be run on an operator&apos;s own device, provided there is a network connection to the Raspberry Pi such that the real-time <TypographyLink href={GLOBALS.WEB_RTC}>WebRTC</TypographyLink> video feed and <TypographyLink href={GLOBALS.WEB_SOCKET}>WebSocket</TypographyLink> connections can be established to the machine controller.
      </TypographyP>

      <TypographyP>
        In this section, we outline these modules, the role(s) that they each play, some technical details that pertain, and the interactions between them.
        The overarching focus is on these system behaviours and interactions—consequently, many of the following headings necessarily cross module boundaries.
      </TypographyP>

      <Accordion type='multiple' className='w-full mt-2' fragmentIdsMap={{
        [FRAGMENT_IDS.DATA_NORMALISATION]: 'messagePassing',
        [FRAGMENT_IDS.NEAREST_TARGET]: 'userInterface',
        [FRAGMENT_IDS.DATA_CONTEXT]: 'userInterface',
        [FRAGMENT_IDS.VALIDATION]: 'userInterface',
      }}>
        <AccordionItem value='headDesign'>
          <AccordionTrigger><TypographyH4>Head Design</TypographyH4></AccordionTrigger>
          <AccordionContent>
            <TypographyP>
              Our approach trialled a compound head movement that could place components with its vertical stroke, and bring components to a second camera with its horizontal stroke.
              This permits a real-time video feed without obstruction by the nozzle.
            </TypographyP>

            <TypographyP>
              Many prototypes of the head were needed to get the mechanism right — providing adequate precision with the additional constraints imposed by the compound motion isn&apos;t trivial.
              Our best design uses two stepper motors and belt drives to achieve the &lsquo;folded&rsquo; z-axis motion.
              Other, &lsquo;unfolded&rsquo; options were considered but ruled out due to complexity — getting the cameras far enough away from their targets to achieve focus required overly long nozzle travels.
            </TypographyP>

            <ImageCarousel
              images={[
                { image: STATIC_IMAGES.HEAD.DOWN, caption: 'Head mechanism pictured in its downward position' },
                { image: STATIC_IMAGES.HEAD.UP, caption: 'Head mechanism pictured in its upward position' },
              ]}
              className='mt-6'
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='machineVision'>
          <AccordionTrigger><TypographyH4>Machine Vision</TypographyH4></AccordionTrigger>
          <AccordionContent>

            <TypographyP>
              Research suggests that computer vision can aid operators in achieving more precise spatial navigation with computer input devices, as demonstrated in teleoperation studies.
              CV is employed in this project to facilitate active assistance in component placement by identifying features of interest on both the PCB and the component being placed.
              This is a departure from traditional pick-and-place machines, which rely on a priori knowledge of component and pad locations, typically encoded in Gerber files.
              The project aims to devise a more organic and intuitive system that leverages real-time CV to adapt to the operator&apos;s actions and the specific components being placed.
            </TypographyP>

            <TypographyP>
              Initial considerations for CV-driven placement focussed on identifying the centre of each component.
              However, it was quickly realised that a more effective approach would be to match individual component leads with their corresponding PCB pads.
              This approach is not only more robust to variations in component orientation but also enables a more intuitive user interface, where the operator can select a single lead and the machine will automatically identify the matching pad and calculate the optimal rotation for placement.
            </TypographyP>

            <TypographyP>
              A centroid finding algorithm was developed to identify the centre of each component pad.
              This algorithm processes the real-time video feed captured from the downward-facing camera, identifying regions of interest that correspond to pad pixels.
              The identified centroids are then used to guide the vacuum head towards the exact pad location.
            </TypographyP>

            <TypographyP>
              In this context, a centroid represents the average <TypographyInlineMaths>(x, y)</TypographyInlineMaths> coordinate of all pixels belonging to a particular feature, such as a component pad.
              It can be thought of as the &lsquo;centre of mass&rsquo; of the feature; a single point that represents the location of the feature.
            </TypographyP>

            <TypographyP>
              The centroid finding algorithm operates by first applying a threshold to the camera image, converting it to a binary representation where pixels are classified as either belonging to a feature or to the background.
              This thresholding step leverages the colour difference between the metallic pads and the PCB&apos;s solder mask layer.
              A connected component analysis is then performed to identify groups of adjacent pixels that belong to the same feature.
              For each identified connected component, the algorithm calculates the average $x$ and $y$ coordinates of all pixels bounded by that component, producing the centroid of the feature.
              An example of this process is provided below.
            </TypographyP>

            <ImageCarousel
              images={[
                { image: STATIC_IMAGES.CENTROID.RAW, caption: 'The raw camera image' },
                { image: STATIC_IMAGES.CENTROID.KEYED, caption: 'An intermediate representation to demonstrate the separation in tone between the pads, white silkscreen text, and green solder mask' },
                { image: STATIC_IMAGES.CENTROID.MASKED, caption: 'Identifying pad pixels that satisfy a calibrated luminosity range' },
                { image: STATIC_IMAGES.CENTROID.FINAL, caption: 'Pad centroids identified from groups of pad pixels.' },
              ]}
              className='mt-6'
            />

            <TypographyP>
              Whilst the initial focus was targeted towards detecting the metallic pads of PCBs, the same principles can be applied to detect solder paste applied atop the pads.
              This is essential for real-world functionality of such an active assistance mechanism, as SMT components placed atop bare pads without solder paste applied first are not useful.
              The challenge of solder paste detection lies in differentiating the paste from other features on the PCB, such as silkscreen reference designators and solder mask.
              Further research is required to explore different lighting techniques and image processing algorithms to achieve robust and accurate solder paste detection.
            </TypographyP>


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
              The individual video streams are first read by <GLOBALS.InlineCode.GitHub.Vision /> from the camera sensors with the <TypographyLink href={GLOBALS.RPI_CAM_VID}><TypographyInlineCode>rpicam-vid</TypographyInlineCode></TypographyLink> command-line binary (built atop <TypographyLink href={GLOBALS.LIB_CAMERA}><TypographyInlineCode>libcamera</TypographyInlineCode></TypographyLink>) that is distributed as part of <TypographyLink href={GLOBALS.RASPBERRY_PI_OS}>Raspberry Pi OS</TypographyLink>.
              <GLOBALS.InlineCode.GitHub.Vision /> then composites the two feeds together produce the final real-time video feed showing predicted component alignment as shown below.
              This feed is then written to <TypographyLink href={GLOBALS.FFMPEG}><TypographyInlineCode>ffmpeg</TypographyInlineCode></TypographyLink>, which transcodes the video from its raw <TypographyLink href={GLOBALS.YUV_420}><TypographyInlineCode>YUV 4:2:0</TypographyInlineCode></TypographyLink> format into <TypographyLink href={GLOBALS.H_264}><TypographyInlineCode>H.264</TypographyInlineCode></TypographyLink> and streams the transcoded feed to MediaMTX via <TypographyLink href={GLOBALS.RTSP}>RTSP</TypographyLink>.
            </TypographyP>

            <TypographyImage
              image={STATIC_IMAGES.COMPOSITE.ALIGNING}
              caption={'Real-time composite video feed showing the picked component and PCB pads'}
            />

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
              As with any system that comprises of distinct modules, our distinct modules must communicate.
            </TypographyP>

            <TypographyH5>Controller to Gantry</TypographyH5>
            {/* TODO: */}
            <TypographyP>
              The <GLOBALS.InlineCode.GitHub.Controller /> communicates with the <GLOBALS.InlineCode.GitHub.Gantry /> and vacuum head using the industry standard <TypographyLink href={GLOBALS.GCODE}>RS-274 G-code</TypographyLink> protocol, transmitted over a <TypographyInlineCode>115200</TypographyInlineCode>-baud USB serial port.
              G-code is a numerical control programming language widely used for controlling automated machine tools, and provides a simple method of specifying movements and actions.
            </TypographyP>

            <TypographyP>
              Initially, a complete re-implementation of the gantry firmware was considered to optimise for minimal message length and transmission time.
              However, it was ultimately decided to leverage the existing <TypographyLink href={GLOBALS.GRBL}>Grbl</TypographyLink> open-source G-code interpreter for its maturity, robust feature set, and extensive documentation.
              This decision allowed focus to be placed on higher-level aspects of the project, such as the development of the shared control scheme and the user interface.
            </TypographyP>

            <TypographyH5>Controller to Interface</TypographyH5>
            <TypographyP>
              <TypographyLink href={GLOBALS.PROTOCOL_BUFFERS.HOME}>Protocol Buffers</TypographyLink> are used to serialise and format the data payloads exchanged between each module.
              &lsquo;Protobufs&rsquo; are a language- and platform-agnostic binary serialisation mechanism for structured data, like JSON or XML, but <TypographyLink href={GLOBALS.PROTOCOL_BUFFERS.SMALLER_FASTER_SIMPLER}>&lsquo;smaller, faster, and simpler&rsquo;</TypographyLink>.
            </TypographyP>

            <TypographyP>
              Our <TypographyInlineCode>.proto</TypographyInlineCode> language definition files are contained within the <GLOBALS.Links.GitHub.Proto /> repository, itself included as a <TypographyInlineCode>git</TypographyInlineCode> <TypographyLink href={GLOBALS.GIT_SUBMODULES}>submodule </TypographyLink>in our module repositories.
              The <GLOBALS.InlineCode.GitHub.Proto /> repository also contains a shell script to recompile target language bindings when changes are made.
            </TypographyP>

            <TypographyP>
              A <TypographyLink href={GLOBALS.WEB_SOCKET}>WebSocket</TypographyLink> connection is established over TCP and HTTP between the <GLOBALS.InlineCode.GitHub.Controller /> and this <GLOBALS.InlineCode.GitHub.Interface /> web application.
              This provides a real-time, low-latency, full-duplex data channel, which is used to exchange information and instructions.
            </TypographyP>

            <TypographyP>
              Numeric data, such as the <TypographyInlineCode>TARGET_DELTAS</TypographyInlineCode> between the present head position and the operator&apos;s desired target, is <span id={FRAGMENT_IDS.DATA_NORMALISATION}>normalised into an absolute, invariant range of <TypographyInlineMaths>[0, 65535]</TypographyInlineMaths>.
              This normalisation ensures that the exchanged units are independent of run-time variables—the client viewport, or streamed video dimensions, for instance</span>.
              The representation range of a <TypographyInlineCode>16-bit</TypographyInlineCode> integer was chosen for performance—by using this range, we can leverage the efficiency and other benefits of protocol buffer <TypographyLink href={GLOBALS.PROTOCOL_BUFFERS.VARINTS}>varints</TypographyLink>, which would not be possible if we exchanged a <TypographyInlineCode>float</TypographyInlineCode> or <TypographyInlineCode>double</TypographyInlineCode> in the range of <TypographyInlineMaths>[0, 1]</TypographyInlineMaths>.
            </TypographyP>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='userInterface'>
          <AccordionTrigger><TypographyH4>User Interface</TypographyH4></AccordionTrigger>
          <AccordionContent>
            <SystemUserInterface />
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </>
  )
}

function SystemUserInterface() {
  return (
    <>
      <TypographyP>
        This user interface is a modern, performant, and responsive web application written in <TypographyLink href={GLOBALS.TYPESCRIPT}>TypeScript</TypographyLink>.
        It is built using <TypographyLink href={GLOBALS.NEXT_JS.HOME}>Next.js</TypographyLink> under its <TypographyLink href={GLOBALS.NEXT_JS.APP}>App Router</TypographyLink> pattern with <TypographyLink href={GLOBALS.REACT.HOME}>React</TypographyLink> functional components.
        {' '}<TypographyLink href={GLOBALS.TAILWIND}>Tailwind CSS</TypographyLink> is used for styling, and <TypographyLink href={GLOBALS.SHADCN_UI}><TypographyInlineCode>shadcn/ui</TypographyInlineCode></TypographyLink> headless components have been used to create a tailored component library.
      </TypographyP>

      <TypographyH5 id={FRAGMENT_IDS.NEAREST_TARGET}>Nearest-Target Algorithm</TypographyH5>
      <TypographyP>
        The development of our nearest-target algorithm was guided by a hypothesis that a naïve algorithm which simply selected the radially-nearest target would not be the most intuitive algorithm for a human operator.
      </TypographyP>

      <TypographyP>
        More precisely, we theorised that a cost function <TypographyInlineMaths>c(r, \theta)</TypographyInlineMaths> could be used to capture the &lsquo;nearness&rsquo; of a polar target <TypographyInlineMaths>{String.raw`(r_\text{t}, \theta_\text{t})`}</TypographyInlineMaths> within a given search sector <TypographyInlineMaths>{String.raw`⌔_\text{s}`}</TypographyInlineMaths>, where
        <TypographyBlockMaths>{String.raw`
          c(r, \theta) = \begin{cases}
            r & \left\lvert \theta_\text{s} - \theta \right\rvert \leq \frac{2\pi}{2N} \\
            \infty & \text{otherwise}
          \end{cases}
          `}</TypographyBlockMaths>
        where <TypographyInlineMaths>N</TypographyInlineMaths> is the total number of sectors, and <TypographyInlineMaths>{String.raw`\theta_\text{s}`}</TypographyInlineMaths> is the polar angle across which <TypographyInlineMaths>{String.raw`⌔_\text{s}`}</TypographyInlineMaths> is centred.
        <TypographyInlineMaths>{String.raw`\frac{2\pi}{2N}`}</TypographyInlineMaths> is defined as the maximum deviation <TypographyInlineMaths>{String.raw`\theta_\text{d}`}</TypographyInlineMaths> from the search angle <TypographyInlineMaths>{String.raw`\theta_\text{s}`}</TypographyInlineMaths> for a target <TypographyInlineMaths>{String.raw`\theta_\text{t}`}</TypographyInlineMaths> to be within the sector <TypographyInlineMaths>{String.raw`⌔_\text{s}`}</TypographyInlineMaths>.
        We hypothesised that this naïve cost function would <TypographyItalics>not</TypographyItalics> produce the optimal algorithm for our cooperative, human-centric machine control.
      </TypographyP>

      <TypographyP>
        This hypothesis was found to be empirically supported through an initial implementation of such an &lsquo;unweighted&rsquo; algorithm.
        An illustrative example of this is provided in Figures 1 and 2 below:
      </TypographyP>

      <TypographyList ordered>
        <TypographyListItem>
        In Figure 1, the operator first presents a <TypographyKeyInput>←</TypographyKeyInput> input to pounce to target <TypographyInlineCode>①</TypographyInlineCode>.
        This behaves as expected, and does not feel unnatural.
        However, when the operator next presents a <TypographyKeyInput>→</TypographyKeyInput> input, expecting to pounce to target <TypographyInlineCode>③</TypographyInlineCode>, the shortest radius <TypographyInlineMaths>{String.raw`r_\text{t}`}</TypographyInlineMaths> from <TypographyInlineCode>①</TypographyInlineCode> within the sector <TypographyInlineMaths>{String.raw`\left\lvert\theta_\text{t}\right\rvert \leq \frac{\pi}{4}`}</TypographyInlineMaths> is instead determined to be target <TypographyInlineCode>②</TypographyInlineCode>.
        This <TypographyItalics>does</TypographyItalics> feel unnatural and non-optimal.
        </TypographyListItem>
        <TypographyListItem>
        Similarly, Figure 2 shows that the unweighted &lsquo;nearest radius&rsquo; cost function will pounce from target <TypographyInlineCode>②</TypographyInlineCode> to target <TypographyInlineCode>③</TypographyInlineCode>, rather than the more &lsquo;intuitive&rsquo; <TypographyInlineCode>④</TypographyInlineCode>.
        </TypographyListItem>
      </TypographyList>

      <ImageCarousel
        images={[
          { image: STATIC_IMAGES.NEAREST_TARGET.EXAMPLES.UNWEIGHTED_1, caption: 'Figure 1: Unweighted nearest radius algorithm' },
          { image: STATIC_IMAGES.NEAREST_TARGET.EXAMPLES.UNWEIGHTED_2, caption: 'Figure 2: Unweighted nearest radius algorithm' },
        ]}
        className='mt-6'
      />

      <TypographyP>
        From this empirical result, we proceeded to investigate the way in which a &lsquo;weighting&rsquo; function <TypographyInlineMaths>w(r, \theta)</TypographyInlineMaths> might be applicable to produce an overall cost function that could better consider the angle difference between targets.
        To achieve this, we used Julia to visualise the effects of varying radius <TypographyInlineMaths>{String.raw`r_\text{t}`}</TypographyInlineMaths> and angle <TypographyInlineMaths>{String.raw`\theta_\text{t}`}</TypographyInlineMaths> with various weighted cost functions, producing the collection of polar plots shown below.
        We broke the polar plot into four quadrants, each centred on a search angle <TypographyInlineMaths>{String.raw`\theta_\text{s} \in \{0, \frac{\pi}{2}, \pi, \frac{3\pi}{2}\}`}</TypographyInlineMaths>, and used a colour gradient to represent the &lsquo;nearness&rsquo; value of each point with respect to <TypographyInlineMaths>(0, 0)</TypographyInlineMaths> as computed by the cost function.
      </TypographyP>

      <TypographyImage
        image={STATIC_IMAGES.NEAREST_TARGET.PLOTS.UNWEIGHTED_DOTS}
        caption='Nearest radius with no weighting. The cost function is evaluated to determine a &lsquo;nearness&rsquo; value for each point in the polar plot.'
      />

      <TypographyImage
        image={STATIC_IMAGES.NEAREST_TARGET.PLOTS.UNWEIGHTED}
        caption='Nearest radius with no weighting. We see a perfect radial gradient.'
      />

      <TypographyP>
        The first weighted cost function that we investigated was a simple product of the target&apos;s radius <TypographyInlineMaths>{String.raw`r_\text{t}`}</TypographyInlineMaths> by the difference <TypographyInlineMaths>{String.raw`\left\lvert \theta_\text{s} - \theta_\text{t} \right\rvert`}</TypographyInlineMaths> between its angle <TypographyInlineMaths>{String.raw`\theta_\text{t}`}</TypographyInlineMaths> and the search angle <TypographyInlineMaths>{String.raw`\theta_\text{s}`}</TypographyInlineMaths>, normalised with respect to the maximum deviation <TypographyInlineMaths>{String.raw`\theta_\text{d}`}</TypographyInlineMaths>, where
        <TypographyBlockMaths>{String.raw`
          \begin{aligned}

          \theta_\text{d} &= \frac{2\pi}{2N} \\[1.25em]

          w_\text{simple}(r, \theta) &= \frac{\left\lvert \theta_\text{s} - \theta \right\rvert}{\theta_\text{d}} \\[1.25em]

          c(r, \theta) &= \begin{cases}
            r \cdot w(r, \theta) & \left\lvert \theta_\text{s} - \theta \right\rvert \leq \theta_\text{d} \\
            \infty & \text{otherwise}
          \end{cases}

          \end{aligned}
        `}</TypographyBlockMaths>
        The intuition for this cost function is that targets which fall nearer to the search angle are multiplied by a smaller weight <TypographyInlineMaths>w(r, \theta)</TypographyInlineMaths> and hence considered &lsquo;nearer&rsquo;.
      </TypographyP>

      <TypographyImage
        image={STATIC_IMAGES.NEAREST_TARGET.PLOTS.WEIGHTED_SIMPLE}
        caption='Nearest radius multiplied by angle deviation. We see that great emphasis is placed on points that fall along the search angle.'
      />

      <TypographyP>
        We found this simple weighting function to produce an equally undesirable cost function, as it would place unfair preference upon even the radially farthermost target, provided only that it lay along the search angle such that <TypographyInlineMaths>{String.raw`\theta_\text{t} \approx \theta_\text{s}`}</TypographyInlineMaths>.
        An example is provided in Figure 3 below, where this algorithm will pounce straight from target <TypographyInlineCode>②</TypographyInlineCode> to target <TypographyInlineCode>③</TypographyInlineCode>, skipping over targets <TypographyInlineCode>④</TypographyInlineCode> and <TypographyInlineCode>⑤</TypographyInlineCode>.
      </TypographyP>

      <TypographyImage
        image={STATIC_IMAGES.NEAREST_TARGET.EXAMPLES.WEIGHTED_SIMPLE}
        caption='Figure 3: Nearest radius multiplied by angle deviation'
      />

      <TypographyP>
        We then applied an offset <TypographyInlineMaths>c</TypographyInlineMaths> to the multiplicative factor <TypographyInlineMaths>w(r, \theta)</TypographyInlineMaths> to break the property of homogeneity, and hence linearity, of the cost function.
        <TypographyBlockMaths>{String.raw`
          w_\text{non-linear}(r, \theta) = \frac{\left\lvert \theta_\text{s} - \theta \right\rvert}{\theta_\text{d}} + c
        `}</TypographyBlockMaths>
        We found this offset to behave as a damping factor; a control knob that we could employ to moderate the influence of angle deviation towards the computed &lsquo;nearness&rsquo; of a target position.
        We observed that this algorithm behaved increasingly like the unweighted &lsquo;nearest radius&rsquo; algorithm as <TypographyInlineMaths>c</TypographyInlineMaths> tended to infinity, which can be understood through the theory underpinning non-homogenous functions.
      </TypographyP>

      <TypographyP>
        We realised through this observation that the &lsquo;damping factor&rsquo; <TypographyInlineMaths>c</TypographyInlineMaths> behaves in effect like the reciprocal of a directivity constant <TypographyInlineMaths>D</TypographyInlineMaths>, where <TypographyInlineMaths>{String.raw`w_\text{non-linear}(r, \theta)`}</TypographyInlineMaths> can be re-written as
        <TypographyBlockMaths>{String.raw`
          w_\text{non-linear}(r, \theta) = \frac{\left\lvert \theta_\text{s} - \theta \right\rvert}{\theta_\text{d}} + \frac{1}{D}
        `}</TypographyBlockMaths>
        such that <TypographyInlineMaths>{String.raw`c_\text{non-linear}(r, \theta)`}</TypographyInlineMaths> approximates the unweighted &lsquo;nearest radius&rsquo; algorithm as <TypographyInlineMaths>D \to 0</TypographyInlineMaths>.
      </TypographyP>

      <ImageCarousel
        images={[
          { image: STATIC_IMAGES.NEAREST_TARGET.PLOTS.WEIGHTED_NON_LINEAR_1M, caption: 'Non-linear algorithm with directivity D = 10^6',
            captionElement: (
              <>Non-linear algorithm with directivity <TypographyInlineMaths>D = 10^6</TypographyInlineMaths></>
            ),
          },
          { image: STATIC_IMAGES.NEAREST_TARGET.PLOTS.WEIGHTED_NON_LINEAR_2, caption: 'Non-linear algorithm with directivity D = 2',
            captionElement: (
              <>Non-linear algorithm with directivity <TypographyInlineMaths>D = 2</TypographyInlineMaths></>
            ),
          },
          { image: STATIC_IMAGES.NEAREST_TARGET.PLOTS.WEIGHTED_NON_LINEAR_1, caption: 'Non-linear algorithm with directivity D = 1',
            captionElement: (
              <>Non-linear algorithm with directivity <TypographyInlineMaths>D = 1</TypographyInlineMaths></>
            ),
          },
          { image: STATIC_IMAGES.NEAREST_TARGET.PLOTS.WEIGHTED_NON_LINEAR_0p5, caption: 'Non-linear algorithm with directivity D = 0.5',
            captionElement: (
              <>Non-linear algorithm with directivity <TypographyInlineMaths>D = 0.5</TypographyInlineMaths></>
            ),
          },
          { image: STATIC_IMAGES.NEAREST_TARGET.PLOTS.WEIGHTED_NON_LINEAR_0p25, caption: 'Non-linear algorithm with directivity D = 0.25',
            captionElement: (
              <>Non-linear algorithm with directivity <TypographyInlineMaths>D = 0.25</TypographyInlineMaths></>
            ),
          },
          { image: STATIC_IMAGES.NEAREST_TARGET.PLOTS.WEIGHTED_NON_LINEAR_1u, caption: 'Non-linear algorithm with directivity D = 10^-6. We see the same behaviour as the simple unweighted algorithm.',
            captionElement: (
              <>Non-linear algorithm with directivity <TypographyInlineMaths>{String.raw`D = 10^{-6}`}</TypographyInlineMaths>. We see the same behaviour as the simple unweighted algorithm.</>
            ),
          },
        ]}
        className='mt-6'
      />

      <TypographyP>
        Implementing this non-linear cost function, we found through empirical testing that this weighted nearest-target algorithm indeed felt significantly more natural and intuitive.
        Examples are provided in Figures 4 and 5 below, where we found that presenting the same input sequences as Figures 1 and 2 would now produce the &lsquo;intuitive&rsquo; results.
      </TypographyP>

      <ImageCarousel
        images={[
          { image: STATIC_IMAGES.NEAREST_TARGET.EXAMPLES.WEIGHTED_NON_LINEAR_1, caption: 'Figure 4: Non-linear algorithm with directivity D = 2',
            captionElement: (
              <>Figure 4: Non-linear algorithm with directivity <TypographyInlineMaths>D = 2</TypographyInlineMaths></>
            ),
          },
          { image: STATIC_IMAGES.NEAREST_TARGET.EXAMPLES.WEIGHTED_NON_LINEAR_2, caption: 'Figure 5: Non-linear algorithm with directivity D = 2',
            captionElement: (
              <>Figure 5: Non-linear algorithm with directivity <TypographyInlineMaths>D = 2</TypographyInlineMaths></>
            ),
          },
        ]}
        className='mt-6'
      />

      <TypographyP>
        As <TypographyLink toFragmentId href={FRAGMENT_IDS.NEAREST_TARGET_REACHABLE}>alluded to</TypographyLink> when describing the motivations behind our manual override control mechanism, we do acknowledge that this algorithm does not guarantee that every target is reachable.
        Although it is likely that we may assume in practice that there would be sufficient target positions to reliably reach a desired target, this is not formally true.
      </TypographyP>

      <TypographyP>
        Figure 6 below illustrates an example of this, where the selected target <TypographyInlineCode>④</TypographyInlineCode> would be unreachable if:
      </TypographyP>

      <TypographyList ordered>
        <TypographyListItem>the directivity constant was changed such that target <TypographyInlineCode>③</TypographyInlineCode> instead pounced <TypographyKeyInput>→</TypographyKeyInput> to target <TypographyInlineCode>⑤</TypographyInlineCode>, and</TypographyListItem>
        <TypographyListItem>target <TypographyInlineCode>①</TypographyInlineCode> did not exist such that you could not pounce <TypographyKeyInput>↑</TypographyKeyInput>, and</TypographyListItem>
        <TypographyListItem>the targets in the top-left did not exist such that you could not pounce <TypographyKeyInput>→</TypographyKeyInput>.</TypographyListItem>
      </TypographyList>

      <TypographyImage
        image={STATIC_IMAGES.NEAREST_TARGET.EXAMPLES.WEIGHTED_UNREACHABLE}
        caption='Figure 6: Potentially unreachable target with weighted nearest-target algorithm'
      />

      <TypographyP>
        <TypographyMuted>
          We do also realise that this directivity constant <TypographyInlineMaths>D</TypographyInlineMaths> may very well be just as subjective as one&apos;s mouse sensitivity.
          Consequently, we intend to implement some mechanism for the operator to adjust this parameter on-the-fly, complemented by some visual indication towards the impact of those changes.
        </TypographyMuted>
      </TypographyP>

      <TypographyH5 id={FRAGMENT_IDS.DATA_CONTEXT}>Data Context</TypographyH5>
      <TypographyP>
        A React <TypographyLink href={GLOBALS.REACT.CONTEXT}>context</TypographyLink> is used to distribute the data configured on <GLOBALS.InlineCode.Pages.Settings /> throughout the application without devolving to <TypographyLink href={GLOBALS.REACT.PROP_DRILLING}>prop drilling</TypographyLink>.
        This data is backed into <TypographyInlineCode>window.localStorage</TypographyInlineCode> as stringified JSON through a <TypographyInlineCode>useLocalStorage()</TypographyInlineCode> <TypographyLink href={GLOBALS.REACT.CUSTOM_HOOK}>custom hook</TypographyLink>, such that the data persists locally within the operator&apos;s browser once configured.
      </TypographyP>

      <TypographyH5 id={FRAGMENT_IDS.VALIDATION}>Form Validation</TypographyH5>
      <TypographyP>
        <TypographyLink href={GLOBALS.ZOD}>Zod</TypographyLink> is used on <GLOBALS.InlineCode.Pages.Settings /> for form schema declaration and validation via static type inference.
        This provides immediate, client-side validation at run-time for the operator&apos;s inputs, helping to ensure that all system environment variables are configured correctly.
      </TypographyP>

      <TypographyH5 id={FRAGMENT_IDS.DATA_CONTEXT}>Heads-Up Display</TypographyH5>
      <TypographyP>
        The initial design of the user interface explored using the <TypographyLink href={GLOBALS.CANVAS}>HTML <TypographyInlineCode>{'<canvas>'}</TypographyInlineCode> API </TypographyLink>for its flexibility in drawing graphics and handling user input.
        This approach would have enabled the implementation of a Zoomable User Interface (ZUI) as identified in literature, where the operator could pan and zoom around a high-resolution image of the PCB.
        This idea was further explored by considering the use of <TypographyLink href={GLOBALS.WEBGL}>WebGL</TypographyLink>, which would have enabled hardware-accelerated graphics rendering to improve performance and responsiveness.
      </TypographyP>

      <TypographyP>
        Upon further research into the <TypographyInlineCode>{'<canvas>'}</TypographyInlineCode> element, it was ultimately deemed to be poorly documented and less intuitive for development.
        The event handling model for <TypographyInlineCode>{'<canvas>'}</TypographyInlineCode> is less intuitive than that of standard HTML DOM elements, requiring more complex code to handle user interactions.
        The final implementation of the user interface therefore opted for a simpler approach using standard HTML elements like <TypographyInlineCode>{'<div>'}</TypographyInlineCode>s for layout and interaction, with provision for further investigation into <TypographyInlineCode>{'<canvas>'}</TypographyInlineCode> and WebGL if advanced graphics were needed in future.
      </TypographyP>

      <TypographyP>
        A <TypographyInlineCode>{'<div>'}</TypographyInlineCode> overlay HUD is positioned directly atop the <TypographyInlineCode>{'<video>'}</TypographyInlineCode> element that displays the real-time WebRTC video feed.
        The overlay dynamically resizes to match the dimensions of the streamed video.
        A crosshair cursor style is applied to the mouse pointer within the overlay to provide the operator with visual feedback, indicating the exact location on the PCB that will be targeted by the machine.
        The operator&apos;s mouse click viewport coordinates are <TypographyLink href={FRAGMENT_IDS.DATA_NORMALISATION}>normalised into an <TypographyInlineCode>Int16</TypographyInlineCode> coordinate space</TypographyLink>.
      </TypographyP>

      <TypographyP>
        This HUD is responsible for communicating machine state to the operator to enhance their sense of control.
        A large instruction bar is displayed at the top of the HUD to inform the operator as to the currently expected action, and toast-style notifications are used for event and error reporting.
        A state indicator bar displaying information about the mechanical condition of the pick-and-place machine is shown at the bottom of the HUD.
        An example of the developed HUD is shown below.
      </TypographyP>

      <TypographyImage
        image={STATIC_IMAGES.HUD.PLACED}
        caption={'Screenshot of heads-up display (HUD) after a successful component placement. Target markers are not shown.'}
      />

      <TypographyP>
        In addition to these elements, the HUD additionally comprises of four other indicator types:
      </TypographyP>

      <TypographyList ordered>
        <TypographyListItem>a cursor crosshair,</TypographyListItem>
        <TypographyListItem>a nozzle centre indicator,</TypographyListItem>
        <TypographyListItem>a selected target indicator, and</TypographyListItem>
        <TypographyListItem>target markers.</TypographyListItem>
      </TypographyList>

      <TypographyP>
        The nozzle centre indicator is a grey circle fixed to the position of the vacuum nozzle when in the &lsquo;upward&rsquo; position.
        This indicator is used to communicate the origin <TypographyInlineMaths>(0, 0)</TypographyInlineMaths> of the machine to the operator.
      </TypographyP>

      <TypographyP>
        The target indicator is a temporary purple circle that indicates the currently selected target marker for the gantry to next translate to, if one exists.
        When mouse input is presented, this indicator is used to mark the clicked coordinates.
      </TypographyP>

      <TypographyP>
        The target markers are grey squares drawn atop any centroids of interest that are identified by the <GLOBALS.InlineCode.GitHub.Vision />, which are transmitted to this <GLOBALS.InlineCode.GitHub.Interface /> via the <GLOBALS.InlineCode.GitHub.Controller />.
        These act as &lsquo;pounce&rsquo; targets that may be jumped to efficiently, heavily inspired by the likes of <span id={FRAGMENT_IDS.VIM_PLUGINS}>
          <TypographyLink href={GLOBALS.VIM.EASY_MOTION}><TypographyInlineCode>vim-easymotion</TypographyInlineCode></TypographyLink>, <TypographyLink href={GLOBALS.VIM.HOP}><TypographyInlineCode>hop.nvim</TypographyInlineCode></TypographyLink>, and <TypographyLink href={GLOBALS.VIM.POUNCE}><TypographyInlineCode>pounce.nvim</TypographyInlineCode></TypographyLink>
        </span>—which James personally uses.
      </TypographyP>

    </>
  )
}
