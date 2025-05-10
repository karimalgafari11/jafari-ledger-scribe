
import { Outlet } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarProvider } from "@/components/ui/sidebar";
import AccountingSidebar from "@/components/AccountingSidebar";

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="app-container">
        <AccountingSidebar autoClose={isMobile} />
        <div className="app-content">
          <div className="min-h-screen w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
