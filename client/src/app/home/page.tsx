import { redirect } from 'next/navigation'

import * as GLOBALS from '@/app/globals'

export default function Home() {
  redirect(GLOBALS.PAGES.HOME.path)
}