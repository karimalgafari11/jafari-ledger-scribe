
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarProvider } from "@/components/ui/sidebar";
import AccountingSidebar from "@/components/AccountingSidebar";

const Index = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex h-screen w-full overflow-hidden bg-cyan-50">
        <AccountingSidebar autoClose={true} />
        <div className="flex-1 overflow-auto w-full">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
