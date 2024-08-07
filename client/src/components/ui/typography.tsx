import Link from 'next/link'
import Image, { type ImageProps } from 'next/image'
import { type ReactNode, type HTMLAttributes } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

import { cn } from '@/lib/utils'

type TypographyProps = {
  id?: string;
	children: ReactNode;
}

type Styleable<T> = HTMLAttributes<T>;

export function TypographyH1({ children }: TypographyProps) {
  return (
    <h1 className='text-4xl font-extrabold tracking-tighter sm:tracking-tight lg:text-5xl'>
      {children}
    </h1>
  )
}

export function TypographyH2({ children }: TypographyProps) {
  return (
    <h2 className='mt-10 border-b pb-2 text-2xl sm:text-3xl font-semibold tracking-tightest sm:tracking-tight first:mt-0'>
      {children}
    </h2>
  )
}

export function TypographyH3({ children }: TypographyProps) {
  return (
    <h3 className='mt-8 text-xl sm:text-2xl font-semibold tracking-tightest sm:tracking-tight first:mt-0'>
      {children}
    </h3>
  )
}

export function TypographyH4({ children }: TypographyProps) {
  return (
    <h4 className='mt-6 text-lg sm:text-xl font-semibold tracking-tightest sm:tracking-tight first:mt-0'>
      {children}
    </h4>
  )
}

export function TypographyH5({ id, children }: TypographyProps) {
  return (
    <h5 id={id} className='mt-6 text-base sm:text-lg font-medium tracking-tight first:mt-0'>
      {children}
    </h5>
  )
}

export function TypographyP({ id, children }: TypographyProps) {
  return (
    <p id={id} className='leading-7 text-sm sm:text-base [&:not(:first-child)]:mt-6'>
      {children}
    </p>
  )
}

export function TypographyBlockquote({ children }: TypographyProps) {
  return (
    <blockquote className='mt-6 text-sm sm:text-base border-l-2 pl-6 italic first:mt-0'>
      {children}
    </blockquote>
  )
}

type TypographyListProps = TypographyProps & {
  ordered?: boolean;
}

export function TypographyList({ children, ordered = false }: TypographyListProps) {
  return (ordered)
    ? (
      <ol className='my-6 ml-6 list-decimal [&>li]:mt-2'>
        {children}
      </ol>
    )
    : (
      <ul className='my-6 ml-6 list-disc [&>li]:mt-2'>
        {children}
      </ul>
    )
}

export function TypographyListItem({ children }: TypographyProps) {
  return (
    <li className='text-sm sm:text-base'>{children}</li>
  )
}

export function TypographyInlineCode({ children }: TypographyProps) {
  return (
    <code className='relative rounded bg-muted group-even/muted:border group-even/muted:shadow px-[0.3rem] py-[0.2rem] font-mono text-xs sm:text-sm'>
      {children}
    </code>
  )
}

export function TypographyKeyInput({ children }: TypographyProps) {
  return (
    <kbd className='relative rounded bg-secondary/40 border border-b-2 shadow-sm px-[0.3rem] py-[0.2rem] font-mono text-xs sm:text-sm'>
      {children}
    </kbd>
  )
}

export function TypographyInlineMaths({ children }: TypographyProps) {
  return (
    <span className='p-0.5 text-xs sm:text-sm'>
      <InlineMath>{children}</InlineMath>
    </span>
  )
}

export function TypographyBlockMaths({ children }: TypographyProps) {
  return (
    <BlockMath>{children}</BlockMath>
  )
}

export function TypographyLead({ children }: TypographyProps) {
  return (
    <span className='text-lg sm:text-xl text-muted-foreground'>
      {children}
    </span>
  )
}

export function TypographyLarge({ children }: TypographyProps) {
  return (
    <span className='text-base sm:text-lg font-semibold'>
      {children}
    </span>
  )
}

export function TypographySmall({ children }: TypographyProps) {
  return (
    <small className='text-xs sm:text-sm font-medium leading-none'>
      {children}
    </small>
  )
}

export function TypographyMuted({ children, className }: TypographyProps & Styleable<HTMLSpanElement>) {
  return (
    <span className={cn(className, 'text-muted-foreground')}>
      {children}
    </span>
  )
}

export function TypographyItalics({ children }: TypographyProps) {
  return (
    <em className='italic'>
      {children}
    </em>
  )
}

type TypographyLinkProps = TypographyProps & {
  href: string;
  toFragmentId?: boolean;
}

export function TypographyLink({ children, href, toFragmentId = false }: TypographyLinkProps) {
  const className = 'font-medium text-primary-accent underline underline-offset-4'

  return (toFragmentId)
    ? (
      // ! Use a native anchor tag so that :target selectors work correctly
      // ! See https://github.com/vercel/next.js/issues/51346
      <a href={'#' + href} className={className}>
        {children}
      </a>
    )
    : (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
}

type TypographyImageProps = {
  image: ImageProps['src'] | { light: ImageProps['src']; dark: ImageProps['src']; };
  noBlur?: boolean;
  caption: string;
  captionElement?: ReactNode;
  className?: string;
  captionClassName?: string;
}

export function TypographyImage({ image, noBlur = false, caption, captionElement, className, captionClassName }: TypographyImageProps) {
  const imageElement = ((image instanceof Object) && ('light' in image))
    ? (
      <>
        <Image
          src={image.light}
          alt={caption}
          placeholder={(noBlur) ? 'empty' : 'blur'}
          className={cn('mt-6 block dark:hidden', className)}
          quality={85}
        />
        <Image
          src={image.dark}
          alt={caption}
          placeholder={(noBlur) ? 'empty' : 'blur'}
          className={cn('mt-6 hidden dark:block', className)}
          quality={85}
        />
      </>
    )
    : (
      <Image
        src={image}
        alt={caption}
        placeholder='blur'
        className={cn('mt-6', className)}
        quality={85}
      />
    )

  return (
    <>
      {imageElement}
      <TypographyImageCaption
        caption={caption}
        captionElement={captionElement}
        className={captionClassName}
      />
    </>
  )
}

type TypographyImageCaptionProps = Pick<TypographyImageProps, 'caption' | 'captionElement'> & {
  className?: string;
}

function TypographyImageCaption({ caption, captionElement, className }: TypographyImageCaptionProps) {
  return (
    <div className={cn('py-4 pb-0 text-center leading-none', className)}>
      <TypographySmall>
        <TypographyMuted>
          {captionElement ?? caption}
        </TypographyMuted>
      </TypographySmall>
    </div>
  )
}


type TypographyVideoProps = {
  video: string | { light: string; dark: string; };
  loop?: boolean;
  caption: string;
  captionElement?: ReactNode;
  className?: string;
  captionClassName?: string;
}

export function TypographyVideo({
  video,
  loop = false,
  caption,
  captionElement,
  className,
  captionClassName,
}: TypographyVideoProps) {
  const videoElement = (video instanceof Object)
    ? (
      <>

        <video
          controls
          loop={loop}
          preload='auto'
          src={video.light}
          className={cn('mt-6 w-full block dark:hidden', className)}
        >
          <source src={video.light} type='video/mp4' />
        </video>

        <video
          controls
          loop={loop}
          preload='auto'
          src={video.dark}
          className={cn('mt-6 w-full hidden dark:block', className)}
        >
          <source src={video.dark} type='video/mp4' />
        </video>

      </>
    )
    : (
      <video controls loop={loop} preload='auto' className={cn('mt-6 w-full', className)}>
        <source src={video} type='video/mp4' />
      </video>
    )

  return (
    <>
      {videoElement}
      <TypographyImageCaption
        caption={caption}
        captionElement={captionElement}
        className={captionClassName}
      />
    </>
  )
}

export function TypographyTable({ children }: TypographyProps) {
  return (
    <div className='my-6 w-full overflow-y-auto'>
      <table className='w-full table-auto'>
        {children}
      </table>
    </div>
  )
}

export function TypographyTableHead({ children }: TypographyProps) {
  return (
    <thead>
      {children}
    </thead>
  )
}

export function TypographyTableBody({ children }: TypographyProps) {
  return (
    <tbody>
      {children}
    </tbody>
  )
}

export function TypographyTableRow({ children }: TypographyProps) {
  return (
    <tr className='m-0 border-t p-0 even:bg-muted dark:even:bg-muted/20 group/muted'>
      {children}
    </tr>
  )
}

export function TypographyTableHeaderCell({ children }: TypographyProps) {
  return (
    <th className='border px-4 py-2 text-sm sm:text-base text-left font-bold tracking-tight [&[align=center]]:text-center [&[align=right]]:text-right'>
      {children}
    </th>
  )
}

export function TypographyTableDataCell({ children }: TypographyProps) {
  return (
    <td className='border px-4 py-2 text-sm sm:text-base text-left [&[align=center]]:text-center [&[align=right]]:text-right'>
      {children}
    </td>
  )
}
