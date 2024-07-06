import { LayoutMain } from '@/components/LayoutMain'
import { ThemeToggle } from '@/components/ThemeToggle'

import { HomeRandomSubtitle } from './home/HomeRandomSubtitle'
import { HomeLinkCards } from '@/app/home/HomeLinkCards'

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

      <HomeRandomSubtitle />

      <HomeLinkCards />

    </LayoutMain>

  )
}
