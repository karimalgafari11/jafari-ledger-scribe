
import * as React from "react"
import { cn } from "@/lib/utils"

interface PaginationProps {
  className?: string;
  children: React.ReactNode;
}

const Pagination = ({
  className,
  children,
  ...props
}: PaginationProps) => {
  return (
    <nav
      className={`flex justify-center items-center ${className}`}
      {...props}
    >
      {children}
    </nav>
  );
};

const PaginationContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) => (
  <ul
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
)

const PaginationItem = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLLIElement>) => (
  <li className={cn("", className)} {...props} />
)

const PaginationLink = ({
  className,
  isActive,
  ...props
}: React.ComponentProps<"a"> & {
  isActive?: boolean
}) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      "flex h-9 w-9 items-center justify-center rounded-md border text-sm transition-colors hover:bg-accent",
      isActive
        ? "border-primary bg-primary text-primary-foreground"
        : "border-input bg-background hover:bg-accent hover:text-accent-foreground",
      className
    )}
    {...props}
  />
)

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<"a">) => (
  <a
    aria-label="Go to previous page"
    className={cn(
      "flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
      className
    )}
    {...props}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 ms-1"
    >
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
    <span className="sr-only">Previous</span>
  </a>
)

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<"a">) => (
  <a
    aria-label="Go to next page"
    className={cn(
      "flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
      className
    )}
    {...props}
  >
    <span className="sr-only">Next</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 me-1"
    >
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  </a>
)

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
