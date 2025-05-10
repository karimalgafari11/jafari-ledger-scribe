
import { Outlet } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarProvider } from "@/components/ui/sidebar";
import AccountingSidebar from "@/components/AccountingSidebar";

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex h-screen w-full overflow-hidden bg-gradient-to-b from-cyan-50 to-blue-100">
        <AccountingSidebar autoClose={isMobile} />
        <div className="flex-1 overflow-auto w-full">
          <div className="min-h-screen w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
