import { TypographyH1, TypographyP, TypographyMuted } from './ui/typography'

type PageHeadingProps = {
  title: string;
  subTitle?: string;
};

export function PageHeading({ title, subTitle }: PageHeadingProps) {
  return (
    <>

      <TypographyH1>{title}</TypographyH1>

      {(subTitle) && (
        <TypographyP>
          <TypographyMuted className='text-base'>{subTitle}</TypographyMuted>
        </TypographyP>
      )}

    </>
  )
}
