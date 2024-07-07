import { TypographyInlineCode, TypographyLink } from '@/components/ui/typography'
import type { Metadata } from 'next'

export type Page = {
  path: string;
  name: string;
  description: string;
};

const HOME_NAME = 'Home'
const TITLE_SUFFIX = 'PnP << 83'

export const PAGES = {
  TITLE_SUFFIX,
  getMetadata(page: Page): Metadata {
    return {
      title: (page.name !== HOME_NAME)
        ? `${page.name} | ${TITLE_SUFFIX}`
        : TITLE_SUFFIX,
      description: `${page.description}.`,
    }
  },
  HOME: {
    path: '/',
    name: HOME_NAME,
    description: 'A pick-and-place for rapid prototyping',
  },
  PLACE: {
    path: '/place',
    name: 'Place',
    description: 'Position with precision',
  },
  CALIBRATE: {
    path: '/calibrate',
    name: 'Calibrate',
    description: 'Measure twice, place once',
  },
  SETTINGS: {
    path: '/settings',
    name: 'Settings',
    description: 'Set your stage',
  },
  LEARN: {
    path: '/learn',
    name: 'Learn',
    description: 'Meet your match',
  },
  PROJECT: {
    path: '/project',
    name: 'Project',
    description: 'Explore the lore',
  },
} as const

export const JAMES = 'https://www.linkedin.com/in/jamesnzl/'
export const SAM = 'https://www.linkedin.com/in/sam-skinner-752347224/'
export const NITISH = 'https://profiles.auckland.ac.nz/nd-patel'

export const MANAGEMENT_SYSTEM = 'https://part4project.foe.auckland.ac.nz/home/project/detail/5032/'

export const GITHUB = {
  ORGANISATION: {
    NAME: 'p4p-83',
    URL: 'https://github.com/p4p-83',
  },
  DOCS: {
    NAME: 'p4p-83/docs',
    URL: 'https://github.com/p4p-83/docs',
  },
  GANTRY: {
    NAME: 'p4p-83/gantry',
    URL: 'https://github.com/p4p-83/gantry',
  },
  VISION: {
    NAME: 'p4p-83/vision',
    URL: 'https://github.com/p4p-83/vision',
  },
  CONTROLLER: {
    NAME: 'p4p-83/controller',
    URL: 'https://github.com/p4p-83/controller',
  },
  INTERFACE: {
    NAME: 'p4p-83/interface',
    URL: 'https://github.com/p4p-83/interface',
  },
  PROTO: {
    NAME: 'p4p-83/protobufs',
    URL: 'https://github.com/p4p-83/protobufs',
  },
} as const

export const UNIVERSITY = {
  HOME: 'https://www.auckland.ac.nz/en.html',
  ECSE: 'https://www.auckland.ac.nz/en/engineering/about-the-faculty/electrical-computer-and-software-engineering.html',
} as const

export const MEDIA_MTX = 'https://github.com/bluenviron/mediamtx'
export const WEB_RTC = 'https://webrtc.org/'
export const RPI_CAM_VID = 'https://www.raspberrypi.com/documentation/computers/camera_software.html#rpicam-vid'
export const LIB_CAMERA = 'https://libcamera.org/'
export const RASPBERRY_PI_5 = 'https://www.raspberrypi.com/products/raspberry-pi-5/'
export const RASPBERRY_PI_OS = 'https://www.raspberrypi.com/documentation/computers/os.html'
export const YUV_420 = 'https://en.wikipedia.org/wiki/Y%E2%80%B2UV'
export const H_264 = 'https://en.wikipedia.org/wiki/Advanced_Video_Coding'
export const FFMPEG = 'https://ffmpeg.org/'
export const RTSP = 'https://en.wikipedia.org/wiki/Real-Time_Streaming_Protocol'
export const WHEP = 'https://www.ietf.org/archive/id/draft-murillo-whep-03.html'
export const PROTOCOL_BUFFERS = {
  HOME: 'https://protobuf.dev/',
  SMALLER_FASTER_SIMPLER: 'https://protobuf.dev/#what-are-protocol-buffers',
  VARINTS: 'https://protobuf.dev/programming-guides/encoding/#varints',
} as const
export const GIT_SUBMODULES = 'https://git-scm.com/book/en/v2/Git-Tools-Submodules'
export const WEB_SOCKET = 'https://en.wikipedia.org/wiki/WebSocket'
export const VI = 'https://en.wikipedia.org/wiki/Vi_(text_editor)'

/* Components */

// * I don't love this; it's not very DRY.
// * But, it saves having to repeat even more downstream...
export const InlineCode = {
  Pages: {
    Home: () => <TypographyInlineCode>{PAGES.HOME.path}</TypographyInlineCode>,
    Place: () => <TypographyInlineCode>{PAGES.PLACE.path}</TypographyInlineCode>,
    Calibrate: () => <TypographyInlineCode>{PAGES.CALIBRATE.path}</TypographyInlineCode>,
    Settings: () => <TypographyInlineCode>{PAGES.SETTINGS.path}</TypographyInlineCode>,
    Learn: () => <TypographyInlineCode>{PAGES.LEARN.path}</TypographyInlineCode>,
    Project: () => <TypographyInlineCode>{PAGES.PROJECT.path}</TypographyInlineCode>,
  },
  GitHub: {
    Organisation: () => <TypographyInlineCode>{GITHUB.ORGANISATION.NAME}</TypographyInlineCode>,
    Docs: () => <TypographyInlineCode>{GITHUB.DOCS.NAME}</TypographyInlineCode>,
    Gantry: () => <TypographyInlineCode>{GITHUB.GANTRY.NAME}</TypographyInlineCode>,
    Vision: () => <TypographyInlineCode>{GITHUB.VISION.NAME}</TypographyInlineCode>,
    Controller: () => <TypographyInlineCode>{GITHUB.CONTROLLER.NAME}</TypographyInlineCode>,
    Interface: () => <TypographyInlineCode>{GITHUB.INTERFACE.NAME}</TypographyInlineCode>,
    Proto: () => <TypographyInlineCode>{GITHUB.PROTO.NAME}</TypographyInlineCode>,
  },
} as const

export const Links = {
  GitHub: {
    Organisation: () => <TypographyLink href={GITHUB.ORGANISATION.URL}><InlineCode.GitHub.Organisation /></TypographyLink>,
    Docs: () => <TypographyLink href={GITHUB.DOCS.URL}><InlineCode.GitHub.Docs /></TypographyLink>,
    Gantry: () => <TypographyLink href={GITHUB.GANTRY.URL}><InlineCode.GitHub.Gantry /></TypographyLink>,
    Vision: () => <TypographyLink href={GITHUB.VISION.URL}><InlineCode.GitHub.Vision /></TypographyLink>,
    Controller: () => <TypographyLink href={GITHUB.CONTROLLER.URL}><InlineCode.GitHub.Controller /></TypographyLink>,
    Interface: () => <TypographyLink href={GITHUB.INTERFACE.URL}><InlineCode.GitHub.Interface /></TypographyLink>,
    Proto: () => <TypographyLink href={GITHUB.PROTO.URL}><InlineCode.GitHub.Proto /></TypographyLink>,
  },
} as const
