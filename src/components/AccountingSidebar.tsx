import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ChevronDown,
  LayoutDashboard,
  Box,
  ListChecks,
  ShoppingCart,
  FileText,
  ChartBar,
  Users,
  Settings,
  DollarSign,
  Wrench
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from "@/components/ui/collapsible";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  path?: string;
  isActive?: boolean;
  onClick?: () => void;
  hasChildren?: boolean;
  isExpanded?: boolean;
  depth?: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  path,
  isActive,
  onClick,
  hasChildren = false,
  isExpanded = false,
  depth = 0
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 py-2 px-4 rounded-md mb-0.5 cursor-pointer transition-all duration-200 group relative",
        isActive 
          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm translate-x-1.5" 
          : "text-sidebar-foreground hover:bg-sidebar-primary/30 hover:text-sidebar-foreground"
      )}
    >
      <span className={cn("text-xl flex-shrink-0", isActive ? "text-sidebar-accent-foreground" : "")}>{icon}</span>
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
    </div>
  );
};

interface SidebarMenuProps {
  autoClose?: boolean;
}

const AccountingSidebar: React.FC<SidebarMenuProps> = ({ autoClose = true }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const menuItems = [
    {
      section: "لوحة التحكم",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
      children: []
    },
    {
      section: "المخزون",
      icon: <Box size={20} />,
      children: [
        { label: "إدارة الأصناف", path: "/inventory/products", icon: <Box size={18} /> },
        { label: "متابعة حركات المخزون", path: "/inventory/movements", icon: <Box size={18} /> },
        { label: "الجرد الفعلي", path: "/inventory/counting", icon: <ListChecks size={18} /> },
        { label: "مستويات إعادة الطلب", path: "/inventory/reorder", icon: <Box size={18} /> }
      ]
    },
    {
      section: "المصروفات",
      icon: <DollarSign size={20} />,
      children: [
        { label: "تسجيل مصروف جديد", path: "/expenses/new", icon: <DollarSign size={18} /> },
        { label: "تصنيف المصروفات", path: "/expenses/categories", icon: <DollarSign size={18} /> },
        { label: "تقارير المصروفات", path: "/expenses/reports", icon: <ChartBar size={18} /> }
      ]
    },
    {
      section: "الفواتير والطلبات",
      icon: <FileText size={20} />,
      children: [
        { label: "الفواتير الصادرة", path: "/invoices/outgoing", icon: <FileText size={18} /> },
        { label: "عروض الأسعار", path: "/invoices/quotes", icon: <FileText size={18} /> },
        { label: "أوامر البيع", path: "/invoices/sales-orders", icon: <ShoppingCart size={18} /> },
        { label: "مرتجعات المبيعات", path: "/invoices/returns", icon: <FileText size={18} /> }
      ]
    },
    {
      section: "التحكم بالمخزن",
      icon: <Wrench size={20} />,
      children: [
        { label: "نقل داخلي بين المستودعات", path: "/inventory-control/transfer", icon: <Box size={18} /> },
        { label: "إدارة مواقع التخزين", path: "/inventory-control/locations", icon: <Wrench size={18} /> },
        { label: "تسجيل المخزون التالف", path: "/inventory-control/damaged", icon: <Box size={18} /> }
      ]
    },
    {
      section: "المحاسبة",
      icon: <ChartBar size={20} />,
      children: [
        { label: "شجرة الحسابات", path: "/accounting/chart", icon: <ChartBar size={18} /> },
        { label: "القيود اليومية", path: "/accounting/journals", icon: <FileText size={18} /> },
        { label: "مراكز الكلفة", path: "/accounting/cost-centers", icon: <ChartBar size={18} /> },
        { label: "الإعدادات المحاسبية", path: "/accounting/settings", icon: <Settings size={18} /> }
      ]
    },
    {
      section: "العملاء",
      icon: <Users size={20} />,
      children: [
        { label: "إدارة العملاء", path: "/customers/manage", icon: <Users size={18} /> },
        { label: "كشف حساب العميل", path: "/customers/statement", icon: <FileText size={18} /> }
      ]
    },
    {
      section: "الإعدادات",
      icon: <Settings size={20} />,
      children: [
        { label: "إعدادات النظام", path: "/settings/system", icon: <Settings size={18} /> },
        { label: "إدارة الفروع", path: "/settings/branch", icon: <Settings size={18} /> },
        { label: "إدارة المستخدمين", path: "/settings/users", icon: <Users size={18} /> },
        { label: "النسخ الاحتياطي", path: "/settings/backup", icon: <Settings size={18} /> }
      ]
    }
  ];

  const isSectionActive = (section: any): boolean => {
    if (section.path && currentPath === section.path) return true;
    if (section.children && section.children.length > 0) {
      return section.children.some((child: any) => child.path === currentPath);
    }
    return false;
  };

  React.useEffect(() => {
    const newExpandedSections: Record<string, boolean> = {};
    menuItems.forEach((section) => {
      if (isSectionActive(section)) {
        newExpandedSections[section.section] = true;
      }
    });
    setExpandedSections(newExpandedSections);
  }, []);

  const toggleSection = (section: string) => {
    if (autoClose) {
      const newExpandedSections: Record<string, boolean> = {};
      if (!expandedSections[section]) {
        newExpandedSections[section] = true;
      }
      setExpandedSections(newExpandedSections);
    } else {
      setExpandedSections((prev) => ({
        ...prev,
        [section]: !prev[section]
      }));
    }
  };

  const handleItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="h-screen bg-sidebar overflow-y-auto flex-shrink-0 w-64">
      <div className="p-4 flex justify-between items-center border-b border-sidebar-border">
        <div className="text-sidebar-foreground font-bold text-xl">الجعفري</div>
      </div>

      <div className="p-2 space-y-1 rtl">
        {menuItems.map((item) => (
          <div key={item.section} className="mb-1">
            {item.children && item.children.length > 0 ? (
              <Collapsible
                open={expandedSections[item.section]}
                onOpenChange={() => toggleSection(item.section)}
                className="transition-all duration-200"
              >
                <CollapsibleTrigger className="w-full text-right">
                  <SidebarItem
                    icon={item.icon}
                    label={item.section}
                    isActive={isSectionActive(item)}
                    hasChildren={true}
                    isExpanded={expandedSections[item.section]}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-3 animate-accordion-down">
                  <div className="mt-1 mr-2 border-r-2 border-sidebar-border pr-2 space-y-1">
                    {item.children.map((child) => (
                      <SidebarItem
                        key={child.path}
                        icon={child.icon}
                        label={child.label}
                        path={child.path}
                        isActive={currentPath === child.path}
                        onClick={() => handleItemClick(child.path)}
                        depth={1}
                      />
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <SidebarItem
                icon={item.icon}
                label={item.section}
                path={item.path}
                isActive={currentPath === item.path}
                onClick={() => item.path && handleItemClick(item.path)}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-auto p-4 border-t border-sidebar-border rtl">
        <div className="text-sidebar-foreground text-sm">
          <p>مرحباً بك، أحمد</p>
          <p className="text-xs opacity-70">مدير النظام</p>
        </div>
      </div>
    </div>
  );
};

export default AccountingSidebar;
