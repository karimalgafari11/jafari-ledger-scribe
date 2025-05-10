
import React, { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { Outlet } from "react-router-dom";

interface LayoutProps {
  children?: ReactNode;
  className?: string;
  showWatermark?: boolean;
}

export function Layout({
  children,
  className = "",
  showWatermark = true
}: LayoutProps) {
  const isMobile = useIsMobile();
  
  return (
    <div 
      className={`min-h-screen w-full flex-1 bg-gradient-to-b from-cyan-50 to-blue-50 
      ${isMobile ? '' : ''} ${className}`}
    >
      {showWatermark && !isMobile && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <img 
            src="/lovable-uploads/b46a496c-1b88-47b3-bb09-5f709425862f.png" 
            alt="الجعفري للمحاسبة" 
            className="w-96 h-96 opacity-[0.07] object-contain" 
          />
        </div>
      )}
      
      {/* العلامة المائية للجوال (أصغر حجماً) */}
      {showWatermark && isMobile && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <img 
            src="/lovable-uploads/b46a496c-1b88-47b3-bb09-5f709425862f.png" 
            alt="الجعفري للمحاسبة" 
            className="w-48 h-48 opacity-[0.07] object-contain" 
          />
        </div>
      )}
      
      <TooltipProvider>
        <div className={`flex flex-col w-full h-full min-h-screen ${isMobile ? 'h-[100dvh]' : ''}`}>
          <div className={`flex-1 flex flex-col w-full h-full overflow-auto`}>
            {children || <Outlet />}
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
}
