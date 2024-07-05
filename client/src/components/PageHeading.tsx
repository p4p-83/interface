import { TypographyH1, TypographyP, TypographyMuted } from '@/components/ui/typography'

import { type Page } from '@/app/globals'

type PageHeadingProps = Pick<Page, 'name' | 'description'>;

export function PageHeading({ name, description }: PageHeadingProps) {
  return (
    <>

      <TypographyH1>{name}</TypographyH1>

      {(description) && (
        <TypographyP>
          <TypographyMuted className='text-base'>{description}.</TypographyMuted>
        </TypographyP>
      )}

    </>
  )
}
