'use client'

import { useState } from 'react'

import { Badge } from '@/components/ui/badge'

const SUBTITLES = [
  '#define PART_IV_PROJECT "ECSE #83"',
  '~ echo "ECSE Part IV Project #83"',
  'const char project[] = "ECSE Part IV Project #83";',
  '~ [ "$number" -eq 83 ] && echo "ECSE Part IV Project #$number"',
  'printf("ECSE Part IV Project #%u\\n", 83);',
  'std::cout << "ECSE Part IV Project #83" << std::endl;',
] as const

export function HomeRandomSubtitle() {
  const [subtitle] = useState(() => SUBTITLES[Math.floor(Math.random() * SUBTITLES.length)])

  return (
    <Badge variant='secondary' className='mb-8 sm:mb-16 text-xs sm:text-base'>
      <code className='font-mono p-2'>
        {subtitle}
      </code>
    </Badge>
  )
}
