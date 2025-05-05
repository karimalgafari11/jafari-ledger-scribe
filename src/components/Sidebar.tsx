
import { useState } from "react";
import { cn } from "@/lib/utils";
import SidebarHeader from "./sidebar/SidebarHeader";
import SidebarFooter from "./sidebar/SidebarFooter";
import ExpandedView from "./sidebar/ExpandedView";
import CollapsedView from "./sidebar/CollapsedView";

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
      <SidebarHeader 
        collapsed={collapsed} 
        toggleCollapsed={() => setCollapsed(!collapsed)} 
      />

      <div className="flex flex-col gap-1 p-2 overflow-y-auto flex-grow">
        {!collapsed ? (
          <ExpandedView 
            activePage={activePage}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
            onChangePage={onChangePage}
          />
        ) : (
          <CollapsedView 
            activePage={activePage}
            onChangePage={onChangePage}
          />
        )}
      </div>
      
      <SidebarFooter collapsed={collapsed} />
    </div>
  );
}
