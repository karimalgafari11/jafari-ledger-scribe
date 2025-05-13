
import React, { useEffect, memo } from "react";
import { Outlet } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarProvider } from "@/components/ui/sidebar";
import AccountingSidebar from "@/components/AccountingSidebar";
import { Layout } from "@/components/Layout";

const Index = () => {
  const isMobile = useIsMobile();

  // أضف Effect لضمان استقرار الصفحة بعد التحميل
  useEffect(() => {
    // إضافة محدد الفئة للجسم للإشارة إلى أن التطبيق محمّل
    document.body.classList.add('app-loaded');
    
    return () => {
      document.body.classList.remove('app-loaded');
    };
  }, []);

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="app-container h-screen w-full flex">
        <AccountingSidebar autoClose={isMobile} />
        <div className="app-content flex-1 h-screen overflow-auto">
          <Layout>
            <Outlet />
          </Layout>
        </div>
      </div>
    </SidebarProvider>
  );
};

// استخدام memo لمنع إعادة التصيير غير الضرورية
export default memo(Index);
