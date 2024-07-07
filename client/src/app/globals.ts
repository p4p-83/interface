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

export const EXTERAL_URLS = {
  PERSON: {
    JAMES: 'https://www.linkedin.com/in/jamesnzl/',
    SAM: 'https://www.linkedin.com/in/sam-skinner-752347224/',
    NITISH: 'https://profiles.auckland.ac.nz/nd-patel',
  },
  PROJECT: {
    MANAGEMENT_SYSTEM: 'https://part4project.foe.auckland.ac.nz/home/project/detail/5032/',
    GITHUB: {
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
    },
  },
  UNIVERSITY: {
    HOME: 'https://www.auckland.ac.nz/en.html',
    ECSE: 'https://www.auckland.ac.nz/en/engineering/about-the-faculty/electrical-computer-and-software-engineering.html',
  },
} as const
