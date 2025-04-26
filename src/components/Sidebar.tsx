
import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Settings, 
  Database, 
  ShoppingCart, 
  Calendar, 
  PieChart, 
  FileText, 
  Users,
  Menu,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  hasChildren?: boolean;
  isExpanded?: boolean;
}

const NavItem = ({ icon, label, active, onClick, hasChildren, isExpanded }: NavItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 py-2 px-4 w-full rounded-md transition-all duration-200 ease-in-out group",
      active 
        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium translate-x-1.5 shadow-sm" 
        : "text-sidebar-foreground hover:bg-sidebar-primary/30"
    )}
  >
    <span className="text-xl">{icon}</span>
    <span className="flex-grow">{label}</span>
    {hasChildren && (
      <ChevronDown 
        size={16} 
        className={cn(
          "transition-transform duration-200 ease-in-out",
          isExpanded ? "transform rotate-180" : ""
        )}
      />
    )}
  </button>
);

export function Sidebar({ activePage, onChangePage }: { activePage: string, onChangePage: (page: string) => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div 
      className={cn(
        "bg-sidebar h-screen transition-all duration-300 flex flex-col sticky top-0",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex justify-between items-center border-b border-sidebar-border">
        {!collapsed && (
          <div className="text-sidebar-foreground font-bold text-xl">الجعفري</div>
        )}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setCollapsed(!collapsed)} 
          className="text-sidebar-foreground hover:bg-sidebar-primary"
        >
          <Menu size={24} />
        </Button>
      </div>

      <div className="flex flex-col gap-1 p-2 overflow-y-auto flex-grow">
        {!collapsed ? (
          <>
            <div className="mb-2">
              <p className="px-4 py-1 text-xs text-sidebar-foreground/70">لوحة التحكم</p>
              <NavItem 
                icon={<Home size={20} />} 
                label="لوحة التحكم"
                active={activePage === "dashboard"}
                onClick={() => onChangePage("dashboard")}
              />
            </div>
            
            <div className="mb-2">
              <p className="px-4 py-1 text-xs text-sidebar-foreground/70">المالية</p>
              <Collapsible
                open={expandedSections["reports"]}
                onOpenChange={() => toggleSection("reports")}
              >
                <CollapsibleTrigger className="w-full">
                  <NavItem 
                    icon={<FileText size={20} />} 
                    label="التقارير" 
                    active={activePage === "reports"}
                    hasChildren={true}
                    isExpanded={expandedSections["reports"]}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-6 animate-accordion-down">
                  <NavItem 
                    icon={<PieChart size={16} />} 
                    label="تقارير المبيعات" 
                    active={false}
                    onClick={() => onChangePage("reports")}
                  />
                  <NavItem 
                    icon={<PieChart size={16} />} 
                    label="الأرباح والخسائر" 
                    active={false}
                    onClick={() => onChangePage("reports")}
                  />
                </CollapsibleContent>
              </Collapsible>
              
              <NavItem 
                icon={<Database size={20} />} 
                label="المخزون" 
                active={activePage === "inventory"}
                onClick={() => onChangePage("inventory")}
              />
            </div>
            
            <div className="mb-2">
              <p className="px-4 py-1 text-xs text-sidebar-foreground/70">العمليات</p>
              <Collapsible
                open={expandedSections["pos"]}
                onOpenChange={() => toggleSection("pos")}
              >
                <CollapsibleTrigger className="w-full">
                  <NavItem 
                    icon={<ShoppingCart size={20} />} 
                    label="نقاط البيع" 
                    active={activePage === "pos"}
                    hasChildren={true}
                    isExpanded={expandedSections["pos"]}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-6 animate-accordion-down">
                  <NavItem 
                    icon={<ShoppingCart size={16} />} 
                    label="شاشة البيع" 
                    active={false}
                    onClick={() => onChangePage("pos")}
                  />
                </CollapsibleContent>
              </Collapsible>
              
              <NavItem 
                icon={<Calendar size={20} />} 
                label="المصروفات" 
                active={activePage === "expenses"}
                onClick={() => onChangePage("expenses")}
              />
              <NavItem 
                icon={<PieChart size={20} />} 
                label="عروض ترويجية" 
                active={activePage === "promotions"}
                onClick={() => onChangePage("promotions")}
              />
            </div>
            
            <div className="mb-2">
              <p className="px-4 py-1 text-xs text-sidebar-foreground/70">الإدارة</p>
              <NavItem 
                icon={<Users size={20} />} 
                label="المستخدمين" 
                active={activePage === "users"}
                onClick={() => onChangePage("users")}
              />
              <NavItem 
                icon={<Settings size={20} />} 
                label="الإعدادات" 
                active={activePage === "settings"}
                onClick={() => onChangePage("settings")}
              />
            </div>
          </>
        ) : (
          // Collapsed view
          <>
            <div className="flex flex-col items-center gap-4 py-4">
              <Button 
                size="icon" 
                variant="ghost" 
                className={cn(
                  "rounded-lg",
                  activePage === "dashboard" && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
                onClick={() => onChangePage("dashboard")}
              >
                <Home size={20} />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className={cn(
                  "rounded-lg",
                  activePage === "reports" && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
                onClick={() => onChangePage("reports")}
              >
                <FileText size={20} />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className={cn(
                  "rounded-lg",
                  activePage === "inventory" && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
                onClick={() => onChangePage("inventory")}
              >
                <Database size={20} />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className={cn(
                  "rounded-lg",
                  activePage === "pos" && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
                onClick={() => onChangePage("pos")}
              >
                <ShoppingCart size={20} />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className={cn(
                  "rounded-lg",
                  activePage === "users" && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
                onClick={() => onChangePage("users")}
              >
                <Users size={20} />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className={cn(
                  "rounded-lg",
                  activePage === "settings" && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
                onClick={() => onChangePage("settings")}
              >
                <Settings size={20} />
              </Button>
            </div>
          </>
        )}
      </div>
      
      <div className="mt-auto p-4 border-t border-sidebar-border">
        {!collapsed && (
          <div className="text-sidebar-foreground text-sm">
            <p>مرحباً بك، أحمد</p>
            <p className="text-xs opacity-70">مدير النظام</p>
          </div>
        )}
      </div>
    </div>
  );
}
