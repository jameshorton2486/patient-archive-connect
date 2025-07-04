
import * as React from "react"
import { cn } from "@/lib/utils"

const EnhancedTable = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & { stickyHeader?: boolean }
>(({ className, stickyHeader = false, ...props }, ref) => (
  <div className="relative w-full overflow-auto rounded-lg border border-border">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
EnhancedTable.displayName = "EnhancedTable"

const EnhancedTableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement> & { sticky?: boolean }
>(({ className, sticky = false, ...props }, ref) => (
  <thead 
    ref={ref} 
    className={cn(
      "[&_tr]:border-b border-border bg-muted",
      sticky && "sticky top-0 z-10",
      className
    )} 
    {...props} 
  />
))
EnhancedTableHeader.displayName = "EnhancedTableHeader"

const EnhancedTableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
EnhancedTableBody.displayName = "EnhancedTableBody"

const EnhancedTableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b border-border transition-colors hover:bg-muted data-[state=selected]:bg-accent/10",
      className
    )}
    {...props}
  />
))
EnhancedTableRow.displayName = "EnhancedTableRow"

const EnhancedTableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-semibold text-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
))
EnhancedTableHead.displayName = "EnhancedTableHead"

const EnhancedTableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle text-muted-foreground [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
))
EnhancedTableCell.displayName = "EnhancedTableCell"

export {
  EnhancedTable,
  EnhancedTableHeader,
  EnhancedTableBody,
  EnhancedTableRow,
  EnhancedTableHead,
  EnhancedTableCell,
}
