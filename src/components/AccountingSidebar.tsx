
import { ScrollArea } from "@/components/ui/scroll-area";
import ExpandedView from "@/components/sidebar/ExpandedView";
import CollapsedView from "@/components/sidebar/CollapsedView";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { ChevronRight, LogOut, UserCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "sonner";

// Importing menu items
import { dashboardItems } from "@/config/menuItems/dashboardItems";
import { accountingItems } from "@/config/menuItems/accountingItems";
import { invoiceItems } from "@/config/menuItems/invoiceItems";
import { inventoryItems } from "@/config/menuItems/inventoryItems";
import { purchaseItems } from "@/config/menuItems/purchaseItems";
import { customerItems } from "@/config/menuItems/customerItems";
import { vendorItems } from "@/config/menuItems/vendorItems";
import { expenseItems } from "@/config/menuItems/expenseItems";
import { hrItems } from "@/config/menuItems/hrItems";
import { reportItems } from "@/config/menuItems/reportItems";
import { definitionItems } from "@/config/menuItems/definitionItems";
import { aiItems } from "@/config/menuItems/aiItems";
import { aboutItems } from "@/config/menuItems/aboutItems";
import { settingsItems } from "@/config/menuItems/settingsItems";

const AccountingSidebar = ({ autoClose = false }: { autoClose?: boolean }) => {
  const { open, setOpen } = useSidebar();
  const isMobile = useIsMobile();
  const { user, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("تم تسجيل الخروج بنجاح");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const menuItems = [
    dashboardItems[0],
    accountingItems[0],
    invoiceItems[0],
    inventoryItems[0],
    purchaseItems[0],
    customerItems[0],
    vendorItems[0],
    expenseItems[0],
    hrItems[0],
    reportItems[0],
    aiItems[0],
    definitionItems[0],
    aboutItems[0],
    settingsItems[0],
  ];

  // تبديل القائمة الجانبية
  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* زر إخفاء/إظهار القائمة الجانبية */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleSidebar}
        className={`fixed top-1/2 transform -translate-y-1/2 z-50 bg-sidebar hover:bg-sidebar-accent h-14 w-6 p-0 rounded-r-md border-l-0 border border-sidebar-border transition-all ${
          open ? "right-64" : "right-[70px]"
        }`}
        aria-label={open ? "إخفاء القائمة الجانبية" : "إظهار القائمة الجانبية"}
      >
        <ChevronRight
          className={`h-4 w-4 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </Button>
      
      <aside 
        data-open={open}
        className="h-screen border-l data-[open=false]:w-[70px] data-[open=true]:w-64 transition-all duration-300 bg-sidebar print:hidden z-40 shrink-0 shadow-lg"
        dir="rtl"
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          {open ? <ExpandedView /> : <CollapsedView />}

          {/* Sidebar Menu */}
          <ScrollArea className="flex-1" dir="rtl">
            <div className="px-3 py-2">
              {open ? (
                <div className="space-y-1">
                  {user && profile && (
                    <div className="mb-6 p-4 bg-sidebar-primary/20 rounded-lg shadow-sm border border-sidebar-accent/20">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="h-12 w-12 rounded-full bg-sidebar-accent flex items-center justify-center shadow-md">
                          {profile.avatar_url ? (
                            <img
                              src={profile.avatar_url}
                              alt={profile.full_name}
                              className="h-12 w-12 rounded-full"
                            />
                          ) : (
                            <UserCircle className="h-7 w-7 text-sidebar-accent-foreground" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-base">{profile.full_name || "مستخدم"}</p>
                          <p className="text-sm text-sidebar-foreground/70">{profile.email}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full mt-3 bg-red-600/90 hover:bg-red-700 text-white hover:text-white font-medium transition-colors"
                        onClick={handleSignOut}
                      >
                        <LogOut className="h-5 w-5 ml-2" />
                        تسجيل الخروج
                      </Button>
                    </div>
                  )}

                  {/* مكونات القائمة */}
                  {menuItems.map((section, idx) => (
                    <ExpandedView.Section
                      key={idx}
                      section={section}
                      toggleSidebar={autoClose ? () => setOpen(false) : undefined}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-1">
                  {user && (
                    <div className="mb-6 flex justify-center">
                      <div 
                        className="h-12 w-12 rounded-full bg-sidebar-accent flex items-center justify-center cursor-pointer shadow-md"
                        title="تسجيل الخروج"
                        onClick={handleSignOut}
                      >
                        {profile?.avatar_url ? (
                          <img
                            src={profile.avatar_url}
                            alt={profile.full_name}
                            className="h-12 w-12 rounded-full"
                          />
                        ) : (
                          <UserCircle className="h-7 w-7 text-sidebar-accent-foreground" />
                        )}
                      </div>
                    </div>
                  )}

                  {/* مكونات القائمة للعرض المطوي */}
                  {menuItems.map((section, idx) => (
                    <CollapsedView.Section 
                      key={idx} 
                      section={section} 
                      toggleSidebar={autoClose ? () => setOpen(false) : undefined} 
                    />
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Sidebar Footer */}
          <div className="border-t border-sidebar-border p-3 flex items-center justify-between bg-sidebar-primary/20">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </div>
      </aside>
    </>
  );
};

export default AccountingSidebar;
