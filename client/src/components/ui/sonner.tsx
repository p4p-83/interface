'use client'

import { useTheme } from 'next-themes'
import { ExternalToast, Toaster as Sonner } from 'sonner'

import { ubuntu } from '@/styles/fonts'
import { cn } from '@/lib/utils'

type ToasterProps = React.ComponentProps<typeof Sonner>

enum ToastIds {
  VIDEO_STATUS,
  VIDEO_ERROR,
  SOCKET_STATUS,
  SOCKET_ERROR,
  MESSAGE,
}

const DISMISS_BUTTON: ExternalToast['cancel'] = {
  label: 'Dismiss',
  onClick: () => null,
} as const

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            cn(
              ubuntu.className,
              'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:!shadow-lg',
            ),
          description: 'group-[.toast]:!text-muted-foreground',
          actionButton:
            'group-[.toast]:!bg-primary group-[.toast]:!text-primary-foreground',
          cancelButton:
            'group-[.toast]:!bg-muted group-[.toast]:!text-muted-foreground',
        },
      }}
      {...props}
    />
  )
}

export { Toaster, ToastIds, DISMISS_BUTTON }
