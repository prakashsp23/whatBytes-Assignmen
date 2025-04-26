"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

export type ProgressColor = 'blue' | 'orange' | 'red' | 'green' | 'primary' | 'secondary'

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value: number
  color?: ProgressColor
}

const colorClassMap: Record<ProgressColor, string> = {
  blue: "bg-blue-500",
  orange: "bg-orange-500",
  red: "bg-red-500",
  green: "bg-green-500",
  primary: "bg-primary",
  secondary: "bg-secondary",
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ value, color = "primary", className, ...props }, ref) => {
  const indicatorClass = colorClassMap[color] || colorClassMap.primary

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-secondary", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn("h-full w-full flex-1 transition-all", indicatorClass)}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
})

Progress.displayName = "Progress"

export { Progress }
