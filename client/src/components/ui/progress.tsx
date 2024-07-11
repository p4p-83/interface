'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'

import { cn } from '@/lib/utils'

export type ProgressState<WithGrowth extends boolean> = {
  current: number;
  growthStop: WithGrowth extends true
    ? number
    : never;
}

type GrowthConfiguration = {
  growthStop: number;
  setProgress: React.Dispatch<React.SetStateAction<ProgressState<true>>>;
  /** Set to `0` to stop growing */
  growthIntervalMs: number;
  getIncrement: (incrementCount: number) => number;
}

type ProgressProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & (
  ({ grow: true; } & GrowthConfiguration)
  | ({ grow: false; } & Partial<GrowthConfiguration>)
)

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
  >(({ className, value, grow, growthStop, setProgress, getIncrement, growthIntervalMs, ...props }, ref) => {

    // Growing progress bar
    const incrementCountRef = React.useRef(1)
    React.useEffect(() => {

      /*
       ! This is all necessary because:
       ! 1. TypeScript cannot statically narrow based off the `grow` argument as they are passed in as mutable parameters
       ! 2. The hooks must run at the top-level and unconditionally
       ! 3. The dependency array should not contain an object reference that will change every render
       */
      if ((growthStop === undefined) || (setProgress === undefined) || (getIncrement === undefined) || (growthIntervalMs === undefined)) return
      if (!growthIntervalMs) return

      incrementCountRef.current = 1

      const intervalId = window.setInterval(() => {
        setProgress((previousProgress) => {
          const incremented = (previousProgress.current + getIncrement(incrementCountRef.current++))

          if (incremented >= growthStop) {
            clearInterval(intervalId)
            return previousProgress
          }

          return {
            current: incremented,
            growthStop: growthStop,
          }
        })
      }, growthIntervalMs)

      return () => {
        clearInterval(intervalId)
      }

    }, [grow, setProgress, growthIntervalMs, getIncrement, growthStop])

    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          'relative h-2 w-full overflow-hidden rounded-full bg-primary/20',
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className="h-full w-full flex-1 bg-primary transition-all"
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </ProgressPrimitive.Root>
    )
  })
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
