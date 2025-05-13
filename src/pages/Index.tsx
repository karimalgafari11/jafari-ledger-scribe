
import React, { useEffect, memo, useState } from "react";
import { Outlet } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarProvider } from "@/components/ui/sidebar";
import AccountingSidebar from "@/components/AccountingSidebar";
import { Layout } from "@/components/Layout";

const Index = () => {
  const isMobile = useIsMobile();
  const [isLoaded, setIsLoaded] = useState(false);

  // Add Effect to ensure the page is stable after loading
  useEffect(() => {
    // Set a short timeout to ensure all components have rendered
    const timer = setTimeout(() => {
      setIsLoaded(true);
      document.body.classList.add('app-loaded');
    }, 100);
    
    return () => {
      clearTimeout(timer);
      document.body.classList.remove('app-loaded');
    };
  }, []);

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className={`app-container h-screen w-full flex ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
        <AccountingSidebar />
        <div className="app-content flex-1 h-screen overflow-auto">
          <Layout>
            <Outlet />
          </Layout>
        </div>
      </div>
    </SidebarProvider>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(Index);
