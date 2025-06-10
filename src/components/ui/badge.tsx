
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-healthcare-blue text-pure-white hover:bg-healthcare-blue/90",
        secondary: "border-transparent bg-neutral-100 text-medical-charcoal hover:bg-neutral-200",
        destructive: "border-transparent bg-error text-pure-white hover:bg-error-hover",
        outline: "text-medical-charcoal border-neutral-300",
        success: "border-transparent bg-success text-pure-white hover:bg-success-hover",
        warning: "border-transparent bg-warning text-medical-charcoal hover:bg-warning-hover",
        info: "border-transparent bg-info text-pure-white hover:bg-info-hover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
