
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
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon, label, active, onClick }: NavItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 py-2 px-4 w-full rounded-md transition-all duration-200 ease-in-out",
      active 
        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
        : "text-sidebar-foreground hover:bg-sidebar-primary"
    )}
  >
    <span className="text-xl">{icon}</span>
    <span>{label}</span>
  </button>
);

export function Sidebar({ activePage, onChangePage }: { activePage: string, onChangePage: (page: string) => void }) {
  const [collapsed, setCollapsed] = useState(false);

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
        <div className="mb-4">
          {!collapsed && <p className="px-4 py-1 text-xs text-sidebar-foreground/70">لوحة التحكم</p>}
          <NavItem 
            icon={<Home size={20} />} 
            label={collapsed ? "" : "لوحة التحكم"}
            active={activePage === "dashboard"}
            onClick={() => onChangePage("dashboard")}
          />
        </div>
        
        <div className="mb-4">
          {!collapsed && <p className="px-4 py-1 text-xs text-sidebar-foreground/70">المالية</p>}
          <NavItem 
            icon={<FileText size={20} />} 
            label={collapsed ? "" : "التقارير"} 
            active={activePage === "reports"}
            onClick={() => onChangePage("reports")}
          />
          <NavItem 
            icon={<Database size={20} />} 
            label={collapsed ? "" : "المخزون"} 
            active={activePage === "inventory"}
            onClick={() => onChangePage("inventory")}
          />
        </div>
        
        <div className="mb-4">
          {!collapsed && <p className="px-4 py-1 text-xs text-sidebar-foreground/70">العمليات</p>}
          <NavItem 
            icon={<ShoppingCart size={20} />} 
            label={collapsed ? "" : "نقاط البيع"} 
            active={activePage === "pos"}
            onClick={() => onChangePage("pos")}
          />
          <NavItem 
            icon={<Calendar size={20} />} 
            label={collapsed ? "" : "المصروفات"} 
            active={activePage === "expenses"}
            onClick={() => onChangePage("expenses")}
          />
          <NavItem 
            icon={<PieChart size={20} />} 
            label={collapsed ? "" : "عروض ترويجية"} 
            active={activePage === "promotions"}
            onClick={() => onChangePage("promotions")}
          />
        </div>
        
        <div className="mb-4">
          {!collapsed && <p className="px-4 py-1 text-xs text-sidebar-foreground/70">الإدارة</p>}
          <NavItem 
            icon={<Users size={20} />} 
            label={collapsed ? "" : "المستخدمين"} 
            active={activePage === "users"}
            onClick={() => onChangePage("users")}
          />
          <NavItem 
            icon={<Settings size={20} />} 
            label={collapsed ? "" : "الإعدادات"} 
            active={activePage === "settings"}
            onClick={() => onChangePage("settings")}
          />
        </div>
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
