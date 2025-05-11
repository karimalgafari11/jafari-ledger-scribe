
import * as React from "react"

interface PaginationProps {
  className?: string;
  children: React.ReactNode;
}

const Pagination: React.FC<PaginationProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <nav
      className={`flex justify-center items-center ${className}`}
      {...props}
    >
      {children}
    </nav>
  );
};

export { Pagination };
