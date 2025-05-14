
import { useState } from "react";
import { cn } from "@/lib/utils";
import SidebarHeader from "./sidebar/SidebarHeader";
import SidebarFooter from "./sidebar/SidebarFooter";
import ExpandedView from "./sidebar/ExpandedView";
import CollapsedView from "./sidebar/CollapsedView";

// Define proper types for our exported component
interface SidebarProps {
  activePage: string;
  onChangePage: (page: string) => void;
}

export function Sidebar({ activePage, onChangePage }: SidebarProps) {
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
      <SidebarHeader 
        collapsed={collapsed} 
        toggleCollapsed={() => setCollapsed(!collapsed)} 
      />

      <div className="flex flex-col gap-1 p-2 overflow-y-auto flex-grow">
        {!collapsed ? (
          <ExpandedView />
        ) : (
          <CollapsedView />
        )}
      </div>
      
      <SidebarFooter collapsed={collapsed} />
    </div>
  );
}
