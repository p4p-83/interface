import Link from 'next/link'
import { type ReactNode, type HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type TypographyProps = {
	children: ReactNode;
}

type Styleable<T> = HTMLAttributes<T>;

export function TypographyH1({ children }: TypographyProps) {
  return (
    <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
      {children}
    </h1>
  )
}

export function TypographyH2({ children }: TypographyProps) {
  return (
    <h2 className='mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
      {children}
    </h2>
  )
}

export function TypographyH3({ children }: TypographyProps) {
  return (
    <h3 className='mt-8 scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0'>
      {children}
    </h3>
  )
}

export function TypographyH4({ children }: TypographyProps) {
  return (
    <h4 className='mt-6 scroll-m-20 text-xl font-semibold tracking-tight first:mt-0'>
      {children}
    </h4>
  )
}

export function TypographyP({ children }: TypographyProps) {
  return (
    <p className='leading-7 [&:not(:first-child)]:mt-6'>
      {children}
    </p>
  )
}

export function TypographyBlockquote({ children }: TypographyProps) {
  return (
    <blockquote className='mt-6 border-l-2 pl-6 italic first:mt-0'>
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
    <li>{children}</li>
  )
}

export function TypographyInlineCode({ children }: TypographyProps) {
  return (
    <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm'>
      {children}
    </code>
  )
}

export function TypographyLead({ children }: TypographyProps) {
  return (
    <span className='text-xl text-muted-foreground'>
      {children}
    </span>
  )
}

export function TypographyLarge({ children }: TypographyProps) {
  return (
    <span className='text-lg font-semibold'>
      {children}
    </span>
  )
}

export function TypographySmall({ children }: TypographyProps) {
  return (
    <small className='text-sm font-medium leading-none'>
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
}

export function TypographyLink({ children, href }: TypographyLinkProps) {
  return (
    <Link href={href} className='font-medium text-primary underline underline-offset-4' >
      {children}
    </Link>
  )
}
