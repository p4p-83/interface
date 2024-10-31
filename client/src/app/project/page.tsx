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
  TypographyImage,
} from '@/components/ui/typography'
import { badgeVariants } from '@/components/ui/badge'

import poster from './Poster_83.png'

export const metadata: Metadata = GLOBALS.PAGES.getMetadata(GLOBALS.PAGES.PROJECT)

export default function Project() {
  return (

    <LayoutMain justifyStart>

      <Header />

      <div className='grid grid-cols-1 w-full max-w-3xl gap-4 md:gap-6'>

        <div>
          <PageHeading {...GLOBALS.PAGES.PROJECT} />

          <TypographyH2>Part IV Project #83</TypographyH2>

          <TypographyP>
            <TypographyLink href={GLOBALS.MANAGEMENT_SYSTEM}>2024 ECSE Project #83</TypographyLink>.
          </TypographyP>
          <TypographyP>
            <TypographyLink href={GLOBALS.JAMES}>James Bao</TypographyLink> and <TypographyLink href={GLOBALS.SAM}>Sam Skinner</TypographyLink>, supervised by <TypographyLink href={GLOBALS.NITISH}>Dr. Nitish Patel</TypographyLink>.
          </TypographyP>
          <TypographyP>
            <TypographyLink href={GLOBALS.UNIVERSITY.ECSE}>Department of Electrical, Computer, and Software Engineering</TypographyLink>, <TypographyLink href={GLOBALS.UNIVERSITY.HOME}>The University of Auckland</TypographyLink>.
          </TypographyP>

          <TypographyH3>A pick-and-place for rapid prototyping</TypographyH3>
          <TypographyP>
            <span className='flex flex-row gap-2'>
              <span className={badgeVariants({ variant: 'secondary' })}>Control Systems</span>
              <span className={badgeVariants({ variant: 'secondary' })}>Embedded Systems</span>
              <span className={badgeVariants({ variant: 'secondary' })}>Human Computer Interactions</span>
            </span>
          </TypographyP>

          <TypographyP>
            Modern circuit board designs incorporate surface-mounted electronic components for their smaller sizes and better manufacturability on production lines with industrial pick-and-place machines.
            Unfortunately for a design engineer tasked with prototyping a board, these machines are too slow to programme and require too much overhead to be used when only a handful of boards are needed.
            The engineer&apos;s only real alternative is to prototype by hand, usually with a pair of tweezers, and either a soldering iron or a stencil with a reflow oven to place the components.
            All of these options are painstaking, time consuming, and prone to causing ergonomic strain.
          </TypographyP>

          <TypographyP>
            Our project aims to investigate the usage of a lightweight gantry and vacuum pickup system (which is already an option to engineers) but with the addition of light machine vision to assist with the tedious task of component alignment.
            Unlike all other existing computerised systems, the user will drive the machine in real time.
            Such a device would be of considerable benefit to a design engineer&apos;s productivity and health, and especially for those that may have limited dexterity or impaired vision.
          </TypographyP>

          <TypographyP>
            To this end, the project will involve the assembly of a mechanical pick-and-place machine with fly-by-wire motion control as an initial benchmark; the conception of a mathematical and algorithmic method of interpreting the operator&apos;s input; the implementation of a cooperative machine vision algorithm to provide positioning assistance that is responsive to this input; and the integration of these together to create a pick-and-place machine under shared control.
          </TypographyP>

          <TypographyP>
            The end goal is to demonstrate a machine vision algorithm that is sympathetic to the intentions of a human, materialised as part of a pick-and-place machine where control over the placement head is intuitively and effectively shared.
          </TypographyP>

          <TypographyH4>Research Outcomes</TypographyH4>
          <TypographyP>
            We intend to research the improvements to accessibility, productivity, and health that could come as a result of light computer assistance.
            Presently, many machines exist that are either entirely human­-controlled or entirely computer numerical-controlled, and relatively few designs deliberately blend the two approaches.
          </TypographyP>

          <TypographyP>
            The unique challenges associated with machine tool control in this manner will require us to iterate upon and blend research from neighbouring fields.
            This will lead to a better understanding of machine vision algorithms in the context of shared control methods.
          </TypographyP>

          <TypographyP>
            In completing this research, we hope to:
          </TypographyP>

          <TypographyList ordered>
            <TypographyListItem>
              Demonstrate (through formulation and testing) a theoretical model applicable to such machines and applications.
            </TypographyListItem>

            <TypographyListItem>
              Qualitatively profile the benefits, drawbacks, and constraints of machine tools (a pick-and-place) under such a control scheme.
              This understanding will be developed through trial and error through the process of building the machine and implementing the control scheme and user interface.
            </TypographyListItem>

            <TypographyListItem>
              Quantify the performance of such a shared control method insofar as the human-centric (and thus sometimes subjective) nature of the project allows.
              Such measurements should include factors such as cost and productivity (assembly time per board), and would be compared across varying levels of computer assistance.
            </TypographyListItem>
          </TypographyList>

          <TypographyH4>Project Poster</TypographyH4>

          <TypographyImage
            image={poster}
            caption={'Our final project poster'}
          />

          <TypographyH2>See what we&apos;ve built</TypographyH2>

          <TypographyH3>GitHub Organisation</TypographyH3>
          <TypographyP>
            Our work towards this research project is contained within our GitHub organisation, <GLOBALS.Links.GitHub.Organisation />.
          </TypographyP>

          <TypographyP>
            We have additionally maintained logbooks throughout this project within an Obsidian vault (ie Markdown <TypographyInlineCode>.md</TypographyInlineCode> files), which is version controlled in a repository at <GLOBALS.Links.GitHub.Docs />.
          </TypographyP>

          <TypographyH3>{GLOBALS.PAGES.LEARN.description}</TypographyH3>
          <TypographyBlockquote>
            Gotten the gist?
            <br />
            <br />
            <TypographyLink href={GLOBALS.PAGES.LEARN.path}>Learn</TypographyLink> about what we&apos;ve built, and how to use it!
          </TypographyBlockquote>

        </div>

      </div>

    </LayoutMain>

  )
}
