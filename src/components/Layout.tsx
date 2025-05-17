
import React, { ReactNode, useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { Outlet } from "react-router-dom";
import { ErrorTracker } from "@/utils/errorTracker";

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
  
  // مراقبة أداء المكون
  useEffect(() => {
    const startTime = performance.now();
    
    // تسجيل وقت التحميل الأولي للمكون
    return () => {
      const renderTime = performance.now() - startTime;
      if (renderTime > 500) { // إذا استغرق المكون أكثر من 500 مللي ثانية للتحميل
        ErrorTracker.info('مكون Layout استغرق وقتاً طويلاً للتحميل', {
          component: 'Layout',
          additionalInfo: { renderTime }
        });
      }
    };
  }, []);
  
  return (
    <div 
      className={`page-container min-h-screen w-full flex flex-col rtl ${className} transition-opacity duration-300`}
      dir="rtl"
      lang="ar"
    >
      {showWatermark && !isMobile && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
          <img 
            src="/lovable-uploads/b46a496c-1b88-47b3-bb09-5f709425862f.png" 
            alt="الجعفري للمحاسبة" 
            className="w-96 h-96 opacity-[0.07] object-contain" 
            onError={(e) => {
              // تعامل مع أخطاء تحميل الصور
              e.currentTarget.style.display = 'none';
              ErrorTracker.warning('فشل في تحميل صورة الخلفية', { component: 'Layout' });
            }}
          />
        </div>
      )}
      
      {/* Mobile watermark (smaller size) */}
      {showWatermark && isMobile && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
          <img 
            src="/lovable-uploads/b46a496c-1b88-47b3-bb09-5f709425862f.png" 
            alt="الجعفري للمحاسبة" 
            className="w-48 h-48 opacity-[0.07] object-contain" 
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              ErrorTracker.warning('فشل في تحميل صورة الخلفية المصغرة', { component: 'Layout' });
            }}
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
