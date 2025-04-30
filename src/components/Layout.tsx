
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export function Layout({ children, className = "" }: LayoutProps) {
  return (
    <div className={`min-h-screen bg-gray-50 ${className} dir-rtl`}>
      {children}
    </div>
  );
}
