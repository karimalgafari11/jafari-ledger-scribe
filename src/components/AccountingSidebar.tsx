
import { ScrollArea } from "@/components/ui/scroll-area";
import ExpandedView from "@/components/sidebar/ExpandedView";
import CollapsedView from "@/components/sidebar/CollapsedView";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { LogOut, UserCircle } from "lucide-react";
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
  const isDesktop = useIsMobile();
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

  return (
    <>
      <div
        data-open={open}
        className="border-l group fixed inset-0 z-30 h-full data-[open=false]:w-[70px] data-[open=true]:w-60 transition-all duration-300 bg-sidebar print:hidden"
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
                    <div className="mb-6 p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
                          {profile.avatar_url ? (
                            <img
                              src={profile.avatar_url}
                              alt={profile.full_name}
                              className="h-10 w-10 rounded-full"
                            />
                          ) : (
                            <UserCircle className="h-6 w-6 text-teal-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{profile.full_name || "مستخدم"}</p>
                          <p className="text-xs text-muted-foreground">{profile.email}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full mt-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={handleSignOut}
                      >
                        <LogOut className="h-4 w-4 ml-2" />
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
                    <div className="mb-4 flex justify-center">
                      <div 
                        className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center cursor-pointer"
                        title="تسجيل الخروج"
                        onClick={handleSignOut}
                      >
                        {profile?.avatar_url ? (
                          <img
                            src={profile.avatar_url}
                            alt={profile.full_name}
                            className="h-10 w-10 rounded-full"
                          />
                        ) : (
                          <UserCircle className="h-6 w-6 text-teal-600" />
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
          <div className="border-t p-3 flex items-center justify-between">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountingSidebar;
