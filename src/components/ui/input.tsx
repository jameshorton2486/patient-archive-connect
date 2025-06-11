
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
          "form-input",
          error && "border-destructive focus:border-destructive focus:ring-destructive/20",
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
