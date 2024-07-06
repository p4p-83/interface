'use client'

import { useEffect, useState } from 'react'

import { Badge } from '@/components/ui/badge'

const SUBTITLES = [
  '~ echo "ECSE Part IV Project #83"',
  '#define PART_IV_PROJECT "ECSE #83"',
  'const char project[] = "ECSE Part IV Project #83";',
  '~ [ "$number" -eq 83 ] && echo "ECSE Part IV Project #$number"',
  'printf("ECSE Part IV Project #%u\\n", 83);',
  'std::cout << "ECSE Part IV Project #83" << std::endl;',
] as const

export function HomeRandomSubtitle() {
  const [subtitle, setSubtitle] = useState<string>(SUBTITLES[0])

  useEffect(() => {
    setSubtitle(SUBTITLES[Math.floor(Math.random() * SUBTITLES.length)])
  }, [])

  return (
    <Badge variant='secondary' className='mb-8 sm:mb-16 text-xs sm:text-base'>
      <code className='font-mono p-2'>
        {subtitle}
      </code>
    </Badge>
  )
}
