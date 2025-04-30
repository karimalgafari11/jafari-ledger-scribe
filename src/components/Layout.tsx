
import React, { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export function Layout({ children, className = "" }: LayoutProps) {
  return (
    <div className={`min-h-screen bg-gray-50 ${className} dir-rtl`}>
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </div>
  );
}
