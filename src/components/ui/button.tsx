
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-accent-medical text-white hover:bg-accent-medical/90 shadow-sm hover:shadow-md focus:ring-accent-medical/20 px-6 py-3",
        destructive: "bg-error-500 text-white hover:bg-error-600 shadow-sm hover:shadow-md focus:ring-error-500/20 px-6 py-3",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground px-6 py-3",
        secondary: "bg-transparent hover:bg-primary-100 text-primary-600 hover:text-primary-700 border border-primary-200 hover:border-primary-300 px-6 py-3",
        ghost: "bg-transparent hover:bg-primary-50 text-primary-500 hover:text-primary-600 px-4 py-2",
        link: "text-primary underline-offset-4 hover:underline px-4 py-2",
      },
      size: {
        default: "h-10 px-6 py-3",
        sm: "h-9 rounded-md px-3 py-2",
        lg: "h-11 rounded-md px-8 py-4",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
