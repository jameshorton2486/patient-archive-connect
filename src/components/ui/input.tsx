
import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "w-full px-3 py-2 bg-primary border border-primary-200 rounded-md text-sm text-foreground",
          "focus:ring-2 focus:ring-accent-medical/40 focus:border-accent-medical",
          "transition-all duration-200 placeholder-primary-400",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-error-500 focus:border-error-500 focus:ring-error-500/40",
          className
        )}
        ref={ref}
        aria-invalid={error ? "true" : "false"}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
