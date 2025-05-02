
import * as React from "react"

import { cn } from "@/lib/utils"

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  gridLines?: "none" | "horizontal" | "vertical" | "both";
  stickyHeader?: boolean;
  dense?: boolean;
  bordered?: boolean;
  striped?: boolean;
  hoverable?: boolean;
}

const Table = React.forwardRef<
  HTMLTableElement,
  TableProps
>(({ className, gridLines = "both", stickyHeader = false, dense = false, bordered = false, striped = false, hoverable = true, ...props }, ref) => {
  const gridClasses = {
    none: "",
    horizontal: "[&_tr]:border-b-2 [&_tr]:border-black [&_tr:last-child]:border-0",
    vertical: "[&_th]:border-r-2 [&_th]:border-black [&_td]:border-r-2 [&_td]:border-black [&_th:last-child]:border-0 [&_td:last-child]:border-0",
    both: "[&_tr]:border-b-2 [&_tr]:border-black [&_tr:last-child]:border-0 [&_th]:border-r-2 [&_th]:border-black [&_td]:border-r-2 [&_td]:border-black [&_th:last-child]:border-0 [&_td:last-child]:border-0"
  };

  const stickyClasses = stickyHeader ? "sticky top-0 z-10 bg-white shadow-sm" : "";
  const denseClasses = dense ? "py-2" : "py-4";
  const borderedClasses = bordered ? "border-2 border-black" : "";
  const stripedClasses = striped ? "[&_tr:nth-child(even)]:bg-gray-50" : "";
  const hoverClasses = hoverable ? "[&_tr:hover]:bg-gray-100" : "";

  return (
    <div className={cn("relative w-full overflow-auto", borderedClasses)}>
      <table
        ref={ref}
        className={cn(
          "w-full caption-bottom text-sm border-collapse",
          gridClasses[gridLines],
          stripedClasses,
          hoverClasses,
          className
        )}
        {...props}
      />
    </div>
  )
})
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("bg-gray-50 border-b-2 border-black", className)} {...props} />
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
    className={cn(
      "border-t-2 border-black bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "transition-colors data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sorted?: boolean;
  sortDirection?: 'asc' | 'desc' | null;
}

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  TableHeadProps
>(({ className, sorted, sortDirection, ...props }, ref) => {
  const sortClass = sorted 
    ? sortDirection === 'asc' 
      ? 'after:content-["↑"] after:ml-1 after:text-xs' 
      : 'after:content-["↓"] after:ml-1 after:text-xs'
    : '';

  return (
    <th
      ref={ref}
      className={cn(
        "h-12 px-4 text-center align-middle font-medium text-muted-foreground border-separate [&:has([role=checkbox])]:pr-0",
        sortClass,
        className
      )}
      {...props}
    />
  );
})
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
