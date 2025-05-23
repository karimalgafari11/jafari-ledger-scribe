
import * as React from "react"

import { cn } from "@/lib/utils"

interface TableProps extends React.HTMLAttributes<HTMLTableElement> { 
  gridLines?: boolean;
  striped?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
  dense?: boolean;
  stickyHeader?: boolean;
}

const Table = React.forwardRef<
  HTMLTableElement,
  TableProps
>(({ className, gridLines, striped, bordered, hoverable, dense, stickyHeader, ...props }, ref) => (
  <div className={cn("relative w-full overflow-auto", stickyHeader && "overflow-y-auto")}>
    <table
      ref={ref}
      className={cn(
        "w-full caption-bottom text-sm",
        gridLines && "border-collapse",
        bordered && "border border-border [&_th]:border [&_td]:border [&_th]:border-gray-200 [&_td]:border-gray-100",
        dense && "text-xs [&_th]:py-1 [&_td]:py-1",
        striped && "[&_tbody_tr:nth-child(even)]:bg-muted/50",
        hoverable && "[&_tbody_tr:hover]:bg-muted/60",
        stickyHeader && "[&_thead_tr_th]:sticky [&_thead_tr_th]:top-0 [&_thead_tr_th]:bg-background [&_thead_tr_th]:z-10",
        className
      )}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("bg-primary font-medium text-primary-foreground", className)}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  isSelected?: boolean;
}

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  TableRowProps
>(({ className, isSelected, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors data-[state=selected]:bg-muted",
      isSelected && "bg-muted/80",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-right align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
