
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ChevronDown,
  LayoutDashboard,
  Package,
  Box,
  ListChecks,
  ShoppingCart,
  FileText,
  ChartBar,
  Users,
  Settings
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

  // Define menu structure
  const menuItems = [
    {
      section: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
      children: []
    },
    {
      section: "Inventory",
      icon: <Package size={20} />,
      children: [
        { label: "Manage Products", path: "/inventory/products", icon: <Box size={18} /> },
        { label: "Manage Warehouses", path: "/inventory/warehouses", icon: <Package size={18} /> },
        { label: "Inventory Counting", path: "/inventory/counting", icon: <ListChecks size={18} /> }
      ]
    },
    {
      section: "Point of Sale",
      icon: <ShoppingCart size={20} />,
      children: [
        { label: "Sales Registers", path: "/pos/registers", icon: <ShoppingCart size={18} /> },
        { label: "Sales Screen", path: "/pos/sales", icon: <ShoppingCart size={18} /> },
        { label: "Open Sales Transactions", path: "/pos/transactions", icon: <ShoppingCart size={18} /> },
        { label: "Daily Cash Register Closure", path: "/pos/closure", icon: <ShoppingCart size={18} /> }
      ]
    },
    {
      section: "Sales",
      icon: <FileText size={20} />,
      children: [
        { label: "Sales Invoices", path: "/sales/invoices", icon: <FileText size={18} /> },
        { label: "Sales Returns", path: "/sales/returns", icon: <FileText size={18} /> }
      ]
    },
    {
      section: "Purchases",
      icon: <FileText size={20} />,
      children: [
        { label: "Purchase Invoices", path: "/purchases/invoices", icon: <FileText size={18} /> },
        { label: "Purchase Returns", path: "/purchases/returns", icon: <FileText size={18} /> }
      ]
    },
    {
      section: "Reports",
      icon: <ChartBar size={20} />,
      children: [
        { label: "Sales Report", path: "/reports", icon: <ChartBar size={18} /> },
        { label: "Profit and Loss Report", path: "/reports/profitloss", icon: <ChartBar size={18} /> },
        { label: "Inventory Report", path: "/reports/inventory", icon: <ChartBar size={18} /> },
        { label: "Customer and Supplier Report", path: "/reports/customersupplier", icon: <ChartBar size={18} /> }
      ]
    },
    {
      section: "Customers",
      icon: <Users size={20} />,
      children: [
        { label: "Customer Management", path: "/customers/manage", icon: <Users size={18} /> },
        { label: "Customer Account Statement", path: "/customers/statement", icon: <Users size={18} /> }
      ]
    },
    {
      section: "Settings",
      icon: <Settings size={20} />,
      children: [
        { label: "System Settings", path: "/settings/system", icon: <Settings size={18} /> },
        { label: "Branch Management", path: "/settings/branch", icon: <Settings size={18} /> },
        { label: "User Management", path: "/settings/users", icon: <Settings size={18} /> },
        { label: "Backup and Restore", path: "/settings/backup", icon: <Settings size={18} /> }
      ]
    }
  ];

  // Check if a section contains the active path
  const isSectionActive = (section: any): boolean => {
    if (section.path && currentPath === section.path) return true;
    if (section.children && section.children.length > 0) {
      return section.children.some((child: any) => child.path === currentPath);
    }
    return false;
  };

  // Auto expand sections that contain the active path on first render
  React.useEffect(() => {
    const newExpandedSections: Record<string, boolean> = {};
    menuItems.forEach((section) => {
      if (isSectionActive(section)) {
        newExpandedSections[section.section] = true;
      }
    });
    setExpandedSections(newExpandedSections);
  }, []);

  // Toggle section expansion
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

  // Navigate to a path
  const handleItemClick = (path: string) => {
    navigate(path);
  };

  // Render the menu
  return (
    <div className="h-screen bg-sidebar overflow-y-auto flex-shrink-0 w-64">
      <div className="p-4 flex justify-between items-center border-b border-sidebar-border">
        <div className="text-sidebar-foreground font-bold text-xl">الجعفري</div>
      </div>

      <div className="p-2 space-y-1">
        {menuItems.map((item) => (
          <div key={item.section} className="mb-1">
            {item.children && item.children.length > 0 ? (
              <Collapsible
                open={expandedSections[item.section]}
                onOpenChange={() => toggleSection(item.section)}
                className="transition-all duration-200"
              >
                <CollapsibleTrigger className="w-full text-left">
                  <SidebarItem
                    icon={item.icon}
                    label={item.section}
                    isActive={isSectionActive(item)}
                    hasChildren={true}
                    isExpanded={expandedSections[item.section]}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-3 animate-accordion-down">
                  <div className="mt-1 ml-2 border-l-2 border-sidebar-border pl-2 space-y-1">
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

      <div className="mt-auto p-4 border-t border-sidebar-border">
        <div className="text-sidebar-foreground text-sm">
          <p>مرحباً بك، أحمد</p>
          <p className="text-xs opacity-70">مدير النظام</p>
        </div>
      </div>
    </div>
  );
};

export default AccountingSidebar;
