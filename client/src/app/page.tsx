import { Badge } from '@/components/ui/badge'
import { LayoutMain } from '@/components/LayoutMain'
import { ThemeToggle } from '@/components/ThemeToggle'

import { HomeLinkCards } from './HomeLinkCards'

const SUBTITLES = [
  '#define PART_IV_PROJECT "ECSE #83"',
  '~ echo "ECSE Part IV Project #83"',
  'const char project[] = "ECSE Part IV Project #83";',
  '~ [ "$number" -eq 83 ] && echo "ECSE Part IV Project #$number"',
  'printf("ECSE Part IV Project #%u\\n", 83);',
  'std::cout << "ECSE Part IV Project #83" << std::endl;',
] as const

export default function Home() {
  return (

    <LayoutMain>

      <div className='absolute top-6 right-6'>
        <ThemeToggle />
      </div>

      <h1 className='mt-20 md:mt-10 mb-10 sm:mb-16 text-5xl sm:text-6xl sm:text-[4rem] text-center font-extrabold underline decoration-primary'>
        A pick-and-place,<br />
        for <em className='italic'>rapid</em> prototyping.
      </h1>

      <Badge variant='secondary' className='mb-8 sm:mb-16 text-xs sm:text-base'>
        <code className='font-mono p-2'>
          {SUBTITLES[Math.floor(Math.random() * SUBTITLES.length)]}
        </code>
      </Badge>

      <HomeLinkCards />

    </LayoutMain>

  )
}
