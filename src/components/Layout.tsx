
import React, { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: ReactNode;
  className?: string;
  showWatermark?: boolean;
}

export function Layout({ children, className = "", showWatermark = true }: LayoutProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className={`min-h-screen w-full bg-gray-50 ${className} dir-rtl relative overflow-hidden`}>
      {showWatermark && !isMobile && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <img 
            src="/lovable-uploads/b46a496c-1b88-47b3-bb09-5f709425862f.png" 
            alt="الجعفري للمحاسبة" 
            className="w-96 h-96 opacity-[0.07]" 
          />
        </div>
      )}
      
      {/* العلامة المائية للجوال (أصغر حجماً) */}
      {showWatermark && isMobile && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <img 
            src="/lovable-uploads/b46a496c-1b88-47b3-bb09-5f709425862f.png" 
            alt="الجعفري للمحاسبة" 
            className="w-48 h-48 opacity-[0.07]" 
          />
        </div>
      )}
      
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </div>
  );
}
