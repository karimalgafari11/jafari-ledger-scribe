
import React, { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { Outlet } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

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
  const { language } = useTranslation();
  const isRtl = language === 'ar';
  
  return (
    <div 
      className={`page-container min-h-screen w-full flex flex-col ${isRtl ? 'rtl' : 'ltr'} ${className} transition-opacity duration-300`}
      dir={isRtl ? 'rtl' : 'ltr'}
      lang={language}
    >
      {showWatermark && !isMobile && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
          <img 
            src="/lovable-uploads/b46a496c-1b88-47b3-bb09-5f709425862f.png" 
            alt={isRtl ? "الجعفري للمحاسبة" : "Al-Jaafari Accounting"} 
            className="w-96 h-96 opacity-[0.07] object-contain" 
          />
        </div>
      )}
      
      {/* Mobile watermark (smaller size) */}
      {showWatermark && isMobile && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
          <img 
            src="/lovable-uploads/b46a496c-1b88-47b3-bb09-5f709425862f.png" 
            alt={isRtl ? "الجعفري للمحاسبة" : "Al-Jaafari Accounting"} 
            className="w-48 h-48 opacity-[0.07] object-contain" 
          />
        </div>
      )}
      
      <TooltipProvider>
        <div className="w-full h-full flex flex-col flex-1">
          <div className="flex-1 flex flex-col w-full h-full overflow-auto relative z-10 animate-in fade-in-50 duration-300">
            {children || <Outlet />}
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
}
