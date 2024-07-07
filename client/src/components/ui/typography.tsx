import Link from 'next/link'
import Image, { type ImageProps } from 'next/image'
import { type ReactNode, type HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type TypographyProps = {
  id?: string;
	children: ReactNode;
}

type Styleable<T> = HTMLAttributes<T>;

export function TypographyH1({ children }: TypographyProps) {
  return (
    <h1 className='scroll-m-20 text-4xl font-extrabold sm:tracking-tight lg:text-5xl'>
      {children}
    </h1>
  )
}

export function TypographyH2({ children }: TypographyProps) {
  return (
    <h2 className='mt-10 scroll-m-20 border-b pb-2 text-2xl sm:text-3xl font-semibold tracking-tight first:mt-0'>
      {children}
    </h2>
  )
}

export function TypographyH3({ children }: TypographyProps) {
  return (
    <h3 className='mt-8 scroll-m-20 text-xl sm:text-2xl font-semibold tracking-tight first:mt-0'>
      {children}
    </h3>
  )
}

export function TypographyH4({ children }: TypographyProps) {
  return (
    <h4 className='mt-6 scroll-m-20 text-lg sm:text-xl font-semibold tracking-tight first:mt-0'>
      {children}
    </h4>
  )
}

export function TypographyH5({ id, children }: TypographyProps) {
  return (
    <h5 id={id} className='mt-6 scroll-m-20 text-base sm:text-lg font-medium tracking-tight first:mt-0'>
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
    <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs sm:text-sm'>
      {children}
    </code>
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

export function TypographyImage({ src, alt }: ImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      placeholder='blur'
      className='mt-6'
      quality={85}
    />
  )
}

export function TypographyTable({ children }: TypographyProps) {
  return (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full">
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
    <tr className="m-0 border-t p-0 even:bg-muted">
      {children}
    </tr>
  )
}

export function TypographyTableHeaderCell({ children }: TypographyProps) {
  return (
    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
      {children}
    </th>
  )
}

export function TypographyTableDataCell({ children }: TypographyProps) {
  return (
    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
      {children}
    </td>
  )
}
